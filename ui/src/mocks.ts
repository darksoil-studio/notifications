import {
	AgentPubKeyMap,
	HashType,
	HoloHashMap,
	RecordBag,
	ZomeMock,
	decodeEntry,
	entryState,
	fakeCreateAction,
	fakeCreateLinkAction,
	fakeDeleteEntry,
	fakeDeleteLinkAction,
	fakeEntry,
	fakeRecord,
	fakeUpdateEntry,
	hash,
	pickBy,
	retype,
} from '@holochain-open-dev/utils';
import {
	ActionHash,
	AgentPubKey,
	AppClient,
	Delete,
	EntryHash,
	Link,
	NewEntryAction,
	Record,
	SignedActionHashed,
	decodeHashFromBase64,
	encodeHashToBase64,
	fakeActionHash,
	fakeAgentPubKey,
	fakeDnaHash,
	fakeEntryHash,
} from '@holochain/client';
import { encode } from '@msgpack/msgpack';

import { NotificationsClient } from './notifications-client.js';
import { Notification } from './types.js';

export class NotificationsZomeMock extends ZomeMock implements AppClient {
	constructor(myPubKey?: AgentPubKey) {
		super('notifications_test', 'notifications', myPubKey, 100);
	}
	/** Notification */
	notifications = new HoloHashMap<
		ActionHash,
		{
			deletes: Array<SignedActionHashed<Delete>>;
			revisions: Array<Record>;
		}
	>();
	notificationsForRecipient = new HoloHashMap<ActionHash, Link[]>();
	readNotificationsByRecipient = new HoloHashMap<AgentPubKey, Array<Link>>();

	async create_notification(notification: Notification): Promise<Record> {
		const entryHash = hash(notification, HashType.ENTRY);
		const record = await fakeRecord(
			await fakeCreateAction(entryHash),
			fakeEntry(notification),
		);

		this.notifications.set(record.signed_action.hashed.hash, {
			deletes: [],
			revisions: [record],
		});

		await Promise.all(
			notification.recipients.map(async recipient => {
				const existingRecipients =
					this.notificationsForRecipient.get(recipient) || [];
				this.notificationsForRecipient.set(recipient, [
					...existingRecipients,
					{
						base: recipient,
						target: record.signed_action.hashed.hash,
						author: this.myPubKey,
						timestamp: Date.now() * 1000,
						zome_index: 0,
						link_type: 0,
						tag: new Uint8Array(),
						create_link_hash: await fakeActionHash(),
					},
				]);
			}),
		);

		return record;
	}

	async get_notification(
		notificationHash: ActionHash,
	): Promise<Record | undefined> {
		const notification = this.notifications.get(notificationHash);
		return notification ? notification.revisions[0] : undefined;
	}

	async get_all_deletes_for_notification(
		notificationHash: ActionHash,
	): Promise<Array<SignedActionHashed<Delete>> | undefined> {
		const notification = this.notifications.get(notificationHash);
		return notification ? notification.deletes : undefined;
	}

	async get_oldest_delete_for_notification(
		notificationHash: ActionHash,
	): Promise<SignedActionHashed<Delete> | undefined> {
		const notification = this.notifications.get(notificationHash);
		return notification ? notification.deletes[0] : undefined;
	}
	async delete_notification(
		original_notification_hash: ActionHash,
	): Promise<ActionHash> {
		const record = await fakeRecord(
			await fakeDeleteEntry(original_notification_hash),
		);

		this.notifications
			.get(original_notification_hash)
			.deletes.push(record.signed_action as SignedActionHashed<Delete>);

		return record.signed_action.hashed.hash;
	}

	async get_notifications_for_recipient(
		recipient: AgentPubKey,
	): Promise<Array<Link>> {
		return this.notificationsForRecipient.get(recipient) || [];
	}

	async mark_notifications_as_read(notifications: ActionHash[]) {
		const readNotifications =
			this.readNotificationsByRecipient.get(this.myPubKey) || [];

		const link = {
			base: this.myPubKey,
			target: this.myPubKey,
			author: this.myPubKey,
			timestamp: Date.now() * 1000,
			zome_index: 0,
			link_type: 0,
			tag: encode(notifications),
			create_link_hash: await fakeActionHash(),
		};
		this.readNotificationsByRecipient.set(this.myPubKey, [
			...readNotifications,
			link,
		]);
		this.emitSignal({
			type: 'LinkCreated',
			action: {
				hashed: {
					content: await fakeCreateLinkAction(
						retype(this.myPubKey, HashType.ENTRY),
						this.myPubKey,
						1,
						encode(notifications),
					),
					hash: link.create_link_hash,
				},
			},
			link_type: 'ReadNotifications',
		});
	}

	async dismiss_notifications(notifications: ActionHash[]) {
		const undismissedNotifications =
			this.notificationsForRecipient.get(this.myPubKey) || [];

		const filteredNotifications = undismissedNotifications.filter(
			link =>
				!notifications.find(
					n => encodeHashToBase64(n) === encodeHashToBase64(link.target),
				),
		);

		const dismissedNotifications = undismissedNotifications.filter(link =>
			notifications.find(
				n => encodeHashToBase64(n) === encodeHashToBase64(link.target),
			),
		);

		this.notificationsForRecipient.set(this.myPubKey, filteredNotifications);
		for (const link of dismissedNotifications) {
			this.emitSignal({
				type: 'LinkDeleted',
				action: {
					hashed: {
						content: await fakeDeleteLinkAction(link.create_link_hash),
						hash: await fakeActionHash(),
					},
				},
				create_link_action: {
					hashed: {
						content: await fakeCreateLinkAction(
							link.base,
							link.target,
							link.link_type,
							link.tag,
						),
					},
				},
				link_type: 'RecipientToNotifications',
			});
		}
	}

	async get_undismissed_notifications(): Promise<Array<Link>> {
		return this.notificationsForRecipient.get(this.myPubKey);
	}

	async get_dismissed_notifications(): Promise<Array<Link>> {
		return [];
	}

	async get_read_notifications(): Promise<Array<Link>> {
		return this.readNotificationsByRecipient.get(this.myPubKey) || [];
	}
}

export async function sampleNotification(
	client: NotificationsClient,
	partialNotification: Partial<Notification> = {},
): Promise<Notification> {
	return {
		...{
			notification_type: 'type1',
			notification_group: 'Your notifications',
			persistent: false,
			recipients: [client.client.myPubKey],
			content: encode({
				body: 'Hello world!',
			}),
		},
		...partialNotification,
	};
}
