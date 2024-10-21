import { ProfilesStore } from '@holochain-open-dev/profiles';
import { toPromise } from '@holochain-open-dev/signals';
import { EntryRecord, ZomeClient } from '@holochain-open-dev/utils';
import {
	ActionHash,
	AppClient,
	CreateLink,
	Delete,
	DeleteLink,
	EntryHash,
	EntryHashB64,
	Record as HolochainRecord,
	Link,
	SignedActionHashed,
} from '@holochain/client';

import {
	Notification,
	NotificationContents,
	NotificationStatus,
} from './types.js';
import { NotificationsSignal } from './types.js';

export class NotificationsClient extends ZomeClient<NotificationsSignal> {
	constructor(
		public profilesStore: ProfilesStore,
		public client: AppClient,
		public roleName: string,
		public zomeName = 'notifications',
	) {
		super(client, roleName, zomeName);
	}
	/** Notification */

	async createNotification(notification: Notification): Promise<void> {
		await this.callZome('create_notification', notification);
	}

	async changeNotificationsStatus(
		statusChanges: Record<EntryHashB64, NotificationStatus>,
	) {
		return this.callZome('change_notifications_status', {
			status_changes: statusChanges,
		});
	}

	async queryNotificationsWithStatus(
		statusFilter: NotificationStatus,
	): Promise<Record<EntryHashB64, Notification>> {
		return this.callZome('query_notifications_with_status', statusFilter);
	}

	async getNotificationContents(
		notification: Notification,
	): Promise<NotificationContents> {
		return this.client.callZome({
			role_name: this.roleName,
			zome_name: notification.zome_name,
			fn_name: 'get_notification_contents',
			payload: notification,
		});
	}
}
