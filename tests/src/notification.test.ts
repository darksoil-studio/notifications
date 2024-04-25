import { toPromise } from '@holochain-open-dev/signals';
import { EntryRecord } from '@holochain-open-dev/utils';
import { cleanNodeDecoding } from '@holochain-open-dev/utils/dist/clean-node-decoding.js';
import { Delete, SignedActionHashed } from '@holochain/client';
import { dhtSync, runScenario } from '@holochain/tryorama';
import { assert, test } from 'vitest';

import { sampleNotification } from '../../ui/src/mocks.js';
import { Notification } from '../../ui/src/types.js';
import { setup } from './setup.js';

test('create Notification', async () => {
	await runScenario(async scenario => {
		const { alice, bob } = await setup(scenario);

		// Alice creates a Notification
		const notification: EntryRecord<Notification> =
			await alice.store.client.createNotification(
				await sampleNotification(alice.store.client),
			);
		assert.ok(notification);
	});
});

test('create and read Notification', async () => {
	await runScenario(async scenario => {
		const { alice, bob } = await setup(scenario);

		const sample = await sampleNotification(alice.store.client);

		// Alice creates a Notification
		const notification: EntryRecord<Notification> =
			await alice.store.client.createNotification(sample);
		assert.ok(notification);

		// Wait for the created entry to be propagated to the other node.
		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		// Bob gets the created Notification
		const createReadOutput: EntryRecord<Notification> = await toPromise(
			bob.store.notifications.get(notification.actionHash).entry$,
		);
		assert.deepEqual(sample, cleanNodeDecoding(createReadOutput.entry));
	});
});

test('create and delete Notification', async () => {
	await runScenario(async scenario => {
		const { alice, bob } = await setup(scenario);

		// Alice creates a Notification
		const notification: EntryRecord<Notification> =
			await alice.store.client.createNotification(
				await sampleNotification(alice.store.client),
			);
		assert.ok(notification);

		// Alice deletes the Notification
		await alice.store.client.dismissNotifications([notification.actionHash]);

		// Wait for the created entry to be propagated to the other node.
		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		// Bob tries to get the deleted Notification
		const deletes: Array<SignedActionHashed<Delete>> = await toPromise(
			bob.store.notifications.get(notification.actionHash).deletes$,
		);
		assert.equal(deletes.length, 1);
	});
});
