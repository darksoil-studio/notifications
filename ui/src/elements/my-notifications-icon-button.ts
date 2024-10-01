import { sharedStyles, wrapPathInSvg } from '@holochain-open-dev/elements';
import '@holochain-open-dev/elements/dist/elements/display-error.js';
import '@holochain-open-dev/profiles/dist/elements/agent-avatar.js';
import { SignalWatcher, joinAsync } from '@holochain-open-dev/signals';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';
import { mdiBell } from '@mdi/js';
import '@shoelace-style/shoelace/dist/components/badge/badge.js';
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/skeleton/skeleton.js';
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { notificationsStoreContext } from '../context.js';
import { NotificationsStore } from '../notifications-store.js';
import './my-notifications-list.js';

/**
 * @element my-notifications-icon-button
 */
@localized()
@customElement('my-notifications-icon-button')
export class MyNotificationsIconButton extends SignalWatcher(LitElement) {
	/**
	 * @internal
	 */
	@consume({ context: notificationsStoreContext, subscribe: true })
	notificationsStore!: NotificationsStore;

	render() {
		const result = joinAsync([
			this.notificationsStore.unreadNotifications.get(),
			this.notificationsStore.readNotifications.get(),
		]);

		switch (result.status) {
			case 'pending':
				return html`
					<sl-skeleton
						style="height: 32px; width: 32px; --border-radius: 8px"
						effect="pulse"
					></sl-skeleton>
				`;
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
						placement="bottom-end"
						distance="8"
						hoist
						@sl-hide=${() =>
							this.notificationsStore.client.markNotificationsAsRead(
								Array.from(unreadNotifications.keys()),
							)}
					>
						<div slot="trigger" style="position: relative;">
							<sl-icon-button
								part="icon-button"
								slot="anchor"
								style="font-size: 1.5rem"
								.src=${wrapPathInSvg(mdiBell)}
							>
							</sl-icon-button>
							${unreadNotifications.size + readNotifications.size > 0
								? html`
										<sl-badge
											style="position: absolute; left: 16px; top: 0px; z-index: 1000"
											pill
											.variant=${unreadNotifications.size > 0
												? 'primary'
												: 'neutral'}
											.pulse=${unreadNotifications.size > 0}
											>${unreadNotifications.size +
											readNotifications.size}</sl-badge
										>
									`
								: html``}
						</div>
						<sl-card style="--padding: 0; width: 500px;">
							<my-notifications-list style="flex: 1"></my-notifications-list>
						</sl-card>
					</sl-dropdown>
				`;
		}
	}

	static styles = [sharedStyles];
}
