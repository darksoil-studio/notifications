use hdi::prelude::*;

pub fn validate_create_link_agent_encrypted_message(
	action: CreateLink,
	base_address: AnyLinkableHash,
	target_address: AnyLinkableHash,
	_tag: LinkTag,
) -> ExternResult<ValidateCallbackResult> {
	Ok(ValidateCallbackResult::Valid)
}
pub fn validate_delete_link_agent_encrypted_message(
	action_hash: ActionHash,
	action: DeleteLink,
	_original_action: CreateLink,
	base: AnyLinkableHash,
	_target: AnyLinkableHash,
	_tag: LinkTag,
) -> ExternResult<ValidateCallbackResult> {
	// Check the entry type for the given action hash
	let agent = base
		.into_agent_pub_key()
		.ok_or(wasm_error!(WasmErrorInner::Guest(
			"Base of a ReadNotifications link must be a profile ActionHash".to_string()
		)))?;

	if agent.ne(&action.author) {
		return Ok(ValidateCallbackResult::Invalid(String::from(
			"Encrypted messages can only be deleted by their recipients",
		)));
	}

	Ok(ValidateCallbackResult::Valid)
}
