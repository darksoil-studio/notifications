import { ActionCommittedSignal } from '@holochain-open-dev/utils';
import {
	ActionHash,
	AgentPubKey,
	Create,
	CreateLink,
	Delete,
	DeleteLink,
	DnaHash,
	EntryHash,
	Record,
	SignedActionHashed,
	Update,
} from '@holochain/client';

export type NotificationsSignal = ActionCommittedSignal<EntryTypes, LinkTypes>;

export type EntryTypes = { type: 'Notification' } & Notification;

export type LinkTypes = string;

export interface Notification {
	notification_type: string;

	notification_group: string;

	persistent: boolean;

	recipients: Array<AgentPubKey>;

	content: Uint8Array;
}
