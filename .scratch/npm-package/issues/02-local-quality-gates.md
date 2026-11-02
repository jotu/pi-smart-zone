# 02: Type-check, lint, and one-command local verification

Status: ready-for-agent

Blocked by: 01

Spec: `.scratch/npm-package/spec.md`

## What to build

Give contributors one command, `mise run check`, that verifies everything a pull request must pass: type-checking, linting and formatting, the tests, and the package-contents check. Add the individual tasks `typecheck`, `lint`, and `format` alongside the existing ones.

Use TypeScript for type-checking only (no emitted output) and Biome for linting and formatting, both as exactly pinned dev dependencies. Scope Biome to code and JSON; the prototype found that recent Biome also formats Markdown, which is not wanted here.

Add contribution guidance: development setup through mise, the task list, the rule that only the extension and package docs are published, and the Conventional Commit convention that release tooling will rely on (before 1.0, `feat` and breaking changes bump the minor version, `fix` bumps the patch).

## Acceptance criteria

- [ ] `mise run typecheck` type-checks the extension against Pi's published types and fails on a deliberate type error.
- [ ] `mise run lint` checks linting and formatting and fails on unformatted code; `mise run format` fixes it.
- [ ] `mise run check` runs typecheck, lint, test, and pack check, and fails if any of them fails.
- [ ] The extension source is still byte-for-byte unchanged in behavior; any formatting change to it is whitespace-only and noted.
- [ ] Contribution guidance documents setup, tasks, publish allow-list, and commit conventions.
- [ ] All tasks run under Bash on macOS; nothing assumes GNU-only tool flags.
