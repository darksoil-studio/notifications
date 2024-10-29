use std::collections::BTreeMap;

use hdk::prelude::*;
use notifications_integrity::*;
use notifications_types::*;

use crate::{
	encrypted_message::create_encrypted_message,
	linked_devices::{get_all_agents_for, query_my_linked_devices},
	utils::create_relaxed,
	NotificationsRemoteSignal,
};

#[hdk_extern]
pub fn send_notification(input: SendNotificationInput) -> ExternResult<()> {
	let notification = Notification {
		timestamp: sys_time()?,
		zome_name: input.zome_name,
		notification_type: input.notification_type,
		notification_group: input.notification_group,
		recipient: input.recipient.clone(),
		content: input.content,
	};

	let agents = get_all_agents_for(input.recipient.clone())?;
	send_remote_signal(
		NotificationsRemoteSignal::Notification(notification.clone()),
		agents.clone(),
	)?;

	for agent in agents {
		create_encrypted_message(
			agent,
			NotificationsEncryptedMessage::Notification(notification.clone()),
		)?;
	}

	Ok(())
}

pub fn receive_notification(notification: Notification) -> ExternResult<()> {
	let notifications = query_notifications_records()?;

	let entry_hash = hash_entry(&notification)?;

	let existing_notification = notifications
		.iter()
		.filter_map(|record| record.action().entry_hash())
		.find(|hash| hash.eq(&&entry_hash));

	let None = existing_notification else {
		// We already have this notification committed
		return Ok(());
	};

	create_relaxed(EntryTypes::Notification(notification))?;

	Ok(())
}

#[hdk_extern]
pub fn change_notifications_status(
	status_changes: BTreeMap<EntryHashB64, NotificationStatus>,
) -> ExternResult<()> {
	let notifications_status_change = NotificationsStatusChanges {
		status_changes,
		timestamp: sys_time()?,
	};

	create_relaxed(EntryTypes::NotificationsStatusChanges(
		notifications_status_change.clone(),
	))?;

	let agents = query_my_linked_devices()?;

	send_remote_signal(
		NotificationsRemoteSignal::NotificationsStatusChanges(notifications_status_change.clone()),
		agents.clone(),
	)?;
	for agent in agents {
		create_encrypted_message(
			agent,
			NotificationsEncryptedMessage::NotificationsStatusChanges(
				notifications_status_change.clone(),
			),
		)?;
	}

	Ok(())
}

pub fn receive_change_notifications_status(
	notifications_status_changes: NotificationsStatusChanges,
) -> ExternResult<()> {
	let caller = call_info()?.provenance;
	let linked_devices = query_my_linked_devices()?;

	if !linked_devices.contains(&caller) {
		return Err(wasm_error!(WasmErrorInner::Guest(format!(
			"Only agents with the same profile can send change notifications status"
		))));
	}

	let existing_notifications_status_changes = query_notifications_status_changes()?;

	let entry_hash = hash_entry(&notifications_status_changes)?;

	let existing_notifications_status_change = existing_notifications_status_changes
		.iter()
		.find(|(hash, _)| hash.eq(&&entry_hash));

	let None = existing_notifications_status_change else {
		// We already have this status committed
		return Ok(());
	};

	create_relaxed(EntryTypes::NotificationsStatusChanges(
		notifications_status_changes,
	))?;

	Ok(())
}

pub fn query_notifications_status_changes_records() -> ExternResult<Vec<Record>> {
	let filter = ChainQueryFilter::new()
		.entry_type(UnitEntryTypes::NotificationsStatusChanges.try_into()?)
		.include_entries(true)
		.action_type(ActionType::Create);
	query(filter)
}
pub fn query_notifications_status_changes(
) -> ExternResult<Vec<(EntryHash, NotificationsStatusChanges)>> {
	let notifications_status_changes_records = query_notifications_status_changes_records()?;
	let notifications_status_changes = notifications_status_changes_records.into_iter().map(|record| {
		let Some(entry) = record.entry().as_option() else {
			return Err(wasm_error!(WasmErrorInner::Guest(format!("Invalid notification s tatus changes record: no entry found"))));
		};
		let Ok(notifications_status_changes) = NotificationsStatusChanges::try_from(entry.clone()) else {
			return Err(wasm_error!(WasmErrorInner::Guest(format!("Invalid notification status changes record: entry is not a NotificationsStatusChanges"))));
		};
		let Some(entry_hash)= record.action().entry_hash() else {
			return Err(wasm_error!(WasmErrorInner::Guest(format!("Invalid notification status changes record: entry hash is None"))));
		};

 	Ok((entry_hash.clone(), notifications_status_changes))
	}).collect::<ExternResult<Vec<(EntryHash,NotificationsStatusChanges)>>>()?;
	Ok(notifications_status_changes)
}

