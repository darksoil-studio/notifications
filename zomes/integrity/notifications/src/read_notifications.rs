use hdi::prelude::*;

pub fn validate_create_link_read_notifications(
    action: CreateLink,
    base_address: AnyLinkableHash,
    target_address: AnyLinkableHash,
    _tag: LinkTag,
) -> ExternResult<ValidateCallbackResult> {
    // Check the entry type for the given action hash
    let base_agent =
        base_address
            .into_agent_pub_key()
            .ok_or(wasm_error!(WasmErrorInner::Guest(
                "Base of a ReadNotifications link must be an agent".to_string()
            )))?;
    let target_agent =
        target_address
            .into_agent_pub_key()
            .ok_or(wasm_error!(WasmErrorInner::Guest(
                "Target of a ReadNotifications link must be an agent".to_string()
            )))?;

    if !base_agent.eq(&target_agent) {
        return Ok(ValidateCallbackResult::Invalid(String::from(
            "Base and target must be the same for a ReadNotifications link.",
        )));
    }

    if !base_agent.eq(&action.author) {
        return Ok(ValidateCallbackResult::Invalid(String::from(
            "Only a given agent can mark their own notifications as read.",
        )));
    }

    Ok(ValidateCallbackResult::Valid)
}
pub fn validate_delete_link_read_notifications(
    action: DeleteLink,
    original_action: CreateLink,
    _base: AnyLinkableHash,
    _target: AnyLinkableHash,
    _tag: LinkTag,
) -> ExternResult<ValidateCallbackResult> {
    if !action.author.eq(&original_action.author) {
        return Ok(ValidateCallbackResult::Invalid(String::from(
            "Only a given agent can delete their own ReadNotifications links.",
        )));
    }

    Ok(ValidateCallbackResult::Valid)
}
