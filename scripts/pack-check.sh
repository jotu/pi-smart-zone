#!/usr/bin/env bash
# Verify that `npm pack` would include exactly the publishable files.
set -euo pipefail

expected_files=(CHANGELOG.md LICENSE README.md extensions/smart-zone.ts package.json)
expected=$(printf '%s\n' "${expected_files[@]}" | LC_ALL=C sort)

actual=$(
	npm pack --dry-run --json --ignore-scripts |
		node --input-type=module -e '
			let input = "";
			for await (const chunk of process.stdin) input += chunk;
			for (const file of JSON.parse(input)[0].files) console.log(file.path);
		' |
		LC_ALL=C sort
)

if [[ "$actual" != "$expected" ]]; then
	echo "Unexpected package contents:" >&2
	diff <(printf '%s\n' "$expected") <(printf '%s\n' "$actual") >&2 || true
	exit 1
fi

echo "Package contents OK:"
printf '%s\n' "$actual"
