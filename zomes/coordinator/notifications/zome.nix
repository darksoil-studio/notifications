{ inputs, ... }:

{
  perSystem = { inputs', self', system, ... }: {
    packages.notifications =
      inputs.hc-infra.outputs.builders.${system}.rustZome {
        workspacePath = inputs.self.outPath;
        crateCargoToml = ./Cargo.toml;
      };

    # Test only this zome and its integrity in isolation
    checks.notifications =
      inputs.hc-infra.outputs.builders.${system}.sweettest {
        workspacePath = inputs.self.outPath;
        dna = (inputs.hc-infra.outputs.builders.${system}.dna {
          dnaManifest = builtins.toFile "dna.yaml" ''
            ---
            manifest_version: "1"
            name: test_dna
            integrity:
              network_seed: ~
              properties: ~
              origin_time: 1709638576394039
              zomes: 
                - name: notifications_integrity
            coordinator:
              zomes:
                - name: notifications
                  hash: ~
                  dependencies: 
                    - name: notifications_integrity
                  dylib: ~
          '';
          zomes = {
            notifications = self'.packages.notifications;
            notifications_integrity = self'.packages.notifications_integrity;
          };
        });
        crateCargoToml = ./Cargo.toml;
      };

  };
}

