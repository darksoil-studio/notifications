use hdi::prelude::*;

#[hdk_entry_helper]
pub struct Example {
	content: String,
}

#[derive(Serialize, Deserialize)]
#[serde(tag = "type")]
#[hdk_entry_types]
#[unit_enum(UnitEntryTypes)]
pub enum EntryTypes {
	Example(Example),
}
