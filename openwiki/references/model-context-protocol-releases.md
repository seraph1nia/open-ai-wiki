---
type: Reference
title: Model Context Protocol releases
description: Versioned revision history of the Model Context Protocol specification and Tier 1 SDK posture — revisions 2025-03-26, 2025-06-18, 2025-11-25 (RC 2025-11-15), and the current stateless 2026-07-28 revision, plus the Java SDK v2.0.0 GA (tracking 2025-11-25), the TypeScript SDK v2.0.0 monorepo split, beta SDK versions for Go and C#, and companion-repo release trails (servers, swift-sdk, mcpb, registry).
resource: https://github.com/modelcontextprotocol/modelcontextprotocol/releases
tags: [mcp, model-context-protocol, reference, releases, versions, sdk]
timestamp: 2026-08-22
---

# Model Context Protocol releases

Versioned information about the **Model Context Protocol** specification revisions and SDK adoption, extracted from the spec-repo releases page (`modelcontextprotocol/modelcontextprotocol`) and the official MCP blog. This is the releases/versions companion to the [MCP concept page](/protocols/model-context-protocol.md).

## Revision timeline

| Revision | Date | Type | Notes |
|---|---|---|---|
| 2025-03-26 | 2026-03-26 (release) | Initial revision | First spec revision of the protocol. |
| 2025-06-18 | 2025-06-18 | Revision | Second spec revision; changelog available in repo. |
| 2025-11-25-RC | 2025-11-15 | Release candidate | RC of the next revision (`@localden`, pre-release). |
| 2025-11-25 | 2025-11-25 | Stable revision | Stable release of the `2025-11-25` revision; was the current spec before 2026-07-28. Introduced experimental core Tasks (SEP-1686; states `working`/`input_required`/`completed`/`failed`/`cancelled`), CIMD URL-based client registration (SEP-991), the extensions concept (optional/additive/composable/independently versioned), security features (SEP-1024, SEP-835), and the enterprise-registry vision. Changelog in repo. |
| **2026-07-28** | **2026-07-28** | **Current revision** | **Stateless protocol core** — no handshake or sessions (`initialize`/`initialized`, `Mcp-Session-Id` retired; optional `server/discover` RPC); **Multi Round-Trip Requests (MRTR)** (`input_required`/`inputResponses`, SEP-2322); header-based routing (`Mcp-Method`/`Mcp-Name`, SEP-2243); cacheable list results (`ttlMs`/`cacheScope`, SEP-2549); **full JSON Schema 2020-12 for tool schemas** (SEP-2106) and the `-32002`→`-32602` error-code change (SEP-2164); authorization hardening (RFC 9207 `iss`, `application_type`, issuer-bound credentials; **DCR formally deprecated in favor of CIMD**); formal **extensions framework** with Tasks moved to the `io.modelcontextprotocol/tasks` extension (SEP-2663); Roots/Sampling/Logging + HTTP+SSE transport deprecated with a 12-month minimum window (SEP-2577); **feature lifecycle policy** (_Active → Deprecated → Removed_, ≥12 months) and **conformance-suite gating** for Standards Track SEPs (SEP-2484) under the SDK tier system (PR 1777). RC announced 2026-05-21; RC-to-final was a ten-week validation window. |

> **Note:** the GitHub spec-repo releases fragment retrieved (runs 1–3) shows 2025-03-26 … 2025-11-25-stable; the "latest release" claim in the Tavily `answer` ("2026.7.10") is the **servers** repository's release, not the spec repo. The 2026-07-28 revision is confirmed by the official blog post (2026-07-28) and referenced by the SDK beta post. The 2026-07-28 release tag format is blog-backed; the spec-repo releases page itself was not fully retrieved (the 2026-08-22 fragment re-confirmed the 2025-03-26 initial revision and version-negotiation quote).

## Version negotiation (stable contract)

