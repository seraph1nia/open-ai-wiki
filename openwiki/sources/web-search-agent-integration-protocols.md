---
type: Source Evidence
title: Web-search Agent integration protocols source evidence
description: Ingestion and coverage notes for the 2026-08-17 web-search-agent-integration-protocols run (3 Tavily queries) over the Model Context Protocol blog, the modelcontextprotocol spec-repo releases page, and the ext-apps (MCP Apps) repository — the durable MCP core, releases, and extensions facts adopted plus reliability caveats.
resource: https://github.com/modelcontextprotocol/modelcontextprotocol/releases
tags: [web-search, source, evidence, mcp, model-context-protocol, agent-integration, releases, extensions]
timestamp: 2026-08-17
---

# Web-search Agent integration protocols — source evidence

This page records the 2026-08-17 web-search ingestion for the `web-search-agent-integration-protocols` source instance (Agent integration protocols) and grounds the wiki's MCP pages. It is an evidence index, not the synthesis layer — durable facts live on the [MCP protocol page](/protocols/model-context-protocol.md) and the [MCP releases reference](/references/model-context-protocol-releases.md).

## Run facts

- **Instance:** `web-search-agent-integration-protocols` (Agent integration protocols)
- **Fetched:** 2026-08-17T22:41:58Z (Tavily, `advanced` depth, 3 queries × 5 max results; timeRange `year`; windowHours 24)
- **Raw data:** `2026-08-17T22-41-47-604Z/web-search-results.json` (3 result objects, up to 5 hits each)

## Queries and outcomes

