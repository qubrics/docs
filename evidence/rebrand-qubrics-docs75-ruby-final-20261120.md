# Ruby umbrella and final pointer facts

Scope: docs#75 Ruby-dependent facts, based on origin/main `5061e6b`.
Three existing pages change; navigation, Rust, authentication, compatibility
identifiers, API contracts and changelog remain unchanged. Publication requires
its own Ops approval; rollback is revert the resulting merge and republish.

## Owning publication evidence

SDK MAIN `.claude/tasks/rebrand-qubrics-sdk344/`:

- `ruby-sdk-public-20261120.md`: public `qubrics-sdk` 3.0.0, SHA256
  `622b6aeacb5b069a6c2f3fc7bc02763b17a9478b0a2b2e0e6233a65e29e4dd91`,
  fresh isolated public install and `require 'qubrics/sdk'` pass.
- `ruby-sdk-pointer-public-20261120.md`: public `sendmux-sdk` 3.0.0, SHA256
  `134b8ceeb81432af44f3e11c31ca74550da30369b191c9530ee826df28b134a7`,
  unyanked, fresh isolated install resolves all five native Qubrics gems.
- `ruby-sending-pointer-public-20261120.md`,
  `ruby-mailbox-pointer-public-20261120.md`,
  `ruby-management-pointer-public-20261119.md` and the linked Core/surface
  receipts qualify the complete ten-row RubyGems table. Dependency-only
  pointers provide no old import path. No deprecation-message claim added.

Canonical: spec A18 requires Qubrics packages/modules; A17 compatibility
identifiers remain accepted. Install commands and require paths come from
the public consumer receipts, without a repeated package install or upload.

## Content and placement

Guides > Developer tools > SDKs > Ruby, overview, and versioning/support.
Keep existing pages/order. Add the umbrella install/require, identify it in
the overview, and complete all ten released RubyGems rows. The published
surface examples/defaults from PR91 remain intact.

Fresh copy critique found one ambiguous umbrella/surface sequence. Explicit
alternative wording resolves it; all applicable polish rubric lines pass.
Humanize ran once on the new instruction sentences: zero em dashes,
semicolons, curly quotes, banned terms or contrastive framing; under 80 words.
Protected package/version/import tokens, existing auth constraints, headings,
links and page structure remain exact. No rename announcement added.

## Verification

- `git diff --check`, `npm run confidentiality:check`, and
  `npm run external-links:check`: exit 0.
- `mint broken-links`: exit 0, no broken links.
- `mint validate`: exit 0, build and validation passed on final copy.
- Real Chrome preview at port 61076: all three pages rendered; overview and
  compatibility GETs 200, Ruby GET 200. At 04:54:57Z, assertions confirmed
  the exact umbrella install command, require and alternative wording,
  the overview Ruby umbrella row, and all ten package/version/require rows.
  No console errors; local-preview Socket.io connection warning only.
- No new tests: static documentation facts; existing full tooling suite runs
  in CI. No old source-text tests or assertions weakened.
- Standards review: zero hard or heuristic findings. Spec review: zero findings;
  all ten exact-version registry records and the downloaded umbrella payload
  agree with the release receipts and instructions.

Raw validation and preview logs: docs MAIN
`.claude/artifacts/rebrand-qubrics-docs75/ruby-final-*-20261120.log`.
Preview/browser stopped after verification; exact owned cache removed.
Read-only T-47269 check 04:52:35Z returned 200 with the same handled reply ID;
no provider changes, Re-verify or support message.

Status: branch only; CI, merge and publication pending. Rust remains
unpublished and untouched; no whole-goal completion claimed.