From the 2025-06-18 release notes (and repeated in later revisions): *"SDKs will adopt this version at their own pace, and the prior version of the spec may remain in use for an undetermined amount of time. The spec describes how clients and servers perform version negotiation with one another, permitting backwards and forwards compatibility."* So MCP clients and servers negotiate a protocol version at connection time; a client that knows only 2025-11-25 can still talk to a server serving 2026-07-28 (negotiated down per request).

## SDK posture for the 2026-07-28 revision

Per the [2026-07-28 announcement](https://blog.modelcontextprotocol.io/posts/2026-07-28), **all four Tier 1 SDKs (TypeScript, Python, Go, C#) speak `2026-07-28` as of the release**, with migration notes for the breaking bits (notably for developers who depended on session identifiers); the **Rust SDK** supports the new spec in **beta**. The pre-GA beta trail observed earlier:

- **TypeScript** — the streamable HTTP transport accepts revision `2026-07-28` **only when you set `StreamableHTTPOptions.Stateless = true`**; leave it unset and clients negotiate down to `2025-11-25`. The 2026-08-18 re-pull added the **v2.0.0 monorepo split**: `@modelcontextprotocol/core`, `client`, `server`, `node`, `hono`, `fastify`, `express`, `server-legacy`, and `codemod` all released at **2.0.0** (2026-07-27, following the 1.30.0 release) — the client-server split behind mcp-use's reported ~83% package-size cut.
- **Go** — beta `github.com/modelcontextprotocol/go-sdk@v1.7.0-pre.1` (`go get`) observed pre-release; the announcement lists Go among the Tier 1 SDKs updated to match.
- **Java** — the **Java SDK v2.0.0 GA** release (first major since 1.x, after milestones M1–M3 and RC1; full changelog v1.1.0…v2.0.0) tracks the **2025-11-25** MCP specification, not yet 2026-07-28. Surface observed on the releases-page fragment: breaking changes (`JsonSchema`/`Map`/`inputSchema` handling), new `meta` support, `Builder.customizeRequest()` / `httpRequestCustomizer()` transport hooks and an `McpHttpClientAuthorizationErrorHandler`, logging updates, `McpStatelessSyncServer#closeGracefully`, and `Resource`/`ResourceTemplate` fixes. A v2 migration guide is published in the repo. Earlier 1.x-line security fix: **v0.18.3** addressed advisory **GHSA-hv2w-8mjj-jw22**. The **MCP Apps gap persists** past v2.0.0 — see the [MCP Apps page](/protocols/mcp-apps.md). Watchlist: the v2.0.0 release line was captured from the releases-page fragment (2026-08-22 re-pull), dates and supporting documentation not fully fetched.
- **C#** — `ModelContextProtocol` packages released as **`2.0.0-preview.1`** (`dotnet add package ModelContextProtocol --prerelease`) observed pre-release; listed among the Tier 1 SDKs updated.
- **Swift** — release list observed through **0.12.1** (0.8.0 … 0.12.1; per-release dates not captured). The **0.11.0** changelog shows adoption of the 2025-11-25 spec plus: conformance tests (SEP-1730), icons and metadata support (SEP-973), elicitation updates (SEP-1034, SEP-1036, SEP-1330), a Server HTTP transport, and a fixed Network transport. **Not yet covered** by 0.11.0: experimental Task support (SEP-1686), sampling with tools (SEP-1577), auth updates (SEP-990, SEP-1046). It also added JSON-RPC batching, audio content in prompts/tool results, tool annotations, streamable-HTTP client transport, and client-sent `initialized` notifications (per the release notes fragment).

## Companion repositories

Release trails of MCP's companion repositories that surfaced in the Tavily page fetches (kept here so the "latest version" claims are attributed to the right repo):

- **`modelcontextprotocol/servers`** — reference server packages (`server-filesystem`, `server-time`, `server-fetch`, `server-git`, `server-everything`, `server-memory`, `server-sequential-thinking`); latest observed **2026.7.10** (2026-07-10). This is the number the 2026-08-17 run's Tavily `answer` mislabeled as the "MCP spec release".
- **`modelcontextprotocol/typescript-sdk`** — see [SDK posture](#sdk-posture-for-the-2026-07-28-revision): **v2.0.0** monorepo packages (2026-07-27) following **1.30.0**.
- **`modelcontextprotocol/swift-sdk`** — see [SDK posture](#sdk-posture-for-the-2026-07-28-revision): 0.8.0 … **0.12.1**.
- **`modelcontextprotocol/mcpb`** — MCP packaging/registry companion (2.1k stars, 207 forks): release list **v2.1.2** (latest observed), **v2.1.0** adds experimental UV runtime support in manifest v0.4 and removes `_meta` from manifest v0.1; CI JSON-schema validation added in v1.1.5. Watchlist: single release-page fragment, role within the MCP packaging story not yet fully mapped.
- **`modelcontextprotocol/registry`** — the open-source implementation of the **MCP Registry** service (Go, ~7.2k stars / 947 forks, 686 commits, permissively licensed): hosts the official service at <https://registry.modelcontextprotocol.io>, ships the parent OpenAPI specification (`docs/reference/api/official-registry-api.md`) so anyone can build a compatible sub-registry, and is maintained by a registry working group with community-driven moderation. See the [MCP Registry section](/protocols/model-context-protocol.md#registry).

## Prior-revision feature stream (as tracked in the wiki)

- **2025-11-25** — stable revision covering the pre-stateless protocol surface: transports (stdio, streamable HTTP), tools/resources/prompts, sampling, the OAuth 2.1 authorization direction (with CIMD URL-based client registration from SEP-991), experimental core Tasks, the extension concept, and the start of the extension/SEP flow. See the [MCP page's prior-revision section](/protocols/model-context-protocol.md#the-2025-11-25-revision-prior-stable-first-anniversary).
- **2026 roadmap (2026-03-09 blog)** — the revision-to-Working-Groups shift; Tasks (SEP-1686) lifecycle gaps (retry semantics, expiry policies), transport evolution/scalability, governance maturation (contributor ladder + Working Group delegation), enterprise readiness. See the [MCP page](/protocols/model-context-protocol.md#2026-roadmap-and-governance).
- **MCP Registry** (2025-09-08) — launched in preview as an open catalog/API for public MCP servers.

## Relationship to other release resources

- **[MCP Apps](/protocols/mcp-apps.md)** — extension spec snapshot `2026-01-26` (extension ID `io.modelcontextprotocol/ui`); adopted through the 2026-07-28 extensions framework. SDK adoption requests: `modelcontextprotocol/csharp-sdk` [#1431 (SEP-1865)](https://github.com/modelcontextprotocol/csharp-sdk/issues/1431), `modelcontextprotocol/java-sdk` [#780](https://github.com/modelcontextprotocol/java-sdk/issues/780).
- **[Agent Host Protocol releases](/references/agent-host-protocol-releases.md)** — the AHP spec's releases are independent; AHP relays MCP URIs/methods rather than the MCP spec revisions. The wiki's earlier AHP/ACP release references remain unchanged by this run.

## Source Map

- [Web-search Agent integration protocols source evidence](/sources/web-search-agent-integration-protocols.md) — raw queries and reliability caveats (2026-08-17, 2026-08-18, and 2026-08-22 runs).
- Canonical spec-repo releases: <https://github.com/modelcontextprotocol/modelcontextprotocol/releases>
- Blog: [The 2026-07-28 Specification](https://blog.modelcontextprotocol.io/posts/2026-07-28), [RC](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate), [SDK betas](https://blog.modelcontextprotocol.io/posts/sdk-betas-2026-07-28), [One Year of MCP (2025-11-25)](https://blog.modelcontextprotocol.io/posts/2025-11-25-first-mcp-anniversary)