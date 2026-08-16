---
type: Source Evidence
title: Web-search Factory tools source evidence
description: Ingestion and coverage notes for the 2026-08-16 web-search-factory-tools runs over the agentic SDLC factory toolchain (ACP TypeScript SDK, AHP, Pierre, t3code, Effect v4, OpenCode SDK, Pi SDK), including reliability warnings for synthesized answers, the Effect durable-execution evidence now source-backed, and the Pi 0.80.x–0.84.2 release trail.
resource: https://github.com/agentclientprotocol/typescript-sdk
tags: [web-search, source, evidence, factory-tools, toolchain]
timestamp: 2026-08-16
---

# Web-search Factory tools — source evidence

This page records the 2026-08-16 web-search ingestion for the **web-search-factory-tools** source instance and what it added to the wiki. It is an evidence index, not the synthesis layer.

## Run facts (2026-08-16, second pull)

- **Instance:** `web-search-factory-tools` (Factory tools)
- **Fetched:** 2026-08-16T12:51:59Z
- **Search:** Tavily, `advanced` depth, `year` timeRange, `windowHours` 24
- **Raw data:** `web-search-results.json` — **12 queries × 5 max results** (60 result objects)
- **Instance highlights:** the Effect durable-execution query now returns **official Effect v4 beta sources** (workflow/duration content), the Pi SDK query returns the **official Pi release trail** (`pi.dev/news`, 0.80.x–0.84.2), and the ACP SDK queries return ACP org/spec README evidence plus ecosystem launch patterns.

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

