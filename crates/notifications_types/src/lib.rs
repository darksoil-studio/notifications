use std::collections::BTreeMap;

use hdi::prelude::*;

#[hdk_entry_helper]
#[derive(Clone, PartialEq)]
pub struct Notification {
	pub zome_name: ZomeName,
	pub notification_type: String,
	pub notification_group: String,
	pub recipient: AgentPubKey,
	pub timestamp: Timestamp,
	pub content: SerializedBytes,
}

#[hdk_entry_helper]
#[derive(Clone, PartialEq)]
pub struct NotificationsStatusChanges {
	pub status_changes: BTreeMap<EntryHashB64, NotificationStatus>,
	pub timestamp: Timestamp,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub enum NotificationStatus {
	Unread,
	Read,
	Dismissed,
}

#[derive(Serialize, Deserialize, SerializedBytes, Debug, Clone, PartialEq)]
#[serde(tag = "type")]
pub enum NotificationsEncryptedMessage {
	Notification(Notification),
	NotificationsStatusChanges(NotificationsStatusChanges),
}

#[derive(Serialize, Deserialize, Debug)]
pub struct SendNotificationInput {
	pub zome_name: ZomeName,
	pub notification_type: String,
	pub notification_group: String,
	pub recipient: AgentPubKey,
	pub content: SerializedBytes,
}
