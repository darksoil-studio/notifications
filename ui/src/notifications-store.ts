import {
	AsyncSignal,
	AsyncState,
	Signal,
	fromPromise,
} from '@holochain-open-dev/signals';
import { HoloHashMap } from '@holochain-open-dev/utils';
import { EntryHash, EntryHashB64 } from '@holochain/client';

import { NotificationsClient } from './notifications-client.js';
import {
	Notification,
	NotificationContents,
	NotificationStatus,
} from './types.js';

export class NotificationsStore {
	constructor(
		public client: NotificationsClient,
		// public notificationsConfig: NotificationsConfig,
	) {}

	/** Notifications */
	private buildQueryNotificationsWithStatusSignal(
		statusFilter: NotificationStatus,
	) {
		let unsubscribe: undefined | (() => void);
		const signal = new AsyncState<Record<EntryHashB64, Notification>>(
			{ status: 'pending' },
			{
				[Signal.subtle.watched]: async () => {
					try {
						const notifications =
							await this.client.queryNotificationsWithStatus(statusFilter);
						signal.set({
							status: 'completed',
							value: notifications,
						});
						unsubscribe = this.client.onSignal(async notificationsSignal => {
							if (notificationsSignal.type === 'EntryCreated') {
								const notifications =
									await this.client.queryNotificationsWithStatus(statusFilter);
								signal.set({
									status: 'completed',
									value: notifications,
								});
							}
						});
					} catch (error) {
						signal.set({
							status: 'error',
							error,
						});
					}
				},
				[Signal.subtle.unwatched]: () => {
					if (unsubscribe) unsubscribe();
					signal.set({
						status: 'pending',
					});
				},
			},
		);

		return signal;
	}

	private _notificationContents = new HoloHashMap<
		EntryHash,
		AsyncSignal<NotificationContents>
	>();
	notificationContents(
		notificationHash: EntryHash,
		notification: Notification,
	) {
		if (!this._notificationContents.has(notificationHash)) {
			const contents = fromPromise(() =>
				this.client.getNotificationContents(notification),
			);
			this._notificationContents.set(notificationHash, contents);
		}
		return this._notificationContents.get(notificationHash);
	}

	unreadNotifications = this.buildQueryNotificationsWithStatusSignal('Unread');

	readNotifications = this.buildQueryNotificationsWithStatusSignal('Read');

	dismissedNotifications =
		this.buildQueryNotificationsWithStatusSignal('Dismissed');
}
