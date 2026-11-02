# Issue tracker: GitHub

GitHub Issues are the canonical tracker for this repository. Use the GitHub CLI installed through mise; run it as `mise exec -- gh ...`.

## Conventions

- Create issues with `mise exec -- gh issue create`.
- Read issues with `mise exec -- gh issue view`.
- List issues with `mise exec -- gh issue list`.
- Comment, label, and close issues with the corresponding `mise exec -- gh issue` commands.
- Use GitHub sub-issues for parent/child tickets when available.
- Use GitHub's native issue dependencies for blocking relationships when available; otherwise state blockers in the issue body.
- When a skill says to publish to the tracker, create a GitHub issue. When it says to fetch a ticket, read the corresponding issue.

## Pull requests as a request surface

**No.** External pull requests are not treated as feature requests for triage.
