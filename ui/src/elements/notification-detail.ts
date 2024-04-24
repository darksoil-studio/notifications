import {
	hashProperty,
	notifyError,
	renderAsyncStatus,
	sharedStyles,
	wrapPathInSvg,
} from '@holochain-open-dev/elements';
import '@holochain-open-dev/elements/dist/elements/display-error.js';
import { subscribe } from '@holochain-open-dev/stores';
import { EntryRecord } from '@holochain-open-dev/utils';
import { ActionHash, EntryHash, Record } from '@holochain/client';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';
import { mdiAlertCircleOutline, mdiDelete, mdiPencil } from '@mdi/js';
import '@shoelace-style/shoelace/dist/components/alert/alert.js';
import SlAlert from '@shoelace-style/shoelace/dist/components/alert/alert.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { notificationsStoreContext } from '../context.js';
import { NotificationsStore } from '../notifications-store.js';
import { Notification } from '../types.js';

/**
 * @element notification-detail
 * @fires notification-deleted: detail will contain { notificationHash }
 */
@localized()
@customElement('notification-detail')
export class NotificationDetail extends LitElement {
	/**
	 * REQUIRED. The hash of the Notification to show
	 */
	@property(hashProperty('notification-hash'))
	notificationHash!: ActionHash;

	/**
	 * @internal
	 */
	@consume({ context: notificationsStoreContext, subscribe: true })
	notificationsStore!: NotificationsStore;

	async deleteNotification() {
		try {
			await this.notificationsStore.client.deleteNotification(
				this.notificationHash,
			);

			this.dispatchEvent(
				new CustomEvent('notification-deleted', {
					bubbles: true,
					composed: true,
					detail: {
						notificationHash: this.notificationHash,
					},
				}),
			);
		} catch (e: unknown) {
			console.error(e);
			notifyError(msg('Error deleting the notification'));
		}
	}

	renderDetail(entryRecord: EntryRecord<Notification>) {
		return html`
			<sl-card>
				<div slot="header" class="row" style="gap: 8px">
					<span style="font-size: 18px; flex: 1;">${msg('Notification')}</span>

					<sl-icon-button
						.src=${wrapPathInSvg(mdiDelete)}
						@click=${() => this.deleteNotification()}
					></sl-icon-button>
				</div>

				<div class="column" style="gap: 16px;"></div>
			</sl-card>
		`;
	}

	render() {
		return html`${subscribe(
			this.notificationsStore.notifications.get(this.notificationHash).entry,
			renderAsyncStatus({
				complete: notification => {
					return this.renderDetail(notification);
				},
				pending: () =>
					html`<div
						style="display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1;"
					>
						<sl-spinner style="font-size: 2rem;"></sl-spinner>
					</div>`,
				error: e =>
					html`<display-error
						.headline=${msg('Error fetching the notification')}
						.error=${e}
					></display-error>`,
			}),
		)}`;
	}

	static styles = [sharedStyles];
}
