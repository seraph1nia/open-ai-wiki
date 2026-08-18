---
type: Framework
title: Mastra agentic-UI integration
description: Mastra is a TypeScript AI framework whose agentic-UI layer integrates common generative-UI frontends (AI SDK UI, assistant-ui, CopilotKit, AG-UI) through @mastra/ai-sdk and a UI dojo of runnable examples; Mastra 1.0 stable adds A2A support, AI Tracing, and (as of 2026-08-18) agent-loop + nested-streaming orchestration built on AI SDK v5.
resource: https://mastra.ai/integrations/agentic-ui
tags: [mastra, agentic-ui, framework, generative-ui, ai-sdk]
timestamp: 2026-08-18
---

# Mastra agentic-UI integration

**Mastra** is a TypeScript framework for AI-powered applications and agents (agent workflows, RAG, and evaluations in one toolkit). Its **agentic-UI (generative UI)** layer shows how one agent framework can drive many competing generative-UI frontends, rather than prescribing a single UI protocol.

Canonical materials: the Mastra docs at <https://mastra.ai/integrations/agentic-ui> and related guides. Evidence for this page lives on the [web-search generative-UI source page](/sources/web-search-generative-ui.md).

## AI SDK UI integration

`@mastra/ai-sdk` integrates with **AI SDK UI's three main hooks**: `useChat()`, `useCompletion()`, and `useObject()`.

- Setup is typically framework-agnostic: you set up API routes that stream Mastra content in AI SDK-compatible format, then drive them from AI SDK UI hooks (e.g. `useChat()`), using either **Mastra's server** or a plain framework-agnostic route.
- **Custom UI (a.k.a. Generative UI)** lets you render custom React components based on data streamed from Mastra instead of raw text/JSON — a **weather card instead of JSON**, workflow-step progress indicators, agent-network execution, and custom events.
- Streaming infrastructure: `@mastra/ai-sdk@latest` with `@ai-sdk/react` and `ai`.

## UI dojo and supported frontends

The **Mastra UI dojo** (live at `ui-dojo.mastra.ai`, source `mastra-ai/ui-dojo`) is a collection of working examples showing Mastra agents integrated with the most popular AI UI frontends, so users can choose a frontend:

- **Vercel AI SDK** — chat, generative UIs, workflows, agent networks
- **assistant-ui** — chat interfaces with streaming responses
- **CopilotKit** — agentic copilots
- **Mastra client tools** — live, in-browser feedback
- **HITL** — trialing how Mastra workflows suspend and resume with human input

Announced in the Mastra blog post "Mastra UI Dojo: Choose your frontend" (2025-11-14, CEO Sam Bhagwat), the dojo is built around the recurring user question "How do I build a frontend for my Mastra project?", and Mastra states continued first-class support for **AI SDK, assistant-ui, and CopilotKit** — evidence of the multi-standard frontend market the [Generative-UI ecosystem](/concepts/generative-ui-ecosystem.md) compares.

## Runtime maturity signals (2026-08-17 blog feed)

