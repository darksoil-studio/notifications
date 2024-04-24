use hdk::prelude::*;
use holochain::sweettest::*;

use notifications_integrity::*;

pub async fn sample_notification_1(conductor: &SweetConductor, zome: &SweetZome) -> Notification {
	Notification {
		notification_type: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.".to_string(),
		notification_group: Some(
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit.".to_string(),
		),
		persistent: true,
		recipients: vec![zome.cell_id().agent_pubkey().clone()],
		content: SerializedBytes::from(UnsafeBytes::from(vec![])),
	}
}

pub async fn sample_notification_2(conductor: &SweetConductor, zome: &SweetZome) -> Notification {
	Notification {
		notification_type: "Lorem ipsum 2".to_string(),
		notification_group: Some("Lorem ipsum 2".to_string()),
		persistent: true,
		recipients: vec![zome.cell_id().agent_pubkey().clone()],
		content: SerializedBytes::from(UnsafeBytes::from(vec![])),
	}
}

pub async fn create_notification(
	conductor: &SweetConductor,
	zome: &SweetZome,
	notification: Notification,
) -> Record {
	let record: Record = conductor
		.call(zome, "create_notification", notification)
		.await;
	record
}
