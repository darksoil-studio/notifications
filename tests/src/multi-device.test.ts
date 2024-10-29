import { LinkedDevicesStore } from '@darksoil-studio/linked-devices';
import { toPromise } from '@holochain-open-dev/signals';
import { EntryRecord } from '@holochain-open-dev/utils';
import { decodeHashFromBase64 } from '@holochain/client';
import { dhtSync, pause, runScenario } from '@holochain/tryorama';
import { assert, expect, test } from 'vitest';

import { Notification } from '../../ui/src/types.js';
import { setup } from './setup.js';

test('notifications and their status get synchronized across devices for the same profile', async () => {
	await runScenario(async scenario => {
		const { alice, bob, bob2 } = await setup(scenario);

		await linkDevices(bob.linkedDevicesStore, bob2.linkedDevicesStore);

		// Wait for the created entry to be propagated to the other node.
		await dhtSync(
			[alice.player, bob.player, bob2.player],
			alice.player.cells[0].cell_id[0],
		);

		let unreadNotifications = await toPromise(bob.store.unreadNotifications);
		assert.equal(Object.keys(unreadNotifications).length, 0);
		let readNotifications = await toPromise(bob.store.readNotifications);
		assert.equal(Object.keys(readNotifications).length, 0);
		let dismissedNotifications = await toPromise(
			bob.store.dismissedNotifications,
		);
		assert.equal(Object.keys(dismissedNotifications).length, 0);

		// Alice creates a Notification
		await alice.store.client.sendNotification(
			bob.player.agentPubKey,
			'example',
			'type1',
			'group1',
			{
				hello: 'world!',
			},
		);

		// Wait for the created entry to be propagated to the other node.
		await dhtSync(
			[alice.player, bob.player, bob2.player],
			alice.player.cells[0].cell_id[0],
		);

		unreadNotifications = await toPromise(bob.store.unreadNotifications);
		assert.equal(Object.keys(unreadNotifications).length, 1);
		readNotifications = await toPromise(bob.store.readNotifications);
		assert.equal(Object.keys(readNotifications).length, 0);
		dismissedNotifications = await toPromise(bob.store.dismissedNotifications);
		assert.equal(Object.keys(dismissedNotifications).length, 0);

		const notificationHash = decodeHashFromBase64(
			Object.keys(unreadNotifications)[0],
		);

		await bob.store.client.markNotificationsAsRead([notificationHash]);

		// Wait for the created entry to be propagated to the other node.
		await dhtSync(
			[alice.player, bob.player, bob2.player],
			alice.player.cells[0].cell_id[0],
		);

		unreadNotifications = await toPromise(bob2.store.unreadNotifications);
		assert.equal(Object.keys(unreadNotifications).length, 0);
		readNotifications = await toPromise(bob2.store.readNotifications);
		assert.equal(Object.keys(readNotifications).length, 1);
	});
});

test('notifications and their status get synchronized across devices for the same profile even when not online at the same time', async () => {
	await runScenario(async scenario => {
		const { alice, bob, bob2 } = await setup(scenario);

		await linkDevices(bob.linkedDevicesStore, bob2.linkedDevicesStore);

		// Wait for the created entry to be propagated to the other node.
		await dhtSync(
			[alice.player, bob.player, bob2.player],
			alice.player.cells[0].cell_id[0],
		);

		await bob2.player.conductor.shutDown();

		let unreadNotifications = await toPromise(bob.store.unreadNotifications);
		assert.equal(Object.keys(unreadNotifications).length, 0);
		let readNotifications = await toPromise(bob.store.readNotifications);
		assert.equal(Object.keys(readNotifications).length, 0);
		let dismissedNotifications = await toPromise(
			bob.store.dismissedNotifications,
		);
		assert.equal(Object.keys(dismissedNotifications).length, 0);

		// Alice creates a Notification
		await alice.store.client.sendNotification(
			bob.player.agentPubKey,
			'example',
			'type1',
			'group1',
			{
				hello: 'world!',
			},
		);

		// Wait for the created entry to be propagated to the other node.
		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		unreadNotifications = await toPromise(bob.store.unreadNotifications);
		assert.equal(Object.keys(unreadNotifications).length, 1);
		readNotifications = await toPromise(bob.store.readNotifications);
		assert.equal(Object.keys(readNotifications).length, 0);
		dismissedNotifications = await toPromise(bob.store.dismissedNotifications);
		assert.equal(Object.keys(dismissedNotifications).length, 0);

		const notificationHash = decodeHashFromBase64(
			Object.keys(unreadNotifications)[0],
		);

		await bob.store.client.markNotificationsAsRead([notificationHash]);

		// Wait for the created entry to be propagated to the other node.
		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		await bob.player.conductor.shutDown();

		await bob2.startUp();

		// Wait for the created entry to be propagated to the other node.
		await dhtSync(
			[alice.player, bob2.player],
			alice.player.cells[0].cell_id[0],
		);

		await waitUntil(async () => {
			const readNotifications = await toPromise(bob2.store.readNotifications);
			return Object.keys(readNotifications).length > 0;
		}, 3000 * 60);

		unreadNotifications = await toPromise(bob2.store.unreadNotifications);
		assert.equal(Object.keys(unreadNotifications).length, 0);
		readNotifications = await toPromise(bob2.store.readNotifications);
		assert.equal(Object.keys(readNotifications).length, 1);
	});
});
async function waitUntil(condition: () => Promise<boolean>, timeout: number) {
	const start = Date.now();
	const isDone = await condition();
	if (isDone) return;
	if (timeout <= 0) throw new Error('timeout');
	await pause(1000);
	return waitUntil(condition, timeout - (Date.now() - start));
}
async function linkDevices(
	store1: LinkedDevicesStore,
	store2: LinkedDevicesStore,
) {
	const store1Passcode = [1, 3, 7, 2];
	const store2Passcode = [9, 3, 8, 4];

	await store1.client.prepareLinkDevices(store1Passcode);
	await store2.client.prepareLinkDevices(store2Passcode);

	await store1.client.initLinkDevices(
		store2.client.client.myPubKey,
		store2Passcode,
	);
	await store2.client.requestLinkDevices(
		store1.client.client.myPubKey,
		store1Passcode,
	);
}
