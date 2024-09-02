{ inputs, ... }:

{
  perSystem = { inputs', lib, self', system, ... }: {
    packages.notifications_test_app = inputs.hc-infra.outputs.lib.happ {
      inherit system;
      happManifest = ./happ.yaml;

      dnas = {
        # Include here the DNA packages for this hApp, e.g.:
        # my_dna = inputs'.some_input.packages.my_dna;
        # This overrides all the "bundled" properties for the hApp manifest 
        notifications_test = self'.packages.notifications_test_dna;
      };
    };
  };
}
