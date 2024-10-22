import { wrapPathInSvg } from '@holochain-open-dev/elements';
import {
	HashType,
	HoloHashMap,
	ZomeMock,
	hash,
} from '@holochain-open-dev/utils';
import {
	AgentPubKey,
	AppClient,
	EntryHash,
	EntryHashB64,
	encodeHashToBase64,
} from '@holochain/client';
import { mdiEarth } from '@mdi/js';

import {
	Notification,
	NotificationContents,
	NotificationStatus,
	NotificationsStatusChanges,
} from './types.js';

export class NotificationsZomeMock extends ZomeMock implements AppClient {
	constructor(myPubKey?: AgentPubKey) {
		super('notifications_test', 'notifications', myPubKey, 100);
	}
	/** Notification */
	notifications = new HoloHashMap<EntryHash, Notification>();
	notificationsStatusChanges = new HoloHashMap<
		EntryHash,
		NotificationsStatusChanges
	>();

	async send_notification(notification: Notification): Promise<void> {
		notification.timestamp = Date.now() * 1000;
		const entryHash = hash(notification, HashType.ENTRY);
		this.notifications.set(entryHash, notification);
	}

	async change_notifications_status(
		status_changes: Record<EntryHashB64, NotificationStatus>,
	) {
		const notificationsStatusChanges: NotificationsStatusChanges = {
			status_changes,
			timestamp: Date.now() * 1000,
		};

		const entryHash = hash(notificationsStatusChanges, HashType.ENTRY);
		this.notificationsStatusChanges.set(entryHash, notificationsStatusChanges);

		this.emitSignal({
			type: 'EntryCreated',
		});
	}

	async query_notifications_and_status(): Promise<
		Record<
			EntryHashB64,
			{ notification: Notification; status: NotificationStatus }
		>
	> {
		const result: Record<
			EntryHashB64,
			{ notification: Notification; status: NotificationStatus }
		> = {};

		for (const [hash, notification] of Array.from(
			this.notifications.entries(),
		)) {
			result[encodeHashToBase64(hash)] = {
				notification,
				status: 'Unread',
			};
		}

		const sortedNotificationStatusChanges = Array.from(
			this.notificationsStatusChanges.entries(),
		).sort((t1, t2) => t1[1].timestamp - t2[1].timestamp);

		for (const [
			hash,
			notificationsStatusChanges,
		] of sortedNotificationStatusChanges) {
			for (const [notificationHash, status] of Object.entries(
				notificationsStatusChanges.status_changes,
			)) {
				if (result[notificationHash]) {
					result[notificationHash].status = status;
				}
			}
		}

		return result;
	}

	async query_notifications_with_status(
		notificationStatus: NotificationStatus,
	) {
		const notifications = await this.query_notifications_and_status();

		const result: Record<EntryHashB64, Notification> = {};

		for (const [hash, n] of Object.entries(notifications)) {
			if (n.status === notificationStatus) {
				result[hash] = n.notification;
			}
		}

		return result;
	}

	async get_notification_contents(
		notification: Notification,
	): Promise<NotificationContents> {
		return {
			title: 'Hello world!',
			body: 'This is an example notification',
			icon_src: wrapPathInSvg(mdiEarth),
			url_path_to_navigate_to_on_click: '',
		};
	}
}
