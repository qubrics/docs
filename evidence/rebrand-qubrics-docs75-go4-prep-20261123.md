# Go v4 consumer preparation

Part of docs#75. **Merge/publication held** until Ops confirms that
`go get qubrics.com/go/v4@v4.0.0` resolves. Tag/release existence alone is
insufficient. Ops corrected its earlier proxy check on23November: the consumer
path still returns404; SDK344 owns that diagnosis. No Registry fact changes.

## Source and scope

Docs base `4c5d7316d761b7a81bdc0d2bdc50b06566b90c3e`, origin `qubrics/docs`.
Owning SDK PR329 merged as `c039925a50d7d36e36bcaa7d67575c74d99aa12a`.

Canonical source at that exact SDK commit:

- `go/go.mod:1-5`: module `qubrics.com/go/v4`, declared Go1.23.0 and
  toolchain1.27.2. The existing Go requirement is not a new clean-floor claim.
- `go/README.md`, Install and Version4migration: exact v4.0.0 install command,
  four surface/anchor imports, new API defaults and retained legacy imports.
  Its prepublication warning is respected by this held docs candidate.
- `go/sending/doc.go:9-10`: default `https://smtp.qubrics.com/api/v1`.
- `go/mailbox/doc.go:10-11` and `go/management/doc.go:10-11`: default
  `https://app.qubrics.com/api/v1`.
- Each surface's `sendmux_client.go:85` retains the token-provider factory
  used by the unchanged OAuth example. Constructors, key prefixes, environment
  settings, options, tool IDs and wire contracts are not renamed.

Three-page candidate: Go install/import/default tokens; SDK overview module
path; one canonical Go version-table row. Existing legacy SEO keyword retained
beside the canonical path. Historical changelog untouched. No navigation,
package release, source pin, Registry snapshot, provider or production change.

## Authoring and verification

Placement: Guides → Developer tools → SDKs → Go, Overview, Versioning/support.
Disposition: keep. Existing language setup siblings and sequence remain.
Polish pass: skipped — exact technical-token corrections and table metadata;
no newly drafted reader-facing prose. Protected fields/code/structure preserved
except the authorised source-backed path/default/version replacements.

`npm run confidentiality:check`, `npm run external-links:check`,
`mint validate` and `git diff --check` passed. Broken links and CI results are
recorded in the PR/preparation receipt. No tests added for mechanical tokens;
the existing full tooling suite runs in CI. No public install attempted here
or successful installation claimed. Producer consumer/default/provenance proof
and Ops go-get confirmation remain the release prerequisites.

## Independent Registry boundary

PR418 source preparation chooses `io.github.qubrics/qubrics-mcp`, keeping
Registry metadata2.2.0, PyPI3.0.0 and npm1.0.1 independent. It remains held.
This PR keeps the qualified public snapshot/pin from PR105 unchanged.
Current checker lines118/139 bind the public npm ownership marker and verified
legacy Registry remote; a future Registry consumer change must use the actual
published response and package markers, not infer them from PR418 source.
It must retain local/hosted scope and the existing provenance/contract checks.

Registry readback preparation and source diff live in MAIN task artifacts:
`REGISTRY418-PREP-DIFF-20261123.txt` and
`REGISTRY418-CONSUMER-PREP-20261123.md`. No Registry/provider/DNS writes.
