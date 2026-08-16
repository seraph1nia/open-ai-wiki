---
type: Guide
title: AI Knowledge Wiki Quickstart
description: Navigation and current status for the AI knowledge corpus — the Agent Host Protocol (AHP), Agent Client Protocol (ACP), the generative-UI / agent-UI protocol ecosystem, and the agentic SDLC factory toolchain (Pierre, t3code, Effect, OpenCode, Pi SDK).
tags: [quickstart, index, navigation, ai-agents, generative-ui]
timestamp: 2026-08-16
---

# AI Knowledge Quickstart

This knowledge base maintains a durable corpus about **AI protocols, frameworks, concepts, standards, and technically useful references**, grounded only in configured external connectors and their retrieved evidence.

## Current status

As of this update (2026-08-16), the wiki documents two high-value **agent protocols** plus a newly added **generative-UI / agent-UI** domain:

**Agent protocols (pre-existing):**
- The **[Agent Host Protocol (AHP)](/protocols/agent-host-protocol.md)** — Microsoft's synchronized, multi-client state protocol for AI agent sessions, framed on JSON-RPC 2.0 with channel-based routing, immutable state, pure reducers, and write-ahead reconciliation. Its [Releases reference](/references/agent-host-protocol-releases.md) maps the spec request through v0.7.0 (2026-07-31); evidence lives on the [GitHub source page](/sources/github-agent-host-protocol.md).
- The **[Agent Client Protocol (ACP)](/protocols/agent-client-protocol.md)** — the editor↔agent protocol for "connecting any editor to any agent" (specified in the `agentclientprotocol` org). Added in an earlier run via its official TypeScript implementation, with a [Releases reference](/references/agent-client-protocol-typescript-sdk-releases.md) through v1.3.0 (2026-07-21) and [source evidence](/sources/github-acp-typescript-sdk.md).

**Generative-UI / agent-UI (added 2026-08-16 from the web-search generative-UI run):**
- **[AG-UI](/protocols/ag-ui.md)** — the event-based agent-user-interaction wire protocol (~16 event types over SSE/WS/HTTP).
- **[A2UI](/protocols/a2ui.md)** — the declarative, no-code-execution "Agent to UI" JSON protocol (Surfaces, Components, Catalogs).
- **[MCP Apps](/protocols/mcp-apps.md)** — the first official Model Context Protocol extension (Anthropic + OpenAI), delivering interactive UIs in CSP-sandboxed iframes.
- **[OpenUI](/frameworks/openui.md)** — the declarative OpenUI Lang language + streaming runtime + Cloud backend.
- **[CopilotKit](/frameworks/copilotkit.md)** — the 1st-party AG-UI client that also renders A2UI and MCP Apps UIs.
- **[Mastra agentic-UI](/frameworks/mastra-agentic-ui.md)** — the agentic-UI layer (`@mastra/ai-sdk`) and UI dojo that drive multiple frontends.
- **[Generative-UI ecosystem](/concepts/generative-ui-ecosystem.md)** — the cross-source comparison hub linking the four approaches and their framework consumers.

**Agentic SDLC factory toolchain (added 2026-08-16 from the web-search Factory tools run):**
- **[Factory toolchain hub](/concepts/factory-toolchain.md)** — canonical cross-source hub for how wire/state protocols, SDKs, and control surfaces compose into one agent-driven delivery pipeline.
- **[Pierre](/frameworks/pierre.md)** — the Pierre Computer Company's open-source diff/tree toolkit; `@pierre/diffs` v1.3.0 ("the Edit release") and the answered Pierre open question.
- **[t3code](/frameworks/t3code.md)** — the "agent harness control surface" (mobile/web/desktop) that drives Claude Code, Codex, Cursor, Grok Build, and OpenCode.
- **[Effect](/frameworks/effect.md)** — the typed TypeScript orchestration library (v4 era); durable-execution surface is a confirmed evidence gap.
- **[OpenCode SDK](/frameworks/opencode-sdk.md)** — the type-safe `@opencode-ai/sdk` client for controlling the opencode server.
- **[Pi SDK](/frameworks/pi-sdk.md)** — programmatic access to the Pi coding agent for embedding and automation.

