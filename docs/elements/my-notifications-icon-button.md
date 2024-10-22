# `<my-notifications-icon-button>`

## Usage

0. If you haven't already, [go through the setup for the module](/setup).

1. Import the `<my-notifications-icon-button>` element somewhere in the javascript side of your web-app like this:

```js
import '@holochain-open-dev/notifications/dist/elements/my-notifications-icon-button.js'
```

2. Use it in the html side of your web-app like this:


::: code-group
```html [Lit]
<my-notifications-icon-button>
</my-notifications-icon-button>
```

```html [React]
<my-notifications-icon-button>
</my-notifications-icon-button>
```

```html [Angular]
<my-notifications-icon-button>
</my-notifications-icon-button>
```

```html [Vue]
<my-notifications-icon-button>
</my-notifications-icon-button>
```

```html [Svelte]
<my-notifications-icon-button>
</my-notifications-icon-button>
```
:::

> [!WARNING]
> Like all the elements in this module, `<my-notifications-icon-button>` needs to be placed inside an initialized `<notifications-context>`.

## Demo

Here is an interactive demo of the element:

<element-demo>
</element-demo>

<script setup>
import { onMounted } from "vue";
import { ProfilesClient, ProfilesStore } from '@holochain-open-dev/profiles';
import { demoProfiles, ProfilesZomeMock } from '@holochain-open-dev/profiles/dist/mocks.js';
import { wrapPathInSvg } from '@holochain-open-dev/elements/dist/icon.js'
import { mdiBell } from '@mdi/js';
import { decode } from '@msgpack/msgpack';
import { decodeHashFromBase64 } from '@holochain/client';
import { render, html } from "lit";
import { Signal, toPromise } from '@holochain-open-dev/signals';

import { NotificationsZomeMock } from "../../ui/src/mocks.ts";
import { NotificationsStore } from "../../ui/src/notifications-store.ts";
import { NotificationsClient } from "../../ui/src/notifications-client.ts";

onMounted(async () => {
  // Elements need to be imported on the client side, not the SSR side
  // Reference: https://vitepress.dev/guide/ssr-compat#importing-in-mounted-hook
  await import('@api-viewer/docs/lib/api-docs.js');
  await import('@api-viewer/demo/lib/api-demo.js');
  await import('@holochain-open-dev/profiles/dist/elements/profiles-context.js');
  if (!customElements.get('notifications-context')) await import('../../ui/src/elements/notifications-context.ts');
  if (!customElements.get('my-notifications-icon-button')) await import('../../ui/src/elements/my-notifications-icon-button.ts');

  const profiles = await demoProfiles();

  const profilesMock = new ProfilesZomeMock(
    profiles,
    Array.from(profiles.keys())[0]
  );
  const profilesStore = new ProfilesStore(new ProfilesClient(profilesMock, "notifications_test"));

	const myProfile = await toPromise(profilesStore.myProfile);

  const mock = new NotificationsZomeMock();
  const client = new NotificationsClient(mock, "notifications_test");

  const record = await client.sendNotification(myProfile.profileHash, 'example', 'type1', 'group1', {
		Hello: 'world!'
	});

  const store = new NotificationsStore(client);
  
  render(html`
    <profiles-context .store=${profilesStore}>
      <notifications-context .store=${store}>
        <api-demo src="custom-elements.json" only="my-notifications-icon-button" exclude-knobs="store">
          <template data-element="my-notifications-icon-button" data-target="host">
            <my-notifications-icon-button style="height: 250px; width: 500px; display: flex">
            </my-notifications-icon-button>
          </template>
        </api-demo>
      </notifications-context>
    </profiles-context>
  `, document.querySelector('element-demo'))
  })


</script>

## API Reference

`<my-notifications-icon-button>` is a [custom element](https://web.dev/articles/custom-elements-v1), which means that it can be used in any web app or website. Here is the reference for its API:

<api-docs src="custom-elements.json" only="my-notifications-icon-button">
</api-docs>
