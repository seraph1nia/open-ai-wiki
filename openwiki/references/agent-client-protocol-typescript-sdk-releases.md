---
type: Reference
title: ACP TypeScript SDK Releases
description: Durable reference to the agentclientprotocol/typescript-sdk GitHub releases resource for the Agent Client Protocol, mapping the release history and current-version features of the @agentclientprotocol/sdk package through v1.3.0.
resource: https://github.com/agentclientprotocol/typescript-sdk/releases
tags: [agent-client-protocol, acp, reference, releases, changelog, typescript-sdk]
timestamp: 2026-08-15
---

# ACP TypeScript SDK Releases

Reference for the official TypeScript implementation of the [Agent Client Protocol](/protocols/agent-client-protocol.md): `@agentclientprotocol/sdk`. The change resource is <https://github.com/agentclientprotocol/typescript-sdk/releases>.

The SDK tracks the **ACP JSON Schema** (the canonical spec) and, separately, the SDK's own app-style API. SemVer `MAJOR.MINOR.PATCH` tags range from `v0.4.7` (first publish) through **`v1.3.0`** (2026-07-21); **47 non-prerelease, non-draft releases** at ingest time. Grounding evidence and coverage notes are on the [source evidence](/sources/github-acp-typescript-sdk.md) page.

## Release milestone timeline

| Version | Published | Durable highlights |
|---|---|---|
| v1.3.0 | 2026-07-21 | **Experimental ACP v2 API** added; schema updated to **v1.20.0** and **v2.0.0-alpha.2**. |
| v1.2.x | 2026-07-06/07 | Schema to **v1.19.0**; deterministic SSE close/response delivery; NDJSON receive path made linear in message size; JSON-RPC request validation unified across transports; extensible-union semantics preserved in TS schemas. |
| v1.1.0 | 2026-06-29 | Request ids exposed in handler contexts (`ctx`). |
| v1.0.0 | 2026-06-24 | **First stable release**; schema **v1.16.0**. |
| v0.29.0 | 2026-06-22 | **Request cancellation** support (unstable). |
| v0.27.0 | 2026-06-18 | **App-style SDK rewrite** (`acp.agent(...)`/`acp.client(...)`, handlers with `ctx`); experimental Streamable HTTP and WebSocket transports; old interfaces deprecated. |
| v0.25.0 | 2026-06-05 | `deleteSession` stabilized; stable schema deserialization added. |
| v0.24.0 | 2026-06-02 | **Resilient schema deserialization**; added-directories stabilized, unstable model selectors removed. |
| v0.23.0 | 2026-06-01 | `logout` stabilized; schema v0.13.4. |
| v0.22.0 | 2026-05-18 | Session delete handling; schema v0.13.2. |
| v0.21.0 | 2026-04-28 | `providers/*` support (unstable). |
| v0.20.0 | 2026-04-23 | `closeSession` and `resumeSession` stabilized. |
| v0.19.x | 2026-04-21 | Spurious `unhandledRejection` on transport failure fixed; NDJSON decoder flushed at stream end. |
| v0.18.0 | 2026-04-01 | Initial `additionalDirectories` and Native Extras (NES) support (unstable). |
| v0.17.0 | 2026-03-25 | Schema 0.11.3. |
| v0.16.0 | 2026-03-10 | `session/close` (unstable); `listSessions` stabilized. |
| v0.14.0 | 2026-02-04 | Session Config Options stabilized. |

SemVer-patch releases (v0.25.1, v0.22.1, etc.) carry bug fixes. Earlier releases (v0.4.7 → v0.13.1) were mostly schema-sync bumps (0.8.0 → 0.10.6) plus early unstable features such as `resumeSession` (v0.11.0) and `listSessions` (v0.12.0).

## Current headline features (v1.3.0)

- **Experimental ACP v2** behind `@agentclientprotocol/sdk/experimental/v2`, tracking schema **v1.20.0** and draft **v2.0.0-alpha.2**. The stable entry point remains ACP v1.
- **Streamable HTTP and WebSocket transports** (introduced experimentally at v0.27.0) alongside the NDJSON network stream codec.
- **Request cancellation** (unstable, v0.29.0): clients can cancel in-flight requests.

## Design and API evolution

Two design decisions recur across the change log:

1. **Capability gating.** Protocol methods ship as *unstable* and are promoted to stable once validated (e.g. `listSessions`, `deleteSession`, `closeSession`, `resumeSession`, `logout`, Session Config Options, `providers/*`). Implementations mark the same features at the schema level.
2. **Deterministic transport semantics.** Repeated fixes target spurious rejections, event ordering, NDJSON decoding, and SSE/response delivery — the SDK treats transport edge cases as correctness issues, not asides.

### The v0.27.0 app design

The largest intentional change replaced the interface-based `Agent`/`Client` types with an app-style builder. Protocol types are unchanged; only wiring differs:

- Old: implement `acp.Agent`/`acp.Client`, pass through a factory to `new AgentSideConnection(...)`/`new ClientSideConnection(...)`.
- New: `acp.agent({ name })`/`acp.client({ name })`, register typed handlers, then `connect(stream)` / `connectWith(stream, async (ctx) => ...)`.
- Handlers receive one `ctx`: `ctx.params` for inbound data, `ctx.client`/`ctx.agent` for outbound calls, and request ids (v1.1.0+).
- `connect(...)` keeps the connection independently open; `connectWith(...)` scopes the connection to one workflow and owns its lifetime.

## Status notes

- **Confidence:** confirmed for release versions, dates, and event categories (directly from the GitHub releases API); source-backed for the SDK design narrative (README + migration guide, single high-quality source).
- The SDK is under active development (schema v1.x with a draft v2), so feature stability can shift between releases.

## Source Map
- [Agent Client Protocol](/protocols/agent-client-protocol.md) — canonical ACP concept.
- [GitHub source evidence](/sources/github-acp-typescript-sdk.md) — the raw evidence behind this page.