## How the wiki is organized

| Area | Directory / page | Purpose |
|---|---|---|
| Entrypoint | `/quickstart.md` | Navigation and status (this page) |
| Protocols | `/protocols/agent-host-protocol.md` | Canonical AHP concept with diagrams |
| Protocols | `/protocols/agent-client-protocol.md` | Canonical ACP concept with diagram |
| Protocols | `/protocols/ag-ui.md` | Canonical AG-UI event-protocol concept |
| Protocols | `/protocols/a2ui.md` | Canonical A2UI declarative-protocol concept |
| Protocols | `/protocols/mcp-apps.md` | Canonical MCP Apps iframe-extension concept |
| Frameworks | `/frameworks/openui.md` | OpenUI generative-UI toolkit |
| Frameworks | `/frameworks/copilotkit.md` | CopilotKit generative-UI stack |
| Frameworks | `/frameworks/mastra-agentic-ui.md` | Mastra agentic-UI layer |
| Frameworks | `/frameworks/pierre.md` | Pierre diff/edit toolkit (factory) |
| Frameworks | `/frameworks/t3code.md` | t3code agent control surface (factory) |
| Frameworks | `/frameworks/effect.md` | Effect orchestration library (factory) |
| Frameworks | `/frameworks/opencode-sdk.md` | OpenCode SDK (factory) |
| Frameworks | `/frameworks/pi-sdk.md` | Pi SDK (factory) |
| Concepts | `/concepts/generative-ui-ecosystem.md` | Cross-source comparison hub |
| Concepts | `/concepts/factory-toolchain.md` | Factory-toolchain cross-source hub |
| References | `/references/agent-host-protocol-releases.md` | AHP release resource |
| References | `/references/agent-client-protocol-typescript-sdk-releases.md` | ACP TypeScript SDK release resource |
| Sources | `/sources/github-agent-host-protocol.md` | AHP evidence and coverage notes |
| Sources | `/sources/github-acp-typescript-sdk.md` | ACP SDK evidence and coverage notes |
| Sources | `/sources/web-search.md` | Web-search agent-protocols run evidence (2026-08-16) |
| Sources | `/sources/web-search-generative-ui.md` | Web-search generative-UI run evidence (2026-08-16) |
| Sources | `/sources/web-search-factory-tools.md` | Web-search Factory tools run evidence (2026-08-16) |
| Memory | `/themes.md` | Recurring themes index (generative-UI standardization; factory toolchain) |
| Memory | `/open-questions.md` | Unresolved questions about corpus coverage (Effect durable-execution) |

## Latest ingestion note (2026-08-16)

Two web-search runs this day. The **generative-UI run** (Tavily, 8 queries) introduced the generative-UI domain and its [ecosystem hub](/concepts/generative-ui-ecosystem.md). The **Factory tools run** (Tavily, 12 queries) added the [agentic-SDLC factory toolchain](/concepts/factory-toolchain.md), its tool pages, durable AHP `mcp://` channel evidence, and answered the Pierre open question. Reliability caveats (drifted `answer` fields, off-target results, Effect gap) are on the [Factory tools source-evidence page](/sources/web-search-factory-tools.md).

## Key facts (confirmed / source-backed)

