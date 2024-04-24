import { EntryRecord } from '@holochain-open-dev/utils';
import { dhtSync, runScenario } from '@holochain/tryorama';
import { assert, test } from 'vitest';

import { sampleNotification } from '../../ui/src/mocks.js';
import { toPromise } from '../../ui/src/signals.js';
import { Notification } from '../../ui/src/types.js';
import { setup } from './setup.js';

test('create notifications, read it, and dismiss it', async () => {
	await runScenario(async scenario => {
		const { alice, bob } = await setup(scenario);

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
		const notification1: EntryRecord<Notification> =
			await alice.store.client.createNotification(
				await sampleNotification(alice.store.client, {
					recipients: [bob.player.agentPubKey],
				}),
			);
		assert.ok(notification1);
		const notification2: EntryRecord<Notification> =
			await alice.store.client.createNotification(
				await sampleNotification(alice.store.client, {
					recipients: [bob.player.agentPubKey],
				}),
			);
		assert.ok(notification2);

		// Wait for the created entry to be propagated to the other node.
		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		unreadNotifications = await toPromise(bob.store.unreadNotifications);
		assert.equal(unreadNotifications.size, 2);
		readNotifications = await toPromise(bob.store.readNotifications);
		assert.equal(readNotifications.size, 0);
		dismissedNotifications = await toPromise(bob.store.dismissedNotifications);
		assert.equal(dismissedNotifications.size, 0);

		await bob.store.client.markNotificationsAsRead([notification1.actionHash]);

		unreadNotifications = await toPromise(bob.store.unreadNotifications);
		assert.equal(unreadNotifications.size, 1);
		readNotifications = await toPromise(bob.store.readNotifications);
		assert.equal(readNotifications.size, 1);
		dismissedNotifications = await toPromise(bob.store.dismissedNotifications);
		assert.equal(dismissedNotifications.size, 0);

		await bob.store.client.markNotificationsAsRead([notification2.actionHash]);

		unreadNotifications = await toPromise(bob.store.unreadNotifications);
		assert.equal(unreadNotifications.size, 0);
		readNotifications = await toPromise(bob.store.readNotifications);
		assert.equal(readNotifications.size, 2);
		dismissedNotifications = await toPromise(bob.store.dismissedNotifications);
		assert.equal(dismissedNotifications.size, 0);

		// Bob deletes the Notification
		await bob.store.client.dismissNotifications([notification2.actionHash]);

		unreadNotifications = await toPromise(bob.store.unreadNotifications);
		assert.equal(unreadNotifications.size, 0);
		readNotifications = await toPromise(bob.store.readNotifications);
		assert.equal(readNotifications.size, 1);
		dismissedNotifications = await toPromise(bob.store.dismissedNotifications);
		assert.equal(dismissedNotifications.size, 1);

		// Bob deletes the Notification
		await bob.store.client.dismissNotifications([notification1.actionHash]);

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

		let unreadNotifications = await toPromise(bob.store.unreadNotifications);
		assert.equal(unreadNotifications.size, 0);
		let readNotifications = await toPromise(bob.store.readNotifications);
		assert.equal(readNotifications.size, 0);
		let dismissedNotifications = await toPromise(
			bob.store.dismissedNotifications,
		);
		assert.equal(dismissedNotifications.size, 0);

		// Alice creates a Notification
		const notification1: EntryRecord<Notification> =
			await alice.store.client.createNotification(
				await sampleNotification(alice.store.client, {
					recipients: [bob.player.agentPubKey],
				}),
			);
		assert.ok(notification1);
		const notification2: EntryRecord<Notification> =
			await alice.store.client.createNotification(
				await sampleNotification(alice.store.client, {
					recipients: [bob.player.agentPubKey],
				}),
			);
		assert.ok(notification2);

		// Wait for the created entry to be propagated to the other node.
		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		unreadNotifications = await toPromise(bob.store.unreadNotifications);
		assert.equal(unreadNotifications.size, 2);
		readNotifications = await toPromise(bob.store.readNotifications);
		assert.equal(readNotifications.size, 0);
		dismissedNotifications = await toPromise(bob.store.dismissedNotifications);
		assert.equal(dismissedNotifications.size, 0);

		await bob.store.client.dismissNotifications([
			notification1.actionHash,
			notification2.actionHash,
		]);

		unreadNotifications = await toPromise(bob.store.unreadNotifications);
		assert.equal(unreadNotifications.size, 0);
		readNotifications = await toPromise(bob.store.readNotifications);
		assert.equal(readNotifications.size, 0);
		dismissedNotifications = await toPromise(bob.store.dismissedNotifications);
		assert.equal(dismissedNotifications.size, 2);
	});
});
