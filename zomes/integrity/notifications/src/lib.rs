use hdi::prelude::*;
use notifications_types::*;

pub mod linked_devices;

pub mod notification;
pub use notification::*;

pub mod notifications_status_change;
pub use notifications_status_change::*;

pub mod agent_encrypted_message;
pub use agent_encrypted_message::*;

pub mod notifications_settings;
pub use notifications_settings::*;

#[derive(Serialize, Deserialize, Clone)]
#[serde(tag = "type")]
#[hdk_entry_types]
#[unit_enum(UnitEntryTypes)]
pub enum EntryTypes {
	#[entry_type(visibility = "private")]
	Notification(Notification),
	#[entry_type(visibility = "private")]
	NotificationsStatusChanges(NotificationsStatusChanges),
	NotificationsSettings(NotificationsSettings),
}
#[derive(Serialize, Deserialize)]
#[hdk_link_types]
pub enum LinkTypes {
	AgentEncryptedMessage,
	ProfileToNotificationsSettings,
}
#[hdk_extern]
pub fn genesis_self_check(_data: GenesisSelfCheckData) -> ExternResult<ValidateCallbackResult> {
	Ok(ValidateCallbackResult::Valid)
}
pub fn validate_agent_joining(
	_agent_pub_key: AgentPubKey,
	_membrane_proof: &Option<MembraneProof>,
) -> ExternResult<ValidateCallbackResult> {
	Ok(ValidateCallbackResult::Valid)
}
pub fn action_hash(op: &Op) -> &ActionHash {
	match op {
		Op::StoreRecord(StoreRecord { record }) => record.action_address(),
		Op::StoreEntry(StoreEntry { action, .. }) => &action.hashed.hash,
		Op::RegisterUpdate(RegisterUpdate { update, .. }) => &update.hashed.hash,
		Op::RegisterDelete(RegisterDelete { delete, .. }) => &delete.hashed.hash,
		Op::RegisterAgentActivity(RegisterAgentActivity { action, .. }) => &action.hashed.hash,
		Op::RegisterCreateLink(RegisterCreateLink { create_link }) => &create_link.hashed.hash,
		Op::RegisterDeleteLink(RegisterDeleteLink { delete_link, .. }) => &delete_link.hashed.hash,
	}
}
#[hdk_extern]
pub fn validate(op: Op) -> ExternResult<ValidateCallbackResult> {
	match op.flattened::<EntryTypes, LinkTypes>()? {
		FlatOp::StoreEntry(store_entry) => match store_entry {
			OpEntry::CreateEntry { app_entry, action } => match app_entry {
				EntryTypes::Notification(notification) => {
					validate_create_notification(EntryCreationAction::Create(action), notification)
				}
				EntryTypes::NotificationsStatusChanges(notification_status_change) => {
					validate_create_notifications_status_change(
						EntryCreationAction::Create(action),
						notification_status_change,
					)
				}
				EntryTypes::NotificationsSettings(notifications_settings) => {
					validate_create_notifications_settings(
						EntryCreationAction::Create(action),
						notifications_settings,
					)
				}
			},
			OpEntry::UpdateEntry {
				app_entry, action, ..
			} => match app_entry {
				EntryTypes::Notification(notification) => {
					validate_create_notification(EntryCreationAction::Update(action), notification)
				}
				EntryTypes::NotificationsStatusChanges(notifications_status_change) => {
					validate_create_notifications_status_change(
						EntryCreationAction::Update(action),
						notifications_status_change,
					)
				}
				EntryTypes::NotificationsSettings(notifications_settings) => {
					validate_create_notifications_settings(
						EntryCreationAction::Update(action),
						notifications_settings,
					)
				}
			},
			_ => Ok(ValidateCallbackResult::Valid),
		},
		FlatOp::RegisterUpdate(update_entry) => match update_entry {
			OpUpdate::Entry { app_entry, action } => match app_entry {
				EntryTypes::Notification(notification) => {
					validate_update_notification(action, notification)
				}
				EntryTypes::NotificationsStatusChanges(notifications_status_change) => {
					validate_update_notifications_status_change(action, notifications_status_change)
				}
				EntryTypes::NotificationsSettings(notifications_settings) => {
					validate_update_notifications_settings(action, notifications_settings)
				}
			},
			_ => Ok(ValidateCallbackResult::Valid),
		},
		FlatOp::RegisterDelete(delete_entry) => {
			let action = delete_entry.action;
			let original_action_hash = action.deletes_address.clone();
			let original_record = must_get_valid_record(original_action_hash)?;
			let original_action = original_record.action().clone();
			let original_action = match original_action {
				Action::Create(create) => EntryCreationAction::Create(create),
				Action::Update(update) => EntryCreationAction::Update(update),
				_ => {
					return Ok(ValidateCallbackResult::Invalid(
						"Original action for a delete must be a Create or Update action"
							.to_string(),
					));
				}
			};
			let app_entry_type = match original_action.entry_type() {
				EntryType::App(app_entry_type) => app_entry_type,
				_ => {
					return Ok(ValidateCallbackResult::Valid);
				}
			};
			let entry = match original_record.entry().as_option() {
				Some(entry) => entry,
				None => {
					return Ok(ValidateCallbackResult::Invalid(
						"Original record for a delete must contain an entry".to_string(),
					));
				}
			};
			let original_app_entry = match EntryTypes::deserialize_from_type(
				app_entry_type.zome_index,
				app_entry_type.entry_index,
				entry,
			)? {
				Some(app_entry) => app_entry,
				None => {
					return Ok(ValidateCallbackResult::Invalid(
						"Original app entry must be one of the defined entry types for this zome"
							.to_string(),
					));
				}
			};
			match original_app_entry {
				EntryTypes::Notification(_) => validate_delete_notification(action),
				EntryTypes::NotificationsStatusChanges(_) => {
					validate_delete_notifications_status_change(action)
				}
				EntryTypes::NotificationsSettings(_) => {
					validate_delete_notifications_settings(action)
				}
			}
		}
		FlatOp::RegisterCreateLink {
			link_type,
			base_address,
			target_address,
			tag,
			action,
		} => match link_type {
			LinkTypes::AgentEncryptedMessage => validate_create_link_agent_encrypted_message(
				action,
				base_address,
				target_address,
				tag,
			),
			LinkTypes::ProfileToNotificationsSettings => {
				validate_create_link_profile_to_notifications_settings(
					action_hash(&op).clone(),
					action,
					base_address,
					target_address,
					tag,
				)
			}
		},
		FlatOp::RegisterDeleteLink {
			link_type,
			base_address,
			target_address,
			tag,
			original_action,
			action,
		} => match link_type {
			LinkTypes::AgentEncryptedMessage => validate_delete_link_agent_encrypted_message(
				action_hash(&op).clone(),
				action,
				original_action,
				base_address,
				target_address,
				tag,
			),
			LinkTypes::ProfileToNotificationsSettings => {
				validate_delete_link_profile_to_notifications_settings(
					action_hash(&op).clone(),
					action,
					original_action,
					base_address,
					target_address,
					tag,
				)
			}
		},
		FlatOp::StoreRecord(store_record) => match store_record {
			OpRecord::CreateEntry { app_entry, action } => match app_entry {
				EntryTypes::Notification(notification) => {
					validate_create_notification(EntryCreationAction::Create(action), notification)
				}
				EntryTypes::NotificationsStatusChanges(notifications_status_change) => {
					validate_create_notifications_status_change(
						EntryCreationAction::Create(action),
						notifications_status_change,
					)
				}
				EntryTypes::NotificationsSettings(notifications_settings) => {
					validate_create_notifications_settings(
						EntryCreationAction::Create(action),
						notifications_settings,
					)
				}
			},
			OpRecord::UpdateEntry {
				app_entry, action, ..
			} => match app_entry {
				EntryTypes::Notification(notification) => {
					let result = validate_create_notification(
						EntryCreationAction::Update(action.clone()),
						notification.clone(),
					)?;
					let ValidateCallbackResult::Valid = result else {
						return Ok(result);
					};
					validate_update_notification(action, notification)
				}
				EntryTypes::NotificationsStatusChanges(notifications_status_change) => {
					let result = validate_create_notifications_status_change(
						EntryCreationAction::Update(action.clone()),
						notifications_status_change.clone(),
					)?;
					let ValidateCallbackResult::Valid = result else {
						return Ok(result);
					};
					validate_update_notifications_status_change(action, notifications_status_change)
				}
				EntryTypes::NotificationsSettings(notifications_settings) => {
					let result = validate_create_notifications_settings(
						EntryCreationAction::Update(action.clone()),
						notifications_settings.clone(),
					)?;
					let ValidateCallbackResult::Valid = result else {
						return Ok(result);
					};
					validate_update_notifications_settings(action, notifications_settings)
				}
			},
			OpRecord::DeleteEntry {
				original_action_hash,
				action,
				..
			} => {
				let original_record = must_get_valid_record(original_action_hash)?;
				let original_action = original_record.action().clone();
				let original_action = match original_action {
					Action::Create(create) => EntryCreationAction::Create(create),
					Action::Update(update) => EntryCreationAction::Update(update),
					_ => {
						return Ok(ValidateCallbackResult::Invalid(
							"Original action for a delete must be a Create or Update action"
								.to_string(),
						));
					}
				};
				let app_entry_type = match original_action.entry_type() {
					EntryType::App(app_entry_type) => app_entry_type,
					_ => {
						return Ok(ValidateCallbackResult::Valid);
					}
				};
				let entry = match original_record.entry().as_option() {
					Some(entry) => entry,
					None => {
						return Ok(ValidateCallbackResult::Invalid(
							"Original record for a delete must contain an entry".to_string(),
						));
					}
				};
				let original_app_entry = match EntryTypes::deserialize_from_type(
					app_entry_type.zome_index,
					app_entry_type.entry_index,
					entry,
				)? {
					Some(app_entry) => app_entry,
					None => {
						return Ok(
                ValidateCallbackResult::Invalid(
                    "Original app entry must be one of the defined entry types for this zome"
                        .to_string(),
                ),
            );
					}
				};
				match original_app_entry {
					EntryTypes::Notification(_) => validate_delete_notification(action),
					EntryTypes::NotificationsStatusChanges(_) => {
						validate_delete_notifications_status_change(action)
					}
					EntryTypes::NotificationsSettings(_) => {
						validate_delete_notifications_settings(action)
					}
				}
			}
			OpRecord::CreateLink {
				base_address,
				target_address,
				tag,
				link_type,
				action,
			} => match link_type {
				LinkTypes::AgentEncryptedMessage => validate_create_link_agent_encrypted_message(
					action,
					base_address,
					target_address,
					tag,
				),
				LinkTypes::ProfileToNotificationsSettings => {
					validate_create_link_profile_to_notifications_settings(
						action_hash(&op).clone(),
						action,
						base_address,
						target_address,
						tag,
					)
				}
			},
			OpRecord::DeleteLink {
				original_action_hash,
				base_address,
				action,
			} => {
				let record = must_get_valid_record(original_action_hash)?;
				let create_link = match record.action() {
					Action::CreateLink(create_link) => create_link.clone(),
					_ => {
						return Ok(ValidateCallbackResult::Invalid(
							"The action that a DeleteLink deletes must be a CreateLink".to_string(),
						));
					}
				};
				let link_type =
					match LinkTypes::from_type(create_link.zome_index, create_link.link_type)? {
						Some(lt) => lt,
						None => {
							return Ok(ValidateCallbackResult::Valid);
						}
					};
				match link_type {
					LinkTypes::AgentEncryptedMessage => {
						validate_delete_link_agent_encrypted_message(
							action_hash(&op).clone(),
							action,
							create_link.clone(),
							base_address,
							create_link.target_address,
							create_link.tag,
						)
					}
					LinkTypes::ProfileToNotificationsSettings => {
						validate_delete_link_profile_to_notifications_settings(
							action_hash(&op).clone(),
							action,
							create_link.clone(),
							base_address,
							create_link.target_address,
							create_link.tag,
						)
					}
				}
			}
			OpRecord::CreatePrivateEntry { .. } => Ok(ValidateCallbackResult::Valid),
			OpRecord::UpdatePrivateEntry { .. } => Ok(ValidateCallbackResult::Valid),
			OpRecord::CreateCapClaim { .. } => Ok(ValidateCallbackResult::Valid),
			OpRecord::CreateCapGrant { .. } => Ok(ValidateCallbackResult::Valid),
			OpRecord::UpdateCapClaim { .. } => Ok(ValidateCallbackResult::Valid),
			OpRecord::UpdateCapGrant { .. } => Ok(ValidateCallbackResult::Valid),
			OpRecord::Dna { .. } => Ok(ValidateCallbackResult::Valid),
			OpRecord::OpenChain { .. } => Ok(ValidateCallbackResult::Valid),
			OpRecord::CloseChain { .. } => Ok(ValidateCallbackResult::Valid),
			OpRecord::InitZomesComplete { .. } => Ok(ValidateCallbackResult::Valid),
			_ => Ok(ValidateCallbackResult::Valid),
		},
		FlatOp::RegisterAgentActivity(agent_activity) => match agent_activity {
			OpActivity::CreateAgent { agent, action } => {
				let previous_action = must_get_action(action.prev_action)?;
				match previous_action.action() {
					Action::AgentValidationPkg(AgentValidationPkg { membrane_proof, .. }) => {
						validate_agent_joining(agent, membrane_proof)
					}
					_ => Ok(ValidateCallbackResult::Invalid(
						"The previous action for a `CreateAgent` action must be an `AgentValidationPkg`"
							.to_string(),
					)),
				}
			}
			_ => Ok(ValidateCallbackResult::Valid),
		},
	}
}