pub fn query_notifications_records() -> ExternResult<Vec<Record>> {
	let filter = ChainQueryFilter::new()
		.entry_type(UnitEntryTypes::Notification.try_into()?)
		.include_entries(true)
		.action_type(ActionType::Create);
	query(filter)
}

pub fn query_notifications() -> ExternResult<Vec<(EntryHash, Notification)>> {
	let notifications_records = query_notifications_records()?;
	let notifications = notifications_records
		.into_iter()
		.map(|record| {
			let Some(entry) = record.entry().as_option() else {
				return Err(wasm_error!(WasmErrorInner::Guest(format!(
					"Invalid notification record: no entry found"
				))));
			};
			let Ok(notification) = Notification::try_from(entry.clone()) else {
				return Err(wasm_error!(WasmErrorInner::Guest(format!(
					"Invalid notification record: entry is not a notification"
				))));
			};
			let Some(entry_hash) = record.action().entry_hash() else {
				return Err(wasm_error!(WasmErrorInner::Guest(format!(
					"Invalid notification record: entry hash is None"
				))));
			};
			Ok((entry_hash.clone(), notification))
		})
		.collect::<ExternResult<Vec<(EntryHash, Notification)>>>()?;
	Ok(notifications)
}

#[derive(Serialize, Deserialize, Debug)]
pub struct NotificationWithStatus {
	notification: Notification,
	status: NotificationStatus,
}
#[hdk_extern]
pub fn query_notifications_and_status(
) -> ExternResult<BTreeMap<EntryHashB64, NotificationWithStatus>> {
	let notifications = query_notifications_records()?;
	let notifications_status_changes_records = query_notifications_status_changes_records()?;

	let mut result: BTreeMap<EntryHashB64, NotificationWithStatus> = BTreeMap::new();

	for notification_record in notifications {
		let action = notification_record.action();
		let Some(entry) = notification_record.entry().as_option() else {
			return Err(wasm_error!(WasmErrorInner::Guest(format!(
				"Invalid notification record: no entry found"
			))));
		};
		let Ok(notification) = Notification::try_from(entry.clone()) else {
			return Err(wasm_error!(WasmErrorInner::Guest(format!(
				"Invalid notification record: entry is not a notification"
			))));
		};
		let Some(notification_hash) = action.entry_hash() else {
			return Err(wasm_error!(WasmErrorInner::Guest(format!(
				"Invalid notification record: no entry hash found"
			))));
		};
		result.insert(
			notification_hash.clone().into(),
			NotificationWithStatus {
				notification,
				status: NotificationStatus::Unread,
			},
		);
	}

	let mut notifications_status_changes = notifications_status_changes_records
		.into_iter()
		.map(|record| {
			let Some(entry) = record.entry().as_option() else {
				return Err(wasm_error!(WasmErrorInner::Guest(format!(
					"Invalid notification record: no entry found"
				))));
			};
			let Ok(notifications_status_changes) =
				NotificationsStatusChanges::try_from(entry.clone())
			else {
				return Err(wasm_error!(WasmErrorInner::Guest(format!(
					"Invalid notification record: entry is not a notification"
				))));
			};
			Ok(notifications_status_changes)
		})
		.collect::<ExternResult<Vec<NotificationsStatusChanges>>>()?;

	notifications_status_changes.sort_by(|a, b| a.timestamp.cmp(&b.timestamp));
	for notifications_status_changes in notifications_status_changes {
		for (notification_hash, new_notification_status) in
			notifications_status_changes.status_changes
		{
			let Some(notification_with_status) = result.get_mut(&notification_hash) else {
				continue;
			};
			notification_with_status.status = new_notification_status;
		}
	}

	Ok(result)
}

#[hdk_extern]
pub fn query_notifications_with_status(
	status_filter: NotificationStatus,
) -> ExternResult<BTreeMap<EntryHashB64, Notification>> {
	let notifications = query_notifications_and_status(())?;

	let filtered: BTreeMap<EntryHashB64, Notification> = notifications
		.into_iter()
		.filter(|(_, notification_with_status)| notification_with_status.status.eq(&status_filter))
		.map(|(hash, notification_with_status)| (hash, notification_with_status.notification))
		.collect();
	Ok(filtered)
}
