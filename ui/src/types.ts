import { AsyncSignal } from '@holochain-open-dev/signals';
import { ActionCommittedSignal, EntryRecord } from '@holochain-open-dev/utils';
import { ActionHash } from '@holochain/client';

export type NotificationsSignal = ActionCommittedSignal<EntryTypes, LinkTypes>;

export type EntryTypes = { type: 'Notification' } & Notification;

export type LinkTypes = string;

export interface Notification {
	notification_type: string;

	notification_group: string;

	persistent: boolean;

	recipients_profiles_hashes: Array<ActionHash>;

	content: Uint8Array;
}

export interface NotificationsConfig {
	types: Record<string, NotificationType>;

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

export interface NotificationType {
	// For the notifications settings UI
	name: string;
	// For the notifications settings UI
	description: string;
	// The title only depends on the notification type and group to make sure that notifications for the same group have the same title
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
