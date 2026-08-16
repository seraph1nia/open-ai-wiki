---
type: Framework
title: Mastra agentic-UI integration
description: Mastra is a TypeScript AI framework whose agentic-UI layer integrates common generative-UI frontends (AI SDK UI, assistant-ui, CopilotKit, AG-UI) through @mastra/ai-sdk and a UI dojo of runnable examples.
resource: https://mastra.ai/integrations/agentic-ui
tags: [mastra, agentic-ui, framework, generative-ui, ai-sdk]
timestamp: 2026-08-16
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

Mastra states continued first-class support for **AI SDK, assistant-ui, and CopilotKit** — evidence of the multi-standard frontend market the [Generative-UI ecosystem](/concepts/generative-ui-ecosystem.md) compares.

## Other integration notes from this run

- The Mastra docs also reference integrating a **Cedar-OS** copilot component into a Mastra app (v0.x docs).
- Two of this run's canonical Mastra URLs (`…/agentic-ui/copilotkit` and `…/agentic-ui/openui`) did not resolve to their own pages in the Tavily results — the returned results drifted to the AI SDK UI page and off-target star lists (see the reliability notes on the [source page](/sources/web-search-generative-ui.md)). Only directly matching content above is treated as source-backed.

## Relationship to other frameworks

- Consumes [CopilotKit](/frameworks/copilotkit.md), **assistant-ui**, and **Vercel AI SDK** as interchangeable frontends.
- Is one of the agent frameworks listed by [OpenUI](/frameworks/openui.md) as an integration target.
- Its "Custom UI / generative UI" concept maps to the broader generative-UI trend rather than to a single wire protocol like [AG-UI](/protocols/ag-ui.md) or [A2UI](/protocols/a2ui.md) (those are transport/format choices it can adopt, e.g. AG-UI canvas examples).

## Status

- Actively documented; a dedicated agentic-UI + UI-dojo section demonstrates active investment in the generative-UI frontend space.
- **Confidence:** source-backed for `@mastra/ai-sdk` ↔ AI SDK UI (`useChat`/`useCompletion`/`useObject`), the Custom UI (generative UI) concept, and the UI dojo (Mastra docs/blog + `mastra-ai/ui-dojo`).

## Source Map

- [Web-search generative-UI source evidence](/sources/web-search-generative-ui.md) — coverage and reliability notes.
- [Generative-UI ecosystem](/concepts/generative-ui-ecosystem.md) — where Mastra sits among generative-UI approaches.
- Docs: <https://mastra.ai/integrations/agentic-ui/ai-sdk-ui> · UI dojo: <https://ui-dojo.mastra.ai> (source <https://github.com/mastra-ai/ui-dojo>)