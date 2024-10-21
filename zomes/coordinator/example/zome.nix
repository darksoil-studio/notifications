{ inputs, ... }:

{
  perSystem = { inputs', self', system, ... }: {
    packages.example = inputs.hc-infra.outputs.builders.${system}.rustZome {
      workspacePath = inputs.self.outPath;
      crateCargoToml = ./Cargo.toml;
    };

  };
}

