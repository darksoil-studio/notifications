{ inputs, ... }:

{
  perSystem = { inputs', system, ... }: {
    packages.notifications_integrity = inputs.hc-infra.outputs.lib.rustZome {
      inherit system;
      workspacePath = inputs.self.outPath;
      crateCargoToml = ./Cargo.toml;
    };
  };
}

