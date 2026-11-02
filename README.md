# Pi Smart Zone

[![License: MIT](https://img.shields.io/github/license/jotu/pi-smart-zone)](LICENSE)
[![Project Status: Pre-release](https://img.shields.io/badge/Project%20Status-Pre--release-orange)](#pi-smart-zone)
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/jotu/pi-smart-zone/badge)](https://scorecard.dev/viewer/?uri=github.com/jotu/pi-smart-zone)

Pi Smart Zone is a Pi extension that shows the active context usage reported by Pi above the editor. Its labels are heuristics about when reasoning quality may drift—not guarantees about model quality or context limits. The extension never compacts, resets, or otherwise changes your session; you stay in control.

> **Pre-release:** This package has not been published to npm. Until the first public `0.1.0` release, install from GitHub or a local checkout. The npm command below is for use after that release.

## Widget states

The thresholds are fixed heuristics, not model-specific limits:

| State | Context usage | Example widget line |
| --- | --- | --- |
| **Smart zone** | Below 125,000 tokens | `SMART ZONE · 124,999 tokens` |
| **Focus drift** | 125,000 through 150,000 tokens, inclusive | `FOCUS DRIFT · 125,000 tokens` |
| **Refocus** | Above 150,000 tokens | `REFOCUS · 150,001 tokens — /compact or /new` |
| **Context usage pending** | Pi has no current context estimate | `CONTEXT USAGE PENDING` |

The widget refreshes as Pi updates the active session's context usage. A pending state is shown instead of a stale count when no current estimate is available, such as just after compaction. **Refocus** suggests `/compact` or `/new`; it does not run either command for you.

## Install

Pi packages can run extension code. Review the source before installing, especially when granting project trust.

### From GitHub (pre-release)

Install the current GitHub version for your user:

```sh
pi install git:github.com/jotu/pi-smart-zone
```

### From npm (after `0.1.0` is published)

```sh
pi install npm:@jotu_myraas/pi-smart-zone
```

### From a local checkout

From the repository root, install the checkout by its absolute path:

```sh
pi install "$PWD"
```

### Try it for one session

Load the GitHub version for this Pi invocation only; it is not added to your package settings:

```sh
pi -e git:github.com/jotu/pi-smart-zone
```

### Install for one project

Run this from the project where you want the widget. `--local` stores the package declaration in that project's `.pi/settings.json`; Pi loads it after project trust is granted.

```sh
pi install --local git:github.com/jotu/pi-smart-zone
```

Use the npm source in this command instead after the first public release if preferred.

## Usage and configuration

Once loaded in an interactive Pi session, the widget appears above the editor. There is nothing to configure in this version: the thresholds and labels are fixed. The extension does not render in print or JSON modes, which have no interactive UI.

## Troubleshooting

- **No widget:** Check `pi list` to confirm the package is installed. Restart Pi or run `/reload` after installing. For a project-scoped install, make sure project trust has been granted. Print and JSON modes intentionally have no widget.
- **`CONTEXT USAGE PENDING` after startup or compaction:** Pi has not provided a current estimate yet. The extension shows pending rather than reusing a stale count; it will refresh when Pi reports usage again, such as after the next completed turn.
- **The widget appears twice:** An older manually copied extension may still be in an extensions directory, for example `~/.pi/agent/extensions/`. Remove that old `smart-zone` copy and reload Pi, leaving only the package installation enabled.
- **Package installation fails:** Check that the source is spelled correctly and that npm or GitHub is reachable. The npm package is unavailable until `0.1.0`; use the GitHub command in the meantime. `pi install` reports installation failures. If Pi warns that a configured package failed at startup, it skips that package's resources and retries at the next start or `/reload`.

## Development

Install the pinned tools and locked development dependencies from the repository root:

```sh
mise install
mise run install
```

Common development tasks:

| Command | Purpose |
| --- | --- |
| `mise run typecheck` | Type-check the extension without emitting files. |
| `mise run lint` | Check code linting and formatting. |
| `mise run format` | Format code and JSON files. |
| `mise run test` | Run the extension behavior tests. |
| `mise run pack:check` | Verify the exact files included in the npm package. |
| `mise run workflow:lint` | Lint GitHub Actions workflows with actionlint and zizmor. |
| `mise run renovate:validate` | Validate the Renovate configuration with the pinned validator. |
| `mise run check` | Run type-checking, lint, workflow lint, Renovate validation, tests, and the package-contents check. |

See [CONTRIBUTING.md](CONTRIBUTING.md) for contributor setup, task details, and the Conventional Commit rules used by the release process. Release automation prepares a release PR; merging it to `main` triggers the release workflow. npm publishing remains disabled until the maintainer approves the first public `0.1.0` release.

## License

[MIT](LICENSE) © 2026 Joacim Turesson.
