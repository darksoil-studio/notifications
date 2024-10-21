use std::collections::BTreeMap;

use hdk::prelude::*;
use notifications_integrity::*;
use notifications_types::*;

use crate::{
	encrypted_message::{commit_my_pending_encrypted_messages, create_encrypted_message},
	profiles::{get_agent_profile_hash, get_agents_for_profile, get_my_profile_hash},
	utils::create_relaxed,
};

// pub const MAX_TAG_SIZE: usize = 1000;

#[hdk_extern(infallible)]
fn scheduled_synchronize_with_other_agents_for_my_profile(_: Option<Schedule>) -> Option<Schedule> {
	if let Err(err) = synchronize_with_other_agents_for_my_profile() {
		error!("Failed to synchronize with other agents: {err:?}");
	}
	if let Err(err) = commit_my_pending_encrypted_messages() {
		error!("Failed to commit my encrypted messages: {err:?}");
	}

	Some(Schedule::Persisted("*/3 * * * *".into())) // Every three minutes
}

pub fn synchronize_with_other_agents_for_my_profile() -> ExternResult<()> {
	let Some(my_profile_hash) = get_my_profile_hash()? else {
		return Ok(());
	};

	let my_pub_key = agent_info()?.agent_latest_pubkey;

	let agents = get_agents_for_profile(my_profile_hash)?;
	let other_agents = agents.into_iter().filter(|a| a.ne(&my_pub_key));

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

	let notifications_status_changes = query_notifications_status_changes()?;

	let notifications_filter = ChainQueryFilter::new()
		.entry_type(UnitEntryTypes::Notification.try_into()?)
		.include_entries(false)
		.action_type(ActionType::Create);

	let notifications_status_changes_filter = ChainQueryFilter::new()
		.entry_type(UnitEntryTypes::NotificationsStatusChanges.try_into()?)
		.include_entries(false)
		.action_type(ActionType::Create);

	for agent in other_agents {
		let notifications_agent_activity = get_agent_activity(
			agent.clone(),
			notifications_filter.clone(),
			ActivityRequest::Full,
		)?;

		let actions_get_inputs = notifications_agent_activity
			.valid_activity
			.into_iter()
			.map(|(_, action_hash)| GetInput::new(action_hash.into(), GetOptions::network()))
			.collect();

		let records = HDK.with(|hdk| hdk.borrow().get(actions_get_inputs))?;
		let existing_notifications_hashes: HashSet<EntryHash> = records
			.into_iter()
			.filter_map(|r| r)
			.filter_map(|r| r.action().entry_hash().cloned())
			.collect();

		let missing_notifications: Vec<(EntryHash, Notification)> = notifications
			.clone()
			.into_iter()
			.filter(|(entry_hash, _)| !existing_notifications_hashes.contains(entry_hash))
			.collect();

		for (_, notification) in missing_notifications {
			let response = call_remote(
				agent.clone(),
				zome_info()?.name,
				"receive_notification".into(),
				None,
				notification.clone(),
			)?;

			let ZomeCallResponse::Ok(_) = response else {
				create_encrypted_message(
					agent.clone(),
					NotificationsEncryptedMessage::Notification(notification.clone()),
				)?;
				continue;
			};
		}

		let notifications_status_changes_agent_activity = get_agent_activity(
			agent.clone(),
			notifications_status_changes_filter.clone(),
			ActivityRequest::Full,
		)?;

		let actions_get_inputs = notifications_status_changes_agent_activity
			.valid_activity
			.into_iter()
			.map(|(_, action_hash)| GetInput::new(action_hash.into(), GetOptions::network()))
			.collect();

		let records = HDK.with(|hdk| hdk.borrow().get(actions_get_inputs))?;
		let existing_notifications_status_changes_hashes: HashSet<EntryHash> = records
			.into_iter()
			.filter_map(|r| r)
			.filter_map(|r| r.action().entry_hash().cloned())
			.collect();

		let missing_notifications_status_changes: Vec<(EntryHash, NotificationsStatusChanges)> =
			notifications_status_changes
				.clone()
				.into_iter()
				.filter(|(entry_hash, _)| {
					!existing_notifications_status_changes_hashes.contains(entry_hash)
				})
				.collect();

		for (_, notifications_status_changes) in missing_notifications_status_changes {
			let response = call_remote(
				agent.clone(),
				zome_info()?.name,
				"receive_change_notifications_status".into(),
				None,
				notifications_status_changes.clone(),
			)?;

			let ZomeCallResponse::Ok(_) = response else {
				create_encrypted_message(
					agent.clone(),
					NotificationsEncryptedMessage::NotificationsStatusChanges(
						notifications_status_changes.clone(),
					),
				)?;
				continue;
			};
		}
	}

	Ok(())
}

