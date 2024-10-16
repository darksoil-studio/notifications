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

		const aliceProfile =
			await alice.store.client.profilesStore.client.createProfile({
				nickname: 'alice',
				fields: {},
			});

		const bobProfile =
			await bob.store.client.profilesStore.client.createProfile({
				nickname: 'bob',
				fields: {},
			});

		// Wait for the created entry to be propagated to the other node.
		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		let unreadNotifications = await toPromise(bob.store.unreadNotifications);
		assert.equal(unreadNotifications.size, 0);
		let readNotifications = await toPromise(bob.store.readNotifications);
		assert.equal(readNotifications.size, 0);
		let dismissedNotifications = await toPromise(
			bob.store.dismissedNotifications,
		);
		assert.equal(dismissedNotifications.size, 0);

		// Alice creates a Notification
		await alice.store.client.createNotification(
			await sampleNotification(alice.store.client, {
				recipients_profiles_hashes: [bobProfile.actionHash],
			}),
		);
		await alice.store.client.createNotification(
			await sampleNotification(alice.store.client, {
				recipients_profiles_hashes: [bobProfile.actionHash],
			}),
		);

		// Wait for the created entry to be propagated to the other node.
		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		unreadNotifications = await toPromise(bob.store.unreadNotifications);
		assert.equal(unreadNotifications.size, 2);
		readNotifications = await toPromise(bob.store.readNotifications);
		assert.equal(readNotifications.size, 0);
		dismissedNotifications = await toPromise(bob.store.dismissedNotifications);
		assert.equal(dismissedNotifications.size, 0);

		const notification1Hash = Array.from(unreadNotifications.keys())[0];
		const notification2Hash = Array.from(unreadNotifications.keys())[1];

		await expect(() =>
			(alice.store.client as any).callZome('mark_notifications_as_read', {
				my_profile_hash: bobProfile.actionHash,
				notifications_hashes: [notification1Hash],
			}),
		).rejects.toThrowError();

		await bob.store.client.markNotificationsAsRead([notification1Hash]);

		unreadNotifications = await toPromise(bob.store.unreadNotifications);
		assert.equal(unreadNotifications.size, 1);
		readNotifications = await toPromise(bob.store.readNotifications);
		assert.equal(readNotifications.size, 1);
		dismissedNotifications = await toPromise(bob.store.dismissedNotifications);
		assert.equal(dismissedNotifications.size, 0);

		await bob.store.client.markNotificationsAsRead([notification2Hash]);

		unreadNotifications = await toPromise(bob.store.unreadNotifications);
		assert.equal(unreadNotifications.size, 0);
		readNotifications = await toPromise(bob.store.readNotifications);
		assert.equal(readNotifications.size, 2);
		dismissedNotifications = await toPromise(bob.store.dismissedNotifications);
		assert.equal(dismissedNotifications.size, 0);

		// Bob deletes the Notification
		await bob.store.client.dismissNotifications([notification2Hash]);

		await expect(() =>
			(alice.store.client as any).callZome('dismiss_notifications', {
				my_profile_hash: bobProfile.actionHash,
				notifications_hashes: [notification2Hash],
			}),
		).rejects.toThrowError();

		unreadNotifications = await toPromise(bob.store.unreadNotifications);
		assert.equal(unreadNotifications.size, 0);
		readNotifications = await toPromise(bob.store.readNotifications);
		assert.equal(readNotifications.size, 1);
		dismissedNotifications = await toPromise(bob.store.dismissedNotifications);
		assert.equal(dismissedNotifications.size, 1);

		// Bob deletes the Notification
		await bob.store.client.dismissNotifications([notification1Hash]);

		unreadNotifications = await toPromise(bob.store.unreadNotifications);
		assert.equal(unreadNotifications.size, 0);
		readNotifications = await toPromise(bob.store.readNotifications);
		assert.equal(readNotifications.size, 0);
		dismissedNotifications = await toPromise(bob.store.dismissedNotifications);
		assert.equal(dismissedNotifications.size, 2);
	});
});

test('create notifications and dismiss it directly', async () => {
	await runScenario(async scenario => {
		const { alice, bob } = await setup(scenario);

		const aliceProfile =
			await alice.store.client.profilesStore.client.createProfile({
				nickname: 'alice',
				fields: {},
			});

		const bobProfile =
			await bob.store.client.profilesStore.client.createProfile({
				nickname: 'bob',
				fields: {},
			});

		// Wait for the created entry to be propagated to the other node.
		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		let unreadNotifications = await toPromise(bob.store.unreadNotifications);
		assert.equal(unreadNotifications.size, 0);
		let readNotifications = await toPromise(bob.store.readNotifications);
		assert.equal(readNotifications.size, 0);
		let dismissedNotifications = await toPromise(
			bob.store.dismissedNotifications,
		);
		assert.equal(dismissedNotifications.size, 0);

		// Alice creates a Notification
		await alice.store.client.createNotification(
			await sampleNotification(alice.store.client, {
				recipients_profiles_hashes: [bobProfile.actionHash],
			}),
		);
		await alice.store.client.createNotification(
			await sampleNotification(alice.store.client, {
				recipients_profiles_hashes: [bobProfile.actionHash],
			}),
		);

		// Wait for the created entry to be propagated to the other node.
		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		unreadNotifications = await toPromise(bob.store.unreadNotifications);
		assert.equal(unreadNotifications.size, 2);
		readNotifications = await toPromise(bob.store.readNotifications);
		assert.equal(readNotifications.size, 0);
		dismissedNotifications = await toPromise(bob.store.dismissedNotifications);
		assert.equal(dismissedNotifications.size, 0);

		const notification1Hash = Array.from(unreadNotifications.keys())[0];
		const notification2Hash = Array.from(unreadNotifications.keys())[1];

		await bob.store.client.dismissNotifications([
			notification1Hash,
			notification2Hash,
		]);

		unreadNotifications = await toPromise(bob.store.unreadNotifications);
		assert.equal(unreadNotifications.size, 0);
		readNotifications = await toPromise(bob.store.readNotifications);
		assert.equal(readNotifications.size, 0);
		dismissedNotifications = await toPromise(bob.store.dismissedNotifications);
		assert.equal(dismissedNotifications.size, 2);
	});
});
