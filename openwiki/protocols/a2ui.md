---
type: Protocol
title: A2UI (Agent to UI) Protocol
description: A2UI is a declarative, Apache-2.0 UI protocol for agent-driven interfaces, in which agents generate a JSON payload describing UI components that render natively across web, mobile, and desktop without executing arbitrary code.
resource: https://a2ui.org
tags: [a2ui, protocol, agent-ui, generative-ui, declarative, ai-agents]
timestamp: 2026-09-19
---

# A2UI (Agent to UI) Protocol

**A2UI (Agent to UI)** is an open, **declarative UI protocol for agent-driven interfaces**: AI agents generate rich, interactive UIs that render natively across platforms (web, mobile, desktop) *without executing arbitrary code*. Its core value propositions are framework-agnostic abstract component trees, separation of UI structure from application data, and declarative (data, not code) output for security.

Canonical materials: the A2UI site at <https://a2ui.org> and the Apache-2.0 reference repo [`a2ui-project/a2ui`](https://github.com/a2ui-project/a2ui). Evidence for this page lives on the [web-search generative-UI source page](/sources/web-search-generative-ui.md).

## Key concepts

A2UI is built on a small set of concepts:

- **Surface** — a distinct, controllable region of the client's UI identified by `surfaceId` (main content area, side panel, chat bubble); one agent stream can manage multiple surfaces independently, each with its own root component, hierarchy, and data model.
- **Component** — a UI element (Button, TextField, Card, Row, Column, …) expressed as a *typed abstract node*.
- **Data Model** — application state that components bind to (data binding). Bindings are defined with **JSON Pointers (RFC 6901)** whose resolution depends on the current **Evaluation Scope** (path resolution + variable scope during iteration).
- **Catalog** — the available component types, defined in a **Catalog Definition Document** (a JSON Schema document) so clients and servers can negotiate which catalog to use. `catalogId` is an arbitrary string ID used by A2UI SDKs and catalog negotiation (not a resolvable URI); per the v1.0 spec, catalogs should set both JSON Schema `$id` and `catalogId` to the same URI so renderer and agent developers can agree on shared catalogs with well-known IDs.
- **Accessibility** (v1.0 candidate) — the spec standardizes **`AccessibilityAttributes`** attached via `ComponentCommon` to any component, supporting `label` (`DynamicString`), `description` (`DynamicString`), `live` (`"off"` | `"polite"` | `"assertive"`), and `hidden` (`DynamicBoolean`), so generated UIs carry accessibility metadata natively. **Confidence: source-backed** (v1.0 candidate spec, retrieved 2026-08-18).
- **Message** — a JSON object such as `surfaceUpdate`, `dataModelUpdate`, or `beginRendering`. On the wire, streamed messages are usually formatted as **JSON Lines (JSONL)**, one complete JSON object per line.

## v0.9.1 protocol surface (current production spec, retrieved 2026-08-27)

The complete **v0.9.1** specification page (the current production release, generated from `specification/v0_9_1/docs/a2ui_protocol.md`) was retrieved for the first time on 2026-08-27, providing the concrete wire/model detail:

- **Four server-to-client message types** (a unidirectional JSON stream; the client parses each object as a distinct message and incrementally builds/updates the UI):
  - `createSurface` — signals the client to create a new surface and begin rendering it.
  - `updateComponents` — a list of component definitions to add to or update in a specific surface.
  - `updateDataModel` — new data to insert into or replace a surface's data model.
  - `deleteSurface` — explicitly removes a surface and its contents.
- **Transport contract** (v0.9 introduced transport decoupling): a transport must provide **reliable ordered delivery** (stateful updates corrupt if reordered), **message framing** (JSONL/WebSocket frames/SSE events), and **metadata support** (for data-model sync via `sendDataModel` and client/server **capabilities exchange**); **bidirectional capability is optional** (a return channel for `action` messages).
- **Transport bindings:** **A2A** (each A2UI envelope maps to a single A2A message Part; `a2uiClientDataModel`/`a2uiClientCapabilities` ride in A2A `metadata`; sessions map to a shared A2A `contextId`), **AG-UI**, **MCP** (tool outputs / resource subscriptions), **SSE + JSON-RPC**, **WebSockets**, and **REST** (works but lacks streaming).

```mermaid
sequenceDiagram
    participant Server as Agent/Server
    participant Client as Client/Renderer
    Server->>Client: createSurface(surfaceId:"main")
    Server->>Client: updateComponents(surfaceId:"main", components:[...])
    Server->>Client: updateDataModel(surfaceId:"main", path:"/user", value:"Alice")
    Client->>Server: action(name:"submit", context:{...})
    Server->>Client: updateComponents / updateDataModel (dynamic update)
    Server->>Client: deleteSurface(surfaceId:"main")
```

