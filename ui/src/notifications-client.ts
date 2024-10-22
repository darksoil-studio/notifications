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
	encodeHashToBase64,
} from '@holochain/client';
import { encode } from '@msgpack/msgpack';

import {
	Notification,
	NotificationContents,
	NotificationStatus,
} from './types.js';
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

	async sendNotification(
		recipientProfileHash: ActionHash,
		zomeName: string,
		notificationType: string,
		notificationGroup: string,
		content: any,
	): Promise<void> {
		await this.callZome('send_notification', {
			zome_name: zomeName,
			notification_type: notificationType,
			notification_group: notificationGroup,
			content: encode(content),
			recipient_profile_hash: recipientProfileHash,
		});
	}

	async markNotificationsAsRead(notificationsHashes: EntryHash[]) {
		const statusChanges: Record<EntryHashB64, NotificationStatus> = {};
		for (const notificationHash of notificationsHashes) {
			statusChanges[encodeHashToBase64(notificationHash)] = 'Read';
		}
		return this.changeNotificationsStatus(statusChanges);
	}

	async dismissNotifications(notificationsHashes: EntryHash[]) {
		const statusChanges: Record<EntryHashB64, NotificationStatus> = {};
		for (const notificationHash of notificationsHashes) {
			statusChanges[encodeHashToBase64(notificationHash)] = 'Dismissed';
		}
		return this.changeNotificationsStatus(statusChanges);
	}

	async changeNotificationsStatus(
		statusChanges: Record<EntryHashB64, NotificationStatus>,
	) {
		return this.callZome('change_notifications_status', statusChanges);
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
			payload: {
				locale: 'en',
				notification,
			},
		});
	}
}
