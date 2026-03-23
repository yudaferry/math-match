{
  description = "Math Match - web application for children ages 4–12 to practice basic arithmetic operations";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachSystem ["x86_64-linux" ](system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config.allowUnfree = true;
        };
      in
      {
        devShells.default = pkgs.mkShell {
          packages = [
            pkgs.git
          ];
        };

        devShells.bun = pkgs.mkShell {
          packages = [
            pkgs.bun
          ];

          

          shellHook = ''
            echo "Welcome to Math Match development shell (bun)!"
            echo "Use 'bun dev' to start the development server"
          '';

        };

        devShells.node = pkgs.mkShell {
          packages = [
            pkgs.nodejs_20
            pkgs.pnpm
          ];

          shellHook = ''
            echo "Welcome to Math Match development shell (nodejs)!"
            echo "Use 'pnpm dev' to start the development server"
          '';
        };
      }

    );
}