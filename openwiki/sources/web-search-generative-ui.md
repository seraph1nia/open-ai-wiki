---
type: Source Evidence
title: Web-search generative-UI source evidence
description: Ingestion and coverage notes for the web-search-generative-ui runs (2026-08-16 three pulls plus a 2026-08-17 re-pull) over the AG-UI, CopilotKit, OpenUI, Mastra agentic-UI, A2UI, and MCP Apps sources, with reliability warnings for off-target synthesized answers.
resource: https://github.com/ag-ui-protocol/ag-ui
tags: [web-search, source, evidence, generative-ui, agent-ui, coverage]
timestamp: 2026-08-17
---

# Web-search generative UI — source evidence

This page records the web-search ingestion for the `web-search-generative-ui` source instance (three pulls on 2026-08-16 plus a 2026-08-17 re-pull) and grounds the wiki's generative-UI protocol and framework pages. It is an evidence index, not the synthesis layer (see [Generative-UI ecosystem](/concepts/generative-ui-ecosystem.md)).

## Run facts

- **Instance:** `web-search-generative-ui` (Generative UI)
- **Run 1 — fetched:** 2026-08-16T11:19:23Z (Tavily, `advanced` depth, 8 queries × 5 max results; windowHours 24). Raw data: `2026-08-16T11-18-45-442Z/web-search-results.json` (40 result objects across 8 queries).
- **Run 2 — fetched:** 2026-08-16T13:05:05Z (Tavily, `advanced` depth, 8 queries × 5 max results; windowHours 24). Raw data: `2026-08-16T13-04-37-361Z/web-search-results.json` (8 result objects, up to 5 hits per query).
- **Run 3 — fetched:** 2026-08-16T20:10:05Z (Tavily, `advanced` depth, 8 queries × 5 max results; windowHours 24). Raw data: `2026-08-16T20-09-39-911Z/web-search-results.json` (8 result objects, up to 5 hits per query).
- **Run 4 — fetched:** 2026-08-17T22:12:07Z (Tavily, `advanced` depth, 7 queries × 5 max results; windowHours 24). Raw data: `2026-08-17T22-11-42-498Z/web-search-results.json` (7 result objects, up to 5 hits per query).

## Queries and outcomes (Run 2 deltas in bold)

| Query (canonical source) | Relevant hits → wiki mappings |
|---|---|
| `github.com/ag-ui-protocol/ag-ui` | README (Agent Protocol Stack) → [AG-UI](/protocols/ag-ui.md); **official Java SDK (`com.agui.core/client/http`) and Go SDK (`core/events`, `client/sse`, auto-reconnect) overviews** → AG-UI; **Oracle Open Agent Spec integration issue #828 (WayFlow runtime)** → AG-UI (**watchlist**); **microsoft/agent-governance-toolkit alignment issue #1443** → AG-UI (**watchlist**) |
| `github.com/copilotkit/copilotkit` | `generative-ui-playground` (3 generative-UI types) → [CopilotKit](/frameworks/copilotkit.md); **playground internals (useHumanInTheLoop, A2UIRenderer, MCPAppsMiddleware, HttpAgent)** → CopilotKit; **skills SKILL.md + copilotkit-setup skill (endpoint factories, provider props)** → CopilotKit; **`with-adk` demo archived 2026-03-12 into `examples/integrations/adk`** → CopilotKit; **`sdk-python` folder** → CopilotKit; CopilotKit issue #2840 (peer-dependency bug, richer detail) → **watchlist** |
| `www.openui.com/docs/overview` | Overview (Agent Interface / OpenUI Lang / Cloud) → [OpenUI](/frameworks/openui.md); **`openui-lang/specification-v01` (v0.1 static) vs v0.5 (reactive state, queries, @builtins)** → OpenUI; **`thesysdev/openui` repo (MIT, "67% fewer tokens than JSON", crypto disclaimer)** → OpenUI; **OpenUI Cloud (hardening, audit trail, vs-Cloud table)** → OpenUI |
| `mastra.ai/integrations/agentic-ui/copilotkit` | **Mastra UI dojo blog (2025-11-14)** → [Mastra agentic-UI](/frameworks/mastra-agentic-ui.md); AG-UI README → AG-UI |
| `mastra.ai/integrations/agentic-ui/openui` | **AI SDK UI integration page (hooks, custom UI, workflow suspend/resume)** → Mastra agentic-UI (the `openui` canonical URL still did not resolve — see warnings) |
| `a2ui.org/concepts/glossary/` | **What is A2UI (key concepts)**, **v1.0 spec (path resolution, JSON Schema catalogs)**, v0.8 A2A extension, **data-flow (JSONL, architecture)** → [A2UI](/protocols/a2ui.md) |
| `a2ui.org/roadmap/` | Roadmap (**release cycle, long-term vision**), who-is-it-for, **`a2ui-project/a2ui` repo (Composer, Theater, ~16k stars)** → A2UI; **renderers matrix** → A2UI |
| `github.com/modelcontextprotocol/ext-apps` | overview.md, **agent-skills.md details**, **`specification/2026-01-26/apps.mdx` (extension ID `io.modelcontextprotocol/ui`, capabilities negotiation, TypeScript SDK interface)** → [MCP Apps](/protocols/mcp-apps.md) |

