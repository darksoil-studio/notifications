{ inputs, ... }:

{
  perSystem = { inputs', self', lib, system, ... }: {
    packages.notifications_test_dna = inputs.hc-infra.outputs.lib.dna {
      inherit system;
      dnaManifest = ./dna.yaml;
      zomes = {
        # Include here the zome packages for this DNA, e.g.:
        profiles_integrity = inputs'.profiles.packages.profiles_integrity;
        profiles = inputs'.profiles.packages.profiles;
        # This overrides all the "bundled" properties for the DNA manifest
        notifications_integrity = self'.packages.notifications_integrity;
        notifications = self'.packages.notifications;
      };
    };
  };
}

