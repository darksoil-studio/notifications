import { 
  SignedActionHashed,
  CreateLink,
  Link,
  DeleteLink,
  Delete,
  AppAgentClient, 
  Record, 
  ActionHash, 
  EntryHash, 
  AgentPubKey,
} from '@holochain/client';
import { isSignalFromCellWithRole, EntryRecord, ZomeClient } from '@holochain-open-dev/utils';

import { NotificationsSignal } from './types.js';

export class NotificationsClient extends ZomeClient<NotificationsSignal> {

  constructor(public client: AppAgentClient, public roleName: string, public zomeName = 'notifications') {
    super(client, roleName, zomeName);
  }
}
