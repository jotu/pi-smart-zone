# 04: Pull-request CI on Linux

Status: ready-for-agent

Blocked by: 02

Spec: `.scratch/npm-package/spec.md`

## What to build

Every pull request and every push to `main` runs `mise run check` on Linux, so broken changes cannot merge unnoticed.

CI installs tools through the mise GitHub Action, so CI and local development use the same pinned versions. Every action is pinned to a full commit SHA with a trailing version-tag comment, so Renovate can update it later. Workflows use least-privilege permissions and do not persist checkout credentials.

Add workflow linting with actionlint and zizmor, both pinned through mise and exposed as a mise task that is part of `mise run check`.

## Acceptance criteria

- [ ] A workflow triggers on pull requests and pushes to `main` and runs `mise run check` on a Linux runner.
- [ ] Every `uses:` reference is a 40-character SHA followed by a version comment.
- [ ] Workflow-level permissions are read-only; checkout does not persist credentials.
- [ ] actionlint and zizmor are pinned in mise, run by a mise task, and pass with no findings (or each suppressed finding is justified inline).
- [ ] `mise run check` includes workflow linting and passes locally.
- [ ] The README and contribution guidance mention the new task if it is user-visible.
