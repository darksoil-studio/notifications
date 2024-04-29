use hdi::prelude::*;
#[hdk_entry_helper]
#[derive(Clone, PartialEq)]
pub struct Notification {
	pub notification_type: String,
	pub notification_group: Option<String>,
	pub persistent: bool,
	pub recipients: Vec<AgentPubKey>,
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
	_base_address: AnyLinkableHash,
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
	let _notification: crate::Notification = record
		.entry()
		.to_app_option()
		.map_err(|e| wasm_error!(e))?
		.ok_or(wasm_error!(WasmErrorInner::Guest(
			"Linked action must reference an entry".to_string()
		)))?;
	// TODO: add the appropriate validation rules
	Ok(ValidateCallbackResult::Valid)
}
pub fn validate_delete_link_recipient_to_notifications(
	_action: DeleteLink,
	_original_action: CreateLink,
	_base: AnyLinkableHash,
	_target: AnyLinkableHash,
	_tag: LinkTag,
) -> ExternResult<ValidateCallbackResult> {
	// TODO: add the appropriate validation rules
	Ok(ValidateCallbackResult::Valid)
}
