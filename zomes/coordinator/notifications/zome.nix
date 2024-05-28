{ inputs, rootPath, ... }:

{
  perSystem = { inputs', self', ... }: {
    packages.notifications = inputs.hc-infra.outputs.lib.rustZome {
      workspacePath = rootPath;
      holochain = inputs'.holochain;
      crateCargoToml = ./Cargo.toml;
    };

    # Test only this zome and its integrity in isolation
    checks.notifications = inputs.hc-infra.outputs.lib.sweettest {
      workspacePath = rootPath;
      holochain = inputs'.holochain;
      dna = (inputs.hc-infra.outputs.lib.dna {
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
        zomes = inputs.hc-infra.outputs.lib.filterZomes self'.packages;
        holochain = inputs'.holochain;
      });
      crateCargoToml = ./Cargo.toml;
    };

  };
}

