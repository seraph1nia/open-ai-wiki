---
type: Source Evidence
title: Web-search Factory tools source evidence
description: Ingestion and coverage notes for the web-search-factory-tools runs (2026-08-16 toolchain pulls plus the 2026-08-17 first blog-feed run over the Zed, Solo.io, Mastra, and GitHub Agentic Workflows blogs) for the agentic SDLC factory toolchain (ACP TypeScript SDK, AHP, Pierre, t3code, Effect v4, OpenCode SDK, Pi SDK).
resource: https://github.com/agentclientprotocol/typescript-sdk
tags: [web-search, source, evidence, factory-tools, toolchain, blogs]
timestamp: 2026-08-17
---

# Web-search Factory tools — source evidence

This page records the web-search ingestion for the **web-search-factory-tools** source instance and what it added to the wiki — the 2026-08-16 toolchain pulls and the 2026-08-17 first blog-feed run. It is an evidence index, not the synthesis layer.

## Run facts (2026-08-17 — blog feeds first run)

- **Instance:** `web-search-factory-tools` (Factory tools)
- **Fetched:** 2026-08-17T21:54:07Z (Tavily, `advanced` depth, `year` timeRange, `windowHours` 24)
- **Raw data:** `web-search-results.json` — **17 queries × 5 max results** (queries 0–11 = the existing 12-query toolchain set; queries 12–16 = the four followed blogs + the gh-aw gallery)
- This is the **first blog-feed run** since the feeds were configured on 2026-08-17; the [blog post ingestion ledger](/sources/blog-post-ledger.md) was empty until this run and is now populated (see below).

New this run (durable, adopted):

