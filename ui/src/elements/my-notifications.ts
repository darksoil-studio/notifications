import {
	renderAsyncStatus,
	sharedStyles,
	wrapPathInSvg,
} from '@holochain-open-dev/elements';
import '@holochain-open-dev/elements/dist/elements/display-error.js';
import '@holochain-open-dev/profiles/dist/elements/agent-avatar.js';
import { pipe, subscribe } from '@holochain-open-dev/stores';
import { EntryRecord, slice } from '@holochain-open-dev/utils';
import { ActionHash, AgentPubKey, EntryHash, Record } from '@holochain/client';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';
import { mdiBell, mdiInformationOutline } from '@mdi/js';
import '@shoelace-style/shoelace/dist/components/badge/badge.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/skeleton/skeleton.js';
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Signal } from 'signal-polyfill';

import { notificationsStoreContext } from '../context.js';
import { SignalWatcher, watch } from '../lit-signals.js';
import { NotificationsStore } from '../notifications-store.js';
import { effect } from '../signals.js';
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

	renderList(hashes: Array<ActionHash>) {
		if (hashes.length === 0)
			return html` <div class="column center-content" style="gap: 16px;">
				<sl-icon
					style="color: grey; height: 64px; width: 64px;"
					.src=${wrapPathInSvg(mdiInformationOutline)}
				></sl-icon>
				<span class="placeholder"
					>${msg('No notifications found for this recipient')}</span
				>
			</div>`;

		return html`
			<div style="display: flex; flex-direction: column">
				${hashes.map(
					hash =>
						html`<notification-summary
							.notificationHash=${hash}
						></notification-summary>`,
				)}
			</div>
		`;
	}

	// firstUpdated() {
	// 	effect(() => {
	// 		const unreadNotifications =
	// 			this.notificationsStore.unreadNotifications.get();
	// 		this.requestUpdate();
	// 	});
	// }

	renderBadge() {
		const unreadNotifications =
			this.notificationsStore.unreadNotifications.get();

		switch (unreadNotifications.status) {
			case 'pending':
				return html`<div
					style="display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1;"
				>
					<sl-skeleton></sl-skeleton>
				</div>`;
			case 'error':
				return html`<display-error
					.headline=${msg('Error fetching the notifications')}
					.error=${unreadNotifications.error}
				></display-error>`;
			case 'completed':
				return html`<sl-badge>${unreadNotifications.value.size}</sl-badge>`;
		}
	}

	render() {
		return html`
			<sl-icon-button .src=${wrapPathInSvg(mdiBell)}>
				${this.renderBadge()}</sl-icon-button
			>
		`;
	}

	static styles = [sharedStyles];
}
const s = new Signal.State(0);
