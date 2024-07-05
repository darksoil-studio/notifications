import { sharedStyles, wrapPathInSvg } from '@holochain-open-dev/elements';
import {
	AsyncResult,
	SignalWatcher,
	joinAsync,
	joinAsyncMap,
} from '@holochain-open-dev/signals';
import { EntryRecord, mapValues } from '@holochain-open-dev/utils';
import { ActionHash, Delete, SignedActionHashed } from '@holochain/client';
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
import { Notification, NotificationContents } from '../types.js';

interface NotificationGroup {
	group: string;
	timestamp: number;
	title: string;
	notifications: Array<NotificationInfo>;
}

interface NotificationInfo {
	record: EntryRecord<Notification>;
	deletes: Array<SignedActionHashed<Delete>>;
	title: string;
	contents: NotificationContents;
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

	renderNotificationGroup(
		read: boolean,
		persistent: boolean,
		notificationGroup: NotificationGroup,
		last: boolean,
	) {
		const singleNotification = notificationGroup.notifications.length === 1;
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
					this.notificationsStore.notificationsConfig.types[
						lastNotification.record.entry.notification_type
					].onClick(notificationGroup.group);
				}}
			>
				${singleNotification
					? html`<sl-icon
							style="font-size: 1.3rem; padding: 0 8px;"
							src="${notificationGroup.notifications[0].contents.iconSrc}"
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
									? html`<sl-icon src="${n.contents.iconSrc}"></sl-icon>`
									: html``}
								<span>${n.contents.body}</span>
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
						${persistent
							? html``
							: html`
									<sl-icon-button
										.src=${wrapPathInSvg(mdiClose)}
										id="dismiss-single-notification"
										@click=${(e: Event) => {
											this.notificationsStore.client.dismissNotifications(
												notificationGroup.notifications.map(
													n => n.record.actionHash,
												),
											);
											e.stopPropagation();
										}}
									></sl-icon-button>
								`}
					</div>
					<sl-relative-time
						style="color: grey; text-align: right"
						.date=${new Date(notificationGroup.timestamp)}
					></sl-relative-time>
				</div>
			</div>

			${!last
				? html`<sl-divider style="--spacing: 0"></sl-divider>`
				: html``} `;
	}

	notificationInfo(
		notificationHash: ActionHash,
	): AsyncResult<NotificationInfo> {
		const record = this.notificationsStore.notifications
			.get(notificationHash)
			.entry.get();
		const deletes = this.notificationsStore.notifications
			.get(notificationHash)
			.deletes.get();

		if (record.status !== 'completed') return record;
		if (deletes.status !== 'completed') return deletes;

		const contents = this.notificationsStore.notificationsConfig.types[
			record.value.entry.notification_type
		]
			.contents(record.value)
			.get();
		const title = this.notificationsStore.notificationsConfig.types[
			record.value.entry.notification_type
		]
			.title(record.value.entry.notification_group)
			.get();
		if (contents.status !== 'completed') return contents;
		if (title.status !== 'completed') return title;

		return {
			status: 'completed',
			value: {
				record: record.value,
				deletes: deletes.value,
				title: title.value,
				contents: contents.value,
			},
		};
	}

	getNotificationsGroups() {
		const unreadNotifications =
			this.notificationsStore.unreadNotifications.get();
		const readNotifications = this.notificationsStore.readNotifications.get();
		if (unreadNotifications.status !== 'completed') return unreadNotifications;
		if (readNotifications.status !== 'completed') return readNotifications;

		const unreadMapResult = joinAsyncMap(
			mapValues(unreadNotifications.value, (_n, key) =>
				this.notificationInfo(key),
			),
		);
		const readMapResult = joinAsyncMap(
			mapValues(readNotifications.value, (_n, key) =>
				this.notificationInfo(key),
			),
		);
		if (unreadMapResult.status !== 'completed') return unreadMapResult;
		if (readMapResult.status !== 'completed') return readMapResult;

		const notifications: Record<
			string,
			Record<
				string,
				Array<{
					read: boolean;
					notificationInfo: NotificationInfo;
				}>
			>
		> = {};

		for (const [hash, info] of Array.from(unreadMapResult.value.entries())) {
			if (!notifications[info.record.entry.notification_type]) {
				notifications[info.record.entry.notification_type] = {};
			}
			if (
				!notifications[info.record.entry.notification_type][
					info.record.entry.notification_group
				]
			) {
				notifications[info.record.entry.notification_type][
					info.record.entry.notification_group
				] = [];
			}

			notifications[info.record.entry.notification_type][
				info.record.entry.notification_group
			].push({
				read: false,
				notificationInfo: info,
			});
		}

		for (const [hash, info] of Array.from(readMapResult.value.entries())) {
			if (!notifications[info.record.entry.notification_type]) {
				notifications[info.record.entry.notification_type] = {};
			}
			if (
				!notifications[info.record.entry.notification_type][
					info.record.entry.notification_group
				]
			) {
				notifications[info.record.entry.notification_type][
					info.record.entry.notification_group
				] = [];
			}

			notifications[info.record.entry.notification_type][
				info.record.entry.notification_group
			].push({
				read: true,
				notificationInfo: info,
			});
		}

		const unreadPersistent: Array<NotificationGroup> = [];
		const readPersistent: Array<NotificationGroup> = [];
		const unreadNonPersistent: Array<NotificationGroup> = [];
		const readNonPersistent: Array<NotificationGroup> = [];

		for (const [notificationType, groups] of Object.entries(notifications)) {
			for (const [group, notifications] of Object.entries(groups)) {
				const persistent = notifications.some(
					n =>
						n.notificationInfo.record.entry.persistent &&
						n.notificationInfo.deletes.length === 0,
				);
				const unread = notifications.some(n => !n.read);
				const timestamps = notifications.map(
					n => n.notificationInfo.record.action.timestamp,
				);
				timestamps.sort((t1, t2) => t2 - t1);
				const notificationsGroup: NotificationGroup = {
					group,
					notifications: notifications.map(n => n.notificationInfo),
					title: notifications[0].notificationInfo.title,
					timestamp: timestamps[0],
				};
				if (persistent && unread) unreadPersistent.push(notificationsGroup);
				if (persistent && !unread) readPersistent.push(notificationsGroup);
				if (!persistent && unread) unreadNonPersistent.push(notificationsGroup);
				if (!persistent && !unread) readNonPersistent.push(notificationsGroup);
			}
		}
		unreadPersistent.sort((a, b) => b.timestamp - a.timestamp);
		unreadNonPersistent.sort((a, b) => b.timestamp - a.timestamp);
		readPersistent.sort((a, b) => b.timestamp - a.timestamp);
		readNonPersistent.sort((a, b) => b.timestamp - a.timestamp);

		return {
			status: 'completed' as const,
			value: {
				unreadPersistent,
				readPersistent,
				unreadNonPersistent,
				readNonPersistent,
			},
		};
	}

	notificationCount() {
		const result = joinAsync([
			this.notificationsStore.unreadNotifications.get(),
			this.notificationsStore.readNotifications.get(),
		]);
		if (result.status !== 'completed') return 3;

		return result.value[0].size + result.value[1].size;
	}

	render() {
		const result = this.getNotificationsGroups();

		let count = this.notificationCount();

		switch (result.status) {
			case 'pending':
				return html`<div
					style="display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; margin: 16px "
				>
					${Array.from({ length: count }).map(
						(_, i) => html`
							<sl-skeleton
								effect="pulse"
								style="height: 24px; width: 300px;"
							></sl-skeleton>
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
				const {
					unreadPersistent,
					readPersistent,
					unreadNonPersistent,
					readNonPersistent,
				} = result.value;

				const nonPersistentNotificationsCount =
					unreadNonPersistent.length + readNonPersistent.length;
				const persistentNotificationsCount =
					unreadPersistent.length + readPersistent.length;

				return nonPersistentNotificationsCount > 0 ||
					persistentNotificationsCount > 0
					? html`
							<div class="column" style="flex: 1">
								<div class="column">
									${unreadPersistent.map((n, i) =>
										this.renderNotificationGroup(
											false,
											true,
											n,
											i === unreadPersistent.length - 1,
										),
									)}
									${unreadPersistent.length > 0 && readPersistent.length > 0
										? html`<sl-divider style="--spacing: 0"></sl-divider>`
										: html``}
									${readPersistent.map((n, i) =>
										this.renderNotificationGroup(
											true,
											true,
											n,
											i === readPersistent.length - 1,
										),
									)}
								</div>
								<div class="column">
									${nonPersistentNotificationsCount > 0
										? html`
												${persistentNotificationsCount > 0
													? html`
															<sl-divider style="--spacing: 0"></sl-divider>
														`
													: html``}
												<div class="row" style="justify-content: end">
													<sl-button
														variant="text"
														@click=${() =>
															this.notificationsStore.client.dismissNotifications(
																[
																	...Array.from([] as ActionHash[]).concat(
																		...unreadNonPersistent.map(group =>
																			group.notifications.map(
																				n => n.record.actionHash,
																			),
																		),
																	),
																	...Array.from([] as ActionHash[]).concat(
																		...readNonPersistent.map(group =>
																			group.notifications.map(
																				n => n.record.actionHash,
																			),
																		),
																	),
																],
															)}
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
													${unreadNonPersistent.map((n, i) =>
														this.renderNotificationGroup(
															false,
															false,
															n,
															i === unreadNonPersistent.length - 1,
														),
													)}
													${unreadNonPersistent.length > 0 &&
													readNonPersistent.length > 0
														? html`<sl-divider
																style="--spacing: 0"
															></sl-divider>`
														: html``}
													${readNonPersistent.map((n, i) =>
														this.renderNotificationGroup(
															true,
															false,
															n,
															i === readNonPersistent.length - 1,
														),
													)}
												</div>
											`
										: html``}
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
