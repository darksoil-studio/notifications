use hc_zome_traits::*;
use hdk::prelude::*;
use notifications_types::*;
use std::collections::BTreeMap;

#[derive(Serialize, Deserialize, Debug)]
pub struct NotificationType {
	pub name: String,
	pub description: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct NotificationContents {
	pub title: String,
	pub body: String,
	pub icon_src: String,
	pub url_path_to_navigate_to_on_click: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct GetNotificationContentsInput {
	pub notification: Notification,
	pub locale: String,
}

#[zome_trait]
pub trait NotificationsZomeTrait {
	fn get_notifications_types(locale: String) -> ExternResult<BTreeMap<String, NotificationType>>;

	fn get_notification_contents(
		input: GetNotificationContentsInput,
	) -> ExternResult<NotificationContents>;
}
