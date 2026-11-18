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

No test added or removed. The existing discovery fixture is updated to the canonical producer's name, description and endpoint; every negative case and assertion remains. The full existing tooling suite runs in PR CI.
Bulk logs: `/Users/rj/Desktop/GIT-REPOS/sendmux/.claude/artifacts/rebrand-qubrics-904/docs-note-20261118/`.

`mint dev --no-open` rendered the exact pointer at `/getting-started/existing-integrations` with HTTP200, title `Existing integrations - Qubrics`, unchanged reference link and no legacy header/environment/message-ID family tokens. The target `/ai-integrations/mcp` returned HTTP200 with its `compatibility-names` anchor and all three token families intact.

Preview receipts: `preview.json` and `preview-reference.jsonl` in the artifact directory. Owned preview session77785 exited0 after Ctrl-C; PID529 returned `No such process`. Existing IPv4 port3000 listener PID8157 remained untouched.

The installed Mint CLI auto-updated itself from4.3.47 to4.3.55 during its normal validation command. No agent install command or repository dependency change was made; the parent was notified of this machine-setup side effect.

## Canonical discovery correction

PR86's initial exact head baef78e16251c5e6bcb32bc17427b367e7d08f39 passed49 tooling tests with zero skips, but run44255368077 failed twice because the live discovery gate still required the old website origin, Sendmux name and endpoint. Retry did not remove the cause. Ops then approved the exact source-cited correction through the parent, with strict guards retained and rollback by git revert of the eventual merge commit.

Canonical per spec A5 and [SITE main d08cf3f5 public/.well-known/mcp.json:2-4](https://github.com/qubrics/SITE_qubrics.ai/blob/d08cf3f50eb61c07a9df84222c68d76339354087/public/.well-known/mcp.json#L2): origin `https://qubrics.com`, name Qubrics and endpoint `https://mcp.qubrics.com/mcp`. SITE `src/lib/rebrand-routing.ts:21-37,55-70` maps legacy website paths to the same canonical path with301; only Go metadata/WebAuthn are exempt. The retained MCP service alias is separate from the website discovery origin. These source and live facts make the old checker expectations stale; no producer, cutover or package write is required.

Before applying the approved patch, `npm run mcp-discovery:check` exited1: `https://sendmux.ai/.well-known/mcp.json must return HTTP 200, got 301`, then `301 !== 200` (`discovery-red-live.log`). After the exact expectations/fixture correction, the same command exited0 (`discovery-green-live.log`). `node --test tests/mcp-discovery.test.mjs` passed7/7 with zero skips (`discovery-focused-green.log`), including unchanged rejection of missing paths, redirects, HTML, malformed JSON and wrong endpoints. Manual redirect handling,15-second timeout, strict200, JSON content type and required description are unchanged.

Final-candidate confidentiality, external links, Mint build/validation and broken links each exit0 (`final-*.log`). The unchanged pointer and reference retain their earlier rendered proof; no second preview was needed for checker literals and a fixture update. Detailed diagnosis and approval packet: `discovery-diagnosis.md` in the artifact directory.

## Completion state at source commit

⏸ coded, not merged
Correctness: one central mapping and unchanged link; canonical discovery expectations match its published source, all strict guards retained.
Tests: existing canonical fixture changed with Ops approval;7 focused tests pass, live checker observed red then green, required local checks pass. Exact-head PR CI pending.
Journeys: local pointer and reference target HTTP200; canonical live discovery accepted. Post-publication pointer readback pending.
Evidence: this file and the named artifact directory; PR86.
Status: coded, not merged; parent authorised normal non-admin merge only after exact-head green checks and settled review.
Torn down: owned preview session/PID absent; existing unrelated listener preserved. Worktree retained for PR review.
Parked: none in this change. Overall #904 package/MCP publication dependencies remain parent-owned and are not claimed complete.
