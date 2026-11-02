# 01: Installable Smart Zone package with preserved behavior

**What to build:** A self-contained Pi package that a Pi user can install from a local checkout (`pi install <path>` or `pi -e <path>`) and that shows exactly the same widget as the existing Smart Zone extension: **Smart zone**, **Focus drift**, **Refocus**, and **Context usage pending**, with the same thresholds, labels, refresh events, and clear-on-shutdown.

The existing extension moves over unchanged, and its five `node:test` tests move over with only their import path changed. Package decisions: npm name `@jotu_myraas/pi-smart-zone`, public access, MIT, `pi-package` keyword, TypeScript source declared in the `pi.extensions` manifest with no build step, Pi's coding-agent package as a `*` peer dependency and never bundled, no runtime dependencies, Node `>=22.19.0`, and version `0.0.0` until release tooling sets the first release. Tooling comes through mise only, with Bash tasks that work on Linux and macOS.

Note: see the npm-package spec for rationale. The local branch `prototype/npm-package` holds a reference copy of the extension, tests, and package setup; build this ticket fresh rather than merging it.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] The extension source is byte-for-byte identical to the existing implementation.
- [ ] The five existing tests pass through `mise run test`, driving the extension through its default export with a fake Pi API and context (seam 1).
- [ ] `mise run install` installs development dependencies from a committed lockfile without running lifecycle scripts.
- [ ] `mise run pack:check` runs an `npm pack` dry run and fails unless the packed files are exactly the extension source, `package.json`, `README.md`, and `LICENSE`, plus `CHANGELOG.md` once it exists (seam 2). A stray file in the published directory makes it fail.
- [ ] `package.json` declares the `pi.extensions` entry point, the `pi-package` keyword, the peer dependency, public publish access, repository, bugs, and homepage URLs, and the Node engine range; it has no `dependencies`.
- [ ] Node is pinned in mise, and tasks need no executable bit.
- [ ] Loading the package in Pi from a local checkout shows the widget, or the ticket records why this manual check could not be run.
