# 01: Installable Smart Zone package with preserved behavior

Status: ready-for-agent

Blocked by: None (can start immediately)

Spec: `.scratch/npm-package/spec.md`

## What to build

Turn this repository into a self-contained Pi package that a Pi user can install from a local checkout (`pi install <path>` or `pi -e <path>`) and that shows exactly the same widget as the existing Smart Zone extension: **Smart zone**, **Focus drift**, **Refocus**, and **Context usage pending**, with the same thresholds, labels, refresh events, and clear-on-shutdown.

The source of truth for the behavior is the existing extension and its five `node:test` tests in the maintainer's dotfiles; they are copied into this repo on the reference branch `prototype/npm-package` (commit `21b4305`). Bring the extension over unchanged and the tests over with only their import path changed. The prototype may be used as a reference for package metadata and tasks, but build this ticket fresh on its own branch.

Package decisions (see the spec for rationale): npm name `@jotu_myraas/pi-smart-zone`, public access, MIT, `pi-package` keyword, TypeScript source declared in the `pi.extensions` manifest with no build step, Pi's coding-agent package as a `*` peer dependency and never bundled, no runtime dependencies, Node `>=22.19.0`, starting version left for release tooling to set (`0.0.0` until the first release).

Development tooling arrives through mise only, with Bash tasks that work on Linux and macOS.

## Acceptance criteria

- [ ] The extension source is byte-for-byte identical to the existing implementation.
- [ ] The five existing tests pass through `mise run test`, exercising the extension through its default export with a fake Pi API and context (seam 1).
- [ ] `mise run install` installs development dependencies from a committed lockfile without running lifecycle scripts.
- [ ] `mise run pack:check` runs an `npm pack` dry run and fails unless the packed files are exactly the extension source, `package.json`, `README.md`, and `LICENSE` (plus `CHANGELOG.md` once it exists) (seam 2). A stray file under the published directory makes it fail.
- [ ] `package.json` declares the `pi.extensions` entry point, the `pi-package` keyword, the peer dependency, public publish access, repository/bugs/homepage URLs, and the Node engine range; it has no `dependencies`.
- [ ] Node is pinned in mise; tasks are defined so they need no executable bit.
- [ ] Loading the package in Pi from a local checkout shows the widget (manual check, or document why it could not be run).
