# 04: Pull-request CI on Linux

**What to build:** Every pull request and every push to `main` runs `mise run check` on Linux, so broken changes cannot merge unnoticed.

CI installs tools through the mise GitHub Action, so CI and local development use the same pinned versions. Every action is pinned to a full commit SHA with a trailing version-tag comment that Renovate can update later. Workflows use least-privilege permissions and do not persist checkout credentials. Workflow linting with actionlint and zizmor is pinned through mise, exposed as a mise task, and included in `mise run check`.

**Blocked by:** 02

**Status:** ready-for-agent

- [ ] A workflow triggers on pull requests and pushes to `main` and runs `mise run check` on a Linux runner.
- [ ] Every `uses:` reference is a 40-character SHA followed by a version comment.
- [ ] Workflow-level permissions are read-only, and checkout does not persist credentials.
- [ ] actionlint and zizmor are pinned in mise, run by a mise task, and pass with no findings, or each suppressed finding is justified inline.
- [ ] `mise run check` includes workflow linting and passes locally.
- [ ] Contribution guidance mentions the new task.
