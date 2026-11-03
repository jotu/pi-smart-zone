---
status: accepted
---

# Release with release-please and npm trusted publishing

Versions, changelog, and tags are derived from Conventional Commits by release-please, and npm publishing uses GitHub OIDC trusted publishing with provenance behind a manually approved `npm` environment, so no long-lived npm token exists. Publishing is off until the maintainer sets `NPM_PUBLISH_ENABLED=true`. See [docs/releasing.md](../releasing.md) for the procedure and the open first-publish bootstrap question.
