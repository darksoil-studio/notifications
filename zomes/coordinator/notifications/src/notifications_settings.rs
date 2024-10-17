use hdk::prelude::*;

use notifications_integrity::*;

#[derive(Serialize, Deserialize, Debug)]
pub struct SetNotificationsSettingsInput {
	notifications_settings: NotificationsSettings,
	my_profile_hash: ActionHash,
}

#[hdk_extern]
pub fn set_notifications_settings(input: SetNotificationsSettingsInput) -> ExternResult<()> {
	let settings = input.notifications_settings;

	let links = get_notifications_settings_links_for_agent(input.my_profile_hash.clone())?;

	for link in links {
		delete_link(link.create_link_hash)?;
	}

	let action_hash = create_entry(EntryTypes::NotificationsSettings(settings))?;

	create_link(
		input.my_profile_hash,
		action_hash,
		LinkTypes::ProfileToNotificationsSettings,
		(),
	)?;

	Ok(())
}

pub fn get_notifications_settings_links_for_agent(
	profile_hash: ActionHash,
) -> ExternResult<Vec<Link>> {
	get_links(
		GetLinksInputBuilder::try_new(profile_hash, LinkTypes::ProfileToNotificationsSettings)?
			.build(),
	)
}

#[hdk_extern]
pub fn get_notifications_settings_for(profile_hash: ActionHash) -> ExternResult<Option<Record>> {
	let links = get_notifications_settings_links_for_agent(profile_hash)?;

	let Some(link) = links.first() else {
		return Ok(None); // Agent hasn't created any notifiations settings yet
	};

	let action_hash =
		link.target
			.clone()
			.into_action_hash()
			.ok_or(wasm_error!(WasmErrorInner::Guest(
				"Malformed notifications settings link".into()
			)))?;

	get(action_hash, Default::default())
}
