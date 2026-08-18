---
type: Framework
title: CopilotKit (generative-UI frontend stack)
description: CopilotKit is a 1st-party client/agent framework for building agent-powered apps with generative UI, consolidated into a monorepo and built on the AG-UI protocol; it renders static generative UI, A2UI declarative JSON, and MCP Apps UIs, and extends agents to chat platforms via its Channels SDK.
resource: https://github.com/CopilotKit/CopilotKit
tags: [copilotkit, generative-ui, framework, agent-ui, ag-ui]
timestamp: 2026-08-18
---

# CopilotKit (generative-UI frontend stack)

**CopilotKit** is a **frontend stack for building agent-powered apps with Generative UI, built on the [AG-UI](/protocols/ag-ui.md) protocol**. It is the 1st-party AG-UI client (listing "CopilotKit — Supported, Getting Started, 1st Party" in the AG-UI integrations table) and supports React, and its larger stack targets Angular and mobile app shells.

Source: [`CopilotKit/CopilotKit`](https://github.com/CopilotKit/CopilotKit) (monorepo). Evidence for this page lives on the [web-search generative-UI source page](/sources/web-search-generative-ui.md).

## Monorepo consolidation

CopilotKit projects are consolidated into a single monorepo:

- Standalone repos (e.g. `CopilotKit/skills`, `CopilotKit/generative-ui-playground`) are archived/read-only; their content moved into `CopilotKit/CopilotKit/`.
- **Why the move** (from the skills page): keeping reference material next to the code it describes means docs are generated from the same tree, version bumps land in lockstep with releases, and there is a single place for issues and PRs.
- **CopilotKit skills** now live at `CopilotKit/CopilotKit/skills/` and are installed via `npx skills add CopilotKit/CopilotKit/skills -y`; they follow the open Agent Skills standard (agentskills.io) so one set of `SKILL.md` files works across Claude Code, Codex, Cursor, and OpenCode.

## Generative UI types

The `generative-ui-playground` demo ("Interact with all three types of generative UI, all in one interface"), now consolidated into the monorepo at `examples/showcases/generative-ui-playground`, shows the three generative-UI categories CopilotKit can render:

1. **Static Generative UI** — tool-call-driven UI rendered via `useRenderToolCall` (e.g. WeatherCard, StockCard) using `CopilotKitProvider` agent switching and `CopilotSidebar` chat.
2. **A2UI** — declarative JSON rendered via `A2UIRenderer` (from agent responses), with a theme configuration (`theme.ts`) on the frontend; `HttpAgent` connects to a Python A2A backend for A2UI.
3. **MCP Apps** — UIs bridged from MCP server tools via `MCPAppsMiddleware`; `BasicAgent` runs static GenUI + MCP Apps on a TypeScript agent, backed by an `mcp-server/` and `a2a-agent/` project layout.

The playground also demonstrates `useHumanInTheLoop` — interactive approval flows such as a `TaskApprovalCard` (WeatherCard/StockCard rendering for display-only tool calls). This makes CopilotKit a concrete example of **interoperability among the competing generative-UI approaches** — it consumes all three in one app — see the [Generative-UI ecosystem](/concepts/generative-ui-ecosystem.md).

Also relevant:
- `CopilotKit/with-adk` (demo of CopilotKit with the AG-UI `ada-middleware`, i.e. Google ADK support) was **archived on 2026-03-12** and consolidated into the monorepo at `examples/integrations/adk`.
- `CopilotKit/with-langgraph-python` (CopilotKit with LangGraph in Python, star ~24) was likewise **archived** and consolidated into the monorepo at `examples/integrations/langgraph-python` (revealed by the 2026-08-16 third generative-UI pull). **Confidence: source-backed** (repo archive banner; archive date not retrieved for this repo).
- CopilotKit's **skills** (open Agent Skills standard) live under the monorepo, with a routing table across specialized sub-skills (setup, develop, integrations, debug, upgrade, `copilotkit-agui` for building AG-UI backends, contribute, self-update).
- The CopilotKit README's "AG-UI: The Agent–User Interaction Protocol" section promotes `npx create-ag-ui-app` for new AG-UI apps.

## Tooling and versioning

- **v2 API surface** — CopilotKit skills and docs target the v2 API (`@copilotkit/react-core`, `@copilotkit/runtime`, `@copilotkit/react-ui`, etc.). Setup packages: frontend `@copilotkit/react` + `@copilotkit/core`; runtime `@copilotkit/runtime` + `@copilotkit/agent` (with Express/single-route endpoint factories such as `createCopilotEndpoint`, `createCopilotEndpointExpress`).
- **Dependency coupling to AG-UI** — `@copilotkit/runtime` declares a peer dependency on `@ag-ui/client` (≥0.0.39), and the AG-UI LangGraph adapter pins `@ag-ui/langgraph`; the open issue [CopilotKit/CopilotKit#2840](https://github.com/CopilotKit/CopilotKit/issues/2840) documents an `ERESOLVE` peer-dependency conflict between `@ag-ui/client@0.0.41` and `@ag-ui/langgraph`'s pinned `@ag-ui/client@0.0.40-alpha.7`. **Confidence: watchlist** — a single bug report, not a stable fact, but it evidences the tight CopilotKit↔AG-UI coupling.

## Channels SDK

[`CopilotKit/channels-sdk`](https://github.com/CopilotKit/channels-sdk) is CopilotKit's **SDK for bringing any agent into any chat platform** — Slack, Microsoft Teams, Discord, Telegram — with native, interactive UI. It positions CopilotKit across chat channels in addition to the web playground, and is confirmed as the "Channels SDK / OpenTag example" 1st-party client listed in the [AG-UI](/protocols/ag-ui.md) README integrations table.

- A `CopilotRuntime` configured with a `channels` block and a `createCopilotNodeListener` exposes `channels` (e.g. `channels.stop()`) on a Node listener; `CopilotKitIntelligence` (via `INTELLIGENCE_API_KEY`) is optional, and messages carry structured `contentParts` plus the originating platform (`message.platform`) as context.
- Install via `@copilotkit/channels` on npm; setup without code via `npx copilotkit@latest channels setup`; the SDK's reference application is **OpenTag** (a full OpenTag example ships in the repo).
- **Confidence: source-backed** (repo README; retrieved 2026-08-18). This extends CopilotKit's multi-frontend footprint — chat platforms via Channels SDK, in addition to the web generative-UI playground (see the [Generative-UI ecosystem](/concepts/generative-ui-ecosystem.md)).

## Relationship to other frameworks/protocols

- **1st-party client of [AG-UI](/protocols/ag-ui.md)** (built-in agent support; AG-UI was born from CopilotKit's partnership with LangGraph and CrewAI). AG-UI complements the [Model Context Protocol](/protocols/model-context-protocol.md): CopilotKit's `MCPAppsMiddleware` renders [MCP Apps](/protocols/mcp-apps.md) UIs served over MCP.
- **Renders [A2UI](/protocols/a2ui.md) and [MCP Apps](/protocols/mcp-apps.md)** UIs alongside its own static generative UI, demonstrating multi-standard consumption; MCP Apps itself extends the [Model Context Protocol](/protocols/model-context-protocol.md) base.
- Alternative to [OpenUI](/frameworks/openui.md) (which lists CopilotKit as one of the agent interfaces it integrates with) and to Mastra's agentic-UI layer (whose UI dojo includes CopilotKit as one of the frontends it drives). Mastra's own "[Building agentic copilots with CopilotKit and Mastra](https://mastra.ai/blog/copilotkitmastra)" guide scaffolds a **Mastra backend + CopilotKit/AG-UI frontend** via `npx create-ag-ui-app@latest --mastra` — see [Mastra agentic-UI](/frameworks/mastra-agentic-ui.md).
- Its **Channels SDK** extends the same agent stack to chat platforms (Slack, Teams, Discord, Telegram), the platform dimension the AG-UI README lists as the "Channels SDK / OpenTag" 1st-party integration.

## Status

- Actively maintained under a monorepo; skills and docs consolidated; the generative-UI playground now lives inside the repo.
- **Confidence:** source-backed for the monorepo consolidation, skill location, and generative-UI types (official `CopilotKit/CopilotKit` sub-repos and docs); watchlist for the open dependency bug.

## Source Map

- [Web-search generative-UI source evidence](/sources/web-search-generative-ui.md) — coverage and reliability notes.
- [AG-UI](/protocols/ag-ui.md) — the underlying protocol CopilotKit is built on.
- [Generative-UI ecosystem](/concepts/generative-ui-ecosystem.md) — where CopilotKit sits among approaches.
- Repo: <https://github.com/CopilotKit/CopilotKit>