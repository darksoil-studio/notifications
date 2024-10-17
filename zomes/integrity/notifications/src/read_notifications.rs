use hdi::prelude::*;
use profiles_types::validate_profile_for_agent;

use crate::profiles::profiles_zome_name;

pub fn validate_create_link_read_notifications(
	action_hash: ActionHash,
	action: CreateLink,
	base_address: AnyLinkableHash,
	target_address: AnyLinkableHash,
	_tag: LinkTag,
) -> ExternResult<ValidateCallbackResult> {
	// Check the entry type for the given action hash
	let base_profile_hash =
		base_address
			.into_action_hash()
			.ok_or(wasm_error!(WasmErrorInner::Guest(
				"Base of a ReadNotifications link must be a profile ActionHash".to_string()
			)))?;
	let target_profile_hash =
		target_address
			.into_action_hash()
			.ok_or(wasm_error!(WasmErrorInner::Guest(
				"Target of a ReadNotifications link must be a profile ActionHash".to_string()
			)))?;

	if !target_profile_hash.eq(&base_profile_hash) {
		return Ok(ValidateCallbackResult::Invalid(String::from(
			"Base and target must be the same for a ReadNotifications link.",
		)));
	}

	let result = validate_profile_for_agent(
		action.author,
		action_hash,
		base_profile_hash,
		&profiles_zome_name(),
	)?;

	let ValidateCallbackResult::Valid = result else {
		return Ok(ValidateCallbackResult::Invalid(String::from(
			"Only agents with the same associated profile can mark their notifications as read.",
		)));
	};

	Ok(ValidateCallbackResult::Valid)
}
pub fn validate_delete_link_read_notifications(
	action_hash: ActionHash,
	action: DeleteLink,
	_original_action: CreateLink,
	base: AnyLinkableHash,
	_target: AnyLinkableHash,
	_tag: LinkTag,
) -> ExternResult<ValidateCallbackResult> {
	// Check the entry type for the given action hash
	let profile_hash = base
		.into_action_hash()
		.ok_or(wasm_error!(WasmErrorInner::Guest(
			"Base of a ReadNotifications link must be a profile ActionHash".to_string()
		)))?;

	let result = validate_profile_for_agent(
		action.author,
		action_hash,
		profile_hash,
		&profiles_zome_name(),
	)?;
	let ValidateCallbackResult::Valid = result else {
		return Ok(ValidateCallbackResult::Invalid(String::from(
			"Only the agents with the same associated profile can mark their notifications as read.",
		)));
	};

	Ok(ValidateCallbackResult::Valid)
}
