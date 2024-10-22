import { sharedStyles, wrapPathInSvg } from '@holochain-open-dev/elements';
import {
	ProfilesStore,
	profilesStoreContext,
} from '@holochain-open-dev/profiles';
import {
	AsyncResult,
	SignalWatcher,
	joinAsync,
	joinAsyncMap,
} from '@holochain-open-dev/signals';
import { EntryRecord, mapValues } from '@holochain-open-dev/utils';
import {
	ActionHash,
	Delete,
	EntryHash,
	EntryHashB64,
	SignedActionHashed,
	decodeHashFromBase64,
} from '@holochain/client';
import { consume } from '@lit/context';
import { msg } from '@lit/localize';
import {
	mdiClose,
	mdiInformationOutline,
	mdiNotificationClearAll,
} from '@mdi/js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/divider/divider.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/relative-time/relative-time.js';
import '@shoelace-style/shoelace/dist/components/skeleton/skeleton.js';
import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import { notificationsStoreContext } from '../context.js';
import { NotificationsStore } from '../notifications-store.js';
import { NotificationContents } from '../types.js';

interface NotificationGroup {
	group: string;
	timestamp: number;
	title: string;
	notifications: Array<[EntryHashB64, NotificationContents]>;
}

/**
 * @element my-notifications-list
 */
@customElement('my-notifications-list')
export class MyNotifications extends SignalWatcher(LitElement) {
	/**
	 * @internal
	 */
	@consume({ context: notificationsStoreContext, subscribe: true })
	notificationsStore!: NotificationsStore;
	/**
	 * @internal
	 */
	@consume({ context: profilesStoreContext, subscribe: true })
	profilesStore!: ProfilesStore;

	renderNotificationGroup(
		read: boolean,
		notificationGroup: NotificationGroup,
		last: boolean,
	) {
		const singleNotification =
			Object.keys(notificationGroup.notifications).length === 1;
		return html`<div
				class="row"
				style=${styleMap({
					'background-color': read
						? 'var(--sl-color-neutral-100)'
						: 'var(--sl-color-neutral-0)',
					padding: '8px',
					cursor: 'pointer',
					gap: '8px',
					'align-items': 'center',
				})}
				@click=${() => {
					const lastNotification =
						notificationGroup.notifications[
							notificationGroup.notifications.length - 1
						];
					window.location.href =
						lastNotification[1].url_path_to_navigate_to_on_click;
				}}
			>
				${singleNotification
					? html`<sl-icon
							style="font-size: 1.3rem; padding: 0 8px;"
							src="${notificationGroup.notifications[0][1].icon_src}"
						></sl-icon>`
					: html``}
				<div
					class="column"
					style=${styleMap({
						flex: '1',
						gap: singleNotification ? '0' : '8px',
					})}
				>
					${notificationGroup.notifications.map(
						n => html`
							<div class="row" style="gap: 8px; align-items: center">
								${!singleNotification
									? html`<sl-icon src="${n[1].icon_src}"></sl-icon>`
									: html``}
								<span>${n[1].body}</span>
							</div>
						`,
					)}
					<span class="placeholder">${notificationGroup.title}</span>
				</div>

				<div
					class="column"
					style="align-items: end; flex: 1; align-self: stretch"
				>
					<div style="flex: 1;">
						<sl-icon-button
							.src=${wrapPathInSvg(mdiClose)}
							id="dismiss-single-notification"
							@click=${(e: Event) => {
								this.notificationsStore.client.dismissNotifications(
									notificationGroup.notifications.map(([hash, _]) =>
										decodeHashFromBase64(hash),
									),
								);
								e.stopPropagation();
							}}
						></sl-icon-button>
					</div>
					<sl-relative-time
						style="color: grey; text-align: right"
						.date=${new Date(notificationGroup.timestamp / 1000)}
					></sl-relative-time>
				</div>
			</div>

			${!last
				? html`<sl-divider style="--spacing: 0"></sl-divider>`
				: html``} `;
	}

