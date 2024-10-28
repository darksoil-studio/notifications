import { AsyncSignal } from '@holochain-open-dev/signals';
import { ActionCommittedSignal, EntryRecord } from '@holochain-open-dev/utils';
import { ActionHash, EntryHashB64 } from '@holochain/client';

export type NotificationsSignal = ActionCommittedSignal<EntryTypes, LinkTypes>;

export type EntryTypes = { type: 'Notification' } & Notification;

export type LinkTypes = string;

export interface Notification {
	zome_name: string;

	notification_type: string;

	notification_group: string;

	recipient_profile_hash: ActionHash;
	timestamp: number;

	content: Uint8Array;
}

export type NotificationStatus = 'Unread' | 'Read' | 'Dismissed';

export interface NotificationsStatusChanges {
	status_changes: Record<EntryHashB64, NotificationStatus>;
	timestamp: number;
}

export interface NotificationsConfig {
	// types: Record<string, NotificationType>;

	services?: {
		email?: {
			enabled: boolean;
			sendEmail: (
				notification: EntryRecord<Notification>,
				recipientProfileHash: ActionHash,
				recipientEmailAddress: string,
			) => Promise<void>;
		};
	};
}

// export interface NotificationType {
// 	// For the notifications settings UI
// 	name: string;
// 	// For the notifications settings UI
// 	description: string;
// 	// The title only depends on the notification type and group to make sure that notifications for the same group have the same title
// 	title: (notificationGroup: string) => AsyncSignal<string>;
// 	contents: (
// 		notification: EntryRecord<Notification>,
// 	) => AsyncSignal<NotificationContents>;
// 	onClick: (notificationGroup: string) => void;
// }

export interface NotificationContents {
	title: string;
	body: string;
	icon_src: string;
	url_path_to_navigate_to_on_click: string | undefined;
}
