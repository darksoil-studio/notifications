import { EntryRecord, ZomeClient } from '@holochain-open-dev/utils';
import {
	ActionHash,
	AppClient,
	CreateLink,
	Delete,
	DeleteLink,
	Link,
	Record,
	SignedActionHashed,
} from '@holochain/client';

import { Notification } from './types.js';
import { NotificationsSignal } from './types.js';

export class NotificationsClient extends ZomeClient<NotificationsSignal> {
	constructor(
		public client: AppClient,
		public roleName: string,
		public zomeName = 'notifications',
	) {
		super(client, roleName, zomeName);
	}
	/** Notification */

	async createNotification(
		notification: Notification,
	): Promise<EntryRecord<Notification>> {
		const record: Record = await this.callZome(
			'create_notification',
			notification,
		);
		return new EntryRecord(record);
	}

	async getNotification(
		notificationHash: ActionHash,
	): Promise<EntryRecord<Notification> | undefined> {
		const record: Record = await this.callZome(
			'get_notification',
			notificationHash,
		);
		return record ? new EntryRecord(record) : undefined;
	}

	markNotificationsAsRead(notificationsHashes: ActionHash[]): Promise<void> {
		return this.callZome('mark_notifications_as_read', notificationsHashes);
	}

	dismissNotifications(notificationsHashes: ActionHash[]): Promise<void> {
		return this.callZome('dismiss_notifications', notificationsHashes);
	}

	getAllDeletesForNotification(
		originalNotificationHash: ActionHash,
	): Promise<Array<SignedActionHashed<Delete>>> {
		return this.callZome(
			'get_all_deletes_for_notification',
			originalNotificationHash,
		);
	}

	async getUndismissedNotifications(): Promise<Array<Link>> {
		return this.callZome('get_undismissed_notifications', undefined);
	}

	async getReadNotifications(): Promise<Array<Link>> {
		return this.callZome('get_read_notifications', undefined);
	}

	async getDismissedNotifications(): Promise<
		Array<[SignedActionHashed<CreateLink>, SignedActionHashed<DeleteLink>[]]>
	> {
		return this.callZome('get_dismissed_notifications', undefined);
	}
}
