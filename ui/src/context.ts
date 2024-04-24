import { createContext } from '@lit/context';

import { NotificationsStore } from './notifications-store.js';

export const notificationsStoreContext = createContext<NotificationsStore>(
	'notifications/store',
);