- **ACP TypeScript SDK** — repo README confirmed "official TypeScript implementation of ACP"; org listing shows official libraries (TypeScript, Python, Rust, Kotlin) plus a `registry`; the spec README's "Official Libraries" section additionally lists **Java** (`java-sdk`). Copilot CLI docs show `@agentclientprotocol/sdk` used with GitHub Copilot CLI ACP server (Node ≥ 18). New this run: the ACP **registry at `agentclientprotocol.com/registry`** is referenced from a third-party feature issue (watchlist) and ecosystem **launch patterns** (native subcommand, `--acp` flag, adapter binaries, NPX adapters) were documented. Adopted into the [ACP page](/protocols/agent-client-protocol.md). No new TypeScript-SDK release version appeared this run — the `answer` claiming "v0.3.228" belongs to `anthropics/claude-agent-sdk-typescript`, not ACP.
- **AHP** — the spec file `docs/specification/mcp-channel.md` reconfirmed the `mcp://` side-channel (JSON-RPC 2.0 / MCP verbatim, capability-gated, used by [MCP Apps](/protocols/mcp-apps.md)) and added the `AhpMcpUiHostCapabilities` note. VS Code issues (agent-host labels, milestones 1.121.0/1.129.0, GHE Copilot auth, SSH remote) confirm the VS Code agent host is the AHP reference and powers Copilot via AHP. **No new AHP spec release** — the `dotnet-1.17.0` release in the answer belongs to `microsoft/agent-framework`.
- **Pierre** — repo, org ("The Pierre Computer Company"), and `@pierre/diffs` v1.3.0 release ("the Edit release"). New this run: open issues #331 (diff collapse/expand), #273 (large-file diff lag loading state), #450 (`FileContent.lang` syntax-highlighting bug), plus companion `pierrecomputer/sdk` ("Code Storage SDKs") and `icons` repos. Adopted into the [Pierre page](/frameworks/pierre.md); the prior [Pierre open question](/open-questions.md) remains answered.
- **t3code** — README (purpose, install, provider list), desktop/CLI packaging, and directional issues retrieved (performance #695, remote-backend architecture #671, Codex `interactionMode` friction #386, Windows issue #335). New this run: ~18.5k stars / 4.2k forks snapshot and a community nix flake (`Sawrz/t3code-nix`). No formal release entries appeared — the releases query returned repo/issue pages only. Adopted into the [t3code page](/frameworks/t3code.md).
- **Effect** — v4 beta API recap and docs index retrieved. **Durable-execution surface now retrieved**: the February–May recap's "Workflow & Durable Execution" section documents `DurableQueue` ported from v3 to v4 (persistent queue semantics), workflow suspension/failure fixes, and `@effect/workflow` in alpha; "This Week in Effect 116" corroborates `@effect/workflow` (alpha) and the v4 beta launch date (2026-02-18). Adopted into [Effect](/frameworks/effect.md); the [Effect open question](/open-questions.md) moved to Answered (deep Workflow/Activity semantics remain a narrower gap).
- **OpenCode SDK** — official SDK docs (`createOpencode`, `@opencode-ai/sdk`) retrieved, including the full client options table (`baseUrl`, `fetch`, `parseAs`, `responseStyle`, `throwOnError`) and the typed session API (list/get/create/abort/share/summarize/messages/prompt). Adopted into [OpenCode](/frameworks/opencode-sdk.md).
- **Pi SDK** — `pi.dev/docs/latest/sdk`, `packages/coding-agent/docs/sdk.md`, and the official **release trail on `pi.dev/news`** retrieved (0.80.0→0.84.2, with 0.84.0's big breaking SDK changes documented). Adopted into [Pi SDK](/frameworks/pi-sdk.md).

## Reliability warnings

The Tavily synthesis (`response.answer`) fields are **synthesized and not fully reliable** and were not adopted where unsupported:

- AHP answer claimed latest release `dotnet-1.17.0` — that belongs to `microsoft/agent-framework`, not the AHP repo (absent from the fetched AHP-release query results).
- ACP SDK answers claimed latest release `v0.3.228` — that belongs to `anthropics/claude-agent-sdk-typescript`; the ACP TypeScript SDK's known latest remains v1.3.0 per the direct GitHub resource.
- Pierre answers ("over 6,000 stars", focus claims) — star count unconfirmed; the current run's issue-based results corroborate the diffs focus.
- **Effect durable-execution query answer was partially synthesized** but this run's **underlying results are now on-target at the top**: the first result is the official Effect blog February–May recap containing the genuine `Workflow & Durable Execution` section (DurableQueue port, workflow fixes), replacing the prior run's off-target hermes-agent hit. The remaining results (durable-workflow org, tensorzero, hatchet guide) are out-of-scope third-party durable-execution material and were excluded.

Rule applied: only directly relevant, authoritative hits are source-backed; answered fields match retrieved docs otherwise ignored. Off-target results (Claude Agent SDK releases, Microsoft agent-framework/Agents-for-net releases, OpenRouter agents, OpenHands, tensor/external durable engines) were excluded as out-of-scope.

## Mapping to wiki pages

This run updated existing canonical pages: [Effect](/frameworks/effect.md) (durable-execution now source-backed), [Pi SDK](/frameworks/pi-sdk.md) (official release trail 0.80.x–0.84.2), [ACP](/protocols/agent-client-protocol.md) (Java SDK + registry + launch patterns), [t3code](/frameworks/t3code.md) and [Pierre](/frameworks/pierre.md) (new issue/activity signals), [OpenCode](/frameworks/opencode-sdk.md) (full client options + session API), and the [factory-toolchain hub](/concepts/factory-toolchain.md) (Effect gap closed). Existing [AHP releases](/references/agent-host-protocol-releases.md) and [ACP SDK releases](/references/agent-client-protocol-typescript-sdk-releases.md) were **not** version-bumped — no authoritative new release entries for AHP/ACP SDK appeared this run (the `dotnet-1.17.0`/`v0.3.228` answers refer to other repos).

## Confidence and gaps
- **Confirmed:** run metadata, query list (directly from the raw file).
- **Source-backed:** AHP `mcp://` spec excerpt; Effect v4 beta recap + `@effect/workflow` alpha (official Effect sources); Pi release trail 0.80.x–0.84.2 and SDK docs (official `pi.dev/news` + repo docs); OpenCode SDK docs; t3code README/issues; Pierre repo/issues.
- **Watchlist:** ACP registry/launch-pattern claims from a third-party issue; Pierre star count; OpenCode Claude-OAuth-removal report; t3code star/fork snapshot and specific issue claims.
- Gap: **Effect Workflow/Activity deep API semantics** (the alpha `@effect/workflow` primitive surface) still need the official v4 workflow docs; Effect's "Activity" term was not explicitly retrieved. AHP/ACP SDK release versions remain unchanged — the answers' `dotnet-1.17.0` / `v0.3.228` refer to other repos. Future runs should target the Effect v4 workflow docs directly and, for AHP/ACP, the canonical GitHub releases resources.