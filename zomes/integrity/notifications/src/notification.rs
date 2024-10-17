use hdi::prelude::*;
use profiles_types::validate_profile_for_agent;

use crate::profiles::profiles_zome_name;
#[hdk_entry_helper]
#[derive(Clone, PartialEq)]
pub struct Notification {
	pub notification_type: String,
	pub notification_group: String,
	pub persistent: bool,
	pub recipients_profiles_hashes: Vec<ActionHash>,
	pub content: SerializedBytes,
}
pub fn validate_create_notification(
	_action: EntryCreationAction,
	_notification: Notification,
) -> ExternResult<ValidateCallbackResult> {
	Ok(ValidateCallbackResult::Valid)
}
pub fn validate_update_notification(
	_action: Update,
	_notification: Notification,
) -> ExternResult<ValidateCallbackResult> {
	Ok(ValidateCallbackResult::Invalid(String::from(
		"Notifications cannot be updated",
	)))
}
pub fn validate_delete_notification(_action: Delete) -> ExternResult<ValidateCallbackResult> {
	Ok(ValidateCallbackResult::Valid)
}
pub fn validate_create_link_recipient_to_notifications(
	_action: CreateLink,
	base_address: AnyLinkableHash,
	target_address: AnyLinkableHash,
	_tag: LinkTag,
) -> ExternResult<ValidateCallbackResult> {
	// Check the entry type for the given action hash
	let action_hash =
		target_address
			.into_action_hash()
			.ok_or(wasm_error!(WasmErrorInner::Guest(
				"No action hash associated with link".to_string()
			)))?;
	let record = must_get_valid_record(action_hash)?;
	let notification: crate::Notification = record
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

	if !notification
		.recipients_profiles_hashes
		.contains(&profile_hash)
	{
		return Ok(ValidateCallbackResult::Invalid(format!(
			"The base profile hash is not included in the recipients_profiles_hashes"
		)));
	}

	Ok(ValidateCallbackResult::Valid)
}
pub fn validate_delete_link_recipient_to_notifications(
	action_hash: ActionHash,
	action: DeleteLink,
	_original_action: CreateLink,
	base: AnyLinkableHash,
	_target: AnyLinkableHash,
	_tag: LinkTag,
) -> ExternResult<ValidateCallbackResult> {
	let profile_hash = base
		.into_action_hash()
		.ok_or(wasm_error!(WasmErrorInner::Guest(
			"No action hash associated with link".to_string()
		)))?;

	let result = validate_profile_for_agent(
		action.author,
		action_hash,
		profile_hash,
		&profiles_zome_name(),
	)?;

	let ValidateCallbackResult::Valid = result else {
		return Ok(ValidateCallbackResult::Invalid(String::from(
			"Only agents with the same associated profile can dismiss their notifications.",
		)));
	};

	Ok(ValidateCallbackResult::Valid)
}
