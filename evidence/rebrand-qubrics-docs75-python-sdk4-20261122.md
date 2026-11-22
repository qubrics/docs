# Public Python umbrella package facts

Part of qubrics/docs#75. This slice consumes only the public replacement
`qubrics-sdk` 4.0.0; it does not qualify an old-name pointer or LangChain release.

## Sources

- Ops Watch's 22 November 2026 release handoff: public on PyPI since 14:22 AEDT;
  wheel 4304 bytes, SHA256 prefix `2d9ce5ff`; sdist 5800 bytes, prefix `296430ce`.
- Producer PR358 merged as `6a819411`, tag `python-sdk-v4.0.0`.
- At that merge, `packages/python/sdk/pyproject.toml:6` names `qubrics-sdk`,
  line 7 sets `4.0.0`, and its dependencies declare canonical Core, Mailbox,
  Management and Sending dependencies.
- `packages/python/sdk/qubrics/sdk/__init__.py:6` exports the four namespaces;
  lines 8–13 resolve them to `qubrics.core`, `qubrics.mailbox`,
  `qubrics.management` and `qubrics.sending`.

## Scope and placement

Guides → Developer tools → SDKs: keep the overview, Python installation guide
and versioning reference in their existing positions. Add the public umbrella
package cell, pinned install command and namespace row. Navigation, API examples,
compatibility identifiers and release announcements are unchanged.

Polish pass: skipped — package-table cells and installation code only.
No package install or unchanged publication proof was repeated.

Validation: confidentiality, external links, `git diff --check`, `mint validate`,
`mint broken-links` and the three existing docs-accuracy tests passed. Raw logs
are in MAIN `.claude/artifacts/rebrand-qubrics-docs75/python-sdk4-*-20261122.log`.
No executable code, dependency, navigation or compatibility-contract change.

## Held

SDK344 step 3 (`sendmux-sdk` pointer), step 4 (PR355 merge/tag), step 5
(`langchain-qubrics` 1.0.0) and step 6 (`langchain-sendmux` pointer) are pending.
Go/composite MCP qualification and the remaining #75 acceptance remain held.
Publication requires its own Ops ASK; rollback is revert the merge and republish.
