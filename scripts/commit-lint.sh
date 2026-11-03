#!/usr/bin/env bash
# Check that each given subject line is a Conventional Commit.
# Usage: commit-lint.sh "<subject>" ["<subject>" ...]
#        commit-lint.sh --range <git-rev-range>   (e.g. origin/main..HEAD)
set -euo pipefail

pattern='^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([a-z0-9._/-]+\))?!?: [^ ].{0,71}$'
status=0

if [[ "${1:-}" == "--range" ]]; then
	range="${2:?missing rev range}"
	subjects=()
	while IFS= read -r line; do
		subjects+=("$line")
	done < <(git log --no-merges --format=%s "$range")
	# Nothing to check for an empty range.
	((${#subjects[@]} > 0)) || exit 0
	set -- "${subjects[@]}"
fi

for subject in "$@"; do
	if [[ ! "$subject" =~ $pattern ]]; then
		echo "Not a Conventional Commit subject: $subject" >&2
		status=1
	fi
done

if ((status != 0)); then
	echo "Expected: type(scope)!: description (max 72 chars). See CONTRIBUTING.md." >&2
fi
exit "$status"
