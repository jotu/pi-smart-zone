# 07: First public 0.1.0 release

Status: ready-for-human

Blocked by: 03, 05, 06

Spec: `.scratch/npm-package/spec.md`

## What to build

Publish `@jotu_myraas/pi-smart-zone@0.1.0` to npm once the foundation, docs, CI, and release pipeline are in place, and only after the maintainer explicitly approves the release. Agents may prepare and check, but must not change GitHub settings, configure npm, publish, or push without that approval.

Maintainer steps:

1. Push the work and get CI green on `main`.
2. Install the Renovate GitHub App on the repository.
3. Create the `npm` GitHub environment with the maintainer as required reviewer.
4. Configure npm trusted publishing for this repository and release workflow, or do the one-time manual first publish if ticket 06 found that trusted publishing needs an existing package.
5. Set the repository variable `NPM_PUBLISH_ENABLED` to `true`.
6. Merge the `0.1.0` release PR and approve the `npm` environment deployment.

## Acceptance criteria

- [ ] The maintainer has explicitly approved publishing `0.1.0`.
- [ ] `0.1.0` is on npm with provenance, published by CI from the merged release PR.
- [ ] `pi install npm:@jotu_myraas/pi-smart-zone` installs it and the widget appears.
- [ ] The README's pre-release notice is removed.
- [ ] Renovate opens its onboarding or dependency dashboard issue.
