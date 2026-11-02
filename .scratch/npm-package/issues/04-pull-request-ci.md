# 04: Pull-request CI on Linux

**What to build:** Every pull request and every push to `main` runs `mise run check` on Linux, so broken changes cannot merge unnoticed.

CI installs tools through the mise GitHub Action, so CI and local development use the same pinned versions. Every action is pinned to a full commit SHA with a trailing version-tag comment that Renovate can update later. Workflows use least-privilege permissions and do not persist checkout credentials. Workflow linting with actionlint and zizmor is pinned through mise, exposed as a mise task, and included in `mise run check`.

**Blocked by:** 02

**Status:** ready-for-human

- [x] A workflow triggers on pull requests and pushes to `main` and runs `mise run check` on a Linux runner.
- [x] Every `uses:` reference is a 40-character SHA followed by a version comment.
- [x] Workflow-level permissions are read-only, and checkout does not persist credentials.
- [x] actionlint and zizmor are pinned in mise and run by a mise task.
- [x] Workflow lint passes with no findings.
- [x] `mise run check` includes workflow linting and passes locally.
- [x] Contribution guidance mentions the new task.

## Completion note

Implemented PR and `main`-push CI with read-only permissions, pinned actions, and mise-managed workflow linting. `mise run check` and a pedantic zizmor audit pass locally with no findings.