| Query | Relevant hits → wiki mappings |
|---|---|
| `https://blog.modelcontextprotocol.io/posts/` | **Evolving OAuth Client Registration (2025-08-22)** → [MCP authorization](/protocols/model-context-protocol.md#authorization-oauth-21) (OAuth 2.1; DCR issues — unbounded DB growth, client-expiry black hole, portability; keep DCR, recommend CIMD; software statements; SSRF protections); **The 2026-07-28 Specification (2026-07-28)** → [MCP 2026-07-28 revision](/protocols/model-context-protocol.md#the-2026-07-28-revision-stateless-core) + [releases ref](/references/model-context-protocol-releases.md); **2026 MCP Roadmap (2026-03-09)** → [MCP roadmap/governance](/protocols/model-context-protocol.md#2026-roadmap-and-governance) (Working Groups, contributor ladder, SEP delegation; Tasks SEP-1686 lifecycle gaps); **2026-07-28 Spec Release Candidate (2026-05-21)** → releases ref (stateless core, extensions framework, Tasks, MCP Apps, authorization hardening, deprecation policy); **Introducing the MCP Registry (2025-09-08)** → [MCP Registry](/protocols/model-context-protocol.md#registry) |
| `https://github.com/modelcontextprotocol/modelcontextprotocol/releases` | **Releases page fragment** → [MCP releases reference](/references/model-context-protocol-releases.md) (2025-03-26, 2025-06-18, 2025-11-25-RC, 2025-11-25 stable; version-negotiation quote); **Releases · modelcontextprotocol/servers** (2026.7.10 etc.) → excluded (companion servers repo, not the spec repo; noted in the `answer` caveat); **Releases · modelcontextprotocol/swift-sdk** (0.8.0–0.12.1; 0.11.0 changelog) → [releases ref](/references/model-context-protocol-releases.md) (Swift SDK beta posture); **Beta SDKs for the 2026-07-28 MCP Spec RC** → [releases ref](/references/model-context-protocol-releases.md#sdk-beta-posture-for-the-2026-07-28-revision) (TS `StreamableHTTPOptions.Stateless`, Go `v1.7.0-pre.1`, C# `2.0.0-preview.1`) |
| `https://github.com/modelcontextprotocol/ext-apps` | **overview.md** (4-phase UI lifecycle: discovery → initialization → data delivery → interactive; `content` vs `structuredContent` split) → [MCP Apps](/protocols/mcp-apps.md); **apps.mdx 2026-01-26 fragment** (CSP mapping, deviceCapabilities, safeAreaInsets) → MCP Apps; **agent-skills.md** (4 skills; Claude Code plugin / Vercel Skills CLI install) → MCP Apps; **csharp-sdk #1431 (SEP-1865) + java-sdk #780 (MCP Apps support gap)** → MCP Apps adoption status |

## Durable facts adopted (condensed)

- The **2026-07-28 MCP specification** is the current revision: stateless core (no handshake/sessions), MRTR, header-based routing, cacheable list results, authorization hardening, formal extensions framework, Tasks (SEP-1686), deprecations, and a formal deprecation policy; RC was 2026-05-21.
- **MCP authorization** is OAuth 2.1-based; **CIMD recommended over DCR** for new implementations (DCR kept for backward compat), software statements optional for `localhost`-impersonation trust, with SSRF protections for authorization servers making outbound requests.
- **MCP Registry** launched in preview (2025-09-08) as an open catalog/API for public MCP servers.
- **2026 roadmap**: releases → Working Groups; priority areas transport evolution/scalability, agent communication (Tasks lifecycle gaps), governance maturation (contributor ladder, delegation), enterprise readiness.
- **SDK beta posture** for the stateless revision: TS opt-in `StreamableHTTPOptions.Stateless`, Go `v1.7.0-pre.1`, C# `2.0.0-preview.1`; Swift through 0.12.1 with 0.11.0 covering 2025-11-25 conformance + SEP-973/1034/1036/1330 but not Tasks/sampling-with-tools/auth.
- **MCP Apps extension detail added**: 4-phase UI lifecycle (discovery, initialization, data delivery, interactive), `content` vs `structuredContent` separation, Python SDK (`mcp`) alongside TS, Java SDK support **missing** as of v0.17.2 (issue #780) — confirming and extending the existing MCP Apps page.

## Reliability warnings

- The Tavily `answer` for the releases query — *"The latest Model Context Protocol release is 2026.7.10. The latest SDK version is 0.12.1."* — **mixes repositories**: `2026.7.10` is the **servers** repo release (packages `server-filesystem`, `server-time`, `server-fetch`, `server-git`), **not** the spec repo; `0.12.1` is the **swift-sdk** release. Attributed precisely on the [releases reference](/references/model-context-protocol-releases.md), not adopted as "latest spec version".
- The releases-page fragment only showed the 2025-03-26 … 2025-11-25-stable range; the 2026-07-28 "release" is blog-backed (and the blog's `2026-07-28` post is the authoritative announcement). The exact GitHub release tag format for 2026-07-28 was not retrieved.
- `published_date` was empty for all hits; in-post dates (e.g. "July 28, 2026", "March 9, 2026", "August 22, 2025", "September 8, 2025") were used instead.
- The **MCP Apps** query returned the same official pages already synthesized in the generative-UI run; the new durable deltas were the 4-phase flow, `structuredContent`, and the Java SDK gap (issue #780, v0.17.2). Nothing contradicted the existing MCP Apps page.
- The blog query surfaced **only official MCP blog posts** (no off-topic hits) — clean run for query 0; queries 1–2 surfaced several companion-repo pages that were kept only where they contributed (swift-sdk 0.11.0 changelog, ext-apps issues).

## Mapping to wiki pages

- **New:** [Model Context Protocol](/protocols/model-context-protocol.md) (canonical MCP core concept) and [MCP releases reference](/references/model-context-protocol-releases.md) (versioned revision + SDK posture).
- **Updated:** [MCP Apps](/protocols/mcp-apps.md) (4-phase lifecycle, `structuredContent`, Python SDK, Java SDK gap, canonical MCP link), [AHP](/protocols/agent-host-protocol.md) (`mcp://` section links the canonical MCP page; stateless-core note), [AG-UI](/protocols/ag-ui.md), [A2UI](/protocols/a2ui.md), [generative-UI ecosystem](/concepts/generative-ui-ecosystem.md), [factory-toolchain](/concepts/factory-toolchain.md) (cross-links to the new canonical MCP page), plus [themes](/themes.md), [quickstart](/quickstart.md), and directory indexes.
- **Not changed:** AHP/ACP protocol pages' release content (independent of MCP revisions), Pierre/t3code/Effect/OpenCode/Pi, and the generative-UI/protocol evidence that this run only re-confirmed.
- **Open questions:** none new — the MCP pages are now current; SDK beta details are tracked as watchlist on the releases reference rather than as open questions.

## Confidence and gaps

- **Confirmed:** run metadata, query set, and per-query result URLs (directly from the raw file); the 2026-07-28 revision itself (official blog announcement).
- **Source-backed:** OAuth/CIMD direction, registry preview, roadmap/Working-Group plan, SDK beta posture, MCP Apps 4-phase flow and Java SDK gap (each from the official blog/repo/issue).
- **Watchlist:** exact spec-repo release tag/date for 2026-07-28 (fragment boundary), Swift SDK per-release dates, SDK beta versions (they will move as GA ships), and the experimental Tasks lifecycle iteration (roadmap promise, not yet shipped).
- **Gap:** the spec-repo releases page itself was not fully retrieved (fragment only); direct GitHub release-page fetch of `modelcontextprotocol/modelcontextprotocol/releases` would confirm the 2026-07-28 tag format and any deprecation list details. The full 2026-07-28 spec text (transports, MRTR wire details, tasks spec) is beyond these snippets; the canonical spec site is the source to pull next if a deeper protocol reference is wanted.