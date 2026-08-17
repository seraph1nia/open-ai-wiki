---
type: Reference
title: OpenCode
description: OpenCode is an open-source AI coding agent available as a terminal UI, desktop app, or IDE extension, with a type-safe JavaScript/TypeScript SDK (@opencode-ai/sdk) for building integrations and controlling the opencode server programmatically.
resource: https://opencode.ai/docs/sdk/
tags: [opencode, sdk, coding-agent, typescript, ai-agents]
timestamp: 2026-08-17
---

# OpenCode

**OpenCode** is an open-source AI coding agent available as a **terminal UI (TUI), desktop application, or IDE extension**. Its programmatic surface is the **OpenCode SDK** — a *type-safe JS/TS client for the opencode server* used to "build integrations and control opencode programmatically".

Source: [`opencode.ai/docs/sdk`](https://opencode.ai/docs/sdk). Evidence for this page lives on the [web-search Factory tools source page](/sources/web-search-factory-tools.md).

## The SDK

- Install: `npm install @opencode-ai/sdk`.
- Create a client: `import { createOpencode } from "@opencode-ai/sdk"` then `const { client } = await createOpencode()` — this starts both a server and a client.
- Client options (official docs table): `baseUrl` (server URL; default empty), `fetch` (custom fetch, default `globalThis.fetch`), `parseAs` (`auto`), `responseStyle` (`data` | `fields`, default `fields`), `throwOnError` (default `false`).
- Types are exported for the API surface: `import type { Session, Message, Part } from "@opencode-ai/sdk"`.
- The session API is typed: `session.list()`, `session.get({ path })`, `session.children({ path })`, `session.create({ body })`, `session.update({ path, body })`, `session.init({ path, body })` (AGENTS.md init), `session.abort({ path })`, `session.share({ path })` / `unshare`, `session.summarize({ path, body })`, `session.messages({ path })` returning `{ info: Message, parts: Part[] }[]`, `session.message({ path })`, and `session.prompt({ path, body })` with `noReply` support.

## Position in the factory toolchain

OpenCode is one of the coding agents the [t3code](/frameworks/t3code.md) harness can control, and its SDK is a programmable route into the [agentic SDLC factory toolchain](/concepts/factory-toolchain.md). It is one of several controllable agents that run against the [ACP](/protocols/agent-client-protocol.md)/[AHP](/protocols/agent-host-protocol.md) wire/state ecosystem, and it pairs with the [Effect](/frameworks/effect.md) orchestration layer for typed pipelines.

## Durable signals from retrieved evidence

- A community Vercel-AI-SDK provider for OpenCode (`ai-sdk-provider-opencode-sdk`) documents almost full support for text generation, streaming (SSE), multi-turn session context, tool observation, reasoning parts, per-request model/agent selection (build, plan, general, explore), and abort; partial for image input and JSON-schema output; no custom client tools (server-side only).
- Docs list common model/provider wiring through the AI SDK (`@ai-sdk/openai`, `@ai-sdk/openai-compatible`) for many providers (OpenAI-compatible endpoints). The 2026-08-17 pull captured the official **Go SDK** (`opencode.ai/docs/go`) model/provider table (e.g. Grok 4.5, GPT 5.6 Luna, GLM-5.x, Kimi K3 via `@ai-sdk/openai` / `@ai-sdk/openai-compatible`) and an **ecosystem catalogue** (`opencode.ai/docs/ecosystem`: `opencode-background-agents`, `opencode-notify`, `opencode-workspace` multi-agent orchestration harness, browser UI `octto`).
- A community integration note flags that Claude OAuth was removed from OpenCode in March 2026 (Anthropic legal action) and that the reliable path is the `@ai-sdk/openai-compatible` provider config — **watchlist**, single third-party source (headroomlabs-ai/headroom issue #78); note `ANTHROPIC_BASE_URL` env-var path construction differs across the Vercel AI SDK.
- A community REST API client (`anomalyco/opencode-sdk-js`) mirrors the OpenCode REST API for server-side TS/JS — evidence of ecosystem traction, watchlist.

## Confidence
- **Source-backed:** SDK identity, purpose, and `createOpencode`/`@opencode-ai/sdk` usage from the official docs.
- **Watchlist:** the OAuth removal and community-provider feature matrix are third-party reports, not confirmed from primary OpenCode sources.