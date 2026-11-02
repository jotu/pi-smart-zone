# Spec: package Smart Zone as a self-contained, open-source Pi extension

Status: ready-for-agent

## Problem Statement

Pi users who want to keep long sessions in the **smart zone** have no packaged way to see it. The Smart Zone extension exists only as a single file inside one person's dotfiles, so nobody else can install it, it has no versioning or changelog, and there is no CI guarding its behavior. Installing it today means copying a file by hand and keeping it updated manually.

## Solution

Publish the existing Smart Zone extension as a self-contained, open-source Pi package, `@jotu_myraas/pi-smart-zone`, that anyone can install with `pi install npm:@jotu_myraas/pi-smart-zone` (or from GitHub before the first npm release). The widget behaves exactly as it does today. The repository gets pinned tooling through mise, documented tasks, tests, linting, type-checking, a package-contents check, PR CI, automated dependency updates, and a release workflow in which merging a release PR into `main` is the release trigger. Publishing to npm stays disabled until the maintainer explicitly approves the first public `0.1.0` release.

## User Stories

### Pi users

1. As a Pi user, I want to install the extension with one `pi install` command, so that I don't have to copy files by hand.
2. As a Pi user, I want to try the extension for a single session with `pi -e`, so that I can evaluate it without changing my settings.
3. As a Pi user, I want to install it from GitHub before it is on npm, so that I can use it early.
4. As a Pi user, I want to install it per project with `--local`, so that only some projects show the widget.
5. As a Pi user, I want to see my active context size above the editor, so that I always know how large the session has grown.
6. As a Pi user, I want the widget to say **Smart zone** below 125,000 tokens, so that I know the model is still reasoning sharply.
7. As a Pi user, I want the widget to say **Focus drift** from 125,000 through 150,000 tokens, so that I notice quality may begin to decline.
8. As a Pi user, I want the widget to say **Refocus** above 150,000 tokens with a `/compact` or `/new` nudge, so that I know it is time to reset.
9. As a Pi user, I want the widget to show **Context usage pending** when Pi has no estimate, such as right after compaction, so that I'm never shown a stale count.
10. As a Pi user, I want the token count formatted with thousands separators, so that it is easy to read at a glance.
11. As a Pi user, I want the widget to refresh at session start, after each turn, on model change, after compaction, and after `/tree` navigation, so that it always reflects the active branch.
12. As a Pi user, I want the widget removed on session shutdown, so that nothing stale is left behind.
13. As a Pi user, I want the extension to stay quiet in print and JSON modes, so that it never interferes with scripted use.
14. As a Pi user, I want the extension never to compact or reset my session itself, so that I stay in control.
15. As a Pi user, I want the package to contain only what it needs, so that I can review exactly what code runs inside Pi.
16. As a Pi user, I want the package to have no runtime dependencies and not bundle Pi's own packages, so that it loads cleanly alongside other extensions.
17. As a Pi user, I want a README explaining what the widget shows, how to install it, how to use it, and how to troubleshoot it, so that I can self-serve.
18. As a Pi user, I want a changelog, so that Pi can show me what changed after an update.
19. As a Pi user upgrading from a hand-copied version, I want troubleshooting guidance about removing the old copy, so that the extension doesn't load twice.
20. As a Pi user, I want published versions to carry npm provenance, so that I can verify they were built from this repository by CI.

### Contributors

21. As a contributor, I want `mise install` to provide the exact pinned Node.js version, so that my environment matches CI.
22. As a contributor, I want one documented mise task per common action (install, type-check, lint, format, test, package check, check-all), so that I don't have to remember tool invocations.
23. As a contributor on macOS or Linux, I want the tasks written in Bash that works on both, so that I can develop on either.
24. As a contributor, I want dependencies installed from a lockfile, so that installs are reproducible.
25. As a contributor, I want type-checking of the TypeScript source, so that API misuse is caught before release.
26. As a contributor, I want linting and formatting checks, so that the code stays consistent.
27. As a contributor, I want tests that drive the extension the way Pi does, so that I can refactor safely.
28. As a contributor, I want a package-contents check that fails if anything unexpected would be published, so that local files or secrets can never leak into the npm package.
29. As a contributor, I want contribution guidance, including commit conventions, so that my changes produce correct releases.
30. As a contributor, I want a glossary of the widget states, so that issues, code, and docs use the same words.

### Maintainer

31. As the maintainer, I want CI to run every check on each pull request on Linux, so that broken changes can't merge.
32. As the maintainer, I want every GitHub Action pinned to a full commit SHA with a version comment, so that the supply chain is protected.
33. As the maintainer, I want Renovate to keep mise tools, npm dev dependencies, and pinned actions up to date, so that pins don't rot.
34. As the maintainer, I want Renovate never to auto-merge for now, so that I review every update.
35. As the maintainer, I want release-please to maintain a release PR from Conventional Commits, so that versions and the changelog are produced automatically.
36. As the maintainer, I want merging the release PR into `main` to be the release trigger, so that releases happen only when I decide.
37. As the maintainer, I want npm publishing through trusted publishing with no stored npm token, so that there is no long-lived secret to leak.
38. As the maintainer, I want publishing disabled by default and protected by an approval environment, so that nothing reaches npm until I explicitly approve.
39. As the maintainer, I want the release workflow to run a publish dry run while publishing is disabled, so that I can validate the pipeline before going live.
40. As the maintainer, I want to approve the first public `0.1.0` release myself, so that the package goes public only once the foundation, docs, and CI are in place.

