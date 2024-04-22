
# `<notifications-for-recipient>`

## Usage

0. If you haven't already, [go through the setup for the module](/setup).

1. Import the `<notifications-for-recipient>` element somewhere in the javascript side of your web-app like this:

```js
import '@holochain-open-dev/notifications/dist/elements/notifications-for-recipient.js'
```

2. Use it in the html side of your web-app like this:

::: code-group
```html [Lit]
<notifications-for-recipient .recipient=${ recipient }>
</notifications-for-recipient>
```

```html [React]
<notifications-for-recipient recipient={ recipient }>
</notifications-for-recipient>
```

```html [Angular]
<notifications-for-recipient [recipient]="recipient">
</notifications-for-recipient>
```

```html [Vue]
<notifications-for-recipient :recipient="recipient">
</notifications-for-recipient>
```

```html [Svelte]
<notifications-for-recipient recipient={encodeHashToBase64(recipient)}>
</notifications-for-recipient>
```
:::

> [!WARNING]
> Like all the elements in this module, `<notifications-for-recipient>` needs to be placed inside an initialized `<notifications-context>`.

## Demo

Here is an interactive demo of the element:

<element-demo>
</element-demo>

<script setup>
import { onMounted } from "vue";
import { ProfilesClient, ProfilesStore } from '@holochain-open-dev/profiles';
import { demoProfiles, ProfilesZomeMock } from '@holochain-open-dev/profiles/dist/mocks.js';
import { decodeHashFromBase64, encodeHashToBase64 } from '@holochain/client';
import { render } from "lit";
import { html, unsafeStatic } from "lit/static-html.js";

import { NotificationsZomeMock, sampleNotification } from "../../ui/src/mocks.ts";
import { NotificationsStore } from "../../ui/src/notifications-store.ts";
import { NotificationsClient } from "../../ui/src/notifications-client.ts";

onMounted(async () => {
  // Elements need to be imported on the client side, not the SSR side
  // Reference: https://vitepress.dev/guide/ssr-compat#importing-in-mounted-hook
  await import('@api-viewer/docs/lib/api-docs.js');
  await import('@api-viewer/demo/lib/api-demo.js');
  await import('@holochain-open-dev/profiles/dist/elements/profiles-context.js');
  if (!customElements.get('notifications-context')) await import('../../ui/src/elements/notifications-context.ts');
  if (!customElements.get('notifications-for-recipient')) await import('../../ui/src/elements/notifications-for-recipient.ts');

  const profiles = await demoProfiles();
  const myPubKey = Array.from(profiles.keys())[0];

  const profilesMock = new ProfilesZomeMock(profiles, myPubKey);
  const profilesStore = new ProfilesStore(new ProfilesClient(profilesMock, "notifications_test"));

  const mock = new NotificationsZomeMock();
  const client = new NotificationsClient(mock, "notifications_test");

  const notification2 = await sampleNotification(client, {
    recipients: [myPubKey]
  });

  const record = await mock.create_notification(notification2);

  const store = new NotificationsStore(client);
  
  render(html`
    <profiles-context .store=${profilesStore}>
      <notifications-context .store=${store}>
        <api-demo src="custom-elements.json" only="notifications-for-recipient" exclude-knobs="store">
          <template data-element="notifications-for-recipient" data-target="host">
            <notifications-for-recipient recipient="${unsafeStatic(encodeHashToBase64(notification2.recipients[0]))}"></notifications-for-recipient>
          </template>
        </api-demo>
      </notifications-context>
    </profiles-context>
  `, document.querySelector('element-demo'))
  })

</script>

## API Reference

`<notifications-for-recipient>` is a [custom element](https://web.dev/articles/custom-elements-v1), which means that it can be used in any web app or website. Here is the reference for its API:

<api-docs src="custom-elements.json" only="notifications-for-recipient">
</api-docs>
