use std::collections::HashMap;

use hdi::prelude::*;

#[derive(Serialize, Clone, Deserialize, Debug)]
#[serde(tag = "type")]
pub enum NotificationProvider {
	Email { email_address: String },
}

#[derive(Serialize, Clone, Deserialize, Debug)]
pub struct NotificationTypeSettings {
	enabled: bool,
	providers: Vec<NotificationProvider>,
}

#[derive(Clone)]
#[hdk_entry_helper]
pub struct NotificationsSettings {
	settings_by_notification_type: HashMap<String, NotificationTypeSettings>,
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
pub fn validate_create_link_agent_to_notifications_settings(
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
pub fn validate_delete_link_agent_to_notifications_settings(
	_action: DeleteLink,
	_original_action: CreateLink,
	_base: AnyLinkableHash,
	_target: AnyLinkableHash,
	_tag: LinkTag,
) -> ExternResult<ValidateCallbackResult> {
	// TODO: add the appropriate validation rules
	Ok(ValidateCallbackResult::Valid)
}
