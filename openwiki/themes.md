---
type: Reference
title: Recurring themes and trends
description: Compact index of recurring signals across the AI knowledge corpus, notably the standardization and convergence of generative-UI / agent-UI protocols in 2026.
tags: [themes, index, generative-ui, agent-ui, trends]
timestamp: 2026-08-16
---

# Recurring Themes

Compact index of recurring, cross-source signals in the AI knowledge corpus. Details and evidence live on the linked pages.

| Topic key | Theme / Signal | First seen | Last seen | Confidence | Sources | Status |
|---|---|---|---|---|---|---|
| generative-ui-protocols | Standardization and convergence of how agents stream UI to clients — event-protocol [AG-UI](/protocols/ag-ui.md), declarative [A2UI](/protocols/a2ui.md), language-runtime [OpenUI](/frameworks/openui.md), and [MCP Apps](/protocols/mcp-apps.md) iframe extension, with framework clients consuming multiple approaches. | 2026-08-16 | 2026-08-16 | source-backed | [web-search generative-UI](/sources/web-search-generative-ui.md), [ecosystem](/concepts/generative-ui-ecosystem.md) | active |
| factory-toolchain | An emerging agentic SDLC factory composed of standardized parts rather than one monolithic tool — wire/state protocols ([ACP](/protocols/agent-client-protocol.md), [AHP](/protocols/agent-host-protocol.md)), a control harness (t3code), diff/edit layer (Pierre), durable orchestration (Effect), and embedding SDKs (OpenCode, Pi). | 2026-08-16 | 2026-08-16 | source-backed | [web-search Factory tools](/sources/web-search-factory-tools.md), [factory hub](/concepts/factory-toolchain.md) | active |

## Notes

- **generative-ui-protocols** — A single run (2026-08-16) introduced the whole domain; several independent projects (AG-UI, A2UI, OpenUI, MCP Apps) plus framework consumers (CopilotKit, Mastra) point toward concurrent, interoperating generative-UI standards. Promote to a stronger theme only if later ingests (releases, more sources, adopting agents) add evidence. See the [Generative-UI ecosystem](/concepts/generative-ui-ecosystem.md) hub for the comparison.
- **factory-toolchain** — Introduced 2026-08-16 by the Factory tools run. The durable durable evidence so far is the AHP `mcp://` → MCP Apps link and the tool definitions (Pierre, t3code, OpenCode SDK, Pi SDK); Effect's durable-execution core remains a confirmed gap (see the [hub notes](/concepts/factory-toolchain.md) and the [source page](/sources/web-search-factory-tools.md)). Promote only as releases/relationships accumulate.