{ inputs, ... }:

{
  perSystem = { inputs', ... }: {
    packages.notifications_integrity = inputs.hc-infra.outputs.lib.rustZome {
      workspacePath = inputs.self.outPath;
      holochain = inputs'.holochain;
      crateCargoToml = ./Cargo.toml;
    };
  };
}

