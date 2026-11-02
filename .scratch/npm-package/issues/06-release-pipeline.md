# 06: Merge-triggered release pipeline, publishing disabled

**What to build:** Automated releases in which merging a release pull request into `main` is the release trigger, while npm publishing stays switched off.

release-please reads Conventional Commits on `main` and keeps a release pull request open that bumps the version and updates the changelog. Merging it creates the tag and GitHub release, and then a publish job runs. The first release is `0.1.0`, and before 1.0 breaking changes bump the minor version. A seeded changelog uses version headings in a format Pi can show after updates.

The publish job uses npm trusted publishing through GitHub OIDC with provenance; no npm token or repository secret is created or referenced. It is gated twice: it runs only when the repository variable `NPM_PUBLISH_ENABLED` is `true`, which is unset by default, and it runs in a GitHub environment named `npm` that requires the maintainer's approval. While disabled, the workflow runs the full check and `npm publish --dry-run` instead.

The ticket also finds out from npm's documentation whether trusted publishing can be configured before a package's first publish, and records the answer.

**Blocked by:** 04

**Status:** ready-for-agent

- [ ] release-please config and manifest produce `0.1.0` as the first release from the current history.
- [ ] The release workflow runs on pushes to `main`, uses SHA-pinned actions, and grants each job only the permissions it needs, with `id-token: write` only on the publish job.
- [ ] With `NPM_PUBLISH_ENABLED` unset, no job can publish; the dry-run path runs `mise run check` and `npm publish --dry-run`.
- [ ] The publish path runs in the `npm` environment and uses provenance with no token.
- [ ] Workflow linting from ticket 04 passes.
- [ ] A changelog exists, and `mise run pack:check` passes with it included.
- [ ] Contribution guidance documents versioning, the release pull request flow, both publish gates, and the trusted-publishing finding with a source link.
