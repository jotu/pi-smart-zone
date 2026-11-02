# 03: README for users and contributors

**What to build:** A README that lets a Pi user install and understand the extension without reading code, and lets a contributor get started. It replaces the placeholder.

It covers what the widget shows (the four glossary states with their thresholds and an example line for each), that the thresholds are heuristics and the extension never compacts on its own, installation (npm once released; GitHub and a local checkout until then; `pi -e` for a one-session trial; `--local` for project scope), usage and configuration (nothing to configure in this version), troubleshooting, development and testing through the mise tasks, a pointer to the release process in the contribution guidance, and the license. The package is marked as pre-release until `0.1.0` is published.

**Blocked by:** 02

**Status:** ready-for-human

- [x] Every install command matches Pi's documented package sources and options.
- [x] Every mise task mentioned exists and behaves as described.
- [x] Troubleshooting covers: no widget (not installed, needs reload, or print and JSON modes have no UI), `CONTEXT USAGE PENDING` after start or compaction, a duplicate older copy in an extensions directory, and package install failures.
- [x] Widget state names match the glossary.
- [x] `mise run pack:check` still passes with the README included.

## Comments

README replaced with pre-release installation, state, troubleshooting, and contributor guidance. Pi 1.5.0 package/CLI docs and mise task names were checked; `mise run pack:check` passes.
