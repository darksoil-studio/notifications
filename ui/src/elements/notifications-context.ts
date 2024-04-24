import { provide } from '@lit/context';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { notificationsStoreContext } from '../context.js';
import { NotificationsStore } from '../notifications-store.js';

@customElement('notifications-context')
export class NotificationsContext extends LitElement {
	@provide({ context: notificationsStoreContext })
	@property({ type: Object })
	store!: NotificationsStore;

	render() {
		return html`<slot></slot>`;
	}

	static styles = css`
		:host {
			display: contents;
		}
	`;
}
