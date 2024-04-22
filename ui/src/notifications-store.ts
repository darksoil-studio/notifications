import { 
  collectionStore, 
  liveLinksStore, 
  deletedLinksStore, 
  allRevisionsOfEntryStore,
  latestVersionOfEntryStore, 
  immutableEntryStore, 
  deletesForEntryStore, 
  AsyncReadable,
  pipe
} from "@holochain-open-dev/stores";
import { slice, HashType, retype, EntryRecord, LazyHoloHashMap } from "@holochain-open-dev/utils";
import { NewEntryAction, Record, ActionHash, EntryHash, AgentPubKey } from '@holochain/client';

import { NotificationsClient } from './notifications-client.js';

export class NotificationsStore {

  constructor(public client: NotificationsClient) {}
  
}
