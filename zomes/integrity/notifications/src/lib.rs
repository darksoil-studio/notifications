use hdi::prelude::*;

pub mod notification;
pub use notification::*;

pub mod read_notifications;
pub use read_notifications::*;

pub mod notifications_settings;
pub use notifications_settings::*;

#[derive(Serialize, Deserialize)]
#[serde(tag = "type")]
#[hdk_entry_types]
#[unit_enum(UnitEntryTypes)]
pub enum EntryTypes {
	Notification(Notification),
	NotificationsSettings(NotificationsSettings),
}
#[derive(Serialize, Deserialize)]
#[hdk_link_types]
pub enum LinkTypes {
	RecipientToNotifications,
	ReadNotifications,
	AgentToNotificationsSettings,
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
#[hdk_extern]
pub fn validate(op: Op) -> ExternResult<ValidateCallbackResult> {
	match op.flattened::<EntryTypes, LinkTypes>()? {
		FlatOp::StoreEntry(store_entry) => match store_entry {
			OpEntry::CreateEntry { app_entry, action } => match app_entry {
				EntryTypes::Notification(notification) => {
					validate_create_notification(EntryCreationAction::Create(action), notification)
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
				EntryTypes::NotificationsSettings(notifications_settings) => {
					validate_update_notifications_settings(action, notifications_settings)
				}
			},
			_ => Ok(ValidateCallbackResult::Valid),
		},
		FlatOp::RegisterDelete(delete_entry) => validate_delete_notification(delete_entry.action),
		FlatOp::RegisterCreateLink {
			link_type,
			base_address,
			target_address,
			tag,
			action,
		} => match link_type {
			LinkTypes::RecipientToNotifications => validate_create_link_recipient_to_notifications(
				action,
				base_address,
				target_address,
				tag,
			),
			LinkTypes::ReadNotifications => {
				validate_create_link_read_notifications(action, base_address, target_address, tag)
			}
			LinkTypes::AgentToNotificationsSettings => {
				validate_create_link_agent_to_notifications_settings(
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
			LinkTypes::RecipientToNotifications => validate_delete_link_recipient_to_notifications(
				action,
				original_action,
				base_address,
				target_address,
				tag,
			),
			LinkTypes::ReadNotifications => validate_delete_link_read_notifications(
				action,
				original_action,
				base_address,
				target_address,
				tag,
			),
			LinkTypes::AgentToNotificationsSettings => {
				validate_delete_link_agent_to_notifications_settings(
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
			OpRecord::DeleteEntry { action, .. } => validate_delete_notification(action),
			OpRecord::CreateLink {
				base_address,
				target_address,
				tag,
				link_type,
				action,
			} => match link_type {
				LinkTypes::RecipientToNotifications => {
					validate_create_link_recipient_to_notifications(
						action,
						base_address,
						target_address,
						tag,
					)
				}
				LinkTypes::ReadNotifications => validate_create_link_read_notifications(
					action,
					base_address,
					target_address,
					tag,
				),
				LinkTypes::AgentToNotificationsSettings => {
					validate_create_link_agent_to_notifications_settings(
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
					LinkTypes::RecipientToNotifications => {
						validate_delete_link_recipient_to_notifications(
							action,
							create_link.clone(),
							base_address,
							create_link.target_address,
							create_link.tag,
						)
					}
					LinkTypes::ReadNotifications => validate_delete_link_read_notifications(
						action,
						create_link.clone(),
						base_address,
						create_link.target_address,
						create_link.tag,
					),
					LinkTypes::AgentToNotificationsSettings => {
						validate_delete_link_agent_to_notifications_settings(
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
