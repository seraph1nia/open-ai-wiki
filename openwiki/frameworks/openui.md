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
- **Component resolution** — the parser maps **positional arguments** in OpenUI Lang to **named props** in the target component library (e.g. React) using the library's Zod schemas; the order of keys in the `z.object` schema defines the expected argument order. Agents emit components from *your* library while the runtime resolves and renders them.
- **Versions** — the v0.1 specification is the original static-UI language. The current language (v0.5) adds **reactive state, data queries, `$variables`, and actions** (e.g. `@Reset` after a form submit rather than `@Set($var, "")`), with custom system-prompt preambles and additional rules for agent steering.
- **Token efficiency** — the reference repo claims OpenUI Lang uses **up to 67% fewer tokens than JSON** for the same UI.

## OpenUI Cloud

OpenUI Cloud is the managed backend: conversation history (threads and messages stored/reloaded with no database to run), production-grade pre-tested responsive components, invalid model output detected and corrected before the user sees it, a middleware layer that normalizes model quirks across providers, prebuilt report/presentation artifacts, theming and white-labeling (multiple brand configs), model fallbacks and a degraded mode, version pinning and rollback, and observability with an audit trail (render success, latency, token usage, what was rendered for whom). Per the docs comparison table, the open-source OpenUI gives generative-UI rendering plus streaming/progressive rendering, while Cloud additionally adds production-grade components, prebuilt artifacts, theming, error detection/correction, cross-model consistency, and fallbacks/versioning/observability.

## Repo package structure

The `thesysdev/openui` monorepo organizes the stack into `packages/`:

- **react-lang** — core runtime (parser, renderer, prompt generation)
- **react-headless** — headless chat state & streaming adapters
- **react-ui** — prebuilt chat layouts & component libraries
- **react-email** — React Email component library for generated emails
- **lang-core** — framework-agnostic parser, prompt, and runtime layer
- **langchain** — LangChain/LangGraph streaming integration
- **vue-lang** / **svelte-lang** — Vue/Svelte runtime bindings for OpenUI Lang
- **browser-bundle** — script-tag bundle for CDN / iframe / no-build embeds
- **openui-cli** — CLI for scaffolding & prompt generation
- Plus a `skills/openui` Claude Code skill for AI-assisted development.

This confirms the official **React** support plus community runtime bindings (Vue, Svelte) and a no-build script-tag bundle (see the [MCP Apps](/protocols/mcp-apps.md) iframe/embedding thread in the ecosystem comparison, which itself extends the [Model Context Protocol](/protocols/model-context-protocol.md)). **Confidence: source-backed** (repo README structure from `thesysdev/openui`).

## OpenUI Lang comparison

The docs' **Feature Comparison** page positions OpenUI against three other streaming generative-UI approaches:

| | OpenUI | Vercel `json-render` | A2UI (Google) | CopilotKit OpenGenUI |
|---|---|---|---|---|
| Tokens | 1x | 3x | 3x | 4x |
| Latency (60 tok/s) | 4.9s | 14.2s | 14.2s | ~20s |
| Streaming | Yes | Yes | Yes | Partial |
| Consistent output | Yes | Yes | Yes | No |
| Design system | Yes | Yes | Yes | No |
| Components | Library + custom | Library + custom | Custom only | None |
| Built-in data fetching | Yes | No | No | No |
| Chat UI included | Yes | No | No | Yes |
| Multi-platform | Web, mobile, email | Web, mobile, PDF, email, video | Web, iOS, Android | Web |
| Security risk | Minimal | Minimal | Minimal | Medium |
| License | MIT | Apache 2.0 | Apache 2.0 | MIT |

**Confidence: source-backed** (OpenUI's own comparison page, i.e. a vendor positioning claim not independently cross-checked). The "best for" guidance routes data-driven chat UIs and dashboards, cross-platform multi-agent systems, and one-UI-across-web/mobile/PDF/email to OpenUI, and creative one-off visuals (animations, generative art) to CopilotKit OpenGenUI.

## Where OpenUI sits

- **Rival/alternative** to the event-based [AG-UI](/protocols/ag-ui.md) and the declarative-JSON [A2UI](/protocols/a2ui.md) protocol: OpenUI is a *language-and-runtime* approach (a DSL + a streaming runtime + a managed backend), whereas AG-UI is an *event wire protocol* and A2UI is a *JSON payload schema*. See the [Generative-UI ecosystem](/concepts/generative-ui-ecosystem.md) comparison.
- It consumes the same agent-framework ecosystem (LangGraph, Mastra, Vercel AI SDK) that other generative-UI stacks target, but binds agents to a specific authored component library via its declarative language.

## Disambiguation

There is an unrelated `Fallomai/openui` repo pitched as "an AI command center for your AI coding agents" (100% local, free, open source). It shares only the name with the Open Standard — the canonical OpenUI is [`thesysdev/openui`](https://github.com/thesysdev/openui) and <https://www.openui.com>. These are **not** the same project. Note also the OpenUI repo's explicit disclaimer that OpenUI has **no official cryptocurrency, token, or coin**; any asset using the OpenUI name is unaffiliated.

## Status

- **Confidence:** source-backed (openui.com overview, `openui-lang` v0.1 and v0.5 specification pages, OpenUI Cloud docs, plus the `thesysdev/openui` repo; single primary source on most points, not independently cross-checked).
- Actively marketed as *the* open standard for generative UI with a growing first-party backend (OpenUI Cloud).

## Source Map

- [Web-search generative-UI source evidence](/sources/web-search-generative-ui.md) — coverage and reliability notes.
- [Generative-UI ecosystem](/concepts/generative-ui-ecosystem.md) — how OpenUI compares to AG-UI, A2UI, and MCP Apps.
- Docs: <https://www.openui.com/docs/overview> · OpenUI Lang spec v0.1: <https://www.openui.com/docs/openui-lang/specification-v01>
- Repo: <https://github.com/thesysdev/openui>