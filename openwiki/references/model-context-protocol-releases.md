---
type: Reference
title: Model Context Protocol releases
description: Versioned revision history of the Model Context Protocol specification and Tier 1 SDK beta posture — revisions 2025-03-26, 2025-06-18, 2025-11-25 (RC 2025-11-15), and the current stateless 2026-07-28 revision, plus beta SDK versions for TypeScript, Go, and C#.
resource: https://github.com/modelcontextprotocol/modelcontextprotocol/releases
tags: [mcp, model-context-protocol, reference, releases, versions, sdk]
timestamp: 2026-08-17
---

# Model Context Protocol releases

Versioned information about the **Model Context Protocol** specification revisions and SDK adoption, extracted from the spec-repo releases page (`modelcontextprotocol/modelcontextprotocol`) and the official MCP blog. This is the releases/versions companion to the [MCP concept page](/protocols/model-context-protocol.md).

## Revision timeline

| Revision | Date | Type | Notes |
|---|---|---|---|
| 2025-03-26 | 2026-03-26 (release) | Initial revision | First spec revision of the protocol. |
| 2025-06-18 | 2025-06-18 | Revision | Second spec revision; changelog available in repo. |
| 2025-11-25-RC | 2025-11-15 | Release candidate | RC of the next revision (`@localden`, pre-release). |
| 2025-11-25 | 2025-11-25 | Stable revision | Stable release of the `2025-11-25` revision; was the current spec before 2026-07-28. Changelog in repo. |
| **2026-07-28** | **2026-07-28** | **Current revision** | **Stateless protocol core** — no handshake or sessions; **Multi Round-Trip Requests (MRTR)**; header-based routing; cacheable list results; authorization hardening; formal **extensions framework**; Tasks (SEP-1686); formal deprecation policy. RC announced 2026-05-21. |

> **Note:** the GitHub releases fragment retrieved shows 2025-03-26 … 2025-11-25-stable; the "latest release" claim in the Tavily `answer` ("2026.7.10") is the **servers** repository's release, not the spec repo. The 2026-07-28 revision is confirmed by the official blog post (2026-07-28) and referenced by the SDK beta post. The 2026-07-28 release tag format is blog-backed; the spec-repo releases page itself was not fully retrieved.

## Version negotiation (stable contract)

From the 2025-06-18 release notes (and repeated in later revisions): *"SDKs will adopt this version at their own pace, and the prior version of the spec may remain in use for an undetermined amount of time. The spec describes how clients and servers perform version negotiation with one another, permitting backwards and forwards compatibility."* So MCP clients and servers negotiate a protocol version at connection time; a client that knows only 2025-11-25 can still talk to a server serving 2026-07-28 (negotiated down per request).

## SDK beta posture for the 2026-07-28 revision

Serving the new stateless revision is an **explicit opt-in**:

- **TypeScript** — the streamable HTTP transport accepts revision `2026-07-28` **only when you set `StreamableHTTPOptions.Stateless = true`**; leave it unset and clients negotiate down to `2025-11-25`.
- **Go** — beta `github.com/modelcontextprotocol/go-sdk@v1.7.0-pre.1` (`go get`).
- **C#** — `ModelContextProtocol` packages released as **`2.0.0-preview.1`** (`dotnet add package ModelContextProtocol --prerelease`).
- **Swift** — release list observed through **0.12.1** (0.8.0 … 0.12.1; per-release dates not captured). The **0.11.0** changelog shows adoption of the 2025-11-25 spec plus: conformance tests (SEP-1730), icons and metadata support (SEP-973), elicitation updates (SEP-1034, SEP-1036, SEP-1330), a Server HTTP transport, and a fixed Network transport. **Not yet covered** by 0.11.0: experimental Task support (SEP-1686), sampling with tools (SEP-1577), auth updates (SEP-990, SEP-1046). It also added JSON-RPC batching, audio content in prompts/tool results, tool annotations, streamable-HTTP client transport, and client-sent `initialized` notifications (per the release notes fragment).

## Prior-revision feature stream (as tracked in the wiki)

- **2025-11-25** — stable revision covering the pre-stateless protocol surface: transports (stdio, streamable HTTP), tools/resources/prompts, sampling, the OAuth 2.1 authorization direction, and the start of the extension/SEP flow.
- **2026 roadmap (2026-03-09 blog)** — the revision-to-Working-Groups shift; Tasks (SEP-1686) lifecycle gaps (retry semantics, expiry policies), transport evolution/scalability, governance maturation (contributor ladder + Working Group delegation), enterprise readiness. See the [MCP page](/protocols/model-context-protocol.md#2026-roadmap-and-governance).
- **MCP Registry** (2025-09-08) — launched in preview as an open catalog/API for public MCP servers.

## Relationship to other release resources

- **[MCP Apps](/protocols/mcp-apps.md)** — extension spec snapshot `2026-01-26` (extension ID `io.modelcontextprotocol/ui`); adopted through the 2026-07-28 extensions framework. SDK adoption requests: `modelcontextprotocol/csharp-sdk` [#1431 (SEP-1865)](https://github.com/modelcontextprotocol/csharp-sdk/issues/1431), `modelcontextprotocol/java-sdk` [#780](https://github.com/modelcontextprotocol/java-sdk/issues/780).
- **[Agent Host Protocol releases](/references/agent-host-protocol-releases.md)** — the AHP spec's releases are independent; AHP relays MCP URIs/methods rather than the MCP spec revisions. The wiki's earlier AHP/ACP release references remain unchanged by this run.

## Source Map

- [Web-search Agent integration protocols source evidence](/sources/web-search-agent-integration-protocols.md) — raw queries and reliability caveats.
- Canonical spec-repo releases: <https://github.com/modelcontextprotocol/modelcontextprotocol/releases>
- Blog: [The 2026-07-28 Specification](https://blog.modelcontextprotocol.io/posts/2026-07-28), [RC](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate), [SDK betas](https://blog.modelcontextprotocol.io/posts/sdk-betas-2026-07-28)