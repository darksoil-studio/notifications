import { ProfilesStore } from '@holochain-open-dev/profiles';
import { toPromise } from '@holochain-open-dev/signals';
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

	async getNotification(
		notificationHash: ActionHash,
	): Promise<EntryRecord<Notification> | undefined> {
		const record: Record = await this.callZome(
			'get_notification',
			notificationHash,
		);
		return record ? new EntryRecord(record) : undefined;
	}

	private async myProfileHash() {
		const myProfile = await toPromise(this.profilesStore.myProfile);
		if (myProfile === undefined) throw new Error('Could not find my profile');
		return myProfile.profileHash;
	}

	async markNotificationsAsRead(
		notificationsHashes: ActionHash[],
	): Promise<void> {
		const myProfileHash = await this.myProfileHash();
		return this.callZome('mark_notifications_as_read', {
			my_profile_hash: myProfileHash,
			notifications_hashes: notificationsHashes,
		});
	}

	async dismissNotifications(notificationsHashes: ActionHash[]): Promise<void> {
		const myProfileHash = await this.myProfileHash();
		return this.callZome('dismiss_notifications', {
			my_profile_hash: myProfileHash,
			notifications_hashes: notificationsHashes,
		});
	}

	getAllDeletesForNotification(
		originalNotificationHash: ActionHash,
	): Promise<Array<SignedActionHashed<Delete>> | undefined> {
		return this.callZome(
			'get_all_deletes_for_notification',
			originalNotificationHash,
		);
	}

	async getUndismissedNotifications(): Promise<Array<Link>> {
		const myProfileHash = await this.myProfileHash();
		return this.callZome('get_undismissed_notifications', myProfileHash);
	}

	async getReadNotifications(): Promise<Array<Link>> {
		const myProfileHash = await this.myProfileHash();
		return this.callZome('get_read_notifications', myProfileHash);
	}

	async getDismissedNotifications(): Promise<
		Array<[SignedActionHashed<CreateLink>, SignedActionHashed<DeleteLink>[]]>
	> {
		const myProfileHash = await this.myProfileHash();
		return this.callZome('get_dismissed_notifications', myProfileHash);
	}
}
