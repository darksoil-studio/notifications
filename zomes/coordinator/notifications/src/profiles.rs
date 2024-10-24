use hdk::prelude::*;
use serde::de::DeserializeOwned;

pub fn call_local_zome<P, R>(
	zome_name: ZomeName,
	fn_name: FunctionName,
	payload: P,
) -> ExternResult<R>
where
	P: serde::Serialize + std::fmt::Debug,
	R: DeserializeOwned + std::fmt::Debug,
{
	let response = call(
		CallTargetCell::Local,
		zome_name.clone(),
		fn_name.clone(),
		None,
		payload,
	)?;

	match response {
		ZomeCallResponse::Ok(result) => {
			let result: R = result.decode().map_err(|err| wasm_error!(err))?;
			Ok(result)
		}
		_ => Err(wasm_error!(WasmErrorInner::Guest(format!(
			"Failed to call {zome_name}/{fn_name}: {response:?}"
		)))),
	}
}
pub fn call_profiles<R, P>(fn_name: FunctionName, payload: P) -> ExternResult<R>
where
	P: serde::Serialize + std::fmt::Debug,
	R: DeserializeOwned + std::fmt::Debug,
{
	call_local_zome(profiles_zome_name(), fn_name, payload)
}

pub fn profiles_zome_name() -> ZomeName {
	match std::option_env!("PROFILES_COORDINATOR_ZOME_NAME") {
		Some(zome_name) => zome_name.into(),
		None => ZomeName::from("profiles"),
	}
}

pub fn get_agents_for_profile(profile_hash: ActionHash) -> ExternResult<Vec<AgentPubKey>> {
	let links: Vec<Link> = call_profiles("get_agents_for_profile".into(), profile_hash)?;
	let agents: Vec<AgentPubKey> = links
		.into_iter()
		.filter_map(|link| link.target.into_agent_pub_key())
		.collect();
	Ok(agents)
}

pub fn get_agent_profile_hash(agent: AgentPubKey) -> ExternResult<Option<ActionHash>> {
	let links: Vec<Link> = call_profiles("get_agent_profile".into(), agent)?;
	let profile_hashes: Vec<ActionHash> = links
		.into_iter()
		.filter_map(|link| link.target.into_action_hash())
		.collect();
	Ok(profile_hashes.first().cloned())
}

pub fn get_my_profile_hash() -> ExternResult<Option<ActionHash>> {
	get_agent_profile_hash(agent_info()?.agent_latest_pubkey)
}
