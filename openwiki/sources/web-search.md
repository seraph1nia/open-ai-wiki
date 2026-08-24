---
type: Source Evidence
title: Web-search agent-protocols source evidence
description: Ingestion and coverage notes for the 2026-08-16 web-search-agent-protocols run, which returned zero in-scope results for the canonical Agent Host Protocol, ACP TypeScript SDK, and Pierre repositories and carried unreliable synthesized answers.
resource: https://github.com/microsoft/agent-host-protocol/releases
tags: [web-search, source, evidence, agent-protocols, coverage-gap]
timestamp: 2026-08-16
---

# Web-search agent protocols — source evidence

This page records the 2026-08-16 web-search ingestion for the agent-protocols source instance and why it added **no durable protocol or release knowledge**. It is an evidence index, not the synthesis layer. For the MCP/Agent-integration sources see the [Agent integration protocols source page](/sources/web-search-agent-integration-protocols.md) (runs 2026-08-17, 2026-08-18, 2026-08-22).

## Source instance and run facts

- **Instance:** `web-search-agent-protocols` (Agent protocols and releases)
- **Fetched:** 2026-08-16T11:14:21Z (timeRange `week`; windowHours 24)
- **Search:** Tavily, `advanced` depth, 6 queries × 5 max results
- **Raw data:** `web-search-results.json` (25 result objects)

## Queries and outcome

Six queries targeted the six canonical GitHub URLs in this wiki's scope:

1. `https://github.com/agentclientprotocol/typescript-sdk`
2. `https://github.com/agentclientprotocol/typescript-sdk/releases`
3. `https://github.com/microsoft/agent-host-protocol`
4. `https://github.com/microsoft/agent-host-protocol/releases`
5. `https://github.com/pierrecomputer/pierre`
6. `https://github.com/pierrecomputer/pierre/releases`

**None of the six queried URLs appeared in any result.** All 25 hits were off-target and excluded per the source instruction to keep only the official ACP TypeScript SDK, AHP, and Pierre repositories and release pages:

- ACP hits were third-party ecosystem lists (`Picrew/awesome-agent-harness`, `Scottcjn/awesome-agents`, GitHub topic pages) and unrelated releases (`anthropics/claude-agent-sdk-typescript`, `PrefectHQ/fastmcp-ts`, `wevm/mppx`).
- AHP hits were Microsoft-adjacent but not the AHP repo: `microsoft/agent-framework` releases, `microsoft/vscode-docs` agent docs, `microsoft/vscode` issue #330894 (Agent Host diagnostics), `microsoft/aspire` changelog.
- Pierre hits were star lists (`BarryYangi/MyAwesomeStars`, `maguowei/awesome-stars`) and a single compare-page fragment (`pierrecomputer/pierre/compare/e72c42828b...d8ed85a21a`) showing only one commit message ("agents(skills): remove shared skills", by `@necolas`, Aug 3 2026) — not a release.

## Reliability warnings

The Tavily synthesis (`response.answer`) for several queries is **unreliable/hallucinated** and was not adopted:

- It claims the ACP TypeScript SDK's latest release is `v0.3.228` (Aug 11) — actually the versioning pattern of `anthropics/claude-agent-sdk-typescript`, not `@agentclientprotocol/sdk` (whose known latest v1.3.0 remains, per GitHub source evidence).
- It claims `microsoft/agent-host-protocol` release `dotnet-1.17.0` — a Microsoft `agent-frameworks` release version, absent in the AHP repo.
- General descriptions ("connects agents to enterprise databases") are wrong for the ACP SDK.

Rule applied: raw web-search content and its LLM answers are untrusted evidence; only directly relevant, authoritative hits are source-backed. Here there are none, so nothing above is wiki-canonical.

## Inferred signals (low confidence)

- The Pierre compare-page commit indicates `pierrecomputer/pierre` exists and is actively developed (Aug 3, 2026; commit by `@necolas`), but the repository's release evidence, content, and purpose were **not** returned by this run. See the [open question](/open-questions.md); this single weak hit is not promoted to a theme until it recurs.
- VS Code's Agent Hub surface keeps referencing the [Agent Host Protocol](/protocols/agent-host-protocol.md) concepts (docs `agents/concepts/agents.md`, Keywords: `agent host protocol`; issue #330894), reinforcing AHP's adoption in VS Code — consistency signal for the existing AHP page, not new evidence.

## Mapping to wiki pages
- No changes to [Agent Host Protocol](/protocols/agent-host-protocol.md) or [Agent Client Protocol](/protocols/agent-client-protocol.md): no new release or protocol evidence.
- No changes to the [AHP releases](/references/agent-host-protocol-releases.md) or [ACP SDK releases](/references/agent-client-protocol-typescript-sdk-releases.md) references.
- This page exists so future runs can see why the current versions were **not** bumped by this ingestion and can check the canonical GitHub pages if they are reachable.

## Confidence and gaps
- **Confirmed:** run metadata, query list, and the absence of the six canonical URLs in 25 hits (directly from the raw file).
- **Watchlist:** the only witness for `pierrecomputer/pierre` (a star-list entry and a compare-page commit); the critical Tavily `answer` fields are unreliable (conflicting with established ACP/AHP release evidence).
- Gap: no release-page fetching happened this run (Tavily results and their raw content carry release info for other repos only); canonical GitHub release resources remain the authoritative source for AHP/ACP versions.