use hdi::prelude::*;
use notifications_types::Notification;

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
	Ok(ValidateCallbackResult::Invalid(String::from(
		"Notifications cannot be deleted",
	)))
}
