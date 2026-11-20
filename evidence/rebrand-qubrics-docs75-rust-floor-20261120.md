# Rust lockfile qualification

Follow-up to PR94/main4281f613 under the same explicit docs75 GO. Normal
green exact-head merge/native publish authorised; no new ASK. Rollback:
revert resulting merge and republish to4281f613/native7936696232; no retry.

## Cause and scope

SDK MAIN task rebrand-qubrics-sdk344/rust-public-20261120.md, Additional
fresh dependency-resolution qualification: Rust1.82 PASS used a compatible
application Cargo.lock. Unlocked1.82 resolves idna_adapter1.2.2, whose
edition2024 manifest fails before compile; raw
rust-pointer-20261120/fresh-floor-metadata.log22–34. Fresh stable consumer
passes1/1,zero ignored (fresh-stable-consumer.log110–118). No crate bytes,
package version, upload, yank or tag changes authorised or performed.

Audit of all shipped MDX/JSON Rust MSRV/version-support mentions from
4281f613 found one plain support line: rust.mdx25. SDK overview only
describes language/surface coverage; version table's crate1.0.0 is accurate.
The requirement now says exactly:

> Rust 1.82 requires a compatible application `Cargo.lock`. Use stable Rust for fresh installs.

Placement unchanged: Guides > Developer tools > SDKs > Rust. Same reader
task and page order. All other package/import/default/key/contract facts,
frontmatter, headings, code, links and prose remain byte-identical.

## Verification

- Existing Rust accuracy expectation tightened to the exact qualification;
  focused node test first failed ERR_ASSERTION against the plain floor,
  then passed1/1 with zero skipped after the guide correction.
- Confidentiality, external-link, Mintlify broken-link/build/validation
  checks exit0. No new tests or harness; CI owns the full tooling suite.
- Real Chrome preview08:23:43Z HTTP200 renders the exact sentence, no plain
  `Rust 1.82 or newer`; zero console errors, preview Socket.io warning only.
- Independent copy/spec/standards reviews zero findings. Humanize once:
  sentence lengths7/6, em dash/semicolon/curly quote/banned/framing hits0;
  exact text preserved. Protected-set comparison leaves only this intended
  support qualification and its existing test expectation changed.

Raw logs: docs MAIN artifacts/rebrand-qubrics-docs75/rust-floor-20261120/.
Status: verified local candidate, green PR/merge/native publish/readback
next under standing GO. No fresh/unlocked1.82 support claimed.
