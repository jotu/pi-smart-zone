# 05: Renovate dependency updates

**What to build:** Renovate configuration so that tool versions pinned in mise, npm dev dependencies, and SHA-pinned GitHub Actions all receive update pull requests. Dependabot is not used because it does not support mise.

Policy: Renovate's recommended config, GitHub Action digest pinning with version comments, dev tooling grouped into fewer pull requests, no auto-merge, and the dependency dashboard enabled. The maintainer installs the Renovate GitHub App in ticket 07; this ticket only adds and validates the configuration.

**Blocked by:** 04

**Status:** ready-for-agent

- [ ] The repository's Renovate config implements the policy above.
- [ ] Renovate's config validator passes, run through a mise task at a pinned version with no unpinned `npx`.
- [ ] The config covers the mise manager, npm, and GitHub Actions.
- [ ] Contribution guidance explains how dependency updates arrive and that each is reviewed by hand.
