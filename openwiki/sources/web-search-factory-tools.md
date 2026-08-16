---
type: Source Evidence
title: Web-search Factory tools source evidence
description: Ingestion and coverage notes for the 2026-08-16 web-search-factory-tools run over the agentic SDLC factory toolchain (ACP TypeScript SDK, AHP, Pierre, t3code, Effect v4, OpenCode SDK, Pi SDK), including reliability warnings for synthesized answers and the Effect durable-execution gap.
resource: https://github.com/agentclientprotocol/typescript-sdk
tags: [web-search, source, evidence, factory-tools, toolchain]
timestamp: 2026-08-16
---

# Web-search Factory tools — source evidence

This page records the 2026-08-16 web-search ingestion for the **web-search-factory-tools** source instance and what it added to the wiki. It is an evidence index, not the synthesis layer.

## Source instance and run facts

- **Instance:** `web-search-factory-tools` (Factory tools)
- **Fetched:** 2026-08-16T11:36:58Z
- **Search:** Tavily, `advanced` depth, `year` timeRange, `windowHours` 24
- **Raw data:** `web-search-results.json` — **12 queries × 5 max results**

## Queries targeted (12)

1. `https://github.com/agentclientprotocol/typescript-sdk`
2. `https://github.com/agentclientprotocol/typescript-sdk/releases`
3. `https://github.com/microsoft/agent-host-protocol`
4. `https://github.com/microsoft/agent-host-protocol/releases`
5. `https://github.com/pierrecomputer/pierre`
6. `https://github.com/pierrecomputer/pierre/releases`
7. `https://github.com/pingdotgg/t3code`
8. `https://github.com/pingdotgg/t3code/releases`
9. `https://www.effect.website/docs/v4/api/effect`
10. `Effect v4 Workflow Activity DurableQueue durable execution`
11. `https://opencode.ai/docs/sdk/`
12. `https://pi.dev/docs/latest/sdk`

## What was in scope and adopted

- **ACP TypeScript SDK** — repo README confirmed "official TypeScript implementation of ACP"; org listing shows official libraries (TypeScript, Python, Rust, Kotlin) plus a `registry`. Copilot CLI docs show `@agentclientprotocol/sdk` used with GitHub Copilot CLI ACP server (Node ≥ 18). No canonical change beyond confirming the existing [ACP page](/protocols/agent-client-protocol.md).
- **AHP** — the spec file `docs/specification/mcp-channel.md` gave durable evidence of an `mcp://` side-channel (JSON-RPC 2.0 / MCP verbatim, capability-gated, used by [MCP Apps](/protocols/mcp-apps.md)). VS Code issue #311105 confirms the VS Code agent host is the AHP reference and powers Copilot via AHP. Adopted into the [AHP page](/protocols/agent-host-protocol.md).
- **Pierre** — repo, org ("The Pierre Computer Company"), and `@pierre/diffs` v1.3.0 release ("the Edit release") retrieved. Adopted into the new [Pierre page](/frameworks/pierre.md). Also answers the prior [Pierre open question](/open-questions.md).
- **t3code** — README (purpose, install, provider list), desktop/CLI packaging, and several directional issues retrieved. Adopted into the new [t3code page](/frameworks/t3code.md).
- **Effect** — v4 beta blog recap (API additions/removals) and docs index retrieved; the **durable-execution** surface was not. Adopted into [Effect](/frameworks/effect.md).
- **OpenCode SDK** — official SDK docs (`createOpencode`, `@opencode-ai/sdk`) retrieved. Adopted into [OpenCode](/frameworks/opencode-sdk.md).
- **Pi SDK** — `pi.dev/docs/latest/sdk` and `packages/coding-agent/docs/sdk.md` retrieved. Adopted into [Pi SDK](/frameworks/pi-sdk.md).

## Reliability warnings

The Tavily synthesis (`response.answer`) fields are **synthesized and not fully reliable** and were not adopted where unsupported:

- AHP answer (~"mcp:// lets clients communicate with servers using a constrained subset of MCP traffic … standard MCP wire format") matched the spec file and is consistent with the retrieved doc.
- Pierre answers ("over 6,000 stars", focus on diffs/memes/trees) — star count is unconfirmed.
- t3code answer summarized the README accurately.
- **Effect durable-execution query answer** was wrong: it described `NousResearch/hermes-agent`'s unrelated CLI auto-queue (restore/resume/clear) as if it were Effect's DurableQueue. The single result for that query was entirely off-target and **excluded**.

Rule applied: only directly relevant, authoritative hits are source-backed; answered fields match retrieved docs otherwise ignored. Off-target results (e.g. Anthropic Claude Agent SDK releases, Microsoft Agents-for-net/js, OpenRouter agents, OpenHands) were excluded as out-of-scope.

## Mapping to wiki pages

This run created the [factory-toolchain hub](/concepts/factory-toolchain.md) and tool pages ([Pierre](/frameworks/pierre.md), [t3code](/frameworks/t3code.md), [Effect](/frameworks/effect.md), [OpenCode](/frameworks/opencode-sdk.md), [Pi SDK](/frameworks/pi-sdk.md)), and updated the [AHP page](/protocols/agent-host-protocol.md) with the `mcp://` channel. Existing [ACP](/protocols/agent-client-protocol.md), [AHP releases](/references/agent-host-protocol-releases.md), and [ACP SDK releases](/references/agent-client-protocol-typescript-sdk-releases.md) were **not** version-bumped — no authoritative release entries for AHP/ACP SDK appeared this run.

## Confidence and gaps
- **Confirmed:** run metadata, query list (directly from the raw file).
- **Source-backed:** Pierre repo/release, t3code README, Effect v4 beta recap, OpenCode SDK docs, Pi SDK docs, AHP `mcp://` spec excerpt.
- **Watchlist:** Pierre star count; OpenCode Claude-OAuth-removal report; specific t3code issue claims (performance, remote backend roadmap).
- Gap: **Effect durable-execution** (Workflow / Activity / DurableQueue) has **no in-scope evidence** this run; the single query for it returned an off-target hit. Future runs should target the Effect v4 workflow docs directly.