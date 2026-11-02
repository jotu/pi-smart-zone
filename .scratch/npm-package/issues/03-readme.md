# 03: README for users and contributors

Status: ready-for-agent

Blocked by: 02

Spec: `.scratch/npm-package/spec.md`

## What to build

Replace the placeholder README with one that lets a Pi user install and understand the extension without reading code, and lets a contributor get started.

It covers: what the widget shows (the four states from the glossary with their thresholds and an example line for each), the fact that thresholds are heuristics and the extension never compacts on its own, installation (npm once released, GitHub and local checkout until then, `pi -e` for a one-session trial, `--local` for project scope), usage and configuration (nothing to configure in this version), troubleshooting, development and testing through the mise tasks, a pointer to the release process in the contribution guidance, and the license.

Mark the package as pre-release until `0.1.0` is published.

## Acceptance criteria

- [ ] Every install command matches Pi's documented package sources and options.
- [ ] Every mise task mentioned exists and behaves as described.
- [ ] Troubleshooting covers: no widget (not installed, needs reload, print/JSON mode has no UI), `CONTEXT USAGE PENDING` after start or compaction, a duplicate older copy in the extensions directory, and package install failures.
- [ ] Widget state names match `GLOSSARY.md`.
- [ ] `mise run pack:check` still passes with the README included.
