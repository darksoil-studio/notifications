use hdk::prelude::*;
use notifications_types::NotificationsEncryptedMessage;

use crate::utils::create_link_relaxed;

#[derive(Serialize, Deserialize, Debug, SerializedBytes)]
pub struct EncryptedMessageBytes(XSalsa20Poly1305EncryptedData);

pub fn create_encrypted_message(
	recipient: AgentPubKey,
	message: NotificationsEncryptedMessage,
) -> ExternResult<()> {
	let message_bytes = SerializedBytes::try_from(message).map_err(|err| wasm_error!(err))?;
	let encrypted_data = ed_25519_x_salsa20_poly1305_encrypt(
		agent_info()?.agent_latest_pubkey,
		recipient,
		message_bytes.bytes().into(),
	)?;

	let tag_bytes = SerializedBytes::try_from(EncryptedMessageBytes(encrypted_data))
		.map_err(|err| wasm_error!(err))?;

	let tag_bytes = create_link_relaxed(
		recipient,
		recipient,
		LinkTypes::AgentEncryptedMessage,
		tag_bytes.bytes(),
	)?;

	Ok(())
}
