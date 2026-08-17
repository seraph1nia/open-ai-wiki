---
type: Guide
title: AI Knowledge Wiki Quickstart
description: Navigation and current status for the AI knowledge corpus — the Model Context Protocol (MCP) core and its 2026-07-28 stateless revision (added 2026-08-17), the Agent Host Protocol (AHP), Agent Client Protocol (ACP), the generative-UI / agent-UI protocol ecosystem (with the AG-UI Kotlin SDK and Cedar-OS deltas), the agentic SDLC factory toolchain (Pierre, t3code, Effect, OpenCode, Pi SDK, gh-aw CI workflows, and the followed blog feeds), and the agent-maintained knowledge-base layer (the Open Knowledge Format v0.2 spec and the OpenWiki CLI that maintains this wiki).
tags: [quickstart, index, navigation, ai-agents, generative-ui, factory-toolchain, okf, openwiki, knowledge-bases]
timestamp: 2026-08-17
---

# AI Knowledge Quickstart

This knowledge base maintains a durable corpus about **AI protocols, frameworks, concepts, standards, and technically useful references**, grounded only in configured external connectors and their retrieved evidence.

## Current status

As of this update (2026-08-17), the wiki documents the **Model Context Protocol core** (added 2026-08-17), two **agent protocols**, and a **generative-UI / agent-UI** domain:

**Model Context Protocol (added 2026-08-17 from the web-search Agent integration protocols run):**
- **[Model Context Protocol (MCP)](/protocols/model-context-protocol.md)** — the industry-standard, open JSON-RPC 2.0 protocol for connecting AI agents to external tools, data, and other agents. Its **2026-07-28 revision** made the protocol core **stateless** (no handshake or session), added **Multi Round-Trip Requests (MRTR)**, header-based routing, cacheable list results, authorization hardening, **Tasks**, a formal **extensions framework**, and a deprecation policy. Its [Releases reference](/references/model-context-protocol-releases.md) maps the versioned spec revisions (2025-03-26 → 2026-07-28) and the official `servers` + `swift-sdk` release trails.

**Agent protocols (pre-existing):**
- The **[Agent Host Protocol (AHP)](/protocols/agent-host-protocol.md)** — Microsoft's synchronized, multi-client state protocol for AI agent sessions, framed on JSON-RPC 2.0 with channel-based routing, immutable state, pure reducers, and write-ahead reconciliation. Its [Releases reference](/references/agent-host-protocol-releases.md) maps the spec request through v0.7.0 (2026-07-31); evidence lives on the [GitHub source page](/sources/github-agent-host-protocol.md).
- The **[Agent Client Protocol (ACP)](/protocols/agent-client-protocol.md)** — the editor↔agent protocol for "connecting any editor to any agent" (specified in the `agentclientprotocol` org). Added in an earlier run via its official TypeScript implementation, with a [Releases reference](/references/agent-client-protocol-typescript-sdk-releases.md) through v1.3.0 (2026-07-21) and [source evidence](/sources/github-acp-typescript-sdk.md).

**Generative-UI / agent-UI (added 2026-08-16 from the web-search generative-UI run):**
- **[AG-UI](/protocols/ag-ui.md)** — the event-based agent-user-interaction wire protocol (~16 event types over SSE/WS/HTTP); SDK surface now spans official TypeScript/Python plus Java, Go, Kotlin (community) and Swift (community).
- **[A2UI](/protocols/a2ui.md)** — the declarative, no-code-execution "Agent to UI" JSON protocol (Surfaces, Components, Catalogs).
- **[MCP Apps](/protocols/mcp-apps.md)** — the first official [Model Context Protocol](/protocols/model-context-protocol.md) extension (Anthropic + OpenAI), delivering interactive UIs in CSP-sandboxed iframes.
- **[OpenUI](/frameworks/openui.md)** — the declarative OpenUI Lang language + streaming runtime + Cloud backend.
- **[CopilotKit](/frameworks/copilotkit.md)** — the 1st-party AG-UI client that also renders A2UI and MCP Apps UIs.
- **[Mastra agentic-UI](/frameworks/mastra-agentic-ui.md)** — the agentic-UI layer (`@mastra/ai-sdk`) and UI dojo that drive multiple frontends.
- **[Generative-UI ecosystem](/concepts/generative-ui-ecosystem.md)** — the cross-source comparison hub linking the four approaches and their framework consumers.

