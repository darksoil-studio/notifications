# Setup

> [!WARNING]
> This guide assumes that you have scaffolded a hApp with the [holochain-open-dev template](https://github.com/holochain-open-dev/templates).

1. Run this to scaffold this zome in your hApp:

```bash
nix run github:darksoil-studio/notifications#scaffold
```

This will do the following:
  - Add the flake input for that repository in your `flake.nix`.
  - Add the appropriate zome packages to the `dna.nix` that you select.
  - Add the UI package for that zome in the local NPM package that you select.

Now you only need to integrate the zome's frontend in your web-app.

2. Connect to Holochain with the `AppClient`, and create the `NotificationsStore` with it:

```js
import { NotificationsStore, NotificationsClient } from "@holochain-open-dev/profiles";
import { AppWebsocket } from "@holochain/client";

async function setupNotificationsStore() {
  // TODO: change "MY_APP_NAME" for the roleId that you can find in your "happ.yaml"
  const client = await AppWebsocket.connect('<MY_APP_NAME>')

  // TODO: change "MY_CELL_ROLE" for the roleId that you can find in your "happ.yaml"
  return new NotificationsStore(new NotificationsClient(client, '<MY_CELL_ROLE>'));
}
```

3. Import the `<notifications-context>` element and add it to your html **wrapping the whole section of your page in which you are going to be placing** the other elements from `@holochain-open-dev/notifications`:

```js
// This can be placed in the index.js, at the top level of your web-app.
import "@darksoil-studio/notifications/elements/notifications-context.js";
```

And then add the `<notifications-context>` element in your html:

```html
<notifications-context>
  <!-- Add here other elements from @darksoil-studio/notifications -->
</notifications-context>
```

4. Attach the `notificationsStore` to the `<notifications-context>` element:

- Go to [this page](https://holochain-open-dev.github.io/reusable-modules/frontend/frameworks/), select the framework you are using, and follow its example.

You need to set the `store` property of it to your already instantiated `NotificationsStore` object:

- If you **are using some JS framework**:

::: code-group
```html [React]
<notifications-context store={ notificationsStore}><!-- ... --></notifications-context>
```

```html [Angular]
<notifications-context [store]="notificationsStore"><!-- ... --></notifications-context>
```

```html [Vue]
<notifications-context :store="notificationsStore"><!-- ... --></notifications-context>
```

```html [Svelte]
<notifications-context store={ notificationsStore}><!-- ... --></notifications-context>
```

```html [Lit]
<notifications-context .store=${ notificationsStore}><!-- ... --></notifications-context>
```
:::

OR

- If you **are not using any framework**:

```js
const contextElement = document.querySelector("notifications-context");
contextElement.store = store;
```

> You can read more about the context pattern [here](https://holochain-open-dev.github.io/reusable-modules/frontend/using/#context).

5. [Choose which elements you need](?path=/docs/frontend-elements) and import them like this:

```js
import "@darksoil-studio/notifications/dist/elements/notifications-context.js";
```

And then they are ready be used inside the `<notifications-context>` just like any other HTML tag.

This will define all the elements from this module in the global `CustomElementsRegistry`. You can read more about Custom Elements [here](https://developers.google.com/web/fundamentals/web-components/customelements).

6. Add your preferred shoelace theme in your `<head>` tag:

```html
  <head>
    <link rel="stylesheet" href="path/to/shoelace/dist/themes/light.css" />
  </head>
```

You can read more about how to initialize the shoelace theme [here](https://shoelace.style/getting-started/themes?id=activating-themes).

---

That's it! You have now integrated both the backend and the frontend for the profiles module.

# Example

You can see a full working example of the UI working in [here](https://github.com/darksoil-studio/notifications/blob/main/ui/demo/index.html).

