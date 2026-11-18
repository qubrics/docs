# One compatibility reference for #904

Goal: Publish a plain pointer from Existing integrations to the central compatibility reference.
Tier: Reversible. Rollback: revert this PR's eventual merge commit, preserving unrelated changes.

## Source and placement

Canonical per qubrics/qubrics#904 A17 and `ai-integrations/mcp/index.mdx:228-249`: keep the detailed alias mapping in one reference.
`getting-started/existing-integrations.mdx:17` now links to that reference without repeating legacy contract families. The link destination is unchanged.

Placement: Guides → Getting started → Existing integrations.
Disposition: keep. Reader task: find Qubrics aliases and retained integration names.
Sibling fit: existing users choose their path beside Welcome and Quickstart, before developer-tool setup.
No navigation, package, protected MCP pin, release-facts, announcement or other public-copy change is included. PR78 remains untouched.

## Copy checks

The mandatory polish pass covered only the changed sentence. A fresh reader passed all applicable rubric lines. One humanize pass left the sentence unchanged. Link label, destination, Qubrics name, headings and frontmatter are preserved. The duplicate legacy-name list is intentionally removed under the task instruction. The central compatibility mapping is unchanged.

Polish receipt: `/Users/rj/Desktop/GIT-REPOS/sendmux/.claude/artifacts/rebrand-qubrics-904/docs-note-20261118/polish.md`.

## Local validation

Based on docs main `ac2be8ac5fe146aa60317b01de6a998781cfe8ed`; package manifests and lockfile unchanged. Existing installed dependencies were reused without an install.

- `npm run confidentiality:check`: exit0.
- `npm run external-links:check`: exit0.
- `mint validate`: exit0, build and validation passed.
- `mint broken-links`: exit0, no broken links.
- `git diff --check`: exit0.

No test added, changed or removed: one reference-pointer sentence, no executable behaviour. The full existing tooling suite runs in PR CI.
Bulk logs: `/Users/rj/Desktop/GIT-REPOS/sendmux/.claude/artifacts/rebrand-qubrics-904/docs-note-20261118/`.

`mint dev --no-open` rendered the exact pointer at `/getting-started/existing-integrations` with HTTP200, title `Existing integrations - Qubrics`, unchanged reference link and no legacy header/environment/message-ID family tokens. The target `/ai-integrations/mcp` returned HTTP200 with its `compatibility-names` anchor and all three token families intact.

Preview receipts: `preview.json` and `preview-reference.jsonl` in the artifact directory. Owned preview session77785 exited0 after Ctrl-C; PID529 returned `No such process`. Existing IPv4 port3000 listener PID8157 remained untouched.

The installed Mint CLI auto-updated itself from4.3.47 to4.3.55 during its normal validation command. No agent install command or repository dependency change was made; the parent was notified of this machine-setup side effect.

## Completion state at source commit

Status: coded, not merged. The parent authorised a ready PR and normal non-admin merge only after exact-head green checks and settled review. Live pointer readback is required after publication.
Correctness: one central mapping, unchanged destination and retained contracts.
Tests: no test changes; required local checks passed, PR CI pending.
Journeys: local rendered pointer and reference target HTTP200.
Torn down: owned preview absent; existing unrelated listener preserved.
Parked: compatible MCP publication and protected release facts remain parent-owned dependencies.
