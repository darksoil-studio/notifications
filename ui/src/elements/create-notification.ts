import {
	hashProperty,
	hashState,
	notifyError,
	onSubmit,
	sharedStyles,
	wrapPathInSvg,
} from '@holochain-open-dev/elements';
import '@holochain-open-dev/elements/dist/elements/display-error.js';
import { EntryRecord } from '@holochain-open-dev/utils';
import {
	ActionHash,
	AgentPubKey,
	DnaHash,
	EntryHash,
	Record,
} from '@holochain/client';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';
import { mdiAlertCircleOutline, mdiDelete } from '@mdi/js';
import SlAlert from '@shoelace-style/shoelace/dist/components/alert/alert.js';
import '@shoelace-style/shoelace/dist/components/alert/alert.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import { notificationsStoreContext } from '../context.js';
import { NotificationsStore } from '../notifications-store.js';
import { Notification } from '../types.js';

/**
 * @element create-notification
 * @fires notification-created: detail will contain { notificationHash }
 */
@localized()
@customElement('create-notification')
export class CreateNotification extends LitElement {
	/**
	 * REQUIRED. The notification type for this Notification
	 */
	@property()
	notificationType!: string;

	/**
	 * OPTIONAl. The notification group for this Notification
	 */
	@property()
	notificationGroup: string | undefined;

	/**
	 * REQUIRED. The persistent for this Notification
	 */
	@property()
	persistent!: boolean;

	/**
	 * REQUIRED. The recipients for this Notification
	 */
	@property()
	recipients!: Array<AgentPubKey>;

	/**
	 * REQUIRED. The content for this Notification
	 */
	@property()
	content!: string;

	/**
	 * @internal
	 */
	@consume({ context: notificationsStoreContext, subscribe: true })
	notificationsStore!: NotificationsStore;

	/**
	 * @internal
	 */
	@state()
	committing = false;

	/**
	 * @internal
	 */
	@query('#create-form')
	form!: HTMLFormElement;

	async createNotification(fields: Partial<Notification>) {
		if (this.notificationType === undefined)
			throw new Error(
				'Cannot create a new Notification without its notification_type field',
			);
		if (this.persistent === undefined)
			throw new Error(
				'Cannot create a new Notification without its persistent field',
			);
		if (this.recipients === undefined)
			throw new Error(
				'Cannot create a new Notification without its recipients field',
			);
		if (this.content === undefined)
			throw new Error(
				'Cannot create a new Notification without its content field',
			);

		const notification: Notification = {
			notification_type: this.notificationType!,
			notification_group: this.notificationGroup!,
			persistent: this.persistent!,
			recipients: this.recipients!,
			content: this.content!,
		};

		try {
			this.committing = true;
			const record: EntryRecord<Notification> =
				await this.notificationsStore.client.createNotification(notification);

			this.dispatchEvent(
				new CustomEvent('notification-created', {
					composed: true,
					bubbles: true,
					detail: {
						notificationHash: record.actionHash,
					},
				}),
			);

			this.form.reset();
		} catch (e: unknown) {
			console.error(e);
			notifyError(msg('Error creating the notification'));
		}
		this.committing = false;
	}

	render() {
		return html` <sl-card style="flex: 1;">
			<span slot="header">${msg('Create Notification')}</span>

			<form
				id="create-form"
				class="column"
				style="flex: 1; gap: 16px;"
				${onSubmit(fields => this.createNotification(fields))}
			>
				<sl-button variant="primary" type="submit" .loading=${this.committing}
					>${msg('Create Notification')}</sl-button
				>
			</form>
		</sl-card>`;
	}

	static styles = [sharedStyles];
}
