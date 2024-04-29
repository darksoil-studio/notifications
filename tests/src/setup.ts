import { EntryRecord } from '@holochain-open-dev/utils';
import {
	ActionHash,
	AgentPubKey,
	AppBundleSource,
	EntryHash,
	NewEntryAction,
	Record,
	encodeHashToBase64,
	fakeActionHash,
	fakeAgentPubKey,
	fakeDnaHash,
	fakeEntryHash,
} from '@holochain/client';
import { Scenario } from '@holochain/tryorama';
import { encode } from '@msgpack/msgpack';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { NotificationsClient } from '../../ui/src/notifications-client.js';
import { NotificationsStore } from '../../ui/src/notifications-store.js';

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

	const aliceStore = new NotificationsStore(
		new NotificationsClient(
			alice.appAgentWs as any,
			'notifications_test',
			'notifications',
		),
	);

	const bobStore = new NotificationsStore(
		new NotificationsClient(
			bob.appAgentWs as any,
			'notifications_test',
			'notifications',
		),
	);

	// Shortcut peer discovery through gossip and register all agents in every
	// conductor of the scenario.
	await scenario.shareAllAgents();

	// Prevent race condition when two zome calls are made instantly at the beginning of the lifecycle that cause a ChainHeadMoved error because they trigger 2 parallel init workflows
	await aliceStore.client.getUndismissedNotifications();
	await bobStore.client.getUndismissedNotifications();

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
