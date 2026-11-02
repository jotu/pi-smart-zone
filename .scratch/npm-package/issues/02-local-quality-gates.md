# 02: Type-check, lint, and one-command local verification

**What to build:** One command, `mise run check`, that verifies everything a pull request must pass: type-checking, linting and formatting, the tests, and the package-contents check. Contributors also get the individual tasks `typecheck`, `lint`, and `format`.

TypeScript is used for type-checking only, with no emitted output, and Biome for linting and formatting, both as exactly pinned dev dependencies. Biome is scoped to code and JSON; the prototype found that recent Biome also formats Markdown, which is not wanted here.

Contribution guidance covers development setup through mise, the task list, the rule that only the extension and package docs are published, and the Conventional Commit convention that release tooling relies on: before 1.0, `feat` and breaking changes bump the minor version and `fix` bumps the patch.

**Blocked by:** 01

**Status:** ready-for-agent

- [ ] `mise run typecheck` type-checks the extension against Pi's published types and fails on a deliberate type error.
- [ ] `mise run lint` checks linting and formatting and fails on unformatted code; `mise run format` fixes it.
- [ ] `mise run check` runs typecheck, lint, test, and pack check, and fails if any of them fails.
- [ ] The extension's behavior is unchanged; any formatting change to it is whitespace-only and noted.
- [ ] Contribution guidance documents setup, tasks, the publish allow-list, and commit conventions.
- [ ] All tasks run under Bash on macOS and Linux; nothing relies on GNU-only tool flags.
