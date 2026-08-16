---
type: Framework
title: OpenUI (Open Standard for Generative UI)
description: OpenUI is a generative-UI toolkit for building agents that respond with interactive interfaces rather than text, comprising the Agent Interface frontend SDK, the OpenUI Lang streaming declarative language and runtime, and the OpenUI Cloud managed backend.
resource: https://www.openui.com/docs/overview
tags: [openui, generative-ui, framework, agent-ui, language, runtime]
timestamp: 2026-08-16
---

# OpenUI (Open Standard for Generative UI)

**OpenUI** is a **generative-UI toolkit for building agents that respond with interactive interfaces, not just text**. Agents compose the interface best suited to each request — from inline forms and data visualizations to dashboards, reports, and presentations — instead of replying with plain text.

Canonical materials: the OpenUI docs at <https://www.openui.com/docs/overview> and the reference repo [`thesysdev/openui`](https://github.com/thesysdev/openui) ("The Open Standard for Generative UI"). Evidence for this page lives on the [web-search generative-UI source page](/sources/web-search-generative-ui.md).

## Three product surfaces

1. **Agent Interface** — a frontend SDK for building agentic experiences: streaming conversations, thread history, native generative-UI support, and an artifact workspace, without assembling the application shell from scratch.
2. **OpenUI Lang** — an **open-source, streaming-first language and runtime** for generative UI. Agents compose interfaces from your component library while the runtime parses and renders their output progressively as it streams.
3. **OpenUI Cloud** — the **managed backend** for OpenUI: model access with automatic fallbacks, output validation, conversation/artifact persistence, and built-in artifacts.
   - The agent-framework integration surface includes CopilotKit, assistant-ui, custom, and "Gen UI" via the OpenUI Lang runtime, plus LangGraph, Mastra, and Vercel AI SDK as agent frameworks, and Anthropic / OpenAI / Google Gemini as models.

## OpenUI Lang — a streaming-first declarative language

The language (`openui-lang/specification-v0.1`) consists of a series of **assignment statements**; every line binds a unique identifier to an expression, and the reserved `root` identifier is the entry point:

```
root  = Root([header, chart])       // 1. Entry point
header = Header("Q4 Revenue", "YTD")// 2. Component call
chart  = BarChart(labels, [s1, s2])// 3. Forward reference
labels = ["Jan", "Feb", "Mar"]     // 4. Data definition
s1 = Series("Product A", [10, 20, 30])
s2 = Series("Product B", [5, 15, 25])
```

- **Expressions & types** — a strict subset of JavaScript values: component calls `Type(arg1, arg2)`, strings, numbers, booleans, null, arrays, objects, and identifier references.
- **Component resolution** — the parser maps **positional arguments** in OpenUI Lang to **named props** in the target component library (e.g. React), i.e. agents emit components from your library while the runtime resolves and renders them.

## Where OpenUI sits

- **Rival/alternative** to the event-based [AG-UI](/protocols/ag-ui.md) and the declarative-JSON [A2UI](/protocols/a2ui.md) protocol: OpenUI is a *language-and-runtime* approach (a DSL + a streaming runtime + a managed backend), whereas AG-UI is an *event wire protocol* and A2UI is a *JSON payload schema*. See the [Generative-UI ecosystem](/concepts/generative-ui-ecosystem.md) comparison.
- It consumes the same agent-framework ecosystem (LangGraph, Mastra, Vercel AI SDK) that other generative-UI stacks target, but binds agents to a specific authored component library via its declarative language.

## Disambiguation

There is an unrelated `Fallomai/openui` repo pitched as "an AI command center for your AI coding agents" (100% local, free, open source). It shares only the name with the Open Standard — the canonical OpenUI is [`thesysdev/openui`](https://github.com/thesysdev/openui) and <https://www.openui.com>. These are **not** the same project.

## Status

- **Confidence:** source-backed (openui.com overview and `openui-lang` v0.1 specification pages plus the `thesysdev/openui` repo; single primary source, not independently cross-checked).
- Actively marketed as *the* open standard for generative UI with a growing first-party backend (OpenUI Cloud).

## Source Map

- [Web-search generative-UI source evidence](/sources/web-search-generative-ui.md) — coverage and reliability notes.
- [Generative-UI ecosystem](/concepts/generative-ui-ecosystem.md) — how OpenUI compares to AG-UI, A2UI, and MCP Apps.
- Docs: <https://www.openui.com/docs/overview> · OpenUI Lang spec v0.1: <https://www.openui.com/docs/openui-lang/specification-v01>
- Repo: <https://github.com/thesysdev/openui>