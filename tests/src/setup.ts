import { ProfilesClient, ProfilesStore } from '@holochain-open-dev/profiles';
import { AppWebsocket } from '@holochain/client';
import { Scenario } from '@holochain/tryorama';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { NotificationsClient } from '../../ui/src/notifications-client.js';
import { NotificationsStore } from '../../ui/src/notifications-store.js';
import { NotificationsConfig } from '../../ui/src/types.js';

export async function setup(scenario: Scenario) {
	const testHappUrl =
		dirname(fileURLToPath(import.meta.url)) +
		'/../../workdir/notifications_test-debug.happ';

	// Add 2 players with the test hApp to the Scenario. The returned players
	// can be destructured.
	const [alice, bob, bob2] = await scenario.addPlayersWithApps([
		{ appBundleSource: { path: testHappUrl } },
		{ appBundleSource: { path: testHappUrl } },
		{ appBundleSource: { path: testHappUrl } },
	]);

	// Shortcut peer discovery through gossip and register all agents in every
	// conductor of the scenario.
	await scenario.shareAllAgents();
	await alice.conductor
		.adminWs()
		.authorizeSigningCredentials(alice.cells[0].cell_id);
	patchCallZome(alice.appWs as AppWebsocket);

	await bob.conductor
		.adminWs()
		.authorizeSigningCredentials(bob.cells[0].cell_id);
	patchCallZome(bob.appWs as AppWebsocket);

	await bob2.conductor
		.adminWs()
		.authorizeSigningCredentials(bob2.cells[0].cell_id);
	patchCallZome(bob2.appWs as AppWebsocket);

	// const config: NotificationsConfig = {
	// 	types: {},
	// };

	const aliceProfilesStore = new ProfilesStore(
		new ProfilesClient(alice.appWs as any, 'notifications_test', 'profiles'),
	);

	const aliceStore = new NotificationsStore(
		new NotificationsClient(
			alice.appWs as any,
			'notifications_test',
			'notifications',
		),
	);

	const bobProfilesStore = new ProfilesStore(
		new ProfilesClient(bob.appWs as any, 'notifications_test', 'profiles'),
	);

	const bobStore = new NotificationsStore(
		new NotificationsClient(
			bob.appWs as any,
			'notifications_test',
			'notifications',
		),
	);

	const bob2ProfilesStore = new ProfilesStore(
		new ProfilesClient(bob.appWs as any, 'notifications_test', 'profiles'),
	);

	const bob2Store = new NotificationsStore(
		new NotificationsClient(
			bob2.appWs as any,
			'notifications_test',
			'notifications',
		),
	);

	// Shortcut peer discovery through gossip and register all agents in every
	// conductor of the scenario.
	await scenario.shareAllAgents();

	// Prevent race condition when two zome calls are made instantly at the beginning of the lifecycle that cause a ChainHeadMoved error because they trigger 2 parallel init workflows
	await aliceStore.client.queryNotificationsWithStatus('Unread');
	await bobStore.client.queryNotificationsWithStatus('Unread');
	await bob2Store.client.queryNotificationsWithStatus('Unread');

	return {
		alice: {
			player: alice,
			store: aliceStore,
			profilesStore: aliceProfilesStore,
		},
		bob: {
			player: bob,
			store: bobStore,
			profilesStore: bobProfilesStore,
		},
		bob2: {
			player: bob2,
			store: bob2Store,
			profilesStore: bob2ProfilesStore,
			startUp: async () => {
				await bob2.conductor.startUp();
				const port = await bob2.conductor.attachAppInterface();
				const issued = await bob2.conductor
					.adminWs()
					.issueAppAuthenticationToken({
						installed_app_id: bob2.appId,
					});
				const appWs = await bob2.conductor.connectAppWs(issued.token, port);
				bob2Store.client = new NotificationsClient(appWs, 'notifications_test');
			},
		},
	};
}
export function patchCallZome(appWs: AppWebsocket) {
	const callZome = appWs.callZome;

	appWs.callZome = async req => {
		try {
			const result = await callZome(req);
			return result;
		} catch (e) {
			if (
				!e.toString().includes('Socket is not open') &&
				!e.toString().includes('ClientClosedWithPendingRequests')
			) {
				throw e;
			}
		}
	};
}
