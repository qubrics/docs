# Public Rust crate facts

Scope: docs#75 Rust-held facts, based on origin/main `2c505652`.
Three existing SDK pages change. Navigation, authentication constraints,
compatibility identifiers and unrelated package facts remain intact.
Merge/publication requires a separate Ops approval; rollback is revert the
resulting merge (mainline parent 1) and republish through the native path.

## Owning evidence

SDK MAIN `.claude/tasks/rebrand-qubrics-sdk344/rust-public-20261120.md`
qualifies public, unyanked `qubrics` 1.0.0. Ops independently confirmed its
crates.io API checksum. The retained downloaded archive is 25,962 bytes:

`707d4cd9e5fe26dbe4a6f53077c1553c15a9b778e44d0540e11925e5b1e4176b`.

The archive is SDK MAIN
`.claude/artifacts/rebrand-qubrics-sdk344/rust-public-20261120/qubrics-1.0.0.crate`.
Its SHA256 was rechecked for this slice and matches exactly. The producer's
fresh registry-only Rust 1.82 consumer test passed 1/1, zero ignored, and
its executable smoke passed. No authenticated API smoke is claimed.
A redundant docs-side crates.io curl returned 403; it supplies no release
evidence. This slice relies on the qualified producer/Ops receipt and the
exact public archive, without repeating an install or publication.

Archive facts inspected directly:

- `Cargo.toml:13-16`: Rust 1.82, name `qubrics`, version 1.0.0.
- `src/lib.rs:3-17`: public surface modules and shared Result/Error exports.
- `src/lib.rs:20-32`: Sending, Mailbox and Management convenience helpers.
- `src/sending.rs:6`, `src/mailbox.rs:7`, `src/management.rs:7`: default
  `smtp.qubrics.com/api/v1` and `app.qubrics.com/api/v1` URLs.
- The three surface constructors and asynchronous token-provider signatures,
  plus `src/core.rs:146-165` request options, match the guide's examples.

Canonical: spec A3/A17 requires Qubrics naming/default hosts while keeping
accepted compatibility identifiers. The public crate supplies the actual
namespace and version. No unpublished `sendmux` pointer, calendar feature
or rebrand announcement is introduced.

## Placement and copy

Guides > Developer tools > SDKs > Rust, SDK overview, versioning/support.
Keep placement, grouping and order. Change the crate/install/import tokens
and default hosts, add the released version row, remove the disproven
pre-1.0 qualification. Every `smx_*` occurrence is preserved.

Independent copy critique: every applicable rubric line passes, no rewrite.
Humanize ran once on the retained versioning sentence: seven words, zero
em dashes, semicolons, curly quotes, banned vocabulary or framing patterns.
Exact technical-token corrections are polish-exempt. Protected headings,
links, code structure, prerequisites and verified facts are preserved.

## Verification

- `git diff --check`, confidentiality and external-link checks: exit 0.
- `mint broken-links`: exit 0, no broken links.
- `mint validate`: exit 0, build and validation passed.
- Real Chrome local preview: all three pages returned 200. At
  07:57:44–07:58:23Z, Rust rendered all nine expected install/module/host/key
  tokens with zero legacy strings; overview rendered the Qubrics Rust row;
  versioning rendered the exact crates.io/version/module row and no `0.x`
  or pre-1.0 claim. No console errors; preview Socket.io warning only.
- Read-only preservation comparison: Rust guide equals the exact approved
  token map; compatibility-prefix occurrences match the base across all
  three pages. No new tests for static token corrections; full tooling
  tests remain CI-owned. Existing Rust expectations require the released
  crate/version/module tokens, with the rest of that coverage intact.
- Independent standards and spec reviews: zero findings on each axis.

Raw logs, screenshot and support-check receipt: docs MAIN
`.claude/artifacts/rebrand-qubrics-docs75/rust-facts-20261120/`.
T-47269 read-only check 07:54:18Z returned 200, same handled reply ID;
no support send, Re-verify or provider change.

Status: local candidate verified; PR/CI and separate merge/publication gate
remain. No whole-goal completion claimed.

CI root cause: run `44699097681` fails only the existing Rust docs test at
`tests/docs-accuracy.test.mjs:47`, which still requires `/cargo add sendmux/`
and the old namespaces/pre-1.0 statement. A focused local invocation
`node --test --test-name-pattern='documents the Rust SDK' tests/docs-accuracy.test.mjs`
reproduces the exact `ERR_ASSERTION` before the fix. The verified public
archive disproves every obsolete expected token. Update those assertions
to the exact public install/version/module facts; preserve the remaining
checks. No assertion is removed or loosened. Raw red receipt:
`stale-rust-test-red.log` alongside the complete CI failure log.
The same focused invocation then passes 1/1 with zero skipped after the
correction (`stale-rust-test-green.log`). No shipped MDX changed after its
successful preview/validation, so those receipts still apply.
