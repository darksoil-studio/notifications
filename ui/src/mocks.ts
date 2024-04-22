import { Notification } from './types.js';

import {
  AgentPubKeyMap,
  decodeEntry,
  fakeEntry,
  fakeCreateAction,
  fakeUpdateEntry,
  fakeDeleteEntry,
  fakeRecord,
  pickBy,
  ZomeMock,
  RecordBag,
  entryState,
  HoloHashMap,
  HashType,
  hash
} from "@holochain-open-dev/utils";
import {
  decodeHashFromBase64,
  NewEntryAction,
  AgentPubKey,
  ActionHash,
  EntryHash,
  Delete,
  AppAgentClient,
  fakeAgentPubKey,
  fakeDnaHash,
  Link,
  fakeActionHash,
  SignedActionHashed,
  fakeEntryHash,
  Record,
} from "@holochain/client";
import { NotificationsClient } from './notifications-client.js'
import { encode } from '@msgpack/msgpack';

export class NotificationsZomeMock extends ZomeMock implements AppAgentClient {
  constructor(
    myPubKey?: AgentPubKey
  ) {
    super("notifications_test", "notifications", myPubKey);
  }
  /** Notification */
  notifications = new HoloHashMap<ActionHash, {
    deletes: Array<SignedActionHashed<Delete>>;
    revisions: Array<Record>;
  }>();
  notificationsForRecipient = new HoloHashMap<ActionHash, Link[]>();

  async create_notification(notification: Notification): Promise<Record> {
    const entryHash = hash(notification, HashType.ENTRY);
    const record = await fakeRecord(await fakeCreateAction(entryHash), fakeEntry(notification));

    this.notifications.set(record.signed_action.hashed.hash, {
      deletes: [],
      revisions: [record]
    });

    await Promise.all(notification.recipients.map(async recipients => {
      const existingRecipients = this.notificationsForRecipient.get(recipients) || [];
      this.notificationsForRecipient.set(recipients, [...existingRecipients, {
        target: record.signed_action.hashed.hash,
        author: this.myPubKey,
        timestamp: Date.now() * 1000,
        zome_index: 0,
        link_type: 0,
        tag: new Uint8Array(),
        create_link_hash: await fakeActionHash()
      }]);
    }));

    return record;
  }

  async get_notification(notificationHash: ActionHash): Promise<Record | undefined> {
    const notification = this.notifications.get(notificationHash);
    return notification ? notification.revisions[0] : undefined;
  }

  async get_all_deletes_for_notification(notificationHash: ActionHash): Promise<Array<SignedActionHashed<Delete>> | undefined> {
    const notification = this.notifications.get(notificationHash);
    return notification ? notification.deletes : undefined;
  }

  async get_oldest_delete_for_notification(notificationHash: ActionHash): Promise<SignedActionHashed<Delete> | undefined> {
    const notification = this.notifications.get(notificationHash);
    return notification ? notification.deletes[0] : undefined;
  }
  async delete_notification(original_notification_hash: ActionHash): Promise<ActionHash> {
    const record = await fakeRecord(await fakeDeleteEntry(original_notification_hash));

    this.notifications.get(original_notification_hash).deletes.push(record.signed_action as SignedActionHashed<Delete>);

    return record.signed_action.hashed.hash;
  }


  async get_notifications_for_recipient(recipient: AgentPubKey): Promise<Array<Link>> {
    return this.notificationsForRecipient.get(recipient) || [];
  }


}

export async function sampleNotification(client: NotificationsClient, partialNotification: Partial<Notification> = {}): Promise<Notification> {
  return {
    ...{
      notification_type: "Lorem ipsum 2",
      notification_group: "Lorem ipsum 2",
      persistent: true,
      recipients: [client.client.myPubKey],
      content: encode({
        hi: "hi2"
      }),
    },
    ...partialNotification
  };
}