- **Effect v4 beta additions (official Effect v4 Beta February–May recap):** `Effect.firstSuccessOf` ported from v3; `Effect.acquireDisposable` for TC39 Explicit Resource Management (`using`); `Effect.abortSignal` (current fiber's abort signal); `Socket.make` (low-level socket construction); the `Effectable` module for custom effect-like types; `Layer.suspend`; Crypto service in `@effect/platform`. Reconfirmed the DurableQueue port and `@effect/workflow` alpha. Added to the [Effect page](/frameworks/effect.md). (The "What's New in Effect v4" gist hit is a community summary and stays watchlist-only.)
- **AHP SDK MultiHostClient reconfirmed** across Rust, Swift, and Go (single-host consumers use `MultiHostClient::single`/`.single(...)`/`hosts.Single(...)`); detached-shell task state is exposed via `session.rpc.tasks.refresh()`/`list()` (VS Code issue #331027). No new AHP spec release — the releases query drifted to `microsoft/Agents-for-net` 1.3.0 (A2A hosting preview) which is out of scope for this factory set.
- **ACP** — reconfirmed the Copilot CLI ACP server docs, the launch-patterns issue (#569), and the spec-README versioning guidance (negotiated `protocolVersion` + capabilities, not artifact version). Releases query again drifted to `anthropics/claude-agent-sdk-typescript` (`v0.3.219`); **no new ACP TypeScript-SDK release** appeared.
- **Pierre** — new durable signals: feature request **[CLI] issue #728** (pierrecomputer/pierre), the `[diffs/edit]` `onChange` editor-option refactor (PR merge, ~16 days before the fetch), the `chore: update @pierre/diffs to 1.3.0` commit, and the `pierrecomputer/icons` repo ("Built for Diffs.com, Trees.software, and DiffsHub.com", exported source SVGs) alongside `theme` and `sdk` repos. Added to the [Pierre page](/frameworks/pierre.md).
- **t3code** — new directional issues: **Codex slash commands not showing in T3Code (#2637)** (only `/model`, `/plan`, `/default` appear; full slash list + skills work in Codex CLI/app), **Codex image-generation support request (#2398)** (first-class chat-output image preview), and release **v0.0.4 (2026-03-07)** referenced in the `interactionMode` issue #386. Reconfirmed performance issue #695 and the `npx t3@latest` launch. Added to the [t3code page](/frameworks/t3code.md).
- **Pi SDK** — the `pi.dev/news/releases` changelog surface and the **Pi 0.81.1** release entry (session env vars `PI_SESSION_ID`/`PI_SESSION_FILE`/`PI_PROVIDER`/`PI_MODEL`, `Tool.constrainedSampling` `prefer`/`require`, `supportsGrammarTools`/`supportsStrictTools`/`supportsStrictMode`, `bash_execution_update`) were re-observed; also `pi.dev/packages` ecosystem (e.g. `macos-dev-code`) and the development docs. Reconfirmation only; no new version above 0.84.2 appeared.
- **OpenCode SDK** — reconfirmed the official SDK docs; new ecosystem surface: `opencode.ai/docs/go` (official Go SDK page, model/provider table) and `opencode.ai/docs/ecosystem` (community projects: `opencode-background-agents`, `opencode-notify`, `opencode-workspace` multi-agent harness, `octto`). The headroom issue #78 re-raised the Claude-OAuth-removal report (watchlist). A third-party REST client (`anomalyco/opencode-sdk-js` — server-side TS/JS wrapper for the OpenCode REST API) is carried as a watchlist ecosystem signal on the [OpenCode page](/frameworks/opencode-sdk.md), not source-backed. Added eco/ecosystem notes to the [OpenCode page](/frameworks/opencode-sdk.md).

### Blog feeds (first ingestion, 2026-08-17)

All 20 posts seen this run are **recorded in the [ledger](/sources/blog-post-ledger.md)**. Per the ingestion policy, each was judged for durable technical content:

- **Zed (5 posts):** the Sequoia funding post, "We're Not Building AI Features for the Money" (**DeltaDB** — a character-level synchronization engine giving humans and agents a single consistent view of the codebase), the Terms/Privacy overhaul (2026-03-02), the student plan, and dev-containers support. The DeltaDB durable-idea signal is **watchlist/saved-context** — it is the editor-side counterpart to the factory's shared-state layer but the post itself is product/company messaging; no new durable concept adopted this run.
- **Solo.io (5 posts):** all five results (MCP progressive disclosure, agentgateway progressive disclosure, the Solo Enterprise for agentgateway "On-Behalf-Of" demo, the AAIF announcement, MCP authorization patterns for upstream API calls) came back as teaser snippets with little retrievable body. Theme signal: **progressive disclosure / token saving at the MCP gateway layer** and OBO (on-behalf-of) authorization at agent gateways — recorded as watchlist, to be re-read via direct fetch in a later run.
- **Mastra (5 posts):** **Announcing Mastra 1.0** (stable; stabilized APIs, simplified deployment, improved observability), **AI Tracing** (filtered, multi-platform observability in addition to OpenTelemetry), **UI Dojo** (already synthesized into [Mastra agentic-UI](/frameworks/mastra-agentic-ui.md)), **Agent-to-Agent support** (cross-framework multi-agent systems with A2A-enabled agents; Mastra agents + Client SDK support A2A), and the 2026-03-23 changelog (token-aware model routing for observational memory, MongoDB-backed versioned datasets, Okta SSO + RBAC, workflow upgrades, tool suspension handling). The Mastra 1.0 / A2A / AI-Tracing facts were folded onto the [Mastra agentic-UI](/frameworks/mastra-agentic-ui.md) page as runtime/ecosystem signals.
- **gh-aw (3 posts + repo/docs):** "Welcome to Peli's Agent Factory" (workflows as read-only analysts, proactive change proposers, meta-agents that monitor workflow health; dozens of workflows as an extreme), "How GitHub Agentic Workflows Work" (gh-aw compiles Markdown workflow files into GitHub Actions workflows; Actions supplies triggers/runners/logs/job orchestration, gh-aw adds the agent layer), "Meet the Workflows: Continuous Documentation" (heterogeneous generate/maintain/validate sets separated by concern), and the repo-level `gh-aw-mcpg` (MCP Gateway) plus install/create docs. Durable idea: **gh-aw's Markdown-compiled-to-Actions model and its agent-workflow taxonomy** — folded into the [factory hub](/concepts/factory-toolchain.md) as the CI-native layer. gh-aw's `v0.82.8` came from the blog index, not an official release page; treat as watchlist.
- **gh-aw gallery (query 16, catalogue, not ledgered):** returned the Peli's Agent Factory welcome post, `gh-aw-firewall` (squid-config, logger, cli-workflow — the permission/safety layer), install.md, create.md ("Creating Agentic Workflows and Other Actions" prompt guide), and PR #13335 renaming the org `githubnext/gh-aw` → `github/gh-aw`. The gallery confirms the catalogue is live but mostly points to the same material; **no new gallery entries were adopted** beyond what the wiki already documents, other than noting the repo org move and the firewall repo.

Out-of-scope excluded: `microsoft/Agents-for-net` 1.3.0 (A2A hosting preview), `OpenRouterTeam/typescript-agent`, the `maguowei/awesome-stars`, `srid/awesome-stars`, and `MrWillCom/awesome` star lists, the third-party `anomalyco/opencode-sdk-js` REST client, NousResearch hermes-agent issues, the openai/codex desktop crash issue, and community awesome lists.

## Run facts (2026-08-16)

- **Instance:** `web-search-factory-tools` (Factory tools)
- **Search:** Tavily, `advanced` depth, `year` timeRange, `windowHours` 24
- **Raw data:** `web-search-results.json` — **12 queries × 5 max results** (60 result objects)

Three pulls of the same 12-query set ran this day — **2026-08-16T12:51Z and 2026-08-16T19:53Z** (the timestamps recorded below).
- **Second pull (2026-08-16T12:51Z):** closed the Effect durable-execution gap (official v4 beta recap: `DurableQueue` ported from v3, `@effect/workflow` in alpha) and added the Pi official release trail (`pi.dev/news`, 0.80.x–0.84.2) plus ACP org/spec README and ecosystem launch patterns.
- **Third pull (2026-08-16T19:53Z):** this run. Reconfirmed prior content and added two new durable facts from official sources — the **ACP Rust/schema artifact split** and the **GitHub Copilot CLI ACP server**. See "Adopted this run" below.

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

### Adopted this run (third pull, 2026-08-16T19:53Z)

- **ACP Rust/schema artifact split** (official `agentclientprotocol/agent-client-protocol` README, source-backed): root Rust crate `agent-client-protocol-schema` (ACP wire-message data model + code-gen inputs) vs the higher-level `agent-client-protocol` runtime crate; versioned JSON Schema artifacts in `schema/v1`/`schema/v2` attached to `schema-v*` GitHub releases; wire compatibility determined by the negotiated `protocolVersion` (current stable ACP protocol version `1`), NOT the release version. Added to the [ACP page](/protocols/agent-client-protocol.md).
- **GitHub Copilot CLI ACP server** (official GitHub Enterprise Cloud docs, source-backed): `copilot --acp` with `--stdio`/`--port` transports, BYOK-without-login, server-side session options (`--available-tools`, `--excluded-tools`, `--effort`), slash-command advertisement via `available_commands_update`, and consumption via `@agentclientprotocol/sdk`. Added to the [ACP page](/protocols/agent-client-protocol.md) and noted as a concrete ACP server instance in the [factory toolchain](/concepts/factory-toolchain.md).
- Reconfirmed without change: AHP `mcp://` mcp-channel spec; VS Code as the AHP reference server (issues #311105, #329538, #143); Effect v4 beta durable-execution recap; Pi `pi.dev/news` 0.80.x–0.84.x trail; t3code issue #695; OpenCode SDK docs.
- **Excluded (out-of-scope):** OpenRouter `typescript-agent`, Qwen streamable-HTTP ACP issue, `microsoft/Agents-for-net` and `microsoft/agent-framework` releases, durable-workflow org, tensorzero/hatchet external durable engines, the blowmage community Cursor ACP adapter's SDK feature list, OpenCode Go module, community ai-sdk providers, and unrelated t3code issues.
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

The **third pull** (2026-08-16T19:53Z) additionally expanded the [ACP page](/protocols/agent-client-protocol.md) with the Rust/schema artifact-split and Copilot CLI ACP server subsections, and noted Copilot CLI as an ACP server instance on the [factory-toolchain hub](/concepts/factory-toolchain.md).

## Confidence and gaps
- **Confirmed:** run metadata, query list (directly from the raw file).
- **Source-backed:** AHP `mcp://` spec excerpt; Effect v4 beta recap + `@effect/workflow` alpha (official Effect sources); Pi release trail 0.80.x–0.84.2 and SDK docs (official `pi.dev/news` + repo docs); OpenCode SDK docs; t3code README/issues; Pierre repo/issues; **ACP Rust/schema artifact split** and **Copilot CLI ACP server** (official spec-repo README + GitHub Enterprise Cloud docs, third pull).
- **Watchlist:** ACP registry/launch-pattern claims from a third-party issue; Pierre star count; OpenCode Claude-OAuth-removal report; t3code star/fork snapshot and specific issue claims; gh-aw `v0.82.8` (from a blog index, not an official release page); Zed DeltaDB commitment; Solo.io progressive-disclosure/OBO gateway topics (teaser snippets only this run).
- Gap: **Effect Workflow/Activity deep API semantics** (the alpha `@effect/workflow` primitive surface) still need the official v4 workflow docs; Effect's "Activity" term was not explicitly retrieved. AHP/ACP SDK release versions remain unchanged — the answers' `dotnet-1.17.0` / `v0.3.228` refer to other repos (this run: `microsoft/Agents-for-net` 1.3.0 and `anthropics/claude-agent-sdk-typescript` v0.3.219). Future runs should target the Effect v4 workflow docs directly and, for AHP/ACP, the canonical GitHub releases resources; for the followed blogs, fetch full post bodies rather than teaser snippets.