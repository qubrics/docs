# Canonical status links

Refs docs#75 hostname criterion; based on main9d6aac89. Exactly three
Service status card destinations change from https://status.sendmux.ai
to https://status.qubrics.com: api/errors.mdx58,
monitoring/dashboard-logs.mdx81, monitoring/deliverability.mdx71.

Canonical per the live status page: HTTPS GET200, title Qubrics Status,
canonical https://status.qubrics.com/, three Qubrics strings and zero
Sendmux strings. Saved headers/body are in docs MAIN
.claude/artifacts/rebrand-qubrics-docs75/rust-floor-20261120/status-qubrics.*.
No status-provider, hostname, DNS, Worker or routing change.

## Verification

- Read-only preservation comparison passes: each file equals its base
  with exactly one URL replacement; every other byte unchanged.
- Confidentiality and external-link checks exit0. Mintlify broken-links,
  build and validation exit0; logs are in MAIN task artifacts.
- Real Chrome local preview: all three changed pages200 and Service
  status cards visible. API error card click opens the canonical status
  popup; title Qubrics Status, operational services visible, console clean.
  Native preview Card is div.card with no href attribute; popup arrives
  asynchronously. Its earlier null attribute/immediate empty popup list
  were measurement assumptions, not navigation failures.
- No test added for three literal destinations; CI runs existing tooling
  and contract tests. No package/compatibility identifier or prose change.
- Placement, card copy, icon, navigation and ordering unchanged. Polish
  pass skipped: exact technical-token correction only.

Own preview18899/19384 exited; exact3000-beta cache removed and verified
absent. Own preview and status popup closed. Existing unrelated IPv4
port3000 process8157 was read-only inspected and left untouched.

Raw verification: docs MAIN .claude/artifacts/rebrand-qubrics-docs75/
status-links-{broken-links,validate,preview}-20261120.log.
Publication remains gated: request normal merge at the green exact head,
native publish and three changed-page live target readbacks. Rollback:
revert resulting merge mainline1 and native republish; capture current
main/native anchor in the publication ASK. No package-release claims.