- Generative-UI approaches answer two questions — *how agents describe UI to clients* and *how streaming/state/HITL work* — via four distinct designs: event wire protocol (AG-UI), declarative JSON (A2UI), declarative language + runtime (OpenUI), and iframe-wrapped MCP extension (MCP Apps). See [the ecosystem comparison](/concepts/generative-ui-ecosystem.md).
- **MCP Apps** is the first official MCP extension, co-developed by Anthropic and OpenAI, released as an open standard in **January 2026** (spec `2026-01-26`); renders server-declared HTML resources in CSP-sandboxed iframes.
- **A2UI** is declarative, no-code-execution, uses negotiated component Catalogs and Surfaces; current stable v0.9.1, v1.0 candidate, roadmap targets full-app UIs and multi-agent coordination.
- **AG-UI** is event-based (≈16 event types), has official TypeScript/Python and community Kotlin/Go SDKs, and lists **human-in-the-loop** as a first-class stack feature.
- **CopilotKit** consolidated to a monorepo and renders **all three** generative-UI types (static, A2UI, MCP Apps) in one playground; it is the 1st-party client of AG-UI.
- Earlier confirmed AHP facts remain: transport-agnostic JSON-RPC 2.0, per-message `channel: URI` routing, per-artifact SemVer releases, latest spec v0.7.0 (2026-07-31), active working draft.
- **AHP's `mcp://` side-channel** lets an AHP client originate a capability-gated subset of MCP traffic (MCP wire format verbatim) against a host-run MCP server; it ties AHP into the [MCP Apps](/protocols/mcp-apps.md) generative-UI domain.
- **[Pierre](/frameworks/pierre.md)** is confirmed as the Pierre Computer Company's open-source diff/tree toolkit; `@pierre/diffs` reached **v1.3.0** (the "Edit release", in-place diff editing). This answers the prior Pierre open question.
- **[t3code](/frameworks/t3code.md)** is an early-stage "agent harness control surface" (mobile/web/desktop) that drives Claude Code, Codex, Cursor, Grok Build, and OpenCode; launched via `npx t3@latest`.
- **[Effect](/frameworks/effect.md)** v4 beta confirms broad API changes; its **durable-execution surface (Workflow/Activity/DurableQueue) is a confirmed evidence gap**.

## Start here

For the generative-UI domain, start at the [Generative-UI ecosystem](/concepts/generative-ui-ecosystem.md) hub, then the protocol/framework pages it links. For the agentic-SDLC factory toolchain, start at the [factory-toolchain hub](/concepts/factory-toolchain.md), which links the protocol layer ([ACP](/protocols/agent-client-protocol.md), [AHP](/protocols/agent-host-protocol.md)) and tools (Pierre, t3code, Effect, OpenCode, Pi). For the earlier agent-protocol domain, read the [Agent Host Protocol](/protocols/agent-host-protocol.md) page, then its [Releases reference](/references/agent-host-protocol-releases.md). New readers should confirm evidence lineage on the relevant [source pages](/sources/web-search-factory-tools.md).

## Backlog

Deferred additions, with the evidence gap or scope reason:

- **Effect durable-execution surface** — Workflow, Activity, and DurableQueue semantics are in scope but were not retrieved this run; the single query returned an off-target hit. Target the Effect v4 workflow docs directly (see [Effect page](/frameworks/effect.md) and the [open question](/open-questions.md)).
- **Direct ingestion of Pierre, t3code, Effect, OpenCode, and Pi repo/release resources** — each was only witnessed via web-search results this run; direct repo/release ingestion would confirm version history and cadence.
- **Generative-UI release/version resources** — this run ingested docs/README pages, not formal release files. Verify AG-UI SDK, A2UI (v1.0), and CopilotKit version claims against their release resources before promoting them to canonical facts.
- **Client-registry changelogs (Rust/TS/Kotlin)** for AHP — release evidence lives in crates.io/npm/Maven Central, not the GitHub releases resource; ingest those registries to extend the reference.
- **Deeper AHP channel specs (chat, session, terminal, changeset)** — pull the individual specification docs to the [AHP page](/protocols/agent-host-protocol.md) when a fuller protocol reference is wanted.
- **Deepen the ACP canonical protocol detail** — the ACP *spec* lives in the `agentclientprotocol/agent-client-protocol` repo and <https://agentclientprotocol.com>, not in the TypeScript SDK releases resource.
- **Confirm AHP ↔ ACP relationship** — no evidence yet establishes formal interoperability or shared lineage beyond their shared "agent protocol" problem space.
- **Open questions / commitments / personal logistics** — no personal-mode connector evidence (Slack, Gmail, Notion, X) is configured at this time; `/open-questions.md` holds only corpus-coverage entries and the personal/logistics pages have none.