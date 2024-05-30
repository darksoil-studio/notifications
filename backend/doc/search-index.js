var searchIndex = new Map(JSON.parse('[\
["notifications",{"doc":"","t":"PPPPPPGGNNNNNNNNNNNNNNNNNNHNNNNNNCCNNHHNNNNNNNNNNNNNNNOOOOOOOOOOOOSFNNHNNNNHNNNHHHHHNNNHNNNNNNNNNHHH","n":["EntryCreated","EntryDeleted","EntryUpdated","LinkCreated","LinkDeleted","NewNotification","NotificationsRemoteSignal","Signal","borrow","borrow","borrow_mut","borrow_mut","deref","deref","deref_mut","deref_mut","deserialize","deserialize","deserialize","deserialize","drop","drop","fmt","fmt","from","from","init","init","init","into","into","layout_raw","layout_raw","notification","notifications_settings","pointer_metadata","pointer_metadata","post_commit","recv_remote_signal","serialize","serialize","try_from","try_from","try_from","try_into","try_into","type_id","type_id","upcast_any_box","upcast_any_box","upcast_any_mut","upcast_any_mut","upcast_any_ref","upcast_any_ref","action","action","action","action","action","app_entry","app_entry","create_link_action","link_type","link_type","original_app_entry","original_app_entry","MAX_TAG_SIZE","ReadNotifications","borrow","borrow_mut","create_notification","deref","deref_mut","deserialize","deserialize","dismiss_notifications","drop","fmt","from","get_all_deletes_for_notification","get_dismissed_notifications","get_notification","get_read_notifications","get_undismissed_notifications","init","into","layout_raw","mark_notifications_as_read","pointer_metadata","serialize","try_from","try_from","try_into","type_id","upcast_any_box","upcast_any_mut","upcast_any_ref","get_notifications_settings_for","get_notifications_settings_links_for_agent","set_notifications_settings"],"q":[[0,"notifications"],[54,"notifications::Signal"],[66,"notifications::notification"],[97,"notifications::notifications_settings"],[100,"rkyv::with"],[101,"core::result"],[102,"serde::de"],[103,"core::fmt"],[104,"core::fmt"],[105,"hdi::map_extern"],[106,"core::alloc::layout"],[107,"core::alloc::layout"],[108,"alloc::vec"],[109,"holochain_serialized_bytes"],[110,"serde::ser"],[111,"holochain_serialized_bytes"],[112,"alloc::boxed"],[113,"core::any"],[114,"holochain_integrity_types::record"],[115,"core::option"],[116,"holochain_zome_types::link"],[117,"holo_hash::aliases"]],"d":["","","","","","","","","","","","","","","","","","","","","","","","","Returns the argument unchanged.","Returns the argument unchanged.","","","","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","Returns the argument unchanged.","","","","","","","Calls <code>U::from(self)</code>.","","","","","","","","","","","","","",""],"i":[4,4,4,4,4,6,0,0,4,6,4,6,4,6,4,6,4,4,6,6,4,6,4,6,4,6,0,4,6,4,6,4,6,0,0,4,6,0,0,4,6,4,6,6,4,6,4,6,4,6,4,6,4,6,31,32,33,34,35,33,34,32,31,32,34,35,0,0,24,24,0,24,24,24,24,0,24,24,24,0,0,0,0,0,24,24,24,0,24,24,24,24,24,24,24,24,24,0,0,0],"f":"````````{ce{}{}}000{bc{}}000{{ce}{{f{{d{gi}}}}}{}{}{}{}}{c{{f{h}}}j}{c{{f{l}}}j}2{bn}0{{hA`}Ab}{{lA`}Ab}{cc{}}0{n{{Af{Ad}}}}{{}b}0::{{}{{f{AhAj}}}}0``{{}}0{{{An{Al}}}n}{B`{{Af{n}}}}{{hc}fBb}{{lc}fBb}{c{{f{e}}}{}{}}0{B`{{f{lBd}}}}11{cBf{}}0{{{Bh{c}}}{{Bh{Bj}}}{}}0{cBj{}}000``````````````{ce{}{}}0{Bl{{Af{Bn}}}}{bc{}}0{{ce}{{f{{d{gi}}}}}{}{}{}{}}{c{{f{C`}}}j}{{{An{Cb}}}{{Af{n}}}}{bn}{{C`A`}Ab}{cc{}}{Cb{{Af{{Cd{{An{Al}}}}}}}}{n{{Af{{An{{Cf{Al{An{Al}}}}}}}}}}{Cb{{Af{{Cd{Bn}}}}}}{n{{Af{{An{Ch}}}}}}0{{}b}={{}{{f{AhAj}}}}9{{}}{{C`c}fBb}{c{{f{e}}}{}{}}{B`{{f{C`Bd}}}}1{cBf{}}{{{Bh{c}}}{{Bh{Bj}}}{}}{cBj{}}0{Cj{{Af{{Cd{Bn}}}}}}{Cj{{Af{{An{Ch}}}}}}{Cl{{Af{n}}}}","c":[],"p":[[1,"usize"],[5,"With",100],[6,"Result",101],[6,"Signal",0],[10,"Deserializer",102],[6,"NotificationsRemoteSignal",0],[1,"unit"],[5,"Formatter",103],[8,"Result",103],[6,"InitCallbackResult",104],[8,"ExternResult",105],[5,"Layout",106],[5,"LayoutError",106],[8,"SignedActionHashed",107],[5,"Vec",108],[5,"SerializedBytes",109],[10,"Serializer",110],[6,"SerializedBytesError",109],[5,"TypeId",111],[5,"Box",112],[10,"Any",111],[5,"Notification",113],[5,"Record",107],[5,"ReadNotifications",66],[8,"ActionHash",114],[6,"Option",115],[1,"tuple"],[5,"Link",116],[8,"AgentPubKey",114],[5,"NotificationsSettings",117],[15,"LinkCreated",54],[15,"LinkDeleted",54],[15,"EntryCreated",54],[15,"EntryUpdated",54],[15,"EntryDeleted",54]],"b":[]}],\
["notifications_integrity",{"doc":"","t":"PGGPPPPPPGHHNNNNNNNNNNNNNNNNNNNNNNNNNNNNNHNNNNNNNNNNNNNNNNNHNNNNNNNNNNNNNNNCCNNNNNCNNNNNNNNNNNNNNNNNNNNNNNNNNNNHHFNNNNONNNNNNNNNNNOOONONNNNNNNNNNNNNNHHHHHPGFFNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNHHHHHOHH","n":["AgentToNotificationsSettings","EntryTypes","LinkTypes","Notification","Notification","NotificationsSettings","NotificationsSettings","ReadNotifications","RecipientToNotifications","UnitEntryTypes","__num_entry_types","__num_link_types","borrow","borrow","borrow","borrow_mut","borrow_mut","borrow_mut","clone","clone","clone_into","clone_into","cmp","cmp","compare","compare","deref","deref","deref","deref_mut","deref_mut","deref_mut","deserialize","deserialize","deserialize","deserialize","deserialize","deserialize_from_type","drop","drop","drop","entry_defs","eq","eq","equivalent","equivalent","equivalent","equivalent","equivalent","equivalent","equivalent","equivalent","fmt","fmt","fmt","from","from","from","from_type","genesis_self_check","get_hash","hash","init","init","init","into","into","into","iter","iter","layout_raw","layout_raw","layout_raw","len","len","notification","notifications_settings","partial_cmp","partial_cmp","pointer_metadata","pointer_metadata","pointer_metadata","read_notifications","serialize","serialize","to_owned","to_owned","to_unit","try_from","try_from","try_from","try_from","try_from","try_from","try_into","try_into","try_into","try_into_filter","type_id","type_id","type_id","unit_iter","upcast_any_box","upcast_any_box","upcast_any_box","upcast_any_mut","upcast_any_mut","upcast_any_mut","upcast_any_ref","upcast_any_ref","upcast_any_ref","validate","validate_agent_joining","Notification","borrow","borrow_mut","clone","clone_into","content","deref","deref_mut","deserialize","deserialize","drop","eq","fmt","from","init","into","layout_raw","notification_group","notification_type","persistent","pointer_metadata","recipients","serialize","to_owned","try_from","try_from","try_from","try_from","try_from","try_from","try_from","try_into","type_id","upcast_any_box","upcast_any_mut","upcast_any_ref","validate_create_link_recipient_to_notifications","validate_create_notification","validate_delete_link_recipient_to_notifications","validate_delete_notification","validate_update_notification","Email","NotificationProvider","NotificationTypeSettings","NotificationsSettings","borrow","borrow","borrow","borrow_mut","borrow_mut","borrow_mut","clone","clone","clone","clone_into","clone_into","clone_into","deref","deref","deref","deref_mut","deref_mut","deref_mut","deserialize","deserialize","deserialize","deserialize","deserialize","deserialize","drop","drop","drop","fmt","fmt","fmt","from","from","from","init","init","init","into","into","into","layout_raw","layout_raw","layout_raw","pointer_metadata","pointer_metadata","pointer_metadata","serialize","serialize","serialize","to_owned","to_owned","to_owned","try_from","try_from","try_from","try_from","try_from","try_from","try_from","try_from","try_from","try_into","try_into","try_into","type_id","type_id","type_id","upcast_any_box","upcast_any_box","upcast_any_box","upcast_any_mut","upcast_any_mut","upcast_any_mut","upcast_any_ref","upcast_any_ref","upcast_any_ref","validate_create_link_agent_to_notifications_settings","validate_create_notifications_settings","validate_delete_link_agent_to_notifications_settings","validate_delete_notifications_settings","validate_update_notifications_settings","email_address","validate_create_link_read_notifications","validate_delete_link_read_notifications"],"q":[[0,"notifications_integrity"],[113,"notifications_integrity::notification"],[154,"notifications_integrity::notifications_settings"],[238,"notifications_integrity::notifications_settings::NotificationProvider"],[239,"notifications_integrity::read_notifications"],[241,"core::cmp"],[242,"rkyv::with"],[243,"core::result"],[244,"serde::de"],[245,"holochain_integrity_types::entry"],[246,"core::option"],[247,"holochain_integrity_types::action"],[248,"core::convert"],[249,"holochain_integrity_types::action"],[250,"hdi::map_extern"],[251,"core::fmt"],[252,"core::fmt"],[253,"holochain_integrity_types::genesis"],[254,"holochain_integrity_types::validate"],[255,"core::hash"],[256,"core::marker"],[257,"core::hash"],[258,"core::alloc::layout"],[259,"core::alloc::layout"],[260,"holochain_integrity_types::info"],[261,"holochain_integrity_types::info"],[262,"core::any"],[263,"alloc::boxed"],[264,"core::any"],[265,"holo_hash::aliases"],[266,"holochain_integrity_types::genesis"],[267,"holochain_serialized_bytes"],[268,"holochain_serialized_bytes"]],"d":["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","","","","","","","","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","Returns the argument unchanged.","","Calls <code>U::from(self)</code>.","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","","","","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],"i":[3,0,0,2,9,2,9,3,3,0,0,0,2,9,3,2,9,3,2,3,2,3,2,3,2,3,2,9,3,2,9,3,2,9,9,3,3,9,2,9,3,0,2,3,2,2,2,2,3,3,3,3,2,9,3,2,9,3,3,0,2,2,2,9,3,2,9,3,2,3,2,9,3,2,3,0,0,2,3,2,9,3,0,9,3,2,3,9,2,2,9,9,3,3,2,9,3,3,2,9,3,9,2,9,3,2,9,3,2,9,3,0,0,0,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,0,0,0,0,0,57,0,0,0,57,58,59,57,58,59,57,58,59,57,58,59,57,58,59,57,58,59,57,57,58,58,59,59,57,58,59,57,58,59,57,58,59,57,58,59,57,58,59,57,58,59,57,58,59,57,58,59,57,58,59,57,58,59,59,59,59,59,59,59,57,58,59,57,58,59,57,58,59,57,58,59,57,58,59,0,0,0,0,0,60,0,0],"f":"``````````{{}b}0{ce{}{}}00000{dd}{ff}{{ce}h{}{}}0{{dd}j}{{ff}j}{{ce}j{}{}}0{lc{}}00000{{ce}{{A`{{n{gi}}}}}{}{}{}{}}{c{{A`{Ab}}}Ad}11{c{{A`{f}}}Ad}{{ceAf}{{A`{{Ah{Ab}}g}}}{{Al{Aj}}}{{Al{An}}}{}}{lh}00{h{{Bb{B`}}}}{{dd}Bd}{{ff}Bd}{{ce}Bd{}{}}0000000{{dBf}Bh}{{AbBf}Bh}{{fBf}Bh}{cc{}}00{{ce}{{A`{{Ah{f}}g}}}{{Al{Aj}}}{{Al{Bj}}}{}}{Bl{{Bb{Bn}}}}{{ce}C`{CbCd}Cf}{{dc}hCh}{{}l}00{ce{}{}}00{{}{{`{{Cl{}{{Cj{d}}}}}}}}{{}{{`{{Cl{}{{Cj{f}}}}}}}}{{}{{A`{CnD`}}}}00{{}b}0``{{dd}{{Ah{j}}}}{{ff}{{Ah{j}}}}{{}}00`{{Abc}A`Db}{{fc}A`Db}99{Abc{}}{Dd{{A`{dc}}}{}}{c{{A`{e}}}{}{}}{{{Df{dAf}}}{{A`{Abc}}}{}}1{Dh{{A`{fc}}}{}}2222{f{{A`{DjDl}}}}{cDn{}}00{{}{{E`{Cl}}}}{{{E`{c}}}{{E`{Eb}}}{}}00{cEb{}}00000{Ed{{Bb{Bn}}}}{{Ef{Ah{Eh}}}{{Bb{Bn}}}}`{ce{}{}}0{EjEj}{{ce}h{}{}}`{lc{}}0{{ce}{{A`{{n{gi}}}}}{}{}{}{}}{c{{A`{Ej}}}Ad}{lh}{{EjEj}Bd}{{EjBf}Bh}{cc{}}{{}l}:{{}{{A`{CnD`}}}}```{{}}`{{Ejc}A`Db}={El{{A`{Ejc}}}{}}{En{{A`{EjF`}}}}1{Af{{A`{Ejc}}}{}}{c{{A`{e}}}{}{}}{Fb{{A`{Ejc}}}{}}21{cDn{}}{{{E`{c}}}{{E`{Eb}}}{}}{cEb{}}0{{FdFfFfFh}{{Bb{Bn}}}}{{FjEj}{{Bb{Bn}}}}{{FlFdFfFfFh}{{Bb{Bn}}}}{Fn{{Bb{Bn}}}}{{G`Ej}{{Bb{Bn}}}}````{ce{}{}}00000{GbGb}{GdGd}{GfGf}{{ce}h{}{}}00{lc{}}00000{{ce}{{A`{{n{gi}}}}}{}{}{}{}}{c{{A`{Gb}}}Ad}{c{{A`{Gd}}}Ad}2{c{{A`{Gf}}}Ad}3{lh}00{{GbBf}Bh}{{GdBf}Bh}{{GfBf}Bh}{cc{}}00{{}l}00???{{}{{A`{CnD`}}}}00{{}}00{{Gbc}A`Db}{{Gdc}A`Db}{{Gfc}A`Db}{ce{}{}}00{c{{A`{e}}}{}{}}0{El{{A`{Gfc}}}{}}{Fb{{A`{Gfc}}}{}}{En{{A`{GfF`}}}}32{Af{{A`{Gfc}}}{}}0444{cDn{}}00{{{E`{c}}}{{E`{Eb}}}{}}00{cEb{}}00000{{FdFfFfFh}{{Bb{Bn}}}}{{FjGf}{{Bb{Bn}}}}{{FlFdFfFfFh}{{Bb{Bn}}}}{Fn{{Bb{Bn}}}}{{G`Gf}{{Bb{Bn}}}}`42","c":[],"p":[[1,"u8"],[6,"UnitEntryTypes",0],[6,"LinkTypes",0],[1,"unit"],[6,"Ordering",241],[1,"usize"],[5,"With",242],[6,"Result",243],[6,"EntryTypes",0],[10,"Deserializer",244],[6,"Entry",245],[6,"Option",246],[5,"ZomeIndex",247],[10,"Into",248],[5,"EntryDefIndex",247],[6,"EntryDefsCallbackResult",249],[8,"ExternResult",250],[1,"bool"],[5,"Formatter",251],[8,"Result",251],[5,"LinkType",252],[8,"GenesisSelfCheckData",253],[6,"ValidateCallbackResult",254],[1,"u64"],[10,"Hash",255],[10,"Sized",256],[10,"BuildHasher",255],[10,"Hasher",255],[17,"Item"],[10,"Iterator",257],[5,"Layout",258],[5,"LayoutError",258],[10,"Serializer",259],[8,"ScopedEntryDefIndex",260],[1,"tuple"],[8,"ScopedLinkType",260],[6,"LinkTypeFilter",252],[5,"WasmError",261],[5,"TypeId",262],[5,"Box",263],[10,"Any",262],[6,"Op",264],[8,"AgentPubKey",265],[8,"MembraneProof",253],[5,"Notification",113],[5,"Record",266],[5,"SerializedBytes",267],[6,"SerializedBytesError",267],[8,"EntryHashed",245],[5,"CreateLink",247],[8,"AnyLinkableHash",265],[5,"LinkTag",252],[6,"EntryCreationAction",264],[5,"DeleteLink",247],[5,"Delete",247],[5,"Update",247],[6,"NotificationProvider",154],[5,"NotificationTypeSettings",154],[5,"NotificationsSettings",154],[15,"Email",238]],"b":[[137,"impl-TryFrom%3CRecord%3E-for-Notification"],[138,"impl-TryFrom%3CSerializedBytes%3E-for-Notification"],[139,"impl-TryFrom%3C%26Record%3E-for-Notification"],[140,"impl-TryFrom%3CEntry%3E-for-Notification"],[142,"impl-TryFrom%3CHoloHashed%3CEntry%3E%3E-for-Notification"],[143,"impl-TryFrom%3C%26Entry%3E-for-Notification"],[211,"impl-TryFrom%3CRecord%3E-for-NotificationsSettings"],[212,"impl-TryFrom%3CHoloHashed%3CEntry%3E%3E-for-NotificationsSettings"],[213,"impl-TryFrom%3CSerializedBytes%3E-for-NotificationsSettings"],[215,"impl-TryFrom%3C%26Record%3E-for-NotificationsSettings"],[216,"impl-TryFrom%3C%26Entry%3E-for-NotificationsSettings"],[217,"impl-TryFrom%3CEntry%3E-for-NotificationsSettings"]]}]\
]'));
if (typeof exports !== 'undefined') exports.searchIndex = searchIndex;
else if (window.initSearch) window.initSearch(searchIndex);