### Run 3 deltas (2026-08-16T20:10Z)

Run 3 re-pulled the same 8 queries; most hits duplicated already-synthesized content. New durable deltas:

- **AG-UI community Swift SDK** — [paduh/ag-ui-swift](https://github.com/paduh/ag-ui-swift) (Swift Package Manager + Cocoapods, ~198 commits), with `AGUIClient` (low-level `HttpAgent` HTTP transport, `SseParser`, `EventStreamManager`), `AGUICore` (protocol/event types, domain layer), and `AGUITools` (tool execution with circuit-breaker patterns). Added to the [AG-UI](/protocols/ag-ui.md) SDK list.
- **CopilotKit `with-langgraph-python`** — archived (like `with-adk`) and consolidated into the monorepo at `examples/integrations/langgraph-python`. Added to the [CopilotKit](/frameworks/copilotkit.md) consolidation list.
- **OpenUI repo package structure** — [`thesysdev/openui`](https://github.com/thesysdev/openui) `packages/`: `react-lang`, `react-headless`, `react-ui`, `react-email`, `lang-core`, `langchain`, `vue-lang`, `svelte-lang`, `browser-bundle`, `openui-cli`, plus a `skills/openui` (Claude Code) skill. Added to the [OpenUI](/frameworks/openui.md) page.
- **OpenUI Lang comparison page** — `openui.com/docs/openui-lang/comparison` positions OpenUI against Vercel `json-render`, A2UI (Google) and CopilotKit OpenGenUI (token multipliers, latency, streaming, consistent output, design system, components, built-in data fetching, chat UI, multi-platform, security risk, license). Added to the [OpenUI](/frameworks/openui.md) page and the [ecosystem](/concepts/generative-ui-ecosystem.md) tradeoffs.
- **MCP Apps quickstart example** — `ext-apps/examples/quickstart/mcp-app.html` (a minimal "Get Time App") confirms the iframe entry point; already covered by the MCP Apps page.

### Run 4 deltas (2026-08-17T22:12Z)

Run 4 re-pulled 7 of the same 8 queries (all except the MCP Apps `ext-apps` query) against the same canonical sources. Most hits **re-confirmed already-synthesized material** (AG-UI README/CLAUDE/Go/Swift, CopilotKit monorepo/playground/skills/`with-adk`/`with-langgraph-python`, OpenUI overview/Cloud/v0.1 spec, Mastra UI dojo + AI SDK UI, A2UI introduction/v1.0/v0.8/v0.8-A2A/data-flow/renderers/roadmap/who-is-it-for/`a2ui-project` repo). New durable deltas:

- **AG-UI Kotlin SDK overview** — the official repo's `docs/sdk/kotlin/overview.mdx` documents the **Kotlin Multiplatform SDK** (community-contributed, maintained; `com.agui.*` Gradle coordinates; Android API 26+/iOS 13+/JVM Java 11+ listed stable). It exposes `AgUiAgent` (stateless) / `StatefulAgUiAgent` (conversational) clients on `kotlinx.coroutines.flow`, a Tools module (`ToolExecutor`, `ToolRegistry`, `ToolExecutionManager`, circuit-breaker patterns), **chunked-event rewriting** (`TEXT_MESSAGE_CHUNK`/`TOOL_CALL_CHUNK` → start/content/end sequences) and **`THINKING_` telemetry** surfaced alongside normal messages (UIs can show agent reasoning). Added to the [AG-UI](/protocols/ag-ui.md) SDK list and the [ecosystem](/concepts/generative-ui-ecosystem.md) table.
- **Cedar-OS (CedarCopilot)** — surfaced via the Mastra `…/agentic-ui/copilotkit` query: an open-source framework for AI-native frontends with universal AI-provider support (OpenAI, Anthropic, Google, Mistral, Groq, XAI, Vercel AI SDK, **Mastra**, custom), chat components (`FloatingCedarChat`, `SidePanelCedarChat`, `CedarCaptionChat`), agentic state (`useCedarState` — AI reads/modifies React state type-safely), streaming, voice-first design, shadcn-style component-first UI. **Confidence: watchlist** (single third-party project). Added to the [Mastra agentic-UI](/frameworks/mastra-agentic-ui.md) third-party signals and the [ecosystem](/concepts/generative-ui-ecosystem.md) watchlist.

## Reliability warnings

The Tavily synthesized `answer` fields were **not adopted verbatim**:

- The `mastra.ai/integrations/agentic-ui/openui` canonical URL still did not resolve to its own page in Run 2; the top hit remained the `ai-sdk-ui` page (with off-target star/awesome lists below it). Only directly matching content is treated as source-backed.
- CopilotKit issue #2840's npm peer-dependency detail mixes versions (`@copilotkit/runtime@1.10.6` vs 1.50.0, `@langchain/langgraph-sdk` peer conflict); it evidences **tight CopilotKit ↔ AG-UI coupling** rather than a stable version table — keep as watchlist.
- A source-backed third-party claim (from an `awesome-ai-agents` list) says CopilotKit/AG-UI is "adopted by Google, LangChain, AWS, Microsoft, Mastra, and PydanticAI" — treated as **watchlist** (promotional, not a primary-source claim).
- Low-relevance results were **excluded**: star/awesome lists and DataFoundry (which only acknowledges AG-UI design influence).
- **Run 4 (2026-08-17):** the `mastra.ai/integrations/agentic-ui/openui` query again produced **no page for that canonical URL** — results drifted to the AI SDK UI integration page, an off-target Mastra Vite/React guide, and unrelated star lists; the Tavily `answer` for that query was a **false/garbled attribution** ("an AI system built by a team of inventors at Amazon") and was not adopted. The `mastra.ai/integrations/agentic-ui/copilotkit` query did surface the Mastra UI dojo blog, the AG-UI README, and the AI SDK UI page plus the new Cedar-OS hit. Only directly matching content is treated as source-backed.

## Inferred signals

- **AG-UI ↔ A2UI interop** — the AG-UI repo carries an `ag-ui-a2ui-integration` skill and A2UI lists AG-UI as a transport (Run 1); A2UI's "who is it for" guidance now also routes "rapid UI + agent app built together" use cases to "AG-UI / CopilotKit" — see [A2UI](/protocols/a2ui.md).
- **CopilotKit ↔ AG-UI coupling** — `@ag-ui/client`/`@ag-ui/langgraph` peers pinned across CopilotKit runtime, plus ADK (`ada-middleware`) demos; watchlist bug at #2840.
- **Multi-standard client market** — CopilotKit renders all three generative-UI types in one playground; Mastra's UI dojo supports AI SDK, assistant-ui, CopilotKit, and HITL; Cedar-OS builds a separate AI-native frontend stack over the same provider/frontend space — feeds the [Generative-UI ecosystem](/concepts/generative-ui-ecosystem.md) theme.
- **MCP Apps moving through SDKs** — csharp-sdk SEP-1865 (milestone "2026-07-28 Spec Compliance") and java-sdk #780 (2026-02-12) evidence cross-language uptake; watchlist until shipped.
- All durable claims were mapped onto canonical protocol/framework pages; nothing here overrides the earlier agent-protocol content (AHP/ACP), which neither run touched.

## Mapping to wiki pages

- New: [AG-UI](/protocols/ag-ui.md) (Java/Go SDKs, plus community Swift SDK added by Run 3 and Kotlin SDK added by Run 4), [A2UI](/protocols/a2ui.md) (data flow, renderers), [MCP Apps](/protocols/mcp-apps.md) (capability negotiation, SDK surface), [OpenUI](/frameworks/openui.md) (v0.5 language, Cloud, repo package structure + feature-comparison page added by Run 3), [CopilotKit](/frameworks/copilotkit.md) (HITL renderers, skills; `with-langgraph-python` archive added by Run 3), [Mastra agentic-UI](/frameworks/mastra-agentic-ui.md) (UI dojo; Cedar-OS third-party signal added by Run 4), [Generative-UI ecosystem](/concepts/generative-ui-ecosystem.md) hub.
- The earlier [agent-protocols web-search page](/sources/web-search.md) is unaffected.

## Confidence and gaps

- **Confirmed:** run metadata, query set, and per-query result URLs (directly from the raw files).
- **Source-backed:** protocol/framework characteristics grounded in each project's primary docs (README, specification pages, repo overview, docs sites).
- **watchlist:** open SDK/feature issues (Oracle Open Agent Spec, governance dashboard, CopilotKit #2840, csharp-sdk, java-sdk), third-party adoption claims (DataFoundry, Cedar-OS), package version numbers not cross-checked against release resources, the community AG-UI Swift SDK (single-contributor project), and the community-contributed AG-UI Kotlin SDK (single maintainer `mefinsf` per the overview).
- **Gap (narrowed):** A2UI reference materials (renderers matrix, v1.0 spec surface) and MCP Apps SDK surface are now directly retrieved; AG-UI's own SDK docs are now covered for Java, Go, Kotlin, and Swift. Still to verify against release resources: exact AG-UI SDK package versions, CopilotKit package versions, and A2UI v1.0 GA status.