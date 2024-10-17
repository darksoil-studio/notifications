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
	const [alice, bob] = await scenario.addPlayersWithApps([
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

	const config: NotificationsConfig = {
		types: {},
	};

	const aliceProfilesStore = new ProfilesStore(
		new ProfilesClient(alice.appWs as any, 'notifications_test', 'profiles'),
	);

	const aliceStore = new NotificationsStore(
		new NotificationsClient(
			aliceProfilesStore,
			alice.appWs as any,
			'notifications_test',
			'notifications',
		),
		config,
	);

	const bobProfilesStore = new ProfilesStore(
		new ProfilesClient(bob.appWs as any, 'notifications_test', 'profiles'),
	);

	const bobStore = new NotificationsStore(
		new NotificationsClient(
			bobProfilesStore,
			bob.appWs as any,
			'notifications_test',
			'notifications',
		),
		config,
	);

	// Shortcut peer discovery through gossip and register all agents in every
	// conductor of the scenario.
	await scenario.shareAllAgents();

	// Prevent race condition when two zome calls are made instantly at the beginning of the lifecycle that cause a ChainHeadMoved error because they trigger 2 parallel init workflows
	await aliceStore.client.profilesStore.client.getAllProfiles();
	await bobStore.client.profilesStore.client.getAllProfiles();

	return {
		alice: {
			player: alice,
			store: aliceStore,
		},
		bob: {
			player: bob,
			store: bobStore,
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
