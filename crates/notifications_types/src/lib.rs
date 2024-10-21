use std::collections::BTreeMap;

use hdi::prelude::*;

#[hdk_entry_helper]
#[derive(Clone, PartialEq)]
pub struct Notification {
	pub zome_name: ZomeName,
	pub notification_type: String,
	pub notification_group: String,
	pub recipient_profile_hash: ActionHash,
	pub timestamp: Timestamp,
	pub content: SerializedBytes,
}

#[hdk_entry_helper]
#[derive(Clone, PartialEq)]
pub struct NotificationsStatusChanges {
	pub status_changes: BTreeMap<EntryHash, NotificationStatus>,
	pub timestamp: Timestamp,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
#[serde(tag = "type")]
pub enum NotificationStatus {
	Unread,
	Read,
	Dismissed,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
#[serde(tag = "type")]
pub enum NotificationsEncryptedMessage {
	Notification(Notification),
	NotificationStatusChanges(NotificationsStatusChanges),
}
