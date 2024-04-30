import {
	AsyncComputed,
	AsyncSignal,
	deletedLinksSignal,
	deletesForEntrySignal,
	immutableEntrySignal,
	joinAsync,
	liveLinksSignal,
	uniquify,
} from '@holochain-open-dev/signals';
import { EntryRecord, LazyHoloHashMap, slice } from '@holochain-open-dev/utils';
import { ActionHash, encodeHashToBase64 } from '@holochain/client';
import { decode } from '@msgpack/msgpack';

import { NotificationsClient } from './notifications-client.js';
import { Notification } from './types.js';

export type NotificationsTypes = Record<string, NotificationType>;

export interface NotificationType {
	// The title only depends on the notification type and group to make sure that notifications for the same type and group have the same title
	title: (notificationGroup: string) => AsyncSignal<string>;
	contents: (
		notification: EntryRecord<Notification>,
	) => AsyncSignal<NotificationContents>;
	onClick: (notificationGroup: string) => void;
}

export interface NotificationContents {
	iconSrc: string;
	body: string;
}

export class NotificationsStore {
	constructor(
		public client: NotificationsClient,
		public notificationsTypes: NotificationsTypes,
	) {}

	/** Notification */

	notifications = new LazyHoloHashMap((notificationHash: ActionHash) => ({
		entry$: immutableEntrySignal(() =>
			this.client.getNotification(notificationHash),
		),
		deletes$: deletesForEntrySignal(this.client, notificationHash, () =>
			this.client.getAllDeletesForNotification(notificationHash),
		),
	}));

	private undismissedNotificationsLinks$ = liveLinksSignal(
		this.client,
		this.client.client.myPubKey,
		() => this.client.getUndismissedNotifications(),
		'RecipientToNotifications',
	);

	private readNotificationsLinks$ = liveLinksSignal(
		this.client,
		this.client.client.myPubKey,
		() => this.client.getReadNotifications(),
		'ReadNotifications',
	);

	readNotifications$ = new AsyncComputed(() => {
		const readNotificationsLinks = this.readNotificationsLinks$.get();
		const undismissedNotifications = this.undismissedNotificationsLinks$.get();
		if (readNotificationsLinks.status !== 'completed')
			return readNotificationsLinks;
		if (undismissedNotifications.status !== 'completed')
			return undismissedNotifications;

		/** Aggregate the read notification hashes and filter them by whether they've been dismissed */

		const allReadNotificationsHashes = uniquify(
			Array.from([] as ActionHash[]).concat(
				...readNotificationsLinks.value.map(
					link => decode(link.tag) as ActionHash[],
				),
			),
		);

		const undismissedNotificationsHashes = undismissedNotifications.value.map(
			l => encodeHashToBase64(l.target),
		);

		const notificationsHashes = allReadNotificationsHashes.filter(hash =>
			undismissedNotificationsHashes.includes(encodeHashToBase64(hash)),
		);

		/* If a notification was persistent and has been read but was deleted (usually by someone else performing the action that the notification required), then we dismiss the notification */

		const deletes = joinAsync(
			notificationsHashes.map(hash =>
				this.notifications.get(hash).deletes$.get(),
			),
		);
		const entries = joinAsync(
			notificationsHashes.map(hash =>
				this.notifications.get(hash).entry$.get(),
			),
		);
		if (entries.status !== 'completed') return entries;
		if (deletes.status !== 'completed') return deletes;

		const nonDeletedNotificationHashes: ActionHash[] = [];
		const notificationsToDismiss: ActionHash[] = [];

		for (let i = 0; i < notificationsHashes.length; i++) {
			if (!entries.value[i].entry.persistent || deletes.value[i].length === 0) {
				nonDeletedNotificationHashes.push(notificationsHashes[i]);
			} else {
				notificationsToDismiss.push(notificationsHashes[i]);
			}
		}

		if (notificationsToDismiss.length > 0) {
			this.client.dismissNotifications(notificationsToDismiss);
		}

		const value = slice(this.notifications, nonDeletedNotificationHashes);
		return {
			status: 'completed',
			value,
		};
	});

	unreadNotifications$ = new AsyncComputed(() => {
		const readNotifications = this.readNotifications$.get();
		const undismissedNotifications = this.undismissedNotificationsLinks$.get();

		if (readNotifications.status !== 'completed') return readNotifications;
		if (undismissedNotifications.status !== 'completed')
			return undismissedNotifications;

		const readNotificationsHashes = Array.from(
			readNotifications.value.keys(),
		).map(h => encodeHashToBase64(h));

		const links = undismissedNotifications.value.filter(
			link =>
				!readNotificationsHashes.includes(encodeHashToBase64(link.target)),
		);
		const value = slice(this.notifications, uniquify(links.map(l => l.target)));
		return {
			status: 'completed',
			value,
		};
	});

	deletedNotificationsLinks$ = deletedLinksSignal(
		this.client,
		this.client.client.myPubKey,
		() => this.client.getDismissedNotifications(),
		'RecipientToNotifications',
	);

	dismissedNotifications$ = new AsyncComputed(() => {
		const deletedLinks = this.deletedNotificationsLinks$.get();
		if (deletedLinks.status !== 'completed') return deletedLinks;

		const value = slice(
			this.notifications,
			deletedLinks.value.map(l => l[0].hashed.content.target_address),
		);

		return {
			status: 'completed',
			value,
		};
	});
}
