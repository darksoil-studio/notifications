use hdk::prelude::*;

pub fn profiles_zome_name() -> ZomeName {
	match std::option_env!("PROFILES_COORDINATOR_ZOME_NAME") {
		Some(zome_name) => zome_name.into(),
		None => ZomeName::from("profiles"),
	}
}

pub fn get_agents_for_profile(profile_hash: ActionHash) -> ExternResult<Vec<AgentPubKey>> {
	let response = call(
		CallTargetCell::Local,
		profiles_zome_name(),
		"get_agents_for_profile".into(),
		None,
		profile_hash,
	)?;

	match response {
		ZomeCallResponse::Ok(result) => {
			let links: Vec<Link> = result.decode().map_err(|err| wasm_error!(err))?;
			let agents: Vec<AgentPubKey> = links
				.into_iter()
				.filter_map(|link| link.target.into_agent_pub_key())
				.collect();
			Ok(agents)
		}
		_ => Err(wasm_error!(WasmErrorInner::Guest(format!(
			"Failed to get_agents_for_profile: {response:?}"
		)))),
	}
}

pub fn get_agent_profile_hash(agent: AgentPubKey) -> ExternResult<Option<ActionHash>> {
	let response = call(
		CallTargetCell::Local,
		profiles_zome_name(),
		"get_agent_profile".into(),
		None,
		agent,
	)?;

	match response {
		ZomeCallResponse::Ok(result) => {
			let links: Vec<Link> = result.decode().map_err(|err| wasm_error!(err))?;
			let profile_hashes: Vec<ActionHash> = links
				.into_iter()
				.filter_map(|link| link.target.into_action_hash())
				.collect();
			Ok(profile_hashes.first().cloned())
		}
		_ => Err(wasm_error!(WasmErrorInner::Guest(format!(
			"Failed to get_agents_for_profile: {response:?}"
		)))),
	}
}

pub fn get_my_profile_hash() -> ExternResult<Option<ActionHash>> {
	get_agent_profile_hash(agent_info()?.agent_latest_pubkey)
}
