# NotificationsStore

The `NotificationsStore` is a typescript class that contains `svelte` stores, to which you can subscribe to get reactive updates in your elements.

```js
import { NotificationsStore, NotificationsClient } from "@darksoil-studio/notifications";
const store = new NotificationsStore(new NotificationsClient(appAgentClient, 'my-role-name'));
```

> Learn how to setup the `AppClient` object [here](https://www.npmjs.com/package/@holochain/client).

Learn more about the stores and how to integrate them in different frameworks [here](https://holochain-open-dev.github.io/reusable-modules/frontend/using/#stores).
