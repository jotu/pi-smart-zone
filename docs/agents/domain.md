# Domain Docs

How engineering skills should consume this repository's domain documentation.

## Before exploring

- Read the root `GLOSSARY.md`, if present.
- Read the root `GLOSSARY-MAP.md`, if present, and consult the relevant glossary it points to.
- Read relevant ADRs in `docs/adr/`.

If these files do not exist, proceed silently. The domain-modeling workflow creates them lazily as terms and decisions are resolved.

## Layout

This is a single-context repository: one root `GLOSSARY.md` and a root `docs/adr/`.

## Use the glossary

Use glossary terms in issue titles, plans, and code discussions. If a needed concept is missing, flag it for domain modeling rather than inventing a conflicting synonym.

## ADR conflicts

Surface conflicts with relevant ADRs rather than silently overriding them.
