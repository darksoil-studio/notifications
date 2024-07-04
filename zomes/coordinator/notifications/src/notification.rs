use hdk::prelude::*;
use notifications_integrity::*;

use crate::{
	get_entry_for_action,
	utils::{create_link_relaxed, create_relaxed, delete_link_relaxed, delete_relaxed},
};

pub const MAX_TAG_SIZE: usize = 1000;

#[hdk_extern]
pub fn create_notification(notification: Notification) -> ExternResult<()> {
	create_relaxed(EntryTypes::Notification(notification.clone()))?;
	Ok(())
}

// Only to be called by post_commit
#[hdk_extern]
pub fn create_notification_link(notification_hash: ActionHash) -> ExternResult<()> {
	let app_entry = get_entry_for_action(&notification_hash)?;
	if let Some(EntryTypes::Notification(notification)) = app_entry {
		for base in notification.recipients.clone() {
			create_link_relaxed(
				base,
				notification_hash.clone(),
				LinkTypes::RecipientToNotifications,
				notification.notification_group.clone(),
			)?;
		}
	}
	Ok(())
}

#[hdk_extern]
pub fn get_notification(notification_hash: ActionHash) -> ExternResult<Option<Record>> {
	let Some(details) = get_details(notification_hash, GetOptions::default())? else {
		return Ok(None);
	};
	match details {
		Details::Record(details) => Ok(Some(details.record)),
		_ => Err(wasm_error!(WasmErrorInner::Guest(
			"Malformed get details response".to_string()
		))),
	}
}

#[derive(Serialize, Deserialize, Debug, SerializedBytes)]
pub struct ReadNotifications(pub Vec<ActionHash>);

#[hdk_extern]
pub fn mark_notifications_as_read(notifications_hashes: Vec<ActionHash>) -> ExternResult<()> {
	let hash_size = 39;
	let max_hashes_per_link_tag = (MAX_TAG_SIZE / hash_size) - 1;

	let chunks = notifications_hashes.chunks(max_hashes_per_link_tag);

	for chunk in chunks.into_iter() {
		let read_notifications = ReadNotifications(chunk.to_vec());

		let bytes = SerializedBytes::try_from(read_notifications).map_err(|err| {
			wasm_error!(WasmErrorInner::Guest(format!(
				"Failed to serialize ReadNotifications {err:?}"
			)))
		})?;

		create_link_relaxed(
			agent_info()?.agent_latest_pubkey,
			agent_info()?.agent_latest_pubkey,
			LinkTypes::ReadNotifications,
			bytes.bytes().to_vec(),
		)?;
	}

	Ok(())
}

#[hdk_extern]
pub fn dismiss_notifications(notifications_hashes: Vec<ActionHash>) -> ExternResult<()> {
	for hash in notifications_hashes.iter() {
		dismiss_notification(hash.clone())?;
	}

	let read_links = get_read_notifications(())?.into_iter();

	let undismissed_notifications_hashes: HashSet<ActionHash> = get_undismissed_notifications(())?
		.into_iter()
		.filter_map(|link| link.target.into_action_hash())
		.collect();

	// Iterate over the read links
	for link in read_links {
		let sb = SerializedBytes::from(UnsafeBytes::from(link.tag.0));
		let read_notifications_hashes = ReadNotifications::try_from(sb).map_err(|err| {
			wasm_error!(WasmErrorInner::Guest(format!(
				"Failed to serialize ReadNotifications {err:?}"
			)))
		})?;

		if read_notifications_hashes.0.iter().all(|hash| {
			notifications_hashes.contains(hash) || !undismissed_notifications_hashes.contains(hash)
		}) {
			delete_link_relaxed(link.create_link_hash)?;
		}
	}

	Ok(())
}

fn dismiss_notification(notification_hash: ActionHash) -> ExternResult<()> {
	let links = get_undismissed_notifications(())?;

	for link in links {
		if let Some(action_hash) = link.target.into_action_hash() {
			if action_hash.eq(&notification_hash) {
				delete_link_relaxed(link.create_link_hash)?;
			}
		}
	}
	delete_relaxed(notification_hash)
}

#[hdk_extern]
pub fn get_all_deletes_for_notification(
	original_notification_hash: ActionHash,
) -> ExternResult<Option<Vec<SignedActionHashed>>> {
	let Some(details) = get_details(original_notification_hash, GetOptions::default())? else {
		return Ok(None);
	};
	match details {
		Details::Entry(_) => Err(wasm_error!(WasmErrorInner::Guest(
			"Malformed details".into()
		))),
		Details::Record(record_details) => Ok(Some(record_details.deletes)),
	}
}

#[hdk_extern]
pub fn get_undismissed_notifications() -> ExternResult<Vec<Link>> {
	get_links(
		GetLinksInputBuilder::try_new(
			agent_info()?.agent_latest_pubkey,
			LinkTypes::RecipientToNotifications,
		)?
		.build(),
	)
}

#[hdk_extern]
pub fn get_read_notifications() -> ExternResult<Vec<Link>> {
	get_links(
		GetLinksInputBuilder::try_new(
			agent_info()?.agent_latest_pubkey,
			LinkTypes::ReadNotifications,
		)?
		.build(),
	)
}

#[hdk_extern]
pub fn get_dismissed_notifications(
) -> ExternResult<Vec<(SignedActionHashed, Vec<SignedActionHashed>)>> {
	let details = get_link_details(
		agent_info()?.agent_latest_pubkey,
		LinkTypes::RecipientToNotifications,
		None,
		GetOptions::default(),
	)?;
	Ok(details
		.into_inner()
		.into_iter()
		.filter(|(_link, deletes)| !deletes.is_empty())
		.collect())
}
