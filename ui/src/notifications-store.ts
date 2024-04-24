import { LazyHoloHashMap, slice } from '@holochain-open-dev/utils';
import { ActionHash, encodeHashToBase64 } from '@holochain/client';
import { decode } from '@msgpack/msgpack';

import { NotificationsClient } from './notifications-client.js';
import {
	AsyncComputed,
	deletedLinksStore,
	deletesForEntryStore,
	immutableEntryStore,
	liveLinksStore,
	uniquify,
} from './signals.js';

export class NotificationsStore {
	constructor(public client: NotificationsClient) {}

	/** Notification */

	notifications = new LazyHoloHashMap((notificationHash: ActionHash) => ({
		entry: immutableEntryStore(() =>
			this.client.getNotification(notificationHash),
		),
		deletes: deletesForEntryStore(this.client, notificationHash, () =>
			this.client.getAllDeletesForNotification(notificationHash),
		),
	}));

	private undismissedNotifications = liveLinksStore(
		this.client,
		this.client.client.myPubKey,
		() => this.client.getUndismissedNotifications(),
		'RecipientToNotifications',
	);

	private readNotificationsLinks = liveLinksStore(
		this.client,
		this.client.client.myPubKey,
		() => this.client.getReadNotifications(),
		'ReadNotifications',
	);

	readNotifications = new AsyncComputed(() => {
		const undismissedNotifications = this.undismissedNotifications.get();
		if (undismissedNotifications.status !== 'completed')
			return undismissedNotifications;

		const readNotificationsLinks = this.readNotificationsLinks.get();
		if (readNotificationsLinks.status !== 'completed')
			return readNotificationsLinks;

		/** Aggregate the read notification hashes and filter them by whether they've been dismissed */

		const allReadNotificationsHashes = uniquify(
			Array.from([] as ActionHash[]).concat(
				...readNotificationsLinks.value.map(
					link => decode(link.tag) as ActionHash[],
				),
			),
		);

		const undismissedNotificationsHashes = undismissedNotifications.value.map(
			l => encodeHashToBase64(l.target),
		);

		const notificationsHashes = allReadNotificationsHashes.filter(hash =>
			undismissedNotificationsHashes.includes(encodeHashToBase64(hash)),
		);
		const value = slice(this.notifications, notificationsHashes);
		return {
			status: 'completed',
			value,
		};
	});

	unreadNotifications = new AsyncComputed(() => {
		const undismissedNotifications = this.undismissedNotifications.get();
		if (undismissedNotifications.status !== 'completed')
			return undismissedNotifications;
		const readNotifications = this.readNotifications.get();
		if (readNotifications.status !== 'completed') return readNotifications;
		const readNotificationsHashes = Array.from(
			readNotifications.value.keys(),
		).map(h => encodeHashToBase64(h));

		const links = undismissedNotifications.value.filter(
			link =>
				!readNotificationsHashes.includes(encodeHashToBase64(link.target)),
		);
		const value = slice(this.notifications, uniquify(links.map(l => l.target)));
		return {
			status: 'completed',
			value,
		};
	});

	deletedNotificationsLinks = deletedLinksStore(
		this.client,
		this.client.client.myPubKey,
		() => this.client.getDismissedNotifications(),
		'RecipientToNotifications',
	);

	dismissedNotifications = new AsyncComputed(() => {
		const deletedLinks = this.deletedNotificationsLinks.get();
		if (deletedLinks.status !== 'completed') return deletedLinks;

		const value = slice(
			this.notifications,
			deletedLinks.value.map(l => l[0].hashed.content.target_address),
		);

		return {
			status: 'completed',
			value,
		};
	});
}
