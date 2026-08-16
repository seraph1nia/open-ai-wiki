---
type: Source Evidence
title: Web-search generative-UI source evidence
description: Ingestion and coverage notes for the 2026-08-16 web-search-generative-ui run over the AG-UI, CopilotKit, OpenUI, Mastra agentic-UI, A2UI, and MCP Apps sources, with reliability warnings for off-target synthesized answers.
resource: https://github.com/ag-ui-protocol/ag-ui
tags: [web-search, source, evidence, generative-ui, agent-ui, coverage]
timestamp: 2026-08-16
---

# Web-search generative UI — source evidence

This page records the 2026-08-16 web-search ingestion for the `web-search-generative-ui` source instance and grounds the wiki's generative-UI protocol and framework pages. It is an evidence index, not the synthesis layer (see [Generative-UI ecosystem](/concepts/generative-ui-ecosystem.md)).

## Run facts

- **Instance:** `web-search-generative-ui` (Generative UI)
- **Fetched:** 2026-08-16T11:19:23Z (Tavily, `advanced` depth, 8 queries × 5 max results; windowHours 24)
- **Raw data:** `2026-08-16T11-18-45-442Z/web-search-results.json` (40 result objects across 8 queries)

## Queries and outcomes

| Query (canonical source) | Relevant hits → wiki mappings |
|---|---|
| `github.com/ag-ui-protocol/ag-ui` | README → [AG-UI](/protocols/ag-ui.md); `CLAUDE.md` (protocol architecture) → AG-UI; Kotlin & Go SDK overviews → AG-UI; Effect-TS issue #6341 (AG-UI support) → **watchlist** on AG-UI |
| `github.com/copilotkit/copilotkit` | `generative-ui-playground` (3 generative-UI types) → [CopilotKit](/frameworks/copilotkit.md); `skills` (monorepo move + skills) → CopilotKit; `with-langgraph-python` / `canvas-with-langgraph-python` → CopilotKit; CopilotKit issue #2840 (peer-dependency bug) → **watchlist** on CopilotKit |
| `www.openui.com/docs/overview` | Overview (Agent Interface / OpenUI Lang / Cloud) → [OpenUI](/frameworks/openui.md); `openui-lang/specification-v0.1` → OpenUI; `thesysdev/openui` repo → OpenUI |
| `mastra.ai/integrations/agentic-ui/copilotkit` | AG-UI README (agent protocol stack) → AG-UI; Mastra AI SDK UI, UI dojo → [Mastra agentic-UI](/frameworks/mastra-agentic-ui.md) |
| `mastra.ai/integrations/agentic-ui/openui` | AI SDK UI integration → Mastra agentic-UI (off-target; answers drifted — see warnings) |
| `a2ui.org/concepts/glossary/` | What is A2UI, v1.0 spec, v0.8 A2A extension, data-flow → [A2UI](/protocols/a2ui.md) |
| `a2ui.org/roadmap/` | Roadmap, who-is-it-for, v0.9.1 catalog guide, `a2ui-project/a2ui` repo → A2UI |
| `github.com/modelcontextprotocol/ext-apps` | overview.md, agent-skills.md, `specification/2026-01-26/apps.mdx`, csharp-sdk #1431 (SEP-1865), java-sdk #780 → [MCP Apps](/protocols/mcp-apps.md) (SDK issues **watchlist**) |

## Reliability warnings

The Tavily synthesized `answer` fields were **not adopted verbatim**:

- For the two `mastra.ai/integrations/agentic-ui/{copilotkit,openui}` queries, the `answer` drifted to a generic "AI SDK UI" integration description and to Amazon/Gatsby-flavored text rather than the queried page. Reason: the search engine returned the `ai-sdk-ui` page as the top hit for both, so the summaries skew to AI SDK UI. Only the returned URL content directly matching each canonical source was treated as source-backed.
- Low-relevance results were **excluded**: `Fallomai/openui` and `open-webui` (unrelated namesakes), star/awesome lists (`aloth/awesome-ai-agents`, `tornikebolokadze1-cyber/awesome-ai-pulse-georgia`, `MrWillCom/awesome`, gist star lists), and generic GitHub topic pages.
- Open issues referencing protocol support (Effect-TS #6341 for AG-UI; CopilotKit #2840; csharp-sdk #1431 SEP-1865; java-sdk #780 for MCP Apps) are kept as **watchlist** signals — single issues, not shipped convergent evidence.

## Inferred signals

- **AG-UI ↔ A2UI interop** — the AG-UI repo carries an `ag-ui-a2ui-integration` skill (from `CLAUDE.md`), and A2UI lists AG-UI as a transport. Confirmed by two sources in this run. (See [A2UI](/protocols/a2ui.md).)
- **CopilotKit ↔ AG-UI coupling** — underlying `@ag-ui/client`/`@ag-ui/langgraph` peers pinned across CopilotKit runtime; watchlist bug at #2840.
- **Multi-standard client market** — CopilotKit renders static/A2UI/MCP Apps UIs in one playground; Mastra's UI dojo supports AI SDK, assistant-ui, CopilotKit, HITL. Feeding the [Generative-UI ecosystem](/concepts/generative-ui-ecosystem.md) theme.
- All durable claims were mapped onto the canonical protocol/framework pages; nothing here overrides the prior finished-agent-protocol content (AHP/ACP), which this run did not touch.

## Mapping to wiki pages
- New: [AG-UI](/protocols/ag-ui.md), [A2UI](/protocols/a2ui.md), [MCP Apps](/protocols/mcp-apps.md) protocols; [OpenUI](/frameworks/openui.md), [CopilotKit](/frameworks/copilotkit.md), [Mastra agentic-UI](/frameworks/mastra-agentic-ui.md) frameworks; [Generative-UI ecosystem](/concepts/generative-ui-ecosystem.md) hub.
- The earlier [agent-protocols web-search page](/sources/web-search.md) is unaffected (prior AHP/ACP run).

## Confidence and gaps

- **Confirmed:** run metadata, query set, and per-query result URLs (directly from the raw file).
- **Source-backed:** protocol/framework characteristics grounded in each project's primary docs (README, CLAUDE.md, specification pages, repo overview).
- **Watchlist:** open SDK/feature issues (Effect-TS, CopilotKit, csharp-sdk, java-sdk), and any specific version numbers not cross-checked against release pages.
- **Gap:** this run fetched docs/README pages, not formal release/spec files; version-level claims for AG-UI SDKs, A2UI current releases, and CopilotKit packages should be verified against their release resources before being treated as canonical.