# `<create-notification>`

## Usage

0. If you haven't already, [go through the setup for the module](/setup).

1. Import the `<create-notification>` element somewhere in the javascript side of your web-app like this:

```js
import '@holochain-open-dev/notifications/dist/elements/create-notification.js'
```

2. Use it in the html side of your web-app like this:


::: code-group
```html [Lit]
<create-notification 
  .notificationType=${ notificationType }
  .notificationGroup=${ notificationGroup }
  .persistent=${ persistent }
  .recipients=${[recipients]}
  .content=${ content }
>
</create-notification>
```

```html [React]
<create-notification
  notificationType={ notificationType }
  notificationGroup={ notificationGroup }
  persistent={ persistent }
  recipients={[recipients]}
  content={ content }
>
</create-notification>
```

```html [Angular]
<create-notification
  [notificationType]="notificationType"
  [notificationGroup]="notificationGroup"
  [persistent]="persistent"
  [recipients]="[recipients]"
  [content]="content"
>
</create-notification>
```

```html [Vue]
<create-notification
  :notificationType="notificationType"
  :notificationGroup="notificationGroup"
  :persistent="persistent"
  :recipients="[recipients]"
  :content="content"
>
</create-notification>
```

```html [Svelte]
<create-notification
  notification-type={encodeHashToBase64(notificationType)}
  notification-group={encodeHashToBase64(notificationGroup)}
  persistent={encodeHashToBase64(persistent)}
  recipients={[encodeHashToBase64(recipients)]}
  content={encodeHashToBase64(content)}
>
</create-notification>
```
:::

> [!WARNING]
> Like all the elements in this module, `<create-notification>` needs to be placed inside an initialized `<notifications-context>`.

## Demo

Here is an interactive demo of the element:

<element-demo>
</element-demo>

<script setup>
import { onMounted } from "vue";
import { ProfilesClient, ProfilesStore } from '@holochain-open-dev/profiles';
import { demoProfiles, ProfilesZomeMock } from '@holochain-open-dev/profiles/dist/mocks.js';
import { decodeHashFromBase64 } from '@holochain/client';
import { render, html } from "lit";

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
  if (!customElements.get('create-notification')) await import('../../ui/src/elements/create-notification.ts');

  const profiles = await demoProfiles();

  const profilesMock = new ProfilesZomeMock(
    profiles,
    Array.from(profiles.keys())[0]
  );
  const profilesStore = new ProfilesStore(new ProfilesClient(profilesMock, "notifications_test"));

  const mock = new NotificationsZomeMock();
  const client = new NotificationsClient(mock, "notifications_test");

  const notification = await sampleNotification(client);

  const record = await mock.create_notification(notification);

  const store = new NotificationsStore(client);
  
  render(html`
    <profiles-context .store=${profilesStore}>
      <notifications-context .store=${store}>
        <api-demo src="custom-elements.json" only="create-notification" exclude-knobs="store">
        </api-demo>
      </notifications-context>
    </profiles-context>
  `, document.querySelector('element-demo'))
  })


</script>

## API Reference

`<create-notification>` is a [custom element](https://web.dev/articles/custom-elements-v1), which means that it can be used in any web app or website. Here is the reference for its API:

<api-docs src="custom-elements.json" only="create-notification">
</api-docs>
