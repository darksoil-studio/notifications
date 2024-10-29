use std::collections::HashMap;

use hdi::prelude::*;
use linked_devices_types::validate_agents_have_linked_devices;

use crate::linked_devices::linked_devices_integrity_zome_name;

#[derive(Serialize, Clone, Deserialize, Debug)]
#[serde(tag = "type")]
pub enum NotificationProvider {
	Email { email_address: String },
}

#[derive(Serialize, Clone, Deserialize, Debug)]
pub struct NotificationTypeSettings {
	enabled: bool,
	providers: HashSet<String>,
}

#[derive(Clone)]
#[hdk_entry_helper]
pub struct NotificationsSettings {
	settings_by_notification_type: HashMap<String, NotificationTypeSettings>,
	available_notification_providers: HashMap<String, NotificationProvider>,
}

pub fn validate_create_notifications_settings(
	_action: EntryCreationAction,
	_notification: NotificationsSettings,
) -> ExternResult<ValidateCallbackResult> {
	Ok(ValidateCallbackResult::Valid)
}
pub fn validate_update_notifications_settings(
	_action: Update,
	_notification: NotificationsSettings,
) -> ExternResult<ValidateCallbackResult> {
	Ok(ValidateCallbackResult::Valid)
}
pub fn validate_delete_notifications_settings(
	_action: Delete,
) -> ExternResult<ValidateCallbackResult> {
	Ok(ValidateCallbackResult::Invalid(String::from(
		"NotificationsSettings cannot be deleted",
	)))
}
pub fn validate_create_link_profile_to_notifications_settings(
	action_hash: ActionHash,
	action: CreateLink,
	base_address: AnyLinkableHash,
	target_address: AnyLinkableHash,
	_tag: LinkTag,
) -> ExternResult<ValidateCallbackResult> {
	// Check the entry type for the given action hash
	let target_action_hash =
		target_address
			.into_action_hash()
			.ok_or(wasm_error!(WasmErrorInner::Guest(
				"No action hash associated with link".to_string()
			)))?;
	let record = must_get_valid_record(target_action_hash)?;
	let _notification_settings: crate::NotificationsSettings = record
		.entry()
		.to_app_option()
		.map_err(|e| wasm_error!(e))?
		.ok_or(wasm_error!(WasmErrorInner::Guest(
			"Linked action must reference an entry".to_string()
		)))?;

	let profile_hash =
		base_address
			.into_action_hash()
			.ok_or(wasm_error!(WasmErrorInner::Guest(
				"No action hash associated with link".to_string()
			)))?;

	let profile_record = must_get_valid_record(profile_hash)?;
	if action.author.eq(profile_record.action().author()) {
		return Ok(ValidateCallbackResult::Valid);
	}

	if let Some(linked_devices_integrity_zome_name) = linked_devices_integrity_zome_name() {
		validate_agents_have_linked_devices(
			&action.author,
			&action_hash,
			profile_record.signed_action.hashed.content.author(),
			profile_record.action_address(),
			linked_devices_integrity_zome_name,
		)
	} else {
		Ok(ValidateCallbackResult::Invalid(String::from(
			"Only agents with the same associated profile can .",
		)))
	}
}

pub fn validate_delete_link_profile_to_notifications_settings(
	action_hash: ActionHash,
	action: DeleteLink,
	original_action: CreateLink,
	base_address: AnyLinkableHash,
	_target: AnyLinkableHash,
	_tag: LinkTag,
) -> ExternResult<ValidateCallbackResult> {
	let profile_hash =
		base_address
			.into_action_hash()
			.ok_or(wasm_error!(WasmErrorInner::Guest(
				"No action hash associated with link".to_string()
			)))?;

	if action.author.eq(&original_action.author) {
		return Ok(ValidateCallbackResult::Valid);
	}

	if let Some(linked_devices_integrity_zome_name) = linked_devices_integrity_zome_name() {
		validate_agents_have_linked_devices(
			&action.author,
			&action_hash,
			&original_action.author,
			&action.link_add_address,
			linked_devices_integrity_zome_name,
		)
	} else {
		Ok(ValidateCallbackResult::Invalid(String::from(
			"Only agents with the same associated profile can mark their notifications as read.",
		)))
	}
}
