use hdi::prelude::*;
use notifications_types::NotificationsStatusChanges;

pub fn validate_create_notifications_status_change(
	_action: EntryCreationAction,
	_notification_status_change: NotificationsStatusChanges,
) -> ExternResult<ValidateCallbackResult> {
	Ok(ValidateCallbackResult::Valid)
}
pub fn validate_update_notifications_status_change(
	_action: Update,
	_notification_status_change: NotificationsStatusChanges,
) -> ExternResult<ValidateCallbackResult> {
	Ok(ValidateCallbackResult::Invalid(String::from(
		"NotificationsStatusChanges cannot be updated",
	)))
}
pub fn validate_delete_notifications_status_change(
	_action: Delete,
) -> ExternResult<ValidateCallbackResult> {
	Ok(ValidateCallbackResult::Invalid(String::from(
		"NotificationsStatusChanges cannot be deleted",
	)))
}
