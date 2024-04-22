import { LitElement, html } from 'lit';
import { state, property, customElement } from 'lit/decorators.js';
import { EntryHash, Record, ActionHash } from '@holochain/client';
import { EntryRecord } from '@holochain-open-dev/utils';
import { subscribe } from '@holochain-open-dev/stores';
import { renderAsyncStatus, hashProperty, sharedStyles } from '@holochain-open-dev/elements';
import { consume } from '@lit/context';

import { localized, msg } from '@lit/localize';


import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@holochain-open-dev/elements/dist/elements/display-error.js';
import { NotificationsStore } from '../notifications-store.js';
import { notificationsStoreContext } from '../context.js';
import { Notification } from '../types.js';

/**
 * @element notification-summary
 * @fires notification-selected: detail will contain { notificationHash }
 */
@localized()
@customElement('notification-summary')
export class NotificationSummary extends LitElement {

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

  renderSummary(entryRecord: EntryRecord<Notification>) {
    return html`
      <div class="column" style="gap: 16px;">

      </div>
    `;
  }
  
  renderNotification() {
    return html`${subscribe(this.notificationsStore.notifications.get(this.notificationHash).entry,
      renderAsyncStatus({
        complete: notification => this.renderSummary(notification),
        pending: () => html`<div
          style="display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1;"
        >
          <sl-spinner style="font-size: 2rem;"></sl-spinner>
        </div>`,
        error: e => html`<display-error
          .headline=${msg("Error fetching the notification")}
          .error=${e}
        ></display-error>`
      })
    )}`;
  }
  
  render() {
    return html`<sl-card style="flex: 1; cursor: grab;" @click=${() => this.dispatchEvent(new CustomEvent('notification-selected', {
          composed: true,
          bubbles: true,
          detail: {
            notificationHash: this.notificationHash
          }
        }))}>
        ${this.renderNotification()}
    </sl-card>`;
  }

  
  static styles = [sharedStyles];
}