**Agentic SDLC factory toolchain (added 2026-08-16 from the web-search Factory tools run):**
- **[Factory toolchain hub](/concepts/factory-toolchain.md)** — canonical cross-source hub for how wire/state protocols, SDKs, and control surfaces compose into one agent-driven delivery pipeline; since 2026-08-17 it also absorbs the followed engineering-blog feeds (Zed, Solo.io, Mastra, gh-aw).
- **[Pierre](/frameworks/pierre.md)** — the Pierre Computer Company's open-source diff/tree toolkit; `@pierre/diffs` v1.3.0 ("the Edit release") and the answered Pierre open question.
- **[t3code](/frameworks/t3code.md)** — the "agent harness control surface" (mobile/web/desktop) that drives Claude Code, Codex, Cursor, Grok Build, and OpenCode.
- **[Effect](/frameworks/effect.md)** — the typed TypeScript orchestration library (v4 era); durable-execution surface is now source-backed (`DurableQueue` ported from v3, `@effect/workflow` in alpha).
- **[OpenCode SDK](/frameworks/opencode-sdk.md)** — the type-safe `@opencode-ai/sdk` client for controlling the opencode server.
- **[Pi SDK](/frameworks/pi-sdk.md)** — programmatic access to the Pi coding agent for embedding and automation, with an official release trail through v0.84.2.
- **[GitHub Agentic Workflows (gh-aw)](/concepts/factory-toolchain.md#first-blog-feed-signals-2026-08-17-run)** — the CI-native agentic-workflow layer (Markdown workflow files compiled into GitHub Actions), added from the first blog-feed run (2026-08-17).

**Agent-maintained knowledge bases (added 2026-08-17 from the web-search Agent wiki run):**
- **[Open Knowledge Format (OKF)](/protocols/open-knowledge-format.md)** — the minimal, vendor-neutral spec (v0.2) for representing knowledge as markdown + YAML frontmatter in a self-describing bundle; makes provenance, trust, lifecycle, and attestation first-class for agent-maintained corpora.
- **[OpenWiki](/frameworks/openwiki.md)** — the MIT/TypeScript CLI that maintains agent-written, self-updating wikis (code + personal modes, 12 model providers, built-in connectors, OKF output with validated Mermaid diagrams, interactive visualizer). This corpus is an OpenWiki personal-mode wiki.
- Evidence: [web-search Agent wiki source page](/sources/web-search-agent-wiki.md).

## How the wiki is organized

| Area | Directory / page | Purpose |
|---|---|---|
| Entrypoint | `/quickstart.md` | Navigation and status (this page) |
| Protocols | `/protocols/agent-host-protocol.md` | Canonical AHP concept with diagrams |
| Protocols | `/protocols/model-context-protocol.md` | Canonical MCP core protocol concept (stateless 2026-07-28 revision) |
| Protocols | `/protocols/agent-client-protocol.md` | Canonical ACP concept with diagram |
| Protocols | `/protocols/ag-ui.md` | Canonical AG-UI event-protocol concept |
| Protocols | `/protocols/a2ui.md` | Canonical A2UI declarative-protocol concept |
| Protocols | `/protocols/mcp-apps.md` | Canonical MCP Apps iframe-extension concept |
| Protocols | `/protocols/open-knowledge-format.md` | Canonical OKF v0.2 knowledge-format spec concept |
| Frameworks | `/frameworks/openwiki.md` | OpenWiki agent-maintained-wiki CLI |
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
| References | `/references/model-context-protocol-releases.md` | MCP spec + servers/SDK release resource |
| References | `/references/agent-client-protocol-typescript-sdk-releases.md` | ACP TypeScript SDK release resource |
| Sources | `/sources/github-agent-host-protocol.md` | AHP evidence and coverage notes |
| Sources | `/sources/web-search-agent-integration-protocols.md` | Web-search MCP run evidence (2026-08-17: MCP blog, spec releases, ext-apps) |
| Sources | `/sources/github-acp-typescript-sdk.md` | ACP SDK evidence and coverage notes |
| Sources | `/sources/web-search.md` | Web-search agent-protocols run evidence (2026-08-16) |
| Sources | `/sources/web-search-generative-ui.md` | Web-search generative-UI run evidence (2026-08-16 three pulls + 2026-08-17 re-pull) |
| Sources | `/sources/web-search-factory-tools.md` | Web-search Factory tools run evidence (2026-08-16 toolchain + 2026-08-17 first blog-feed run) |
| Sources | `/sources/web-search-agent-wiki.md` | Web-search Agent wiki run evidence (2026-08-17: OKF v0.2 spec + OpenWiki) |
| Memory | `/themes.md` | Recurring themes index (generative-UI standardization; MCP core standardization; factory toolchain; agent-maintained knowledge bases) |
| Memory | `/open-questions.md` | Unresolved questions about corpus coverage (Effect Workflow/Activity semantics; OpenWiki OKF version; OpenWiki release) |

## Prior ingestion notes (2026-08-16)

Three web-search generative-UI pulls plus two Factory tools pulls this day. The **generative-UI runs** (Tavily, 8 queries each) introduced the generative-UI domain and its [ecosystem hub](/concepts/generative-ui-ecosystem.md). The second pull deepened SDK/interop evidence (Java/Go AG-UI SDKs, A2UI JSONL/data-flow/renderer matrix, MCP Apps extension id + host SDK requests, OpenUI v0.5 + token-efficiency claim, CopilotKit `with-adk` archive and playground HITL). The **third pull** (20:10Z) re-confirmed the same material and added: the **AG-UI community Swift SDK** (`paduh/ag-ui-swift`), the **CopilotKit `with-langgraph-python` archive** into the monorepo, the **OpenUI repo package structure** (react-lang/lang-core/vue-lang/svelte-lang/browser-bundle/openui-cli), and the **OpenUI Lang feature-comparison page** (vs Vercel `json-render`, A2UI, CopilotKit OpenGenUI). The **Factory tools runs** (Tavily, 12 queries each) added the [agentic-SDLC factory toolchain](/concepts/factory-toolchain.md), its tool pages, durable AHP `mcp://` channel evidence, and — in the second pull — closed the **Effect durable-execution evidence gap** (official v4 beta recap: `DurableQueue` ported from v3, `@effect/workflow` in alpha), added the Pi official release trail (0.80.x–0.84.2), and expanded ACP ecosystem facts. A **third Factory tools pull** (19:53Z) added two more official ACP facts: the **Rust/schema artifact split** (schema vs runtime crate, `schema-v*` releases, `protocolVersion`-based wire compat) and **GitHub Copilot CLI as an official ACP server** (`copilot --acp`, stdio/TCP, slash commands). Reliability caveats (drifted `answer` fields, off-target results) are on the respective source-evidence pages.

## Latest ingestion note (2026-08-17) — first blog-feed run

The 2026-08-17 `web-search-factory-tools` pull (Tavily, 17 queries) was the run's **first blog-feed ingestion** (Zed, Solo.io, Mastra, gh-aw feeds + gallery). The **blog post ingestion ledger** ([sources/blog-post-ledger.md](/sources/blog-post-ledger.md)) was populated for the first time (20 posts, one row each). Durable concept material folded into the [factory-toolchain hub](/concepts/factory-toolchain.md):

- **gh-aw (GitHub Agentic Workflows) — new CI-native layer**: Markdown workflow files compile into GitHub Actions workflows; agent taxonomy (read-only analysts / PR-proposing agents / meta-agents); continuous-documentation multi-agent pattern; the CI permission model as its safety surface; `gh-aw-mcpg` MCP gateway watchlist.
- **Zed — DeltaDB** design idea (character-level sync for shared human/agent codebase state); company news (Sequoia, Student Plan) closed in the ledger only.
- **Solo.io — gateway layer**: MCP progressive disclosure, On-Behalf-Of delegation, AAIF announcement (watchlist, teaser snippets).
- **Mastra — runtime maturity**: 1.0 stable, Agent-to-Agent (A2A) support, AI Tracing (source-backed).
- Tool pages refreshed in passing: Pierre (icons repo described for Diffs.com/Trees.software/DiffsHub.com, CLI feature request #728, `@pierre/diffs` 1.3.0 chore), t3code (Codex slash-command issue #2637, image-gen request #2398, v0.0.4 pinned in #386), OpenCode (Go SDK/provider table, ecosystem catalogue), Pi (macos-dev-code package), AHP (detached-shell task lifecycle issue #331027, WSL #307568, GHE auth #313396). No new AHP/ACP/Pi release versions (the `dotnet-1.17.0` / `v0.3.228` answers again belonged to other repos).

## Latest ingestion note (2026-08-17, 22:11Z) — generative-UI re-pull

A second 2026-08-17 `web-search-generative-ui` pull (Tavily, 7 queries × 5 results, 35 hits) re-pulled the AG-UI, CopilotKit, OpenUI, Mastra, and A2UI canonical sources. **Most hits re-confirmed already-synthesized material**; two durable deltas were folded into the canonical pages:

- **[AG-UI Kotlin SDK](/protocols/ag-ui.md)** — the official repo's `docs/sdk/kotlin/overview.mdx` documents a community-contributed Kotlin Multiplatform SDK (`com.agui.*`; Android API 26+/iOS 13+/JVM Java 11+ stable). `AgUiAgent` (stateless) / `StatefulAgUiAgent` (conversational) clients, Tools module with circuit-breaker patterns, **chunked-event rewriting** (`TEXT_MESSAGE_CHUNK`/`TOOL_CALL_CHUNK` → start/content/end) and **`THINKING_` telemetry** for showing agent reasoning in UIs.
- **[Cedar-OS](/frameworks/mastra-agentic-ui.md)** — a second third-party multi-frontend stack (CedarCopilot) surfaced via the Mastra query: AI-native React frontends with universal provider support incl. Mastra and Vercel AI SDK, agentic state (`useCedarState`), voice-first design (watchlist).

Reliability caveats: the `mastra.ai/integrations/agentic-ui/openui` canonical URL still did not resolve and its Tavily `answer` was garbled ("Amazon" attribution) — the AI SDK UI page and off-target lists dominated that query (see the [source evidence](/sources/web-search-generative-ui.md)).

## Latest ingestion note (2026-08-17, 22:31Z) — web-search Agent wiki run

The 2026-08-17 `web-search-agent-wiki` pull (Tavily, 3 queries × 5 results) added the **agent-maintained knowledge-base domain** to the corpus, sourced from the OKF specification and the OpenWiki repository:

- **[Open Knowledge Format v0.2](/protocols/open-knowledge-format.md)** — primary-source spec content retrieved in full: bundle structure, reserved filenames (`index.md`/`log.md`), required `type` + recommended `title`/`description`/`resource`/`tags`, the provenance (`sources`, credibility signals), trust (`generated`, `verified`, trust tiers), and lifecycle (`status`, `stale_after`) frontmatter families, bundle-relative cross-linking + the `references/` convention, the `Attested Computation` concept (runtime/parameters/computation/executor/attester), conformance rules, and the v0.1→v0.2 breaking changes (`timestamp` → `generated.at`; body `# Citations` → `sources`).
- **[OpenWiki](/frameworks/openwiki.md)** — the CLI that maintains this corpus: code + personal modes, 12 providers, connectors (local git, Notion, Slack, Gmail, X, Web Search, Hacker News, Custom MCP), `~/.openwiki/connectors/<id>/raw` deterministic ingestion, `openwiki auth` OAuth flows, visualizer, CI self-update examples, and a Changesets-based release flow.
- **Ecosystem signals (source-backed, watchlist):** the knowledge-catalog reference-agent (BQ pass + web pass) and visualizer; AKB issue #86 (independent OKF producer/conformance validator, field-alias + typed-link feedback) and the openknowledge CLI.
- **Reliability:** the releases query returned repository docs, **no release artifacts**; the Tavily `answer` claims (e.g. "built by a team of inventors at Amazon") were hallucinated and rejected. New open questions: [OpenWiki OKF version](/open-questions.md) (README declares OKF v0.1 output while the spec is v0.2) and [OpenWiki current release](/open-questions.md).

## Latest ingestion note (2026-08-17, 22:41Z) — web-search Agent integration protocols run

The 2026-08-17 `web-search-agent-integration-protocols` pull (Tavily, 3 queries × 5 results over the MCP blog, the `modelcontextprotocol/modelcontextprotocol` spec releases, and the `modelcontextprotocol/ext-apps` repo) added the **Model Context Protocol core** itself to the corpus — previously MCP was only referenced indirectly via [MCP Apps](/protocols/mcp-apps.md):

- **[Model Context Protocol](/protocols/model-context-protocol.md)** — the new canonical MCP core concept page. The **2026-07-28 revision** made the protocol stateless (no handshake/session), added **Multi Round-Trip Requests (MRTR)**, header-based routing, cacheable list results, authorization hardening, **Tasks**, a formal **extensions framework**, and a deprecation policy. Authorization (OAuth 2.1, CIMD-over-DCR), the MCP Registry, and the 2026 roadmap (transport scalability, agent communication with Tasks lifecycle gaps, governance working groups, enterprise readiness) are documented. Its [Releases reference](/references/model-context-protocol-releases.md) maps the spec revisions (2025-03-26 → 2025-06-18 → 2025-11-25 → 2026-07-28) plus the `modelcontextprotocol/servers` and `swift-sdk` release trails.
- **MCP Apps SDK deltas** — the app-delivery **UI lifecycle** (Discovery → Initialization → Data delivery → Interactive) with the `ui/initialize` handshake and the `content`/`structuredContent` result split; the report's JSON-RPC-over-postMessage framing; the **Python SDK** MCP Apps support; and the **Java SDK gap** (`java-sdk#780`, v0.17.2, watchlist). Folded into the [MCP Apps page](/protocols/mcp-apps.md).
- **Cross-link updates** — [AG-UI](/protocols/ag-ui.md), [A2UI](/protocols/a2ui.md), [AHP](/protocols/agent-host-protocol.md) (`mcp://` side-channel), [generative-UI ecosystem](/concepts/generative-ui-ecosystem.md), [factory-toolchain hub](/concepts/factory-toolchain.md), [CopilotKit](/frameworks/copilotkit.md), and [OpenUI](/frameworks/openui.md) now link the canonical MCP core page in their protocol relationships. A new [mcp-core-standardization](/themes.md) theme row captures MCP's maturation.
- **Reliability:** the Tavily `answer` fields ("latest release 2026.7.10") were cross-checked against the raw release listings; the `2026.7.10` and `0.12.1` figures refer to the **`servers`** and **`swift-sdk`** repos, not the spec revision. The MCP blog news content (2026-07-28 spec, 2026 roadmap, Registry, OAuth client registration) was treated as announcement evidence pointing at the spec, per the source brief.

## Key facts (confirmed / source-backed)

- Generative-UI approaches answer two questions — *how agents describe UI to clients* and *how streaming/state/HITL work* — via four distinct designs: event wire protocol (AG-UI), declarative JSON (A2UI), declarative language + runtime (OpenUI), and iframe-wrapped MCP extension (MCP Apps). See [the ecosystem comparison](/concepts/generative-ui-ecosystem.md).
- **[MCP](/protocols/model-context-protocol.md) is now a canonical corpus concept** (added 2026-08-17): the industry-standard JSON-RPC 2.0 protocol for agent-tool/data/agent integration. The **2026-07-28 revision** removed the handshake/session (stateless core), added **Multi Round-Trip Requests (MRTR)**, header-based routing, cacheable list results, authorization hardening, **Tasks**, and a formal **extensions framework** with a deprecation policy; the 2026 roadmap prioritizes transport scalability, agent communication (Tasks lifecycle gaps: retry semantics, result expiry), governance working groups, and enterprise readiness; the MCP Registry (open server catalog + API) is in preview since 2025-09-08; OAuth 2.1 underpins authorization with CIMD client registration recommended over DCR for new implementations.
- **MCP Apps** is the first official [MCP](/protocols/model-context-protocol.md) extension, co-developed by Anthropic and OpenAI, released as an open standard in **January 2026** (spec `2026-01-26`); extension id **`io.modelcontextprotocol/ui`**; renders server-declared HTML resources in CSP-sandboxed iframes over a 4-phase UI lifecycle (Discovery → Initialization → Data delivery → Interactive) with `ui/initialize` handshake and `content`/`structuredContent` results. Host-SDK adoption requests are open in csharp-sdk (#1431, SEP-1865) and java-sdk (#780, watched for Java SDK v0.17.2).
- **A2UI** is declarative, no-code-execution, uses negotiated component Catalogs and Surfaces; current stable v0.9.1, v1.0 candidate targets Q4 2026; maintained renderers cover React, Lit, Angular, Flutter (SwiftUI/Jetpack Compose planned); streams JSONL with JSON-Pointer data binding and separate A2A `userAction`/`error` client messages.
- **AG-UI** is event-based (≈16 event types), has official TypeScript/Python plus Java, Go, and community Kotlin/Swift SDKs (SSE-based), and lists **human-in-the-loop** as a first-class stack feature (its Kotlin SDK surfaces `THINKING_` telemetry for showing agent reasoning). Open proposals would bridge Oracle's Open Agent Spec and Microsoft's agent-governance toolkit onto AG-UI (watchlist).
- **OpenUI** markets "up to 67% fewer tokens than JSON" for its streaming-first OpenUI Lang (v0.5 adds reactive state/data queries/interactive apps); OpenUI Cloud adds validation, theming, fallbacks, versioning, and observability; the repo carries an explicit no-cryptocurrency disclaimer.
- **CopilotKit** consolidated to a monorepo and renders **all three** generative-UI types (static, A2UI, MCP Apps) in one playground, including `useHumanInTheLoop` approval flows; its `with-adk` (Google ADK) demo was archived 2026-03-12 into the monorepo.
- Earlier confirmed AHP facts remain: transport-agnostic JSON-RPC 2.0, per-message `channel: URI` routing, per-artifact SemVer releases, latest spec v0.7.0 (2026-07-31), active working draft.
- **ACP's version-model (source-backed):** the spec repo ships two Rust artifacts — `agent-client-protocol-schema` (wire-message data model + code-gen inputs) and the higher-level `agent-client-protocol` runtime crate; versioned JSON Schema files are attached to `schema-v*` releases, and wire compatibility is decided by the negotiated `protocolVersion` (stable ACP protocol version `1`), not the release version. See the [ACP page](/protocols/agent-client-protocol.md).
- **GitHub Copilot CLI is an official ACP server** (`copilot --acp`, stdio/TCP transports, BYOK-without-login, server-side `--available-tools`/`--excluded-tools`/`--effort`, slash-command advertisement via `available_commands_update`); documented in GitHub Enterprise Cloud docs and consumed with `@agentclientprotocol/sdk`. See the [ACP page](/protocols/agent-client-protocol.md).
- **AHP's `mcp://` side-channel** lets an AHP client originate a capability-gated subset of MCP traffic (MCP wire format verbatim) against a host-run MCP server; it ties AHP into the [MCP Apps](/protocols/mcp-apps.md) generative-UI domain and relays the [MCP core](/protocols/model-context-protocol.md) capable of carrying the 2026-07-28 stateless revision transparently.
- **[Pierre](/frameworks/pierre.md)** is confirmed as the Pierre Computer Company's open-source diff/tree toolkit; `@pierre/diffs` reached **v1.3.0** (the "Edit release", in-place diff editing). This answers the prior Pierre open question.
- **[t3code](/frameworks/t3code.md)** is an early-stage "agent harness control surface" (mobile/web/desktop) that drives Claude Code, Codex, Cursor, Grok Build, and OpenCode; launched via `npx t3@latest`.
- **[Effect](/frameworks/effect.md)** v4 beta (launched 2026-02-18) confirms broad API changes; its **durable-execution surface is now source-backed** — `DurableQueue` ported from v3 with persistent queue semantics, workflow suspension/failure fixes in the beta, and `@effect/workflow` delivering durable workflows in alpha.
- **[Pi SDK](/frameworks/pi-sdk.md)** has an official release trail (0.80.x–0.84.2 on `pi.dev/news`); v0.84.0 carried major SDK breaking changes (session/`SessionRepo` rework, `message_update` delta-only events, model-registry refresh changes).
- **[GitHub Agentic Workflows (gh-aw)](https://github.github.com/gh-aw)** is the **CI-native agentic-workflow layer** of the factory: Markdown workflow files are compiled into GitHub Actions workflows, so the Actions trigger/permission/log model becomes the agent safety surface (see [factory hub](/concepts/factory-toolchain.md)). Source-backed from official gh-aw docs/blog, first adopted 2026-08-17.
- **Blog feeds are now ledgered**: the Zed, Solo.io, Mastra, and gh-aw blogs are tracked as a running concept feed via the [blog post ingestion ledger](/sources/blog-post-ledger.md) (first populated 2026-08-17, 20 posts); the gh-aw [workflow gallery](https://github.github.com/gh-aw/index.html#gallery) is a living catalogue outside the ledger, re-read each run.
- **[OKF v0.2](/protocols/open-knowledge-format.md)** is the format standard behind this wiki: markdown + YAML frontmatter bundled in a directory tree, with reserved `index.md`/`log.md`, required `type`, per-concept `sources` provenance with credibility signals, `generated`/`verified` trust, `status`/`stale_after` lifecycle, and the `Attested Computation` concept for sanctioned, checkable computations. Consumers derive trust tiers (unverified / machine-confirmed / human-reviewed) from `verified`; staleness is an absolute-date comparison on `stale_after`.
- **[OpenWiki](/frameworks/openwiki.md)** is the MIT/TypeScript CLI that writes and maintains this corpus (personal mode → `~/.openwiki/wiki`) or a repo wiki (code mode → `openwiki/`); it ingests configured connectors deterministically and synthesizes via an agent, and self-updates through GitHub Actions / GitLab CI / Bitbucket Pipelines examples.

## Start here

For the **agent-integration protocol core**, start at the [Model Context Protocol](/protocols/model-context-protocol.md) page (2026-07-28 stateless revision), then its [Release reference](/references/model-context-protocol-releases.md) and the [MCP Apps](/protocols/mcp-apps.md) extension. For the generative-UI domain, start at the [Generative-UI ecosystem](/concepts/generative-ui-ecosystem.md) hub, then the protocol/framework pages it links. For the agentic-SDLC factory toolchain, start at the [factory-toolchain hub](/concepts/factory-toolchain.md), which links the protocol layer ([ACP](/protocols/agent-client-protocol.md), [AHP](/protocols/agent-host-protocol.md)) and tools (Pierre, t3code, Effect, OpenCode, Pi). For the agent-maintained knowledge-base domain, start at the [Open Knowledge Format](/protocols/open-knowledge-format.md) spec page, then the [OpenWiki](/frameworks/openwiki.md) tool page; for how this wiki itself was produced, see the [Agent wiki source evidence](/sources/web-search-agent-wiki.md). For the earlier agent-protocol domain, read the [Agent Host Protocol](/protocols/agent-host-protocol.md) page, then its [Releases reference](/references/agent-host-protocol-releases.md). New readers should confirm evidence lineage on the relevant [source pages](/sources/web-search-factory-tools.md).

## Backlog

Deferred additions, with the evidence gap or scope reason:

- **Effect Workflow/Activity deep API semantics** — the DurableQueue port and `@effect/workflow` alpha existence are source-backed, but the precise Workflow/Activity primitive semantics and packaging were not fully retrieved; target the official Effect v4 workflow docs directly (see [Effect page](/frameworks/effect.md) and the [open question](/open-questions.md)).
- **Direct ingestion of Pierre, t3code, Effect, OpenCode, and Pi repo/release resources** — each was witnessed via web-search results this run only; direct repo/release ingestion would confirm version history and cadence (Pi's `pi.dev/news` trail is covered only partially, 0.80.x–0.84.2).
- **Generative-UI release/version resources** — these runs ingested docs/README pages, not formal release files. Verify AG-UI SDK, A2UI (v1.0), and CopilotKit version claims (e.g. `@copilotkit/runtime@1.10.6`, `@ag-ui/client@0.0.41` from issue #2840; AG-UI Java/Go/Kotlin SDK package versions) against release resources before promoting them to canonical facts. See the [open question](/open-questions.md).
- **Client-registry changelogs (Rust/TS/Kotlin)** for AHP — release evidence lives in crates.io/npm/Maven Central, not the GitHub releases resource; ingest those registries to extend the reference.
- **Deeper AHP channel specs (chat, session, terminal, changeset)** — pull the individual specification docs to the [AHP page](/protocols/agent-host-protocol.md) when a fuller protocol reference is wanted.
- **Deepen the ACP canonical protocol detail** — the ACP *spec* lives in the `agentclientprotocol/agent-client-protocol` repo and <https://agentclientprotocol.com>, not in the TypeScript SDK releases resource.
- **Confirm AHP ↔ ACP relationship** — no evidence yet establishes formal interoperability or shared lineage beyond their shared "agent protocol" problem space.
- **MCP spec detail depth** — the 2026-08-17 MCP run retrieved the blog post and release-page surfaces (with the 2026-07-28 RC contents and SDK beta post); the full `specification/` text (MRTR mechanics, header schemas, Tasks payloads, per-SEP changelogs) was not pulled. Fetch the individual spec docs to deepen the [MCP page](/protocols/model-context-protocol.md) when a full protocol reference is wanted.
- **MCP release registration** — the external `servers`/`swift-sdk` release trails (2026.7.10, 0.12.1) came from the same Tavily page fetch; direct repo/registry ingestion would pin the official release cadence and SDK version maps (compare the existing ledger pattern at [server releases](https://github.com/modelcontextprotocol/servers/releases)).
- **Full-body re-reads of the followed blog feeds** — the first blog-feed run only captured teaser snippets (Zed, Solo.io, Mastra, gh-aw). The ledger now closes the posts; re-evaluating a closed post requires its content to demonstrably change per the [ledger protocol](/sources/blog-post-ledger.md), so budget direct fetches of new posts going forward.
- **Solo.io progressive-disclosure / OBO gateway topics** — saw only teaser snippets this run; fetch the full posts to confirm whether they add durable gateway-architecture concepts (currently watchlist).
- **Open questions / commitments / personal logistics** — no personal-mode connector evidence (Slack, Gmail, Notion, X) is configured at this time; `/open-questions.md` holds only corpus-coverage entries and the personal/logistics pages have none.
- **OpenWiki current release/version and OKF version emitted** — the 2026-08-17 web-search Agent wiki run retrieved repository docs, not release artifacts; the README declares OKF v0.1 output while the [OKF spec](/protocols/open-knowledge-format.md) is at v0.2. Direct release-file ingestion of `langchain-ai/openwiki` releases would confirm the current version and whether it emits v0.2 (see [open questions](/open-questions.md)).
- **OKF ecosystem/implementations registry** — AKB (issue #86) and the openknowledge CLI are single source-backed hits; there is no formal OKF implementations list upstream, and no release resources for either project were ingested. Keep as watchlist until releases/relationships accumulate.