## Implementation Decisions

- **Behavior is preserved.** The Smart Zone extension is moved into this repository unchanged: same thresholds (below 125,000 / 125,000–150,000 inclusive / above 150,000), same labels, same widget key, same placement above the editor, same refresh events, same clear-on-shutdown, and the same "only when Pi has a UI" guard. Improvements are deferred to later issues.
- **No configuration in v1.** Thresholds stay fixed; the README states there is nothing to configure.
- **Package identity.** npm name `@jotu_myraas/pi-smart-zone`, published publicly (scoped packages need an explicit public access setting), MIT license, author Joacim Turesson, repository `github.com/jotu/pi-smart-zone`. Includes the `pi-package` keyword for the Pi package gallery.
- **Ship TypeScript source, no build step.** Pi loads extensions through jiti, so the package declares the TypeScript entry point in the `pi.extensions` manifest. There is no compiled output.
- **Dependencies.** No runtime dependencies. Pi's host package `@earendil-works/pi-coding-agent` is a peer dependency with range `*` and is never bundled, per Pi's packaging guidance. Dev dependencies, pinned exactly: TypeScript (type-check only), Biome (lint and format), and Pi's coding-agent package for types.
- **Package contents** are restricted by an allow-list to the extension source plus `README`, `LICENSE`, `CHANGELOG`, and `package.json`.
- **Compatibility.** Node.js `>=22.19.0`, matching Pi 1.5.0. Development and CI use Node 24.22.2, pinned with mise.
- **Tooling through mise.** mise installs every tool and runs every task. Tasks are written in Bash, portable across Linux and macOS, defined inline in the mise configuration (no executable task files needed). Tasks: install (lockfile install, no lifecycle scripts), typecheck, lint, format, test, pack check, and an aggregate check.
- **Versioning.** Conventional Commits drive release-please. The first release is `0.1.0`. Before 1.0, breaking changes bump the minor version.
- **CI.** One workflow runs the aggregate check on pull requests and pushes to `main`, on Linux, through the mise GitHub Action, with least-privilege permissions. All actions are pinned by full commit SHA with a version-tag comment. Workflow files are linted with actionlint and zizmor, both pinned through mise.
- **Release.** A release workflow runs release-please on pushes to `main`. When the release PR is merged, release-please creates the tag and GitHub release, and a publish job runs. Publishing uses npm trusted publishing (GitHub OIDC) with provenance; no npm token or repository secret is created.
- **Publish gate.** The publish job runs only when the repository variable `NPM_PUBLISH_ENABLED` is `true` (unset by default) and runs in a GitHub environment named `npm` that requires the maintainer's approval. Until enabled, it runs the checks and an npm publish dry run.
- **Dependency updates.** Renovate (free Mend Renovate Community Cloud app) manages mise tools, npm dev dependencies, and SHA-pinned actions: recommended config, action digest pinning, dev tooling grouped, no auto-merge, dependency dashboard enabled. No Dependabot.
- **Domain language.** The widget states are named **Smart zone**, **Focus drift**, **Refocus**, and **Context usage pending**, recorded in the root glossary.

## Testing Decisions

- **Good tests exercise external behavior only**: what Pi would observe, never internal helpers or constants.
- **Seam 1, the extension's default export.** Tests call it with a fake Pi API that records registered event handlers, fire those handlers with a fake context (a controllable token count and a recorder for widget calls), and assert on the widget key, text, and placement. Covered: each threshold boundary (124,999 / 125,000 / 150,000 / 150,001), the pending state after compaction, refresh on session start, model selection, compaction, and branch change, and clearing on shutdown.
- **Seam 2, the packed file list.** `npm pack --dry-run` output must equal the expected allow-list exactly, so an extra or missing file fails the check.
- **Prior art.** Five existing `node:test` tests for this extension already use seam 1; they move over with only their import path changed. Node 24 runs them directly against the TypeScript source.
- Type-checking, linting, and workflow linting are verification gates, not behavior tests.

## Out of Scope

- Any change to the widget's behavior, thresholds, labels, or configuration options.
- The actual first npm publication; that needs the maintainer's explicit approval.
- Creating npm tokens or repository secrets.
- Switching the maintainer's dotfiles to install this package instead of the local copy.
- CI on macOS or Windows.
- Changing GitHub repository settings beyond what the maintainer does by hand (Renovate app install, `npm` environment, publish variable, branch protection).

## Further Notes

- A reference prototype exists on the local branch `prototype/npm-package` (not pushed). It validated: TypeScript 7.0.2 type-checks the extension against Pi 1.5.0's types; Biome 2.6.4 lint/format (Biome now also formats Markdown, so it was scoped to code and JSON files); Node 24 runs the existing tests against the `.ts` source when given a glob, not a bare directory; mise tasks work inline with `bash -euo pipefail -c`; and a pack check that diffs the dry-run file list against an allow-list catches stray files. CI and release workflows were not prototyped.
- To check before relying on it: whether npm trusted publishing can be configured before a package's first publish. If not, the first `0.1.0` release may need a one-time manual publish.
- Manual steps for the maintainer before the first release: install the Renovate GitHub App, create the `npm` environment with a required reviewer, configure the npm trusted publisher for this repository and workflow, then set `NPM_PUBLISH_ENABLED` to `true` when approving `0.1.0`.
