# Contributing

## Development setup

Install the tools pinned by this repository, then install the locked npm development dependencies:

```sh
mise install
mise run install
```

`mise run install` uses the committed lockfile and skips package lifecycle scripts.

## Tasks

Run tasks from the repository root:

| Command | Purpose |
| --- | --- |
| `mise run install` | Install locked development dependencies without lifecycle scripts. |
| `mise run typecheck` | Type-check the extension against Pi's published types without emitting files. |
| `mise run lint` | Check lint rules and formatting for code and JSON. |
| `mise run format` | Format code and JSON files. |
| `mise run test` | Run the extension behavior tests. |
| `mise run pack:check` | Check the exact file list npm would publish. |
| `mise run workflow:lint` | Lint GitHub Actions workflows with actionlint and zizmor. |
| `mise run renovate:validate` | Validate the Renovate configuration with the pinned CLI. |
| `mise run test:min-node` | Run the tests on the minimum supported Node.js version (CI runs this too). |
| `mise run check` | Run typecheck, lint, workflow lint, Renovate validation, tests, and the package-contents check. |

The tasks use Bash and are intended to work on macOS and Linux.

Renovate opens pull requests for mise tools, npm development dependencies, and GitHub Actions. Review each dependency update manually before merging; Renovate is not configured to auto-merge.

## Package contents

Only the extension source and package documents are published: `extensions/smart-zone.ts`, `package.json`, `README.md`, `LICENSE`, and `CHANGELOG.md`. The package-contents check enforces the exact allow-list. Contributor guidance, tests, scripts, and repository tooling are not published.

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/), for example `feat: add a widget option` or `fix: handle missing context usage`. Before version 1.0.0, `feat` commits and breaking changes bump the minor version; `fix` commits bump the patch version. Mark breaking changes with `!` in the commit header and describe them in a `BREAKING CHANGE:` footer.

## Releases

Releases are automated by release-please from Conventional Commits; do not edit the version or changelog by hand. Maintainers: see [docs/releasing.md](docs/releasing.md).

## Design decisions and language

- [GLOSSARY.md](GLOSSARY.md) defines the project's terms; use them in issues, code, and docs.
- [docs/adr/](docs/adr/) records hard-to-reverse decisions. Read the relevant ADR before proposing a change that conflicts with it.

## Working with AI agents

This is a [Pi](https://github.com/earendil-works/pi) extension, and the maintainer develops it with Pi using [Matt Pocock's skills](https://github.com/mattpocock/skills). Agent instructions live in [AGENTS.md](AGENTS.md) and [docs/agents/](docs/agents/). Using Pi or these skills is optional for contributors; the checks above are the only requirement. Local specs and tickets go in the git-ignored `.scratch/` directory.

## Code of conduct and security

Participation is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). Report vulnerabilities privately as described in [SECURITY.md](SECURITY.md), not in public issues.