- **Catalog-agnostic envelope:** `server_to_client.json` references components/theme via a placeholder `$ref: "catalog.json#/$defs/anyComponent"` (and `#/$defs/theme`), which maps to either the Basic Catalog or the client's own catalog — so one envelope schema serves any compliant component catalog. The Basic Catalog defines components (`Text`, `Button`, `Row`, `CheckBox`, `TextField`, `DateTimeInput`, `ChoicePicker`, `Slider`), functions (e.g. `required`, `email`, `formatString`, logical `or`/`not`), and a theme schema.
- **Data binding types:** `DynamicString` / `DynamicNumber` / `DynamicBoolean` / `DynamicStringList` resolve to a literal value, a **`path`** (JSON Pointer, RFC 6901), or a **`FunctionCall`**. `ChildList` models child containers as either a static array of `ComponentId` references or an object template generated from a data-bound list.
- **Prompt-first family (v0.9):** v0.9 introduced a *prompt-first* protocol designed to be embedded directly in an LLM's prompt (the model emits JSON matching provided examples/schema), versus v0.8 which targeted structured-output constraints. This yields richer, more modular schemas but requires a **prompt-generate-validate loop** with post-generation validation, error handling, and correction/retry before rendering.
- **Two-way binding & reactivity** via the read/write contract: input components bind to the data model, user edits are synchronized to the server, and `formatString` supports nested interpolation and type conversion.

**Confidence:** source-backed (a2ui.org v0.9.1 specification page, retrieved 2026-08-27). The **verbatim `Tavily` `answer` fields were not adopted** (they are generic, off-target summaries).

## How an A2UI response is generated and rendered

```mermaid
flowchart TD
    A[Agent / LLM] --> B[A2UI Generator]
    B -->|A2UI Response JSON| C[Transport]
    C -->|"A2A, AG-UI, SSE, WS, gRPC"| D[Client Stream Reader]
    D --> E[Message Parser]
    E --> F[A2UI Renderer]
    F --> G[Native UI across platforms]
```

End-to-end lifecycle (from the `a2ui-project/a2ui` README):

1. **Generation** — an Agent (Gemini or another LLM) generates or uses a pre-generated `A2UI Response`, a JSON payload describing the composition of UI components and their properties.
2. **Transport** — the message is sent to the client (via A2A, AG-UI, or other transports).
3. **Resolution** — the client's A2UI renderer parses the JSON.
4. **Rendering** — the renderer maps abstract components (e.g. `type: 'text-field'`) to concrete implementations in the client's codebase.

## Transports, progressive rendering, and data flow

A2UI separates the *transport contract* from *transport bindings*. Any transport that can carry JSON works:

- A2A Protocol (also used for agent-to-UI delivery)
- [AG-UI](/protocols/ag-ui.md) (bidirectional, real-time agent-UI protocol)
- REST / HTTP and Server-Sent Events (one-way streaming)
- WebSocket (persistent bidirectional connection)
- Any other (gRPC, message queues, custom) — "if it can carry JSON, it works"

The data-flow pipeline (from the A2UI data-flow page):

```
Agent (LLM) → A2UI Generator → Transport (SSE/WS/A2A)
    ↓
Client (Stream Reader) → Message Parser → Renderer → Native UI
```

**Progressive rendering** lets chunks of the response stream to the client as they are generated, so users see the UI build in real time rather than waiting on a spinner.

**Client-to-server traffic** is handled separately via the **A2A message**, with two types — `userAction` (reports a user-initiated action from a component) and `error` (reports a client-side error) — which keeps the primary data stream unidirectional.

## Renderers and client libraries

Maintained renderers cover **React, Lit (Web Components), Angular, Web Core (shared lib for all web renderers), Flutter (GenUI SDK), and Lynx (ReactLynx renderer for A2UI v0.9)**, all stable for v0.8 and v0.9.1; SwiftUI (iOS/macOS) and Jetpack Compose (Android) are planned for v1.0/Q2 2026, with Vue, Svelte/Kit, and ShadCN (React) proposed via community interest (roadmap renderers table, retrieved 2026-09-19 — **Lynx stable is a new durable delta**). A compliant renderer must parse the A2UI adjacency-list JSON format, map abstract components to native widgets, handle data binding and lifecycle events, process incremental messages to build/update UI, support server-initiated updates, and support user actions.

## Security and trust-boundary model

A2UI is explicitly "declarative data, no code execution": agents send abstract component trees, and *clients* own styling and mapping to native widgets. This is what makes it safe across trust boundaries (local, remote, and third-party agents) and across platforms (web/mobile/desktop with one agent, many renderers). Its "What A2UI is NOT" guidance deliberately excludes static websites (use HTML/CSS), simple text-only chat (use Markdown), and remote non-integrated widgets (use iframes like MCP Apps) — see the [Generative-UI ecosystem](/concepts/generative-ui-ecosystem.md) comparison.

