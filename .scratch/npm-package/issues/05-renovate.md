# 05: Renovate dependency updates

Status: ready-for-agent

Blocked by: 04

Spec: `.scratch/npm-package/spec.md`

## What to build

Configure Renovate so that tool versions pinned in mise, npm dev dependencies, and SHA-pinned GitHub Actions all receive update pull requests. Dependabot is not used; it does not support mise.

Policy: Renovate's recommended config, GitHub Action digest pinning with version comments, dev tooling grouped into fewer PRs, no auto-merge, and the dependency dashboard enabled.

The Renovate GitHub App itself is installed by the maintainer in ticket 07; this ticket only adds and validates the configuration.

## Acceptance criteria

- [ ] A Renovate config in the repository implements the policy above.
- [ ] Renovate's config validator passes, run through a mise task at a pinned version (no unpinned `npx`).
- [ ] The config covers the mise manager, npm, and GitHub Actions.
- [ ] Contribution guidance explains how dependency updates arrive and that they are reviewed by hand.
