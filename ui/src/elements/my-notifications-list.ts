import { sharedStyles, wrapPathInSvg } from '@holochain-open-dev/elements';
import {
	AsyncComputed,
	SignalWatcher,
	joinAsync,
	joinAsyncMap,
} from '@holochain-open-dev/signals';
import { EntryRecord, mapValues } from '@holochain-open-dev/utils';
import { Delete, SignedActionHashed } from '@holochain/client';
import { consume } from '@lit/context';
import { msg } from '@lit/localize';
import { mdiInformationOutline, mdiNotificationClearAll } from '@mdi/js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/divider/divider.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/relative-time/relative-time.js';
import '@shoelace-style/shoelace/dist/components/skeleton/skeleton.js';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import { notificationsStoreContext } from '../context.js';
import { NotificationsStore } from '../notifications-store.js';
import { Notification } from '../types.js';

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

	renderNotification(
		read: boolean,
		notification: EntryRecord<Notification>,
		last: boolean,
	) {
		const info =
			this.notificationsStore.notificationsTypes[
				notification.entry.notification_type
			](notification);
		return html`<div
				class="column"
				style=${styleMap({
					'background-color': read
						? 'var(--sl-color-neutral-100)'
						: 'var(--sl-color-neutral-0)',
					padding: '8px',
					cursor: 'pointer',
				})}
				@click=${() => info.onClick()}
			>
				<div class="row" style="gap: 8px">
					<span style="flex: 1">${info.title}</span>
					<sl-relative-time
						style="color: grey;"
						.date=${new Date(notification.action.timestamp)}
					></sl-relative-time>
				</div>
				<span class="placeholder">${info.body}</span>
			</div>

			${!last
				? html`<sl-divider style="--spacing: 0"></sl-divider>`
				: html``} `;
	}

	get notifications() {
		const unreadNotifications =
			this.notificationsStore.unreadNotifications$.get();
		const readNotifications = this.notificationsStore.readNotifications$.get();
		if (unreadNotifications.status !== 'completed') return unreadNotifications;
		if (readNotifications.status !== 'completed') return readNotifications;

		const unreadMapResult = joinAsyncMap(
			mapValues(unreadNotifications.value, n =>
				joinAsync([n.entry$, n.deletes$]),
			),
		);
		const readMapResult = joinAsyncMap(
			mapValues(readNotifications.value, n =>
				joinAsync([n.entry$, n.deletes$]),
			),
		);

		return joinAsync([unreadMapResult, readMapResult]).get();
	}

	render() {
		const result = this.notifications;

		switch (result.status) {
			case 'pending':
				return html`<div
					style="display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1;"
				>
					<sl-skeleton effect="pulse"></sl-skeleton>
					<sl-skeleton effect="pulse"></sl-skeleton>
					<sl-skeleton effect="pulse"></sl-skeleton>
				</div>`;
			case 'error':
				return html`<display-error
					.headline=${msg('Error fetching the notifications')}
					.error=${result.error}
				></display-error>`;
			case 'completed':
				const [unreadNotifications, readNotifications] = result.value;
				const compareTimeDescendant = (
					n1: EntryRecord<any>,
					n2: EntryRecord<any>,
				) => n2.action.timestamp - n1.action.timestamp;

				const isPersistent = ([notification, deletes]: [
					EntryRecord<Notification>,
					Array<SignedActionHashed<Delete>>,
				]) => notification.entry.persistent && deletes.length === 0;

				const unreadPersistent = Array.from(unreadNotifications.values())
					.filter(isPersistent)
					.map(([n]) => n)
					.sort(compareTimeDescendant);
				const readPersistent = Array.from(readNotifications.values())
					.filter(isPersistent)
					.map(([n]) => n)
					.sort(compareTimeDescendant);

				const unreadNonPersistent = Array.from(unreadNotifications.values())
					.filter(n => !isPersistent(n))
					.map(([n]) => n)
					.sort(compareTimeDescendant);

				const readNonPersistent = Array.from(readNotifications.values())
					.filter(n => !isPersistent(n))
					.map(([n]) => n)
					.sort(compareTimeDescendant);

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
										this.renderNotification(
											false,
											n,
											i === unreadPersistent.length - 1,
										),
									)}
									${unreadPersistent.length > 0 && readPersistent.length > 0
										? html`<sl-divider style="--spacing: 0"></sl-divider>`
										: html``}
									${readPersistent.map((n, i) =>
										this.renderNotification(
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
																	...unreadNonPersistent.map(n => n.actionHash),
																	...readNonPersistent.map(n => n.actionHash),
																],
															)}
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
														this.renderNotification(
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
														this.renderNotification(
															true,
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
									>${msg('You have no notifications')}</span
								>
							</div>
						`;
		}
	}

	static styles = [sharedStyles];
}
