# `<my-notifications-list>`

## Usage

0. If you haven't already, [go through the setup for the module](/setup).

1. Import the `<my-notifications-list>` element somewhere in the javascript side of your web-app like this:

```js
import '@holochain-open-dev/notifications/dist/elements/my-notifications-list.js'
```

2. Use it in the html side of your web-app like this:


::: code-group
```html [Lit]
<my-notifications-list>
</my-notifications-list>
```

```html [React]
<my-notifications-list>
</my-notifications-list>
```

```html [Angular]
<my-notifications-list>
</my-notifications-list>
```

```html [Vue]
<my-notifications-list>
</my-notifications-list>
```

```html [Svelte]
<my-notifications-list>
</my-notifications-list>
```
:::

> [!WARNING]
> Like all the elements in this module, `<my-notifications-list>` needs to be placed inside an initialized `<notifications-context>`.

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
import { wrapPathInSvg } from '@holochain-open-dev/elements/dist/icon.js'
import { mdiBell } from '@mdi/js';
import { decode } from '@msgpack/msgpack';
import { Signal } from '@holochain-open-dev/signals';

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
  if (!customElements.get('my-notifications-list')) await import('../../ui/src/elements/my-notifications-list.ts');

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

  const store = new NotificationsStore(client, {
		types: {
			type1: {
				name: 'Hello!',
				description: 'something',
				title(group) {
					return new Signal.State({
						status: 'completed',
						value: group,
					});
				},
				onClick: group => alert(`clicked notification of group: ${group}`),
				contents: n => {
					const i = decode(n.entry.content);
					return new Signal.State({
						status: 'completed',
						value: {
							iconSrc: wrapPathInSvg(mdiBell),
							body: i.body,
						},
					});
				},
			},
		},
  });
  
  render(html`
    <profiles-context .store=${profilesStore}>
      <notifications-context .store=${store}>
        <api-demo src="custom-elements.json" only="my-notifications-list" exclude-knobs="store">
        </api-demo>
      </notifications-context>
    </profiles-context>
  `, document.querySelector('element-demo'))
  })


</script>

## API Reference

`<my-notifications-list>` is a [custom element](https://web.dev/articles/custom-elements-v1), which means that it can be used in any web app or website. Here is the reference for its API:

<api-docs src="custom-elements.json" only="my-notifications-list">
</api-docs>
