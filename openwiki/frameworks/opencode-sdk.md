---
type: Reference
title: OpenCode
description: OpenCode is an open-source AI coding agent available as a terminal UI, desktop app, or IDE extension, with a type-safe JavaScript/TypeScript SDK (@opencode-ai/sdk) for building integrations and controlling the opencode server programmatically.
resource: https://opencode.ai/docs/sdk/
tags: [opencode, sdk, coding-agent, typescript, ai-agents]
timestamp: 2026-09-19
---

# OpenCode

**OpenCode** is an open-source AI coding agent available as a **terminal UI (TUI), desktop application, or IDE extension**. Its programmatic surface is the **OpenCode SDK** — a *type-safe JS/TS client for the opencode server* used to "build integrations and control opencode programmatically".

Source: [`opencode.ai/docs/sdk`](https://opencode.ai/docs/sdk). Evidence for this page lives on the [web-search Factory tools source page](/sources/web-search-factory-tools.md).

## The SDK

- Install: `npm install @opencode-ai/sdk`.
- Create a client: `import { createOpencode } from "@opencode-ai/sdk"` then `const { client } = await createOpencode()` — this starts both a server and a client.
- **Client options (official docs table, reconfirmed 2026-08-18):** the server-side client takes `hostname` (default `127.0.0.1`), `port` (default `4096`), `signal` (`AbortSignal`), `timeout` (ms for server start, default `5000`), and `config` (`Config`); the instance still picks up your `opencode.json`, but you can override or add configuration inline. A **client-only** mode connects to an already-running instance. The documented creation options also include `baseUrl` (server URL; default empty), `fetch` (custom fetch, default `globalThis.fetch`), `parseAs` (`auto`), `responseStyle` (`data` | `fields`, default `fields`), and `throwOnError` (default `false`).
- Types are exported for the API surface: `import type { Session, Message, Part } from "@opencode-ai/sdk"`.
- The session API is typed: `session.list()`, `session.get({ path })`, `session.children({ path })`, `session.create({ body })`, `session.update({ path, body })`, `session.init({ path, body })` (AGENTS.md init), `session.abort({ path })`, `session.share({ path })` / `unshare`, `session.summarize({ path, body })`, `session.messages({ path })` returning `{ info: Message, parts: Part[] }[]`, `session.message({ path })`, and `session.prompt({ path, body })` with `noReply` support.

## Position in the factory toolchain

OpenCode is one of the coding agents the [t3code](/frameworks/t3code.md) harness can control, and its SDK is a programmable route into the [agentic SDLC factory toolchain](/concepts/factory-toolchain.md). It is one of several controllable agents that run against the [ACP](/protocols/agent-client-protocol.md)/[AHP](/protocols/agent-host-protocol.md) wire/state ecosystem, and it pairs with the [Effect](/frameworks/effect.md) orchestration layer for typed pipelines.

## Durable signals from retrieved evidence

- A community Vercel-AI-SDK provider for OpenCode (`ai-sdk-provider-opencode-sdk`) documents almost full support for text generation, streaming (SSE), multi-turn session context, tool observation, reasoning parts, per-request model/agent selection (build, plan, general, explore), and abort; partial for image input and JSON-schema output; no custom client tools (server-side only).
- Docs list common model/provider wiring through the AI SDK (`@ai-sdk/openai`, `@ai-sdk/openai-compatible`) for many providers (OpenAI-compatible endpoints). The 2026-08-18 pull corrected the prior run's inference: `opencode.ai/docs/go` is **OpenCode Go**, a low-cost **paid subscription** ($5 first month, then $10/month) giving global access to popular open coding models — **not** a Go language SDK. Its provider table maps models (Grok 4.5, GPT 5.6 Luna, GLM-5.x, Kimi K3, DeepSeek V4, MiMo-V2.5) to AI-SDK packages (`@ai-sdk/openai`, `@ai-sdk/openai-compatible`). The 2026-08-17 pull also captured an **ecosystem catalogue** (`opencode.ai/docs/ecosystem`: `opencode-background-agents`, `opencode-notify`, `opencode-workspace` multi-agent orchestration harness, browser UI `octto`).
- A community integration note flags that Claude OAuth was removed from OpenCode in March 2026 (Anthropic legal action) and that the reliable path is the `@ai-sdk/openai-compatible` provider config — **watchlist**, single third-party source (headroomlabs-ai/headroom issue #78); note `ANTHROPIC_BASE_URL` env-var path construction differs across the Vercel AI SDK.
- A community REST API client (`anomalyco/opencode-sdk-js`) mirrors the OpenCode REST API for server-side TS/JS — evidence of ecosystem traction, watchlist. The 2026-08-27 pull adds its Python sibling, **`anomalyco/opencode-sdk-python`** (also Stainless-generated, sync + async via `httpx`, Python 3.8+), further evidence of third-party ecosystem traction — watchlist.
- **Ecosystem signal (watchlist, 2026-08-22):** the `anomalyco/opencode-sdk-js` repo documents that it is **generated with Stainless**, with the full generated API surface in `api.md` and streaming response support — a concrete third-party client maintained against the OpenCode REST API (re-confirmed usable as an alternative when a non-`createOpencode` client style is preferred; still third-party, not official).

## V2 SDK is Effect-native (2026-08-27, source-backed)

The 2026-08-27 pull surfaced a new v2 docs page — [`opencode.ai/v2/docs/build/sdk`](https://opencode.ai/v2/docs/build/sdk) — describing a **general-purpose, Effect-native SDK** for embedding OpenCode directly in an application:

- `@opencode-ai/sdk` **hosts OpenCode in-process**: it assembles the OpenCode server and routes API calls through its HTTP router **in memory** — no HTTP listener, no network hop between client and server.
- **`OpenCode.create()`** creates a scoped host; closing its Effect `Scope` releases the router, location services, fibers, and scoped plugin registrations. Example: `const opencode = yield OpenCode.create()` then `opencode.sessions.create({ location: Location.Ref.make({ directory: AbsolutePath.make("/workspace") }) })`.
- The **V2 SDK is beta**: install the preview with `bun add @opencode-ai/sdk@dev`; the API may change before a stable release.
- For non-Effect applications, the recommendation remains **run OpenCode as a server and use the TypeScript client** (the v1 network client above).

This is a durable cross-link to the [Effect](/frameworks/effect.md) orchestration layer: the SDK is explicitly **Effect-native**, so it *composes with the factory's durable-orchestration foundation* rather than being framework-agnostic. The factory's OpenCode option now splits into the general-purpose Effect-native V2 SDK versus the framework-agnostic v1 network client.

## 2026-08-29 re-pull (reconfirmation)

The 2026-08-29 pull re-confirmed the two SDK docs surfaces — the official v1 page (`opencode.ai/docs/sdk`: `createOpencode()` client, options table `baseUrl`/`fetch`/`parseAs`/`responseStyle`/`throwOnError`) and the V2 Effect-native page (`opencode.ai/v2/docs/build/sdk`: `@opencode-ai/sdk` hosts OpenCode in-process via its HTTP router; `OpenCode.create()`; beta install `bun add @opencode-ai/sdk@dev`) — plus the third-party **`anomalyco/opencode-sdk-python`** Python client (watchlist ecosystem signal). No new SDK release version or API surface appeared. The V2-vs-v1 split described above remains the current state.

## 2026-09-19 re-pull (reconfirmation + v1 current-state detail)

The 2026-09-19 pull re-confirmed the official v1 SDK docs surface (type-safe client; creating integrations; "control opencode programmatically") and the **`opencode.ai/docs/go`** page — **OpenCode Go**, the low-cost **paid subscription** ($5 first month, then $10/month) giving global access to popular open coding models (Grok 4.6, GPT 5.6 Luna, GLM-5.x, Kimi K2.x, LongCat-2.0, DeepSeek V4 Pro/Flash) — **not** a Go language SDK (corrected in the 2026-08-18 run, re-confirmed here). Two community ecosystem signals were surfaced: **`ai-sdk-provider-opencode-sdk`** (`ben-vargas`, a Vercel-AI-SDK provider for OpenCode whose v2.x supports **AI SDK v6** via the `@opencode-ai/sdk/v2` APIs, with `generateText()`/`streamText()`/`streamObject()`, native JSON-schema output, tool-approval flows, and file/source access) and the **`anomalyco/opencode-sdk-python`** client — both third-party, watchlist. No official SDK release-version change appeared; the V2-vs-v1 split stands.

## Confidence
- **Source-backed:** SDK identity, purpose, and `createOpencode`/`@opencode-ai/sdk` usage from the official docs; the V2 Effect-native SDK (`OpenCode.create()`, in-memory HTTP router, beta install) from the official `opencode.ai/v2/docs/build/sdk` page (2026-08-27); the OpenCode Go subscription identity re-confirmed 2026-09-19.
- **Watchlist:** the OAuth removal and community-provider feature matrix (`ai-sdk-provider-opencode-sdk`) are third-party reports, not confirmed from primary OpenCode sources.