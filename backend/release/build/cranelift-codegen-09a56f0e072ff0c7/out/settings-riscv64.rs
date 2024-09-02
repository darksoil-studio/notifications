#[derive(Clone, Hash)]
/// Flags group `riscv64`.
pub struct Flags {
    bytes: [u8; 2],
}
impl Flags {
    /// Create flags riscv64 settings group.
    #[allow(unused_variables)]
    pub fn new(shared: &settings::Flags, builder: Builder) -> Self {
        let bvec = builder.state_for("riscv64");
        let mut riscv64 = Self { bytes: [0; 2] };
        debug_assert_eq!(bvec.len(), 2);
        riscv64.bytes[0..2].copy_from_slice(&bvec);
        riscv64
    }
}
impl Flags {
    /// Iterates the setting values.
    pub fn iter(&self) -> impl Iterator<Item = Value> {
        let mut bytes = [0; 2];
        bytes.copy_from_slice(&self.bytes[0..2]);
        DESCRIPTORS.iter().filter_map(move |d| {
            let values = match &d.detail {
                detail::Detail::Preset => return None,
                detail::Detail::Enum { last, enumerators } => Some(TEMPLATE.enums(*last, *enumerators)),
                _ => None
            };
            Some(Value{ name: d.name, detail: d.detail, values, value: bytes[d.offset as usize] })
        })
    }
}
/// User-defined settings.
#[allow(dead_code)]
impl Flags {
    /// Get a view of the boolean predicates.
    pub fn predicate_view(&self) -> crate::settings::PredicateView {
        crate::settings::PredicateView::new(&self.bytes[0..])
    }
    /// Dynamic numbered predicate getter.
    fn numbered_predicate(&self, p: usize) -> bool {
        self.bytes[0 + p / 8] & (1 << (p % 8)) != 0
    }
    /// has extension M?
    pub fn has_m(&self) -> bool {
        self.numbered_predicate(0)
    }
    /// has extension A?
    pub fn has_a(&self) -> bool {
        self.numbered_predicate(1)
    }
    /// has extension F?
    pub fn has_f(&self) -> bool {
        self.numbered_predicate(2)
    }
    /// has extension D?
    pub fn has_d(&self) -> bool {
        self.numbered_predicate(3)
    }
    /// has extension V?
    pub fn has_v(&self) -> bool {
        self.numbered_predicate(4)
    }
    /// has extension B?
    pub fn has_b(&self) -> bool {
        self.numbered_predicate(5)
    }
    /// has extension C?
    pub fn has_c(&self) -> bool {
        self.numbered_predicate(6)
    }
    /// has extension zbkb?
    pub fn has_zbkb(&self) -> bool {
        self.numbered_predicate(7)
    }
    /// has extension zicsr?
    pub fn has_zicsr(&self) -> bool {
        self.numbered_predicate(8)
    }
    /// has extension zifencei?
    pub fn has_zifencei(&self) -> bool {
        self.numbered_predicate(9)
    }
}
static DESCRIPTORS: [detail::Descriptor; 10] = [
    detail::Descriptor {
        name: "has_m",
        description: "has extension M?",
        offset: 0,
        detail: detail::Detail::Bool { bit: 0 },
    },
    detail::Descriptor {
        name: "has_a",
        description: "has extension A?",
        offset: 0,
        detail: detail::Detail::Bool { bit: 1 },
    },
    detail::Descriptor {
        name: "has_f",
        description: "has extension F?",
        offset: 0,
        detail: detail::Detail::Bool { bit: 2 },
    },
    detail::Descriptor {
        name: "has_d",
        description: "has extension D?",
        offset: 0,
        detail: detail::Detail::Bool { bit: 3 },
    },
    detail::Descriptor {
        name: "has_v",
        description: "has extension V?",
        offset: 0,
        detail: detail::Detail::Bool { bit: 4 },
    },
    detail::Descriptor {
        name: "has_b",
        description: "has extension B?",
        offset: 0,
        detail: detail::Detail::Bool { bit: 5 },
    },
    detail::Descriptor {
        name: "has_c",
        description: "has extension C?",
        offset: 0,
        detail: detail::Detail::Bool { bit: 6 },
    },
    detail::Descriptor {
        name: "has_zbkb",
        description: "has extension zbkb?",
        offset: 0,
        detail: detail::Detail::Bool { bit: 7 },
    },
    detail::Descriptor {
        name: "has_zicsr",
        description: "has extension zicsr?",
        offset: 1,
        detail: detail::Detail::Bool { bit: 0 },
    },
    detail::Descriptor {
        name: "has_zifencei",
        description: "has extension zifencei?",
        offset: 1,
        detail: detail::Detail::Bool { bit: 1 },
    },
];
static ENUMERATORS: [&str; 0] = [
];
static HASH_TABLE: [u16; 16] = [
    0xffff,
    0,
    0xffff,
    6,
    5,
    1,
    0xffff,
    8,
    2,
    4,
    3,
    9,
    0xffff,
    7,
    0xffff,
    0xffff,
];
static PRESETS: [(u8, u8); 0] = [
];
static TEMPLATE: detail::Template = detail::Template {
    name: "riscv64",
    descriptors: &DESCRIPTORS,
    enumerators: &ENUMERATORS,
    hash_table: &HASH_TABLE,
    defaults: &[0x00, 0x00],
    presets: &PRESETS,
};
/// Create a `settings::Builder` for the riscv64 settings group.
pub fn builder() -> Builder {
    Builder::new(&TEMPLATE)
}
impl fmt::Display for Flags {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        writeln!(f, "[riscv64]")?;
        for d in &DESCRIPTORS {
            if !d.detail.is_preset() {
                write!(f, "{} = ", d.name)?;
                TEMPLATE.format_toml_value(d.detail, self.bytes[d.offset as usize], f)?;
                writeln!(f)?;
            }
        }
        Ok(())
    }
}