#[hdk_extern]
pub fn send_notification(notification: Notification) -> ExternResult<()> {
	let recipient = notification.recipient_profile_hash.clone();

	let agents = get_agents_for_profile(recipient)?;

	for agent in agents {
		let response = call_remote(
			agent.clone(),
			zome_info()?.name,
			"receive_notification".into(),
			None,
			notification.clone(),
		)?;

		let ZomeCallResponse::Ok(_) = response else {
			create_encrypted_message(
				agent,
				NotificationsEncryptedMessage::Notification(notification.clone()),
			)?;
			continue;
		};
	}

	Ok(())
}

#[hdk_extern]
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

	let Some(my_profile_hash) = get_my_profile_hash()? else {
		return Ok(());
	};

	let agents = get_agents_for_profile(my_profile_hash)?;

	for agent in agents {
		let response = call_remote(
			agent.clone(),
			zome_info()?.name,
			"receive_change_notifications_status".into(),
			None,
			notifications_status_change.clone(),
		)?;

		let ZomeCallResponse::Ok(_) = response else {
			create_encrypted_message(
				agent,
				NotificationsEncryptedMessage::NotificationsStatusChanges(
					notifications_status_change.clone(),
				),
			)?;
			continue;
		};
	}

	Ok(())
}

#[hdk_extern]
pub fn receive_change_notifications_status(
	notifications_status_changes: NotificationsStatusChanges,
) -> ExternResult<()> {
	let caller = agent_info()?.agent_latest_pubkey;
	let my_profile_hash = get_my_profile_hash()?;
	let caller_profile_hash = get_agent_profile_hash(caller)?;

	if caller_profile_hash.ne(&my_profile_hash) {
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

fn query_notifications_status_changes_records() -> ExternResult<Vec<Record>> {
	let filter = ChainQueryFilter::new()
		.entry_type(UnitEntryTypes::NotificationsStatusChanges.try_into()?)
		.include_entries(true)
		.action_type(ActionType::Create);
	query(filter)
}
fn query_notifications_status_changes() -> ExternResult<Vec<(EntryHash, NotificationsStatusChanges)>>
{
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

fn query_notifications_records() -> ExternResult<Vec<Record>> {
	let filter = ChainQueryFilter::new()
		.entry_type(UnitEntryTypes::Notification.try_into()?)
		.include_entries(true)
		.action_type(ActionType::Create);
	query(filter)
}

#[derive(Serialize, Deserialize, Debug)]
pub struct NotificationWithStatus {
	notification: Notification,
	status: NotificationStatus,
}
#[hdk_extern]
pub fn query_notifications() -> ExternResult<BTreeMap<EntryHashB64, NotificationWithStatus>> {
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
	let notifications = query_notifications(())?;

	let filtered: BTreeMap<EntryHashB64, Notification> = notifications
		.into_iter()
		.filter(|(_, notification_with_status)| notification_with_status.status.eq(&status_filter))
		.map(|(hash, notification_with_status)| (hash, notification_with_status.notification))
		.collect();
	Ok(filtered)
}

// // Only to be called by post_commit
// #[hdk_extern]
// pub fn create_notification_link(notification_hash: ActionHash) -> ExternResult<()> {
// 	let app_entry = get_entry_for_action(&notification_hash)?;
// 	if let Some(EntryTypes::Notification(notification)) = app_entry {
// 		for base in notification.recipients_profiles_hashes.clone() {
// 			create_link_relaxed(
// 				base,
// 				notification_hash.clone(),
// 				LinkTypes::RecipientToNotifications,
// 				notification.notification_group.clone(),
// 			)?;
// 		}
// 	}
// 	Ok(())
// }

// #[hdk_extern]
// pub fn get_notification(notification_hash: ActionHash) -> ExternResult<Option<Record>> {
// 	let Some(details) = get_details(notification_hash, GetOptions::default())? else {
// 		return Ok(None);
// 	};
// 	match details {
// 		Details::Record(details) => Ok(Some(details.record)),
// 		_ => Err(wasm_error!(WasmErrorInner::Guest(
// 			"Malformed get details response".to_string()
// 		))),
// 	}
// }

// #[derive(Serialize, Deserialize, Debug, SerializedBytes)]
// pub struct ReadNotifications(pub Vec<ActionHash>);

// #[derive(Serialize, Deserialize, Debug, SerializedBytes)]
// pub struct MarkNotificationsAsReadInput {
// 	my_profile_hash: ActionHash,
// 	notifications_hashes: Vec<ActionHash>,
// }

// #[hdk_extern]
// pub fn mark_notifications_as_read(input: MarkNotificationsAsReadInput) -> ExternResult<()> {
// 	let notifications_hashes = input.notifications_hashes;
// 	let hash_size = 39;
// 	let max_hashes_per_link_tag = (MAX_TAG_SIZE / hash_size) - 1;

// 	let chunks = notifications_hashes.chunks(max_hashes_per_link_tag);

// 	for chunk in chunks.into_iter() {
// 		let read_notifications = ReadNotifications(chunk.to_vec());

// 		let bytes = SerializedBytes::try_from(read_notifications).map_err(|err| {
// 			wasm_error!(WasmErrorInner::Guest(format!(
// 				"Failed to serialize ReadNotifications {err:?}"
// 			)))
// 		})?;

// 		create_link_relaxed(
// 			input.my_profile_hash.clone(),
// 			input.my_profile_hash.clone(),
// 			LinkTypes::ReadNotifications,
// 			bytes.bytes().to_vec(),
// 		)?;
// 	}

// 	Ok(())
// }

// #[derive(Serialize, Deserialize, Debug, SerializedBytes)]
// pub struct DismissNotificationsInput {
// 	my_profile_hash: ActionHash,
// 	notifications_hashes: Vec<ActionHash>,
// }

// #[hdk_extern]
// pub fn dismiss_notifications(input: DismissNotificationsInput) -> ExternResult<()> {
// 	let notifications_hashes = input.notifications_hashes;
// 	for hash in notifications_hashes.iter() {
// 		dismiss_notification(input.my_profile_hash.clone(), hash.clone())?;
// 	}

// 	let read_links = get_read_notifications(input.my_profile_hash.clone())?.into_iter();

// 	let undismissed_notifications_hashes: HashSet<ActionHash> =
// 		get_undismissed_notifications(input.my_profile_hash)?
// 			.into_iter()
// 			.filter_map(|link| link.target.into_action_hash())
// 			.collect();

// 	// Iterate over the read links
// 	for link in read_links {
// 		let sb = SerializedBytes::from(UnsafeBytes::from(link.tag.0));
// 		let read_notifications_hashes = ReadNotifications::try_from(sb).map_err(|err| {
// 			wasm_error!(WasmErrorInner::Guest(format!(
// 				"Failed to serialize ReadNotifications {err:?}"
// 			)))
// 		})?;

// 		if read_notifications_hashes.0.iter().all(|hash| {
// 			notifications_hashes.contains(hash) || !undismissed_notifications_hashes.contains(hash)
// 		}) {
// 			delete_link_relaxed(link.create_link_hash)?;
// 		}
// 	}

// 	Ok(())
// }

// fn dismiss_notification(
// 	my_profile_hash: ActionHash,
// 	notification_hash: ActionHash,
// ) -> ExternResult<()> {
// 	let links = get_undismissed_notifications(my_profile_hash)?;

// 	for link in links {
// 		if let Some(action_hash) = link.target.into_action_hash() {
// 			if action_hash.eq(&notification_hash) {
// 				delete_link_relaxed(link.create_link_hash)?;
// 			}
// 		}
// 	}
// 	delete_relaxed(notification_hash)
// }

// #[hdk_extern]
// pub fn get_all_deletes_for_notification(
// 	original_notification_hash: ActionHash,
// ) -> ExternResult<Option<Vec<SignedActionHashed>>> {
// 	let Some(details) = get_details(original_notification_hash, GetOptions::default())? else {
// 		return Ok(None);
// 	};
// 	match details {
// 		Details::Entry(_) => Err(wasm_error!(WasmErrorInner::Guest(
// 			"Malformed details".into()
// 		))),
// 		Details::Record(record_details) => Ok(Some(record_details.deletes)),
// 	}
// }

// #[hdk_extern]
// pub fn get_undismissed_notifications(my_profile_hash: ActionHash) -> ExternResult<Vec<Link>> {
// 	get_links(
// 		GetLinksInputBuilder::try_new(my_profile_hash, LinkTypes::RecipientToNotifications)?
// 			.build(),
// 	)
// }

// #[hdk_extern]
// pub fn get_read_notifications(my_profile_hash: ActionHash) -> ExternResult<Vec<Link>> {
// 	get_links(GetLinksInputBuilder::try_new(my_profile_hash, LinkTypes::ReadNotifications)?.build())
// }

// #[hdk_extern]
// pub fn get_dismissed_notifications(
// 	my_profile_hash: ActionHash,
// ) -> ExternResult<Vec<(SignedActionHashed, Vec<SignedActionHashed>)>> {
// 	let details = get_link_details(
// 		my_profile_hash,
// 		LinkTypes::RecipientToNotifications,
// 		None,
// 		GetOptions::default(),
// 	)?;
// 	Ok(details
// 		.into_inner()
// 		.into_iter()
// 		.filter(|(_link, deletes)| !deletes.is_empty())
// 		.collect())
// }
