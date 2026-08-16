---
type: Source Evidence
title: Web-search generative-UI source evidence
description: Ingestion and coverage notes for the 2026-08-16 web-search-generative-ui runs over the AG-UI, CopilotKit, OpenUI, Mastra agentic-UI, A2UI, and MCP Apps sources, with reliability warnings for off-target synthesized answers.
resource: https://github.com/ag-ui-protocol/ag-ui
tags: [web-search, source, evidence, generative-ui, agent-ui, coverage]
timestamp: 2026-08-16
---

# Web-search generative UI — source evidence

This page records the 2026-08-16 web-search ingestion for the `web-search-generative-ui` source instance (three pulls the same day) and grounds the wiki's generative-UI protocol and framework pages. It is an evidence index, not the synthesis layer (see [Generative-UI ecosystem](/concepts/generative-ui-ecosystem.md)).

## Run facts

- **Instance:** `web-search-generative-ui` (Generative UI)
- **Run 1 — fetched:** 2026-08-16T11:19:23Z (Tavily, `advanced` depth, 8 queries × 5 max results; windowHours 24). Raw data: `2026-08-16T11-18-45-442Z/web-search-results.json` (40 result objects across 8 queries).
- **Run 2 — fetched:** 2026-08-16T13:05:05Z (Tavily, `advanced` depth, 8 queries × 5 max results; windowHours 24). Raw data: `2026-08-16T13-04-37-361Z/web-search-results.json` (8 result objects, up to 5 hits per query).
- **Run 3 — fetched:** 2026-08-16T20:10:05Z (Tavily, `advanced` depth, 8 queries × 5 max results; windowHours 24). Raw data: `2026-08-16T20-09-39-911Z/web-search-results.json` (8 result objects, up to 5 hits per query).

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

## Reliability warnings

The Tavily synthesized `answer` fields were **not adopted verbatim**:

- The `mastra.ai/integrations/agentic-ui/openui` canonical URL still did not resolve to its own page in Run 2; the top hit remained the `ai-sdk-ui` page (with off-target star/awesome lists below it). Only directly matching content is treated as source-backed.
- CopilotKit issue #2840's npm peer-dependency detail mixes versions (`@copilotkit/runtime@1.10.6` vs 1.50.0, `@langchain/langgraph-sdk` peer conflict); it evidences **tight CopilotKit ↔ AG-UI coupling** rather than a stable version table — keep as watchlist.
- A source-backed third-party claim (from an `awesome-ai-agents` list) says CopilotKit/AG-UI is "adopted by Google, LangChain, AWS, Microsoft, Mastra, and PydanticAI" — treated as **watchlist** (promotional, not a primary-source claim).
- Low-relevance results were **excluded**: star/awesome lists and DataFoundry (which only acknowledges AG-UI design influence).

## Inferred signals

- **AG-UI ↔ A2UI interop** — the AG-UI repo carries an `ag-ui-a2ui-integration` skill and A2UI lists AG-UI as a transport (Run 1); A2UI's "who is it for" guidance now also routes "rapid UI + agent app built together" use cases to "AG-UI / CopilotKit" — see [A2UI](/protocols/a2ui.md).
- **CopilotKit ↔ AG-UI coupling** — `@ag-ui/client`/`@ag-ui/langgraph` peers pinned across CopilotKit runtime, plus ADK (`ada-middleware`) demos; watchlist bug at #2840.
- **Multi-standard client market** — CopilotKit renders all three generative-UI types in one playground; Mastra's UI dojo supports AI SDK, assistant-ui, CopilotKit, and HITL — feeds the [Generative-UI ecosystem](/concepts/generative-ui-ecosystem.md) theme.
- **MCP Apps moving through SDKs** — csharp-sdk SEP-1865 (milestone "2026-07-28 Spec Compliance") and java-sdk #780 (2026-02-12) evidence cross-language uptake; watchlist until shipped.
- All durable claims were mapped onto canonical protocol/framework pages; nothing here overrides the earlier agent-protocol content (AHP/ACP), which neither run touched.

## Mapping to wiki pages

- New: [AG-UI](/protocols/ag-ui.md) (Java/Go SDKs, plus community Swift SDK added by Run 3), [A2UI](/protocols/a2ui.md) (data flow, renderers), [MCP Apps](/protocols/mcp-apps.md) (capability negotiation, SDK surface), [OpenUI](/frameworks/openui.md) (v0.5 language, Cloud, repo package structure + feature-comparison page added by Run 3), [CopilotKit](/frameworks/copilotkit.md) (HITL renderers, skills; `with-langgraph-python` archive added by Run 3), [Mastra agentic-UI](/frameworks/mastra-agentic-ui.md) (UI dojo), [Generative-UI ecosystem](/concepts/generative-ui-ecosystem.md) hub.
- The earlier [agent-protocols web-search page](/sources/web-search.md) is unaffected.

## Confidence and gaps

- **Confirmed:** run metadata, query set, and per-query result URLs (directly from the raw files).
- **Source-backed:** protocol/framework characteristics grounded in each project's primary docs (README, specification pages, repo overview, docs sites).
- **watchlist:** open SDK/feature issues (Oracle Open Agent Spec, governance dashboard, CopilotKit #2840, csharp-sdk, java-sdk), third-party adoption claims, package version numbers not cross-checked against release resources, and the community AG-UI Swift SDK (single-contributor project).
- **Gap (narrowed):** A2UI reference materials (renderers matrix, v1.0 spec surface) and MCP Apps SDK surface are now directly retrieved. Still to verify against release resources: exact AG-UI SDK package versions, CopilotKit package versions, and A2UI v1.0 GA status.