
import { LitElement, html } from 'lit';
import { state, customElement, property } from 'lit/decorators.js';
import { Record, EntryHash, ActionHash, AgentPubKey } from '@holochain/client';
import { pipe, subscribe } from '@holochain-open-dev/stores';
import { EntryRecord, slice} from '@holochain-open-dev/utils';
import { renderAsyncStatus, hashProperty, sharedStyles, wrapPathInSvg } from '@holochain-open-dev/elements';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';
import { mdiInformationOutline } from '@mdi/js';

import '@holochain-open-dev/elements/dist/elements/display-error.js';
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';

import '@holochain-open-dev/profiles/dist/elements/agent-avatar.js';

import { NotificationsStore } from '../notifications-store.js';
import { notificationsStoreContext } from '../context.js';
import { Notification } from '../types.js';


/**
 * @element notifications-for-recipient
 */
@localized()
@customElement('notifications-for-recipient')
export class NotificationsForRecipient extends LitElement {

  /**
   * REQUIRED. The Recipient for which the Notifications should be fetched
   */
  @property(hashProperty('recipient'))
  recipient!: AgentPubKey;

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
        <span class="placeholder">${msg("No notifications found for this recipient")}</span>
      </div>`;

    return html`
      <div style="display: flex; flex-direction: column">
        ${hashes.map(hash =>
          html`<notification-summary .notificationHash=${hash}></notification-summary>`
        )}
      </div>
    `;
  }

  render() {
    return html`${subscribe(this.notificationsStore.notificationsForRecipient.get(this.recipient).live,
      renderAsyncStatus({
        complete: map => this.renderList(Array.from(map.keys())),
        pending: () => html`<div
          style="display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1;"
        >
          <sl-spinner style="font-size: 2rem;"></sl-spinner>
        </div>`,
        error: e => html`<display-error
          .headline=${msg("Error fetching the notifications")}
          .error=${e}
        ></display-error>`
      })
    )}`;
  }
  
  static styles = [sharedStyles];
}
