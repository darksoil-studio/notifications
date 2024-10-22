import { toPromise } from '@holochain-open-dev/signals';
import { EntryRecord } from '@holochain-open-dev/utils';
import { dhtSync, pause, runScenario } from '@holochain/tryorama';
import { assert, expect, test } from 'vitest';

import { sampleNotification } from '../../ui/src/mocks.js';
import { Notification } from '../../ui/src/types.js';
import { setup } from './setup.js';

test('create notifications, read it, and dismiss it', async () => {
	await runScenario(async scenario => {
		const { alice, bob } = await setup(scenario);

		const aliceProfile = await alice.profilesStore.client.createProfile({
			nickname: 'alice',
			fields: {},
		});

		const bobProfile = await bob.profilesStore.client.createProfile({
			nickname: 'bob',
			fields: {},
		});

		// Wait for the created entry to be propagated to the other node.
		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

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
			bobProfile.actionHash,
			'example',
			'type1',
			'group1',
			{
				hello: 'world!',
			},
		);
		await alice.store.client.sendNotification(
			bobProfile.actionHash,
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
		assert.equal(Object.keys(unreadNotifications).length, 2);
		readNotifications = await toPromise(bob.store.readNotifications);
		assert.equal(Object.keys(readNotifications).length, 0);
		dismissedNotifications = await toPromise(bob.store.dismissedNotifications);
		assert.equal(Object.keys(dismissedNotifications).length, 0);

		const notification1Hash = Object.keys(unreadNotifications)[0];
		const notification2Hash = Object.keys(unreadNotifications)[1];

		// await expect(() =>
		// 	(alice.store.client as any).callZome('mark_notifications_as_read', {
		// 		my_profile_hash: bobProfile.actionHash,
		// 		notifications_hashes: [notification1Hash],
		// 	}),
		// ).rejects.toThrowError();

		await bob.store.client.changeNotificationsStatus({
			[notification1Hash]: 'Read',
		});

		unreadNotifications = await toPromise(bob.store.unreadNotifications);
		assert.equal(Object.keys(unreadNotifications).length, 1);
		readNotifications = await toPromise(bob.store.readNotifications);
		assert.equal(Object.keys(readNotifications).length, 1);
		dismissedNotifications = await toPromise(bob.store.dismissedNotifications);
		assert.equal(Object.keys(dismissedNotifications).length, 0);

		await bob.store.client.changeNotificationsStatus({
			[notification2Hash]: 'Read',
		});

		unreadNotifications = await toPromise(bob.store.unreadNotifications);
		assert.equal(Object.keys(unreadNotifications).length, 0);
		readNotifications = await toPromise(bob.store.readNotifications);
		assert.equal(Object.keys(readNotifications).length, 2);
		dismissedNotifications = await toPromise(bob.store.dismissedNotifications);
		assert.equal(Object.keys(dismissedNotifications).length, 0);

		// Bob deletes the Notification
		await bob.store.client.changeNotificationsStatus({
			[notification2Hash]: 'Dismissed',
		});

		// await expect(() =>
		// 	(alice.store.client as any).callZome('dismiss_notifications', {
		// 		my_profile_hash: bobProfile.actionHash,
		// 		notifications_hashes: [notification2Hash],
		// 	}),
		// ).rejects.toThrowError();

		unreadNotifications = await toPromise(bob.store.unreadNotifications);
		assert.equal(Object.keys(unreadNotifications).length, 0);
		readNotifications = await toPromise(bob.store.readNotifications);
		assert.equal(Object.keys(readNotifications).length, 1);
		dismissedNotifications = await toPromise(bob.store.dismissedNotifications);
		assert.equal(Object.keys(dismissedNotifications).length, 1);

		// Bob deletes the Notification
		await bob.store.client.changeNotificationsStatus({
			[notification1Hash]: 'Dismissed',
		});

		unreadNotifications = await toPromise(bob.store.unreadNotifications);
		assert.equal(Object.keys(unreadNotifications).length, 0);
		readNotifications = await toPromise(bob.store.readNotifications);
		assert.equal(Object.keys(readNotifications).length, 0);
		dismissedNotifications = await toPromise(bob.store.dismissedNotifications);
		assert.equal(Object.keys(dismissedNotifications).length, 2);
	});
});

test('create notifications and dismiss it directly', async () => {
	await runScenario(async scenario => {
		const { alice, bob } = await setup(scenario);

		const aliceProfile = await alice.profilesStore.client.createProfile({
			nickname: 'alice',
			fields: {},
		});

		const bobProfile = await bob.profilesStore.client.createProfile({
			nickname: 'bob',
			fields: {},
		});

		// Wait for the created entry to be propagated to the other node.
		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

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
			bobProfile.actionHash,
			'example',
			'type1',
			'group1',
			{
				hello: 'world!',
			},
		);
		await alice.store.client.sendNotification(
			bobProfile.actionHash,
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
		assert.equal(Object.keys(unreadNotifications).length, 2);
		readNotifications = await toPromise(bob.store.readNotifications);
		assert.equal(Object.keys(readNotifications).length, 0);
		dismissedNotifications = await toPromise(bob.store.dismissedNotifications);
		assert.equal(Object.keys(dismissedNotifications).length, 0);

		const notification1Hash = Object.keys(unreadNotifications)[0];
		const notification2Hash = Object.keys(unreadNotifications)[1];

		await bob.store.client.changeNotificationsStatus({
			[notification1Hash]: 'Dismissed',
			[notification2Hash]: 'Dismissed',
		});

		unreadNotifications = await toPromise(bob.store.unreadNotifications);
		assert.equal(Object.keys(unreadNotifications).length, 0);
		readNotifications = await toPromise(bob.store.readNotifications);
		assert.equal(Object.keys(readNotifications).length, 0);
		dismissedNotifications = await toPromise(bob.store.dismissedNotifications);
		assert.equal(Object.keys(dismissedNotifications).length, 2);
	});
});
