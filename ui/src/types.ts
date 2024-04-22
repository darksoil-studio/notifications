import {
  Record,
  ActionHash,
  DnaHash,
  SignedActionHashed,
  EntryHash,
  AgentPubKey,
  Create,
  Update,
  Delete,
  CreateLink,
  DeleteLink
} from '@holochain/client';
import { ActionCommittedSignal } from '@holochain-open-dev/utils';

export type NotificationsSignal = ActionCommittedSignal<EntryTypes, LinkTypes>;

export type EntryTypes =
  | ({ type: 'Notification'; } & Notification);

export type LinkTypes = string;



export interface Notification {
  notification_type: string;

  notification_group: string | undefined;

  persistent: boolean;

  recipients: Array<AgentPubKey>;

  content: Uint8Array;
}

