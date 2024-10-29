use hdk::prelude::*;
use notifications_integrity::UnitEntryTypes;
use notifications_types::{
	Notification, NotificationsEncryptedMessage, NotificationsStatusChanges,
};

use crate::{
	encrypted_message::{commit_my_pending_encrypted_messages, create_encrypted_message},
	linked_devices::query_my_linked_devices,
	notification::{query_notifications, query_notifications_status_changes},
};

#[hdk_extern(infallible)]
fn scheduled_synchronize_with_other_agents_for_my_profile(_: Option<Schedule>) -> Option<Schedule> {
	if let Err(err) = commit_my_pending_encrypted_messages() {
		error!("Failed to commit my encrypted messages: {err:?}");
	}
	if let Err(err) = synchronize_with_other_agents_for_my_profile() {
		error!("Failed to synchronize with other agents: {err:?}");
	}

	Some(Schedule::Persisted("*/30 * * * * * *".into())) // Every 30 seconds
}

pub fn synchronize_with_other_agents_for_my_profile() -> ExternResult<()> {
	let my_pub_key = agent_info()?.agent_latest_pubkey;

	let agents = query_my_linked_devices()?;
	let other_agents = agents.into_iter().filter(|a| a.ne(&my_pub_key));

	let notifications = query_notifications()?;

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

		let mut offline = false;

		for (_, notification) in missing_notifications {
			if !offline {
				let response = call_remote(
					agent.clone(),
					zome_info()?.name,
					"receive_notification".into(),
					None,
					notification.clone(),
				)?;

				match response {
					ZomeCallResponse::Ok(_) => continue,
					_ => offline = true,
				}
			}
			create_encrypted_message(
				agent.clone(),
				NotificationsEncryptedMessage::Notification(notification.clone()),
			)?;
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
			if !offline {
				let response = call_remote(
					agent.clone(),
					zome_info()?.name,
					"receive_change_notifications_status".into(),
					None,
					notifications_status_changes.clone(),
				)?;

				match response {
					ZomeCallResponse::Ok(_) => continue,
					_ => offline = true,
				}
			}

			create_encrypted_message(
				agent.clone(),
				NotificationsEncryptedMessage::NotificationsStatusChanges(
					notifications_status_changes.clone(),
				),
			)?;
		}
	}

	Ok(())
}
