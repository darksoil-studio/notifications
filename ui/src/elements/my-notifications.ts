import { sharedStyles, wrapPathInSvg } from '@holochain-open-dev/elements';
import '@holochain-open-dev/elements/dist/elements/display-error.js';
import '@holochain-open-dev/profiles/dist/elements/agent-avatar.js';
import {
	AsyncSignal,
	SignalWatcher,
	joinAsync,
	joinAsyncMap,
} from '@holochain-open-dev/signals';
import { EntryRecord, mapValues } from '@holochain-open-dev/utils';
import { ActionHash, Delete, SignedActionHashed } from '@holochain/client';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';
import {
	mdiBell,
	mdiInformationOutline,
	mdiNotificationClearAll,
} from '@mdi/js';
import '@shoelace-style/shoelace/dist/components/badge/badge.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/divider/divider.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/relative-time/relative-time.js';
import '@shoelace-style/shoelace/dist/components/skeleton/skeleton.js';
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import { notificationsStoreContext } from '../context.js';
import { NotificationsStore } from '../notifications-store.js';
import { Notification } from '../types.js';

/**
 * @element my-notifications
 */
@localized()
@customElement('my-notifications')
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
					'background-color': read ? 'var(--sl-color-neutral-100)' : 'auto',
					padding: '8px',
				})}
				@click=${() => info.onClick()}
			>
				<div class="row">
					<span>${info.title}</span>
					<div style="flex: 1"></div>
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

	renderNotifications(
		unreadNotifications: ReadonlyMap<
			ActionHash,
			{
				entry$: AsyncSignal<EntryRecord<Notification>>;
				deletes$: AsyncSignal<SignedActionHashed<Delete>[]>;
			}
		>,
		readNotifications: ReadonlyMap<
			ActionHash,
			{
				entry$: AsyncSignal<EntryRecord<Notification>>;
				deletes$: AsyncSignal<SignedActionHashed<Delete>[]>;
			}
		>,
	) {
		const result = joinAsync([
			joinAsyncMap(mapValues(unreadNotifications, n => n.entry$)),
			joinAsyncMap(mapValues(readNotifications, n => n.entry$)),
		]).get();

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
				const compareTimeAscendant = (
					n1: EntryRecord<any>,
					n2: EntryRecord<any>,
				) => n2.action.timestamp - n1.action.timestamp;

				const unreadPersistent = Array.from(unreadNotifications.values())
					.filter(n => n.entry.persistent)
					.sort(compareTimeAscendant);
				const readPersistent = Array.from(readNotifications.values())
					.filter(n => n.entry.persistent)
					.sort(compareTimeAscendant);

				const unreadNonPersistent = Array.from(unreadNotifications.values())
					.filter(n => !n.entry.persistent)
					.sort(compareTimeAscendant);
				const readNonPersistent = Array.from(readNotifications.values())
					.filter(n => !n.entry.persistent)
					.sort(compareTimeAscendant);
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
												<sl-divider style="--spacing: 0"></sl-divider>
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

	render() {
		const result = joinAsync([
			this.notificationsStore.unreadNotifications$,
			this.notificationsStore.readNotifications$,
		]).get();

		switch (result.status) {
			case 'pending':
				return html`<div
					style="display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1;"
				>
					<sl-skeleton></sl-skeleton>
				</div>`;
			case 'error':
				return html`<display-error
					tooltip
					.headline=${msg('Error fetching the notifications')}
					.error=${result.error}
				></display-error>`;
			case 'completed':
				const [unreadNotifications, readNotifications] = result.value;
				return html`
					<sl-dropdown
						placement="bottom"
						distance="8"
						@sl-hide=${() =>
							this.notificationsStore.client.markNotificationsAsRead(
								Array.from(unreadNotifications.keys()),
							)}
					>
						<div slot="trigger" style="position: relative;">
							<sl-icon-button
								slot="anchor"
								style="font-size: 1.5rem"
								.src=${wrapPathInSvg(mdiBell)}
							>
							</sl-icon-button>
							${unreadNotifications.size + readNotifications.size > 0
								? html`
										<sl-badge
											style="position: absolute; left: 20px; bottom: -4px; z-index: 1000"
											pill
											.pulse=${unreadNotifications.size > 0}
											>${unreadNotifications.size +
											readNotifications.size}</sl-badge
										>
									`
								: html``}
						</div>
						<sl-card style="--padding: 0; width: 320px;">
							${this.renderNotifications(
								unreadNotifications,
								readNotifications,
							)}
						</sl-card>
					</sl-dropdown>
				`;
		}
	}

	static styles = [sharedStyles];
}