## Versioning, roadmap, and releases

- Semantic Versioning: MAJOR = incompatible protocol changes, MINOR = backward-compatible additions, PATCH = backward-compatible bug fixes.
- Planned release cycle: major (1.0, 2.0) annually or on significant breaking changes; minor quarterly; patch as needed. (Re-confirmed from the roadmap page, retrieved 2026-08-29.)
- Roadmap milestones: **Q2 2025** research across multiple Google teams **including integration into internal products and agents**; **Q4 2025 v0.8**; **Q2 2026 v0.9**; **Q3 2026 v0.9 & v1.0**; **Q4 2026 v1.0**. Last updated June 2026. Long-term vision: full app UIs, multi-agent coordination, accessibility features, advanced UI patterns, ecosystem growth.
- The v0.8 milestone line explicitly credits an **"AG-UI / CopilotKit integration (thanks CopilotKit)"** as part of the Q4-2025 v0.8 release — direct first-party evidence of the A2UI ↔ [AG-UI](/protocols/ag-ui.md) / [CopilotKit](/frameworks/copilotkit.md) interop line already documented on this page and the [ecosystem hub](/concepts/generative-ui-ecosystem.md). **Confidence: source-backed** (a2ui.org roadmap, retrieved 2026-08-29).
- Specification versions on the site: v1.0 (candidate), v0.9.1 (current), v0.9 (previous stable), v0.8 (legacy), plus a `v0.8` A2A extension (`surfaceId` + catalog negotiation for agent-to-UI delivery over A2A).
- `a2ui-project/a2ui` (Apache-2.0, ~16.2k stars / 1.3k forks as of the 2026-08-29 pull) tracks toward API 1.0 with a restaurant-finder quickstart demo; its README frames spec stabilization toward v1.0, more renderers (React, Jetpack Compose, iOS/SwiftUI), more transports (REST), and more agent frameworks (Genkit, LangGraph) as the near-term community work.

## Interoperability surfaces

A2UI is designed to interop with the rest of the agent-UI space rather than replace it. The site documents explicit cross-integrations: **A2UI over [MCP](/protocols/model-context-protocol.md)**, **MCP Apps in A2UI**, and **A2UI in MCP Apps** (see the [MCP Apps page](/protocols/mcp-apps.md)). Its roadmap mentions supporting more renderers (Jetpack Compose, SwiftUI) and more transports (REST). The [How to Use A2UI](https://a2ui.org/introduction/how-to-use) page (retrieved 2026-09-19) formalizes this as **three integration paths** — *Host Application (frontend)*, *Agent (backend)*, and *Using an Existing Framework* — with the third routing to **AG-UI / CopilotKit** ("full-stack agentic app framework with A2UI rendering") and the **Flutter GenUI SDK** ("uses A2UI internally"), plus explicit backend agent-framework guidance (Python: Google ADK, LangChain, custom; Node.js: A2A SDK, Vercel AI SDK, custom). The v1.0 candidate spec adds transport contracts/binings, a functions-in-content execution model (with async evaluation and pending states), and agent/renderer capability negotiation. Interactive tools on a2ui.org include the **A2UI Composer** (visual widget builder that generates A2UI JSON for pasting into agent prompts) and **A2UI Theater** (step-through streaming scenarios across Lit, React, and Angular renderers). The v0.8↔v0.9 [evolution guide](https://a2ui.org/specification/v0.9-evolution-guide) (retrieved 2026-09-19) documents the breaking renames and semantic shifts between the two families (e.g. data binding `dataBinding`/`literalString` → `path`/native JSON types; `beginRendering` → `createSurface`; explicit `sendDataModel` client→server data syncing), corroborating the v0.9 prompt-first design on this page.

## Status

- **Confidence:** source-backed (a2ui.org specification v1.0 candidate/v0.9.1/v0.8, data-flow, data-binding, renderers reference, who-is-it-for, how-to-use, evolution guide, catalogs, and roadmap pages, plus the `a2ui-project/a2ui` repo README; single primary source on most points, not independently cross-checked). The full v0.9.1 spec surface was retrieved 2026-08-27; the Lynx renderer, how-to paths, and evolution guide were retrieved 2026-09-19.
- Actively developed and shaped by community roadmap feedback; current stable is v0.9.1; v1.0 is a candidate targeting Q4 2026; long-term vision is full app UIs, multi-agent coordination, accessibility, advanced UI patterns, and ecosystem growth.

## Source Map

- [Web-search generative-UI source evidence](/sources/web-search-generative-ui.md) — source and coverage.
- [Generative-UI ecosystem](/concepts/generative-ui-ecosystem.md) — how A2UI compares to AG-UI, OpenUI, and MCP Apps.
- Site: <https://a2ui.org> (specification: <https://a2ui.org/specification/v1.0-a2ui>)
- Repo: <https://github.com/a2ui-project/a2ui>