use hc_zome_traits::*;
use hdk::prelude::*;
use notifications_types::*;
use std::collections::BTreeMap;

#[derive(Serialize, Deserialize, Debug)]
pub struct NotificationType {
	name: String,
	description: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct NotificationContents {
	pub title: String,
	pub body: String,
	pub url_path_to_navigate_to_on_click: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct GetNotificationContentsInput {
	notification: Notification,
	locale: String,
}

#[zome_trait]
pub trait NotificationsZomeTrait {
	fn get_notifications_types(locale: String) -> ExternResult<BTreeMap<String, NotificationType>>;

	fn get_notification_contents(
		input: GetNotificationContentsInput,
	) -> ExternResult<NotificationContents>;
}
