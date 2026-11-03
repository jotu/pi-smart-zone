# Security policy

Pi extensions run with the full permissions of your user account. Review this package's source (a single file, `extensions/smart-zone.ts`) before installing it. It reads Pi's context-usage estimate and renders a widget; it makes no network requests, spawns no processes, and touches no files.

## Supported versions

Only the latest released version receives security fixes.

## Reporting a vulnerability

Please do not open a public issue. Use GitHub's [private vulnerability reporting](https://github.com/jotu/pi-smart-zone/security/advisories/new) for this repository. Expect an initial response within a week.

Supply-chain concerns (compromised dependencies, workflow weaknesses, unexpected package contents) are in scope.