	getNotificationsGroups() {
		const unreadNotifications =
			this.notificationsStore.unreadNotifications.get();
		const readNotifications = this.notificationsStore.readNotifications.get();
		if (unreadNotifications.status !== 'completed') return unreadNotifications;
		if (readNotifications.status !== 'completed') return readNotifications;

		const notificationsContents: Record<EntryHashB64, NotificationContents> =
			{};

		for (const [notificationHash, notification] of Object.entries(
			unreadNotifications.value,
		)) {
			const contents = this.notificationsStore
				.notificationContents(
					decodeHashFromBase64(notificationHash),
					notification,
				)
				.get();

			if (contents.status !== 'completed') return contents;

			notificationsContents[notificationHash] = contents.value;
		}

		for (const [notificationHash, notification] of Object.entries(
			readNotifications.value,
		)) {
			const contents = this.notificationsStore
				.notificationContents(
					decodeHashFromBase64(notificationHash),
					notification,
				)
				.get();

			if (contents.status !== 'completed') return contents;

			notificationsContents[notificationHash] = contents.value;
		}

		const notifications: Record<
			string,
			Record<
				string,
				Record<
					EntryHashB64,
					{
						read: boolean;
						timestamp: number;
						contents: NotificationContents;
					}
				>
			>
		> = {};

		for (const [hash, notification] of Object.entries(
			unreadNotifications.value,
		)) {
			const contents = notificationsContents[hash];
			if (!notifications[notification.notification_type]) {
				notifications[notification.notification_type] = {};
			}
			if (
				!notifications[notification.notification_type][
					notification.notification_group
				]
			) {
				notifications[notification.notification_type][
					notification.notification_group
				] = {};
			}

			notifications[notification.notification_type][
				notification.notification_group
			][hash] = {
				read: false,
				timestamp: notification.timestamp,
				contents,
			};
		}

		for (const [hash, notification] of Object.entries(
			readNotifications.value,
		)) {
			const contents = notificationsContents[hash];
			if (!notifications[notification.notification_type]) {
				notifications[notification.notification_type] = {};
			}
			if (
				!notifications[notification.notification_type][
					notification.notification_group
				]
			) {
				notifications[notification.notification_type][
					notification.notification_group
				] = {};
			}

			notifications[notification.notification_type][
				notification.notification_group
			][hash] = {
				read: true,
				timestamp: notification.timestamp,
				contents,
			};
		}

		const unreadGroups: Array<NotificationGroup> = [];
		const readGroups: Array<NotificationGroup> = [];

		for (const [notificationType, groups] of Object.entries(notifications)) {
			for (const [group, notifications] of Object.entries(groups)) {
				const unread = Object.values(notifications).some(n => !n.read);
				const timestamps = Object.values(notifications).map(n => n.timestamp);
				timestamps.sort((t1, t2) => t2 - t1);
				const notificationsGroup: NotificationGroup = {
					group,
					notifications: Object.entries(notifications)
						.sort((t1, t2) => t2[1].timestamp - t1[1].timestamp)
						.map(
							([hash, n]) =>
								[hash, n.contents] as [string, NotificationContents],
						),
					title: Object.values(notifications)[0].contents.title,
					timestamp: timestamps[0],
				};
				if (unread) unreadGroups.push(notificationsGroup);
				if (!unread) readGroups.push(notificationsGroup);
			}
		}
		unreadGroups.sort((a, b) => b.timestamp - a.timestamp);
		readGroups.sort((a, b) => b.timestamp - a.timestamp);

		return {
			status: 'completed' as const,
			value: {
				unreadGroups,
				readGroups,
			},
		};
	}

	notificationCount() {
		const result = joinAsync([
			this.notificationsStore.unreadNotifications.get(),
			this.notificationsStore.readNotifications.get(),
		]);
		if (result.status !== 'completed') return 3;

		return (
			Object.keys(result.value[0]).length + Object.keys(result.value[1]).length
		);
	}

	render() {
		const result = this.getNotificationsGroups();

		const count = this.notificationCount();

		switch (result.status) {
			case 'pending':
				return html`<div
					style="display: flex; flex-direction: column; justify-content: center; flex: 1; margin: 16px "
				>
					${Array.from({ length: count }).map(
						(_, i) => html`
							<div class="row" style="gap: 12px">
								<sl-skeleton
									effect="pulse"
									style="height: 16px; width: 16px;"
								></sl-skeleton>
								<sl-skeleton
									effect="pulse"
									style="height: 16px; min-width: 250px;"
								></sl-skeleton>
								<sl-skeleton
									effect="pulse"
									style="height: 16px; width: 32px;"
								></sl-skeleton>
							</div>
							${i < count - 1 ? html`<sl-divider></sl-divider>` : html``}
						`,
					)}
				</div>`;
			case 'error':
				return html`<display-error
					.headline=${msg('Error fetching the notifications')}
					.error=${result.error}
				></display-error>`;
			case 'completed':
				const { unreadGroups, readGroups } = result.value;

				const notificationsCount = unreadGroups.length + readGroups.length;

				return notificationsCount > 0
					? html`
							<div class="column" style="flex: 1">
								<div class="column">
									<div class="row" style="justify-content: end">
										<sl-button
											variant="text"
											@click=${() =>
												this.notificationsStore.client.dismissNotifications([
													...Array.from([] as ActionHash[]).concat(
														...unreadGroups.map(group =>
															group.notifications.map(([hash, _]) =>
																decodeHashFromBase64(hash),
															),
														),
													),
													...Array.from([] as ActionHash[]).concat(
														...readGroups.map(group =>
															group.notifications.map(([hash, _]) =>
																decodeHashFromBase64(hash),
															),
														),
													),
												])}
											size="small"
										>
											<sl-icon
												slot="prefix"
												.src=${wrapPathInSvg(mdiNotificationClearAll)}
											></sl-icon>
											${msg('Dismiss')}</sl-button
										>
									</div>

									<sl-divider style="--spacing: 0"></sl-divider>
									<div class="column">
										${unreadGroups.map((n, i) =>
											this.renderNotificationGroup(
												false,
												n,
												i === unreadGroups.length - 1,
											),
										)}
										${unreadGroups.length > 0 && readGroups.length > 0
											? html`<sl-divider style="--spacing: 0"></sl-divider>`
											: html``}
										${readGroups.map((n, i) =>
											this.renderNotificationGroup(
												true,
												n,
												i === readGroups.length - 1,
											),
										)}
									</div>
								</div>
							</div>
						`
					: html`
							<div class="column center-content" style="padding: 20px; flex: 1">
								<sl-icon
									.src=${wrapPathInSvg(mdiInformationOutline)}
									style="color: grey; height: 64px; width: 48px;"
								></sl-icon>
								<span class="placeholder"
									>${msg("You don't have any notifications")}</span
								>
							</div>
						`;
		}
	}

	static styles = [
		sharedStyles,
		css`
			sl-icon-button::part(base) {
				padding: 0 !important;
			}
		`,
	];
}