The 2026-08-17 `web-search-factory-tools` blog pull added runtime-level signals from the [Mastra blog](https://mastra.ai/blog) (evidence on the [Factory tools source page](/sources/web-search-factory-tools.md), ledgered in the [blog post ledger](/sources/blog-post-ledger.md)):

- **Mastra 1.0 stable** — the 1.0 release stabilized APIs, simplified deployment, improved observability, and addressed production issues (source-backed run facts).
- **Agent-to-Agent (A2A) support** — Mastra agents and the Client SDK now support building cross-framework multi-agent systems with A2A-enabled agents (2026-05-19 post, source-backed). This connects Mastra to the A2A interop space alongside the [generative-UI ecosystem](/concepts/generative-ui-ecosystem.md).
- **AI Tracing** — Mastra observability now filters noise across multiple observability platforms via a tracing layer over OpenTelemetry (2025-09-30, source-backed feature).
- **Agent orchestration with AI SDK v5** (2026-08-26 post, adopted 2026-08-18): Mastra now **controls the agent loop and tool calling itself** (starting v0.14.0) rather than delegating to Vercel's AI SDK, while maintaining backward compatibility with both AI SDK **v4 and v5** message formats (the playground model switcher auto-detects versions). New `streamVNext`/`generateVNext` APIs emit v5 streams. Mastra also built its own streaming layer on top, adding **nested streaming support** — when an agent calls another agent in a tool, or a workflow calls an agent in a step, constituent streams compose correctly (long-running tools report progress without blocking). This is a durable runtime signal: Mastra is taking ownership of the orchestration loop that the [generative-UI ecosystem](/concepts/generative-ui-ecosystem.md) and the [factory toolchain hub](/concepts/factory-toolchain.md) depend on, with agent-loop control, retries (`maxSteps`), and planned middleware/token-optimization/HITL features.
- Watchlist: the 2026-03-23 changelog documents token-aware model routing for observational memory, MongoDB-backed versioned datasets/experiments, and Okta SSO with RBAC — single-source signals, not yet confirmed on primary docs.

## Third-party adoption signals

The open-source [DataFoundry](https://github.com/datagallery-lab/datafoundry) AI workbench (data analysis, governed workspace) acknowledges **CopilotKit / AG-UI event stream** for its agent runtime and web/TUI frontends, alongside Mastra agent-runtime patterns, Ink terminal foundations, and MCP for tool integration. It is one of several third-party projects adopting the [AG-UI](/protocols/ag-ui.md) event-stream design. **Confidence: watchlist** — single third-party project, not a framework-level agreement.

[Cedar-OS](https://github.com/CedarCopilot/cedar-OS) (CedarCopilot) is an open-source framework for AI-native frontends that targets the same multi-frontend space: universal AI-provider support (OpenAI, Anthropic, Google, Mistral, Groq, XAI, **Vercel AI SDK integration**, **Mastra framework support**, custom backends), production-ready chat components (`FloatingCedarChat`, `SidePanelCedarChat`, `CedarCaptionChat`), agentic state management (`useCedarState` — the AI can read and modify React application state through a type-safe interface), real-time streaming, voice-first interaction, and component-first shadcn-style UI. It deliberately focuses on the human–AI interaction layer ("reading and writing text is effortful"). **Confidence: watchlist** — surfaced via the 2026-08-17 generative-UI pull's Mastra query; single third-party project, not a framework-level agreement. See the [Generative-UI ecosystem](/concepts/generative-ui-ecosystem.md) watchlist.

## Other integration notes from this run

- Mastra's own docs frame the framework as suitable for "long-running agents that run entire processes on their own, such as a **software factory** that plans, builds, reviews, and releases code" — a direct tie-in to this corpus's [factory toolchain hub](/concepts/factory-toolchain.md), in addition to its generative-UI frontend role. **Confidence: source-backed** (Mastra docs `what-is-mastra`, retrieved 2026-08-18).

- A **Cedar-OS** copilot component is also referenced in the Mastra docs themselves (v0.x docs) as an integration option — see the [third-party adoption signals](#third-party-adoption-signals) section above for the full Cedar-OS coverage.
- The 2026-08-16 pull's canonical Mastra URLs (`…/agentic-ui/copilotkit` and `…/agentic-ui/openui`) did not resolve to their own pages in the Tavily results — the returned results again drifted to the AI SDK UI page and off-target star lists (see the reliability notes on the [source page](/sources/web-search-generative-ui.md)). Only directly matching content above is treated as source-backed.

## CopilotKit + Mastra starter (Web-search run 2026-08-18)

The Mastra blog post "[Building agentic copilots with CopilotKit and Mastra](https://mastra.ai/blog/copilotkitmastra)" (2025-09-18, Sam Bhagwat) frames **Mastra as the agentic backend** and **CopilotKit as the agentic frontend**: CopilotKit provides interactive React components that hook into the Mastra streaming protocol and let you customize the UX. The post's starter template is a single scaffold:

```
npx create-ag-ui-app@latest --mastra
```

which "builds out a full app, with Mastra agents on the backend, CopilotKit + AG-UI on the frontend" and is accompanied by an AG-UI Canvas with CopilotKit + Mastra example. **Confidence: source-backed** (official Mastra blog; ledgered in the [blog post ledger](/sources/blog-post-ledger.md)). It re-confirms Mastra's CopilotKit frontend integration (vs AI SDK UI / assistant-ui) and ties Mastra to the [AG-UI](/protocols/ag-ui.md) axis via CopilotKit.

## Relationship to other frameworks

- Consumes [CopilotKit](/frameworks/copilotkit.md), **assistant-ui**, and **Vercel AI SDK** as interchangeable frontends.
- Is one of the agent frameworks listed by [OpenUI](/frameworks/openui.md) as an integration target.
- Its "Custom UI / generative UI" concept maps to the broader generative-UI trend rather than to a single wire protocol like [AG-UI](/protocols/ag-ui.md) or [A2UI](/protocols/a2ui.md) (those are transport/format choices it can adopt, e.g. AG-UI canvas examples).

## Status

- Actively documented; a dedicated agentic-UI + UI-dojo section demonstrates active investment in the generative-UI frontend space; Mastra 1.0 stable (2026) adds runtime-maturity signals.
- **Confidence:** source-backed for `@mastra/ai-sdk` ↔ AI SDK UI (`useChat`/`useCompletion`/`useObject`), the Custom UI (generative UI) concept, the UI dojo (Mastra docs/blog + `mastra-ai/ui-dojo`), and the 1.0/A2A/AI-Tracing/AI-SDK-v5-orchestration run facts; watchlist for changelog single-source claims and third-party adoption signals (DataFoundry, Cedar-OS).

## Source Map

- [Web-search generative-UI source evidence](/sources/web-search-generative-ui.md) — coverage and reliability notes.
- [Generative-UI ecosystem](/concepts/generative-ui-ecosystem.md) — where Mastra sits among generative-UI approaches.
- Docs: <https://mastra.ai/integrations/agentic-ui/ai-sdk-ui> · UI dojo: <https://ui-dojo.mastra.ai> (source <https://github.com/mastra-ai/ui-dojo>)