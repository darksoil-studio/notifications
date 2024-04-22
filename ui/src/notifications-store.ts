
import {
  liveLinksStore,
  deletedLinksStore,
  immutableEntryStore,
  deletesForEntryStore,
  pipe,
  joinAsync,
  uniquify
} from "@holochain-open-dev/stores";
import { slice, LazyHoloHashMap } from "@holochain-open-dev/utils";
import { NewEntryAction, Record, ActionHash, EntryHash, AgentPubKey, encodeHashToBase64 } from '@holochain/client';

import { NotificationsClient } from './notifications-client.js';
import { decode } from '@msgpack/msgpack';

export class NotificationsStore {


  constructor(public client: NotificationsClient) { }

  /** Notification */

  notifications = new LazyHoloHashMap((notificationHash: ActionHash) => ({
    entry: immutableEntryStore(() => this.client.getNotification(notificationHash)),
    deletes: deletesForEntryStore(this.client, notificationHash, () => this.client.getAllDeletesForNotification(notificationHash)),
  })
  );

  private undismissedNotifications = liveLinksStore(
    this.client,
    this.client.client.myPubKey,
    () => this.client.getUndismissedNotifications(),
    'RecipientToNotifications'
  );

  private readNotificationsLinks = liveLinksStore(
    this.client,
    this.client.client.myPubKey,
    () => this.client.getReadNotifications(),
    'ReadNotifications'
  );

  readNotifications = pipe(joinAsync([this.undismissedNotifications, this.readNotificationsLinks]), ([undismissedNotificationsLinks, readNotificationsLinks]) => {
    /** Aggregate the read notification hashes and filter them by whether they've been dismissed */

    const allReadNotificationsHashes = uniquify(Array.from([] as ActionHash[]).concat(...readNotificationsLinks.map(link => decode(link.tag) as ActionHash[])));

    const undismissedNotificationsHashes = undismissedNotificationsLinks.map(l => encodeHashToBase64(l.target));

    return allReadNotificationsHashes.filter(hash => undismissedNotificationsHashes.includes(encodeHashToBase64(hash)));
  }, notificationsHashes => slice(this.notifications, notificationsHashes)
  );

  unreadNotifications = pipe(joinAsync([this.undismissedNotifications, this.readNotifications]), ([undismissedNotifications, readNotifications]) => {
    const readNotificationsHashes = Array.from(readNotifications.keys()).map(h => encodeHashToBase64(h));

    return undismissedNotifications.filter(link => !readNotificationsHashes.includes(encodeHashToBase64(link.target)));
  }, links => slice(this.notifications, uniquify(links.map(l => l.target))));

  dismissedNotifications = pipe(
    deletedLinksStore(
      this.client,
      this.client.client.myPubKey,
      () => this.client.getDismissedNotifications(),
      'RecipientToNotifications'
    ), links => slice(this.notifications, links.map(l => l[0].hashed.content.target_address))
  );

}
