use hdi::prelude::*;

pub fn profiles_zome_name() -> ZomeName {
	match std::option_env!("PROFILES_INTEGRITY_ZOME_NAME") {
		Some(zome_name) => zome_name.into(),
		None => ZomeName::from("profiles_integrity"),
	}
}
