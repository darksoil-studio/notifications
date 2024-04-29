import {
	AsyncComputed,
	deletedLinksSignal,
	deletesForEntrySignal,
	immutableEntrySignal,
	liveLinksSignal,
	uniquify,
	withLogger,
} from '@holochain-open-dev/signals';
import { EntryRecord, LazyHoloHashMap, slice } from '@holochain-open-dev/utils';
import { ActionHash, encodeHashToBase64 } from '@holochain/client';
import { decode } from '@msgpack/msgpack';

import { NotificationsClient } from './notifications-client.js';
import { Notification } from './types.js';

export type NotificationsTypes = Record<
	string,
	(notification: EntryRecord<Notification>) => {
		title: string;
		body: string;
		onClick: () => void;
	}
>;

export class NotificationsStore {
	constructor(
		public client: NotificationsClient,
		public notificationsTypes: NotificationsTypes,
	) {}

	/** Notification */

	notifications = new LazyHoloHashMap((notificationHash: ActionHash) => ({
		entry$: immutableEntrySignal(() =>
			this.client.getNotification(notificationHash),
		),
		deletes$: deletesForEntrySignal(this.client, notificationHash, () =>
			this.client.getAllDeletesForNotification(notificationHash),
		),
	}));

	private undismissedNotificationsLinks$ = liveLinksSignal(
		this.client,
		this.client.client.myPubKey,
		() => this.client.getUndismissedNotifications(),
		'RecipientToNotifications',
	);

	private readNotificationsLinks$ = liveLinksSignal(
		this.client,
		this.client.client.myPubKey,
		() => this.client.getReadNotifications(),
		'ReadNotifications',
	);

	readNotifications$ = new AsyncComputed(() => {
		const readNotificationsLinks = this.readNotificationsLinks$.get();
		const undismissedNotifications = this.undismissedNotificationsLinks$.get();
		if (readNotificationsLinks.status !== 'completed')
			return readNotificationsLinks;
		if (undismissedNotifications.status !== 'completed')
			return undismissedNotifications;

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

	unreadNotifications$ = new AsyncComputed(() => {
		const readNotifications = this.readNotifications$.get();
		const undismissedNotifications = this.undismissedNotificationsLinks$.get();

		if (readNotifications.status !== 'completed') return readNotifications;
		if (undismissedNotifications.status !== 'completed')
			return undismissedNotifications;

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

	deletedNotificationsLinks$ = deletedLinksSignal(
		this.client,
		this.client.client.myPubKey,
		() => this.client.getDismissedNotifications(),
		'RecipientToNotifications',
	);

	dismissedNotifications$ = new AsyncComputed(() => {
		const deletedLinks = this.deletedNotificationsLinks$.get();
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
