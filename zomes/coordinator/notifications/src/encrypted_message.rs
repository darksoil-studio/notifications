use hdk::prelude::*;
use notifications_integrity::{EntryTypes, LinkTypes};
use notifications_types::NotificationsEncryptedMessage;

use crate::{
	profiles::{get_agent_profile_hash, get_my_profile_hash},
	utils::{create_link_relaxed, create_relaxed},
};

#[derive(Serialize, Deserialize, Debug, SerializedBytes)]
pub struct EncryptedMessageBytes(XSalsa20Poly1305EncryptedData);

pub fn create_encrypted_message(
	recipient: AgentPubKey,
	message: NotificationsEncryptedMessage,
) -> ExternResult<()> {
	let message_bytes = SerializedBytes::try_from(message).map_err(|err| wasm_error!(err))?;
	let encrypted_data = ed_25519_x_salsa20_poly1305_encrypt(
		agent_info()?.agent_latest_pubkey,
		recipient.clone(),
		message_bytes.bytes().clone().into(),
	)?;

	let tag_bytes = SerializedBytes::try_from(EncryptedMessageBytes(encrypted_data))
		.map_err(|err| wasm_error!(err))?;

	create_link_relaxed(
		recipient.clone(),
		recipient,
		LinkTypes::AgentEncryptedMessage,
		tag_bytes.bytes().clone(),
	)?;

	Ok(())
}

pub fn commit_my_pending_encrypted_messages() -> ExternResult<()> {
	let my_pub_key = agent_info()?.agent_latest_pubkey;
	let links = get_links(
		GetLinksInputBuilder::try_new(my_pub_key.clone(), LinkTypes::AgentEncryptedMessage)?
			.build(),
	)?;
	let my_profile_hash = get_my_profile_hash()?;

	for link in links {
		let tag = link.tag;
		let bytes = SerializedBytes::from(UnsafeBytes::from(tag.into_inner()));
		let encrypted_data =
			EncryptedMessageBytes::try_from(bytes).map_err(|err| wasm_error!(err))?;

		let decrypted_data = ed_25519_x_salsa20_poly1305_decrypt(
			my_pub_key.clone(),
			link.author.clone(),
			encrypted_data.0,
		)?;

		let decrypted_bytes = decrypted_data.as_ref().to_vec();
		let decrypted_serialized_bytes = SerializedBytes::from(UnsafeBytes::from(decrypted_bytes));

		let message = NotificationsEncryptedMessage::try_from(decrypted_serialized_bytes)
			.map_err(|err| wasm_error!(err))?;

		match message {
			NotificationsEncryptedMessage::Notification(notification) => {
				create_relaxed(EntryTypes::Notification(notification))?;
			}
			NotificationsEncryptedMessage::NotificationsStatusChanges(
				notifications_status_changes,
			) => {
				let caller_profile_hash = get_agent_profile_hash(link.author)?;

				if caller_profile_hash.ne(&my_profile_hash) {
					return Err(wasm_error!(WasmErrorInner::Guest(format!(
						"Only agents with the same profile can send change notifications status"
					))));
				}

				create_relaxed(EntryTypes::NotificationsStatusChanges(
					notifications_status_changes,
				))?;
			}
		}
	}

	Ok(())
}
