use hdk::prelude::*;
use notifications_integrity::*;

pub mod notification;
pub mod notifications_settings;
pub mod utils;

#[hdk_extern]
pub fn init(_: ()) -> ExternResult<InitCallbackResult> {
	let mut fns: BTreeSet<GrantedFunction> = BTreeSet::new();
	fns.insert((zome_info()?.name, FunctionName::from("recv_remote_signal")));
	let functions = GrantedFunctions::Listed(fns);
	let cap_grant = ZomeCallCapGrant {
		tag: String::from("recv_remote_signal"),
		access: CapAccess::Unrestricted,
		functions,
	};
	create_cap_grant(cap_grant)?;

	Ok(InitCallbackResult::Pass)
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(tag = "type")]
pub enum Signal {
	LinkCreated {
		action: SignedActionHashed,
		link_type: LinkTypes,
	},
	LinkDeleted {
		action: SignedActionHashed,
		create_link_action: SignedActionHashed,
		link_type: LinkTypes,
	},
	EntryCreated {
		action: SignedActionHashed,
		app_entry: EntryTypes,
	},
	EntryUpdated {
		action: SignedActionHashed,
		app_entry: EntryTypes,
		original_app_entry: EntryTypes,
	},
	EntryDeleted {
		action: SignedActionHashed,
		original_app_entry: EntryTypes,
	},
}

#[derive(Serialize, Deserialize, Debug, SerializedBytes)]
pub enum NotificationsRemoteSignal {
	NewNotification(SignedActionHashed),
}

#[hdk_extern]
pub fn recv_remote_signal(signal: NotificationsRemoteSignal) -> ExternResult<()> {
	// TODO: take into account wether the recipient has the notification enabled in their settings
	match signal {
		NotificationsRemoteSignal::NewNotification(action) => emit_signal(Signal::LinkCreated {
			action,
			link_type: LinkTypes::RecipientToNotifications,
		}),
	}
}

#[hdk_extern(infallible)]
pub fn post_commit(committed_actions: Vec<SignedActionHashed>) {
	for action in committed_actions {
		if let Err(err) = signal_action(action) {
			error!("Error signaling new action: {:?}", err);
		}
	}
}
fn signal_action(action: SignedActionHashed) -> ExternResult<()> {
	match action.hashed.content.clone() {
		Action::CreateLink(create_link) => {
			if let Ok(Some(link_type)) =
				LinkTypes::from_type(create_link.zome_index, create_link.link_type)
			{
				emit_signal(Signal::LinkCreated {
					action: action.clone(),
					link_type,
				})?;

				if let LinkTypes::RecipientToNotifications = link_type {
					if let Some(notifiee) = create_link.base_address.into_agent_pub_key() {
						send_remote_signal(
							NotificationsRemoteSignal::NewNotification(action),
							vec![notifiee],
						)?;
					}
				}
			}
			Ok(())
		}
		Action::DeleteLink(delete_link) => {
			let record = get(delete_link.link_add_address.clone(), GetOptions::default())?.ok_or(
				wasm_error!(WasmErrorInner::Guest(
					"Failed to fetch CreateLink action".to_string()
				)),
			)?;
			match record.action() {
				Action::CreateLink(create_link) => {
					if let Ok(Some(link_type)) =
						LinkTypes::from_type(create_link.zome_index, create_link.link_type)
					{
						emit_signal(Signal::LinkDeleted {
							action,
							link_type,
							create_link_action: record.signed_action.clone(),
						})?;
					}
					Ok(())
				}
				_ => Err(wasm_error!(WasmErrorInner::Guest(
					"Create Link should exist".to_string()
				))),
			}
		}
		Action::Create(_create) => {
			if let Ok(Some(app_entry)) = get_entry_for_action(&action.hashed.hash) {
				emit_signal(Signal::EntryCreated {
					action: action.clone(),
					app_entry: app_entry.clone(),
				})?;
				if let EntryTypes::Notification(_) = app_entry {
					call_remote(
						agent_info()?.agent_latest_pubkey,
						zome_info()?.name,
						"create_notification_link".into(),
						None,
						action.hashed.hash,
					)?;
				}
			}
			Ok(())
		}
		Action::Update(update) => {
			if let Ok(Some(app_entry)) = get_entry_for_action(&action.hashed.hash) {
				if let Ok(Some(original_app_entry)) =
					get_entry_for_action(&update.original_action_address)
				{
					emit_signal(Signal::EntryUpdated {
						action,
						app_entry,
						original_app_entry,
					})?;
				}
			}
			Ok(())
		}
		Action::Delete(delete) => {
			if let Ok(Some(original_app_entry)) = get_entry_for_action(&delete.deletes_address) {
				emit_signal(Signal::EntryDeleted {
					action,
					original_app_entry,
				})?;
			}
			Ok(())
		}
		_ => Ok(()),
	}
}

fn get_entry_for_action(action_hash: &ActionHash) -> ExternResult<Option<EntryTypes>> {
	let record = match get_details(action_hash.clone(), GetOptions::default())? {
		Some(Details::Record(record_details)) => record_details.record,
		_ => {
			return Ok(None);
		}
	};
	let entry = match record.entry().as_option() {
		Some(entry) => entry,
		None => {
			return Ok(None);
		}
	};
	let (zome_index, entry_index) = match record.action().entry_type() {
		Some(EntryType::App(AppEntryDef {
			zome_index,
			entry_index,
			..
		})) => (zome_index, entry_index),
		_ => {
			return Ok(None);
		}
	};
	EntryTypes::deserialize_from_type(*zome_index, *entry_index, entry)
}
