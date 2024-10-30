{
  description = "Template for Holochain app development";

  inputs = {
    nixpkgs.follows = "holonix/nixpkgs";
    holonix.url = "github:holochain/holonix/main-0.3";

    hc-infra.url = "github:holochain-open-dev/infrastructure";
    playground.url = "github:darksoil-studio/holochain-playground";
    scaffolding.url = "github:holochain-open-dev/templates";

    linked-devices.url = "github:darksoil-studio/linked-devices";
    profiles.url = "github:holochain-open-dev/profiles/nixify";
  };

  nixConfig = {
    extra-substituters = [
      "https://holochain-open-dev.cachix.org"
      "https://darksoil-studio.cachix.org"
    ];
    extra-trusted-public-keys = [
      "holochain-open-dev.cachix.org-1:3Tr+9in6uo44Ga7qiuRIfOTFXog+2+YbyhwI/Z6Cp4U="
      "darksoil-studio.cachix.org-1:UEi+aujy44s41XL/pscLw37KEVpTEIn8N/kn7jO8rkc="
    ];
  };

  outputs = inputs:
    inputs.holonix.inputs.flake-parts.lib.mkFlake { inherit inputs; } {
      imports = [
        ./zomes/integrity/notifications/zome.nix
        ./zomes/coordinator/notifications/zome.nix
        ./zomes/integrity/example/zome.nix
        ./zomes/coordinator/example/zome.nix
        # Just for testing purposes
        ./workdir/dna.nix
        ./workdir/happ.nix
        inputs.hc-infra.outputs.flakeModules.builders
      ];

      systems = builtins.attrNames inputs.holonix.devShells;
      perSystem = { inputs', config, pkgs, system, ... }: {
        devShells.default = pkgs.mkShell {
          inputsFrom = [
            inputs'.hc-infra.devShells.synchronized-pnpm
            inputs'.holonix.devShells.default
          ];

          packages = [
            inputs'.scaffolding.packages.hc-scaffold-zome-template
            inputs'.playground.packages.hc-playground
          ];
        };

        packages.scaffold = pkgs.symlinkJoin {
          name = "scaffold-remote-zome";
          paths = [ inputs'.hc-infra.packages.scaffold-remote-zome ];
          buildInputs = [ pkgs.makeWrapper ];
          postBuild = ''
            wrapProgram $out/bin/scaffold-remote-zome \
              --add-flags "notifications \
                --integrity-zome-name notifications_integrity \
                --coordinator-zome-name notifications \
                --remote-zome-git-url github:darksoil-studio/notifications \
                --remote-npm-package-name @darksoil-studio/notifications \
                --remote-npm-package-path ui \
                --remote-zome-git-branch main"
          '';
        };
      };
    };
}
