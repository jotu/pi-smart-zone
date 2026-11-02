# 06: Merge-triggered release pipeline, publishing disabled

Status: ready-for-agent

Blocked by: 04

Spec: `.scratch/npm-package/spec.md`

## What to build

Prepare automated releases in which merging a release PR into `main` is the release trigger, while keeping npm publishing switched off.

release-please reads Conventional Commits on `main` and keeps a release PR open that bumps the version and updates the changelog. Merging it creates the tag and GitHub release, and then a publish job runs. Configure it so the first release is `0.1.0` and, before 1.0, breaking changes bump the minor version. Seed a changelog with version headings in a format Pi can show after updates.

The publish job uses npm trusted publishing through GitHub OIDC with provenance; no npm token or repository secret is created or referenced. It is gated twice: it runs only when the repository variable `NPM_PUBLISH_ENABLED` is `true` (unset by default), and it runs in a GitHub environment named `npm` that requires the maintainer's approval. While disabled, the workflow runs the full check and `npm publish --dry-run` instead.

Find out from npm's documentation whether trusted publishing can be configured before a package's first publish, and record the answer.

## Acceptance criteria

- [ ] release-please config and manifest produce `0.1.0` as the first release from the current history.
- [ ] The release workflow runs on pushes to `main`, uses SHA-pinned actions, and grants only the permissions each job needs (`id-token: write` only on the publish job).
- [ ] With `NPM_PUBLISH_ENABLED` unset, no job can publish; the dry-run path runs `mise run check` and `npm publish --dry-run`.
- [ ] The publish path runs in the `npm` environment and uses `--provenance` with no token.
- [ ] Workflow linting from ticket 04 passes.
- [ ] A changelog exists and `mise run pack:check` passes with it included.
- [ ] Contribution guidance documents versioning, the release PR flow, both publish gates, and the trusted-publishing finding with a source link.
