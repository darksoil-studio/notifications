use std::collections::BTreeMap;

use hc_zome_trait_notifications::*;
use hc_zome_traits::implement_zome_trait_as_externs;
use hdk::prelude::*;

struct ExampleNotifications;

#[implement_zome_trait_as_externs]
impl NotificationsZomeTrait for ExampleNotifications {
	fn get_notifications_types(
		locale: String,
	) -> ExternResult<std::collections::BTreeMap<String, NotificationType>> {
		let mut notifications_types = BTreeMap::new();

		Ok(notifications_types)
	}
	fn get_notification_contents(
		input: GetNotificationContentsInput,
	) -> ExternResult<NotificationContents> {
		Ok(NotificationContents {
			title: String::from("Hiii"),
			body: String::from("aaaa"),
			icon_src: format!(
				"data:image/svg+xml;charset=utf-8,{}",
				md_icons::filled::ICON_NOTIFICATIONS
			),
			url_path_to_navigate_to_on_click: Some(String::from("/someurl")),
		})
	}
}
