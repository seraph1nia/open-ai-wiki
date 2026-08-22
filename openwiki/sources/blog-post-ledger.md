---
type: Source Evidence
title: Blog post ingestion ledger
description: Cumulative, append-only record of blog posts already ingested into this wiki (Zed, Solo.io, Mastra, gh-aw), used to keep blog ingestion idempotent — posts listed here are never fetched, summarized, or adopted again.
resource: https://zed.dev/blog
tags: [source, evidence, ledger, blog, deduplication, factory-tools]
timestamp: 2026-08-22
---

# Blog post ingestion ledger

This page is the **memory of which blog posts have already been ingested**. Unlike the per-run source evidence pages, it is cumulative and append-only: it spans every run, and it is the only thing that keeps blog ingestion from re-reading the same post on every schedule tick.

It carries no synthesis. Durable ideas taken from these posts live on the concept pages, primarily the [agentic SDLC factory toolchain hub](/concepts/factory-toolchain.md) and the tool pages it links.

## Tracked feeds

| Feed | Index URL | Source instance | Why it is followed |
|---|---|---|---|
| Zed | https://zed.dev/blog | `web-search-factory-tools` | Editor and agent-harness design, the ACP side of the factory, performance and collaboration architecture. |
| Solo.io | https://www.solo.io/blog | `web-search-factory-tools` | Gateway, mesh, and agent-infrastructure layer — how agent traffic, tools, and MCP endpoints are routed and governed. |
| Mastra | https://mastra.ai/blog | `web-search-factory-tools` | Agent runtime, workflows, memory, and evaluation; also the agentic-UI overlap with the [generative-UI ecosystem](/concepts/generative-ui-ecosystem.md). |
| GitHub Agentic Workflows (gh-aw) | https://github.github.com/gh-aw/blog | `web-search-factory-tools` | CI-native agentic workflows — running agents as GitHub Actions, their trigger, permission, and safe-output model. |

### Living index pages (not ledgered)

The [gh-aw workflow gallery](https://github.github.com/gh-aw/index.html#gallery) is a **catalogue, not a post feed**: its entries have no publication date or stable per-post identity, so it is exempt from the ledger and is re-read on every run. Handle it by diffing against what the wiki already documents — adopt only entries that are new or materially changed, and leave the wiki unchanged when the catalogue has not moved. Do not add gallery entries as ledger rows; a row here always means one dated blog post.

## How to use this ledger

1. **Before synthesizing** anything from a blog feed, read the ledger table below.
2. **Skip every post whose canonical URL already appears there.** Do not refetch it, do not re-summarize it, do not re-adopt its claims, and do not restate it in the run's evidence page. A row means the post is closed.
3. **Consider only unlisted posts.** Judge each one for durable technical content and fold that content into the existing canonical concepts; create a new page only for a genuinely new idea, not for a release or product announcement.
4. **After the run, append one row per post you considered** — including posts that produced no wiki change, which are recorded with `none`. Recording the empty ones is the point: it stops the next run from re-examining them.
5. **Never delete or rewrite existing rows.** If a post's content demonstrably changed, update that post's existing row (note the re-read in *Wiki pages changed*) rather than adding a second row for the same URL.

Match on the canonical post URL, ignoring trailing slashes, query strings, and tracking parameters, so the same post arriving from a different search result is still recognized as already ingested.

## Ingested posts

Append-only. Newest first.

| Post URL | Feed | Published | Ingested | Wiki pages changed |
|---|---|---|---|---|
| https://www.solo.io/blog/solo-contributes-agentgateway-linux-foundation | Solo.io | 2026-08-22* | 2026-08-22 | [factory hub](/concepts/factory-toolchain.md) — official agentgateway Linux Foundation donation post (donation anchor), kmcp teaser (watchlist) |
| https://zed.dev/blog/sandboxing | Zed | 2026-08-22* | 2026-08-22 | none — body not retrieved; sandboxing noted conceptually on the [factory hub](/concepts/factory-toolchain.md) |
| https://mastra.ai/blog/copilotkitmastra | Mastra | 2025-09-18 | 2026-08-18 | [Mastra agentic-UI](/frameworks/mastra-agentic-ui.md) — `create-ag-ui-app --mastra` starter (Mastra backend + CopilotKit/AG-UI frontend); [CopilotKit](/frameworks/copilotkit.md) — Mastra guide cross-link |
| https://mastra.ai/blog/introducing-mastra-improved-agent-orchestration-ai-sdk-v5-support | Mastra | 2026-08-26 | 2026-08-18 | [Mastra agentic-UI](/frameworks/mastra-agentic-ui.md) — AI SDK v5 agent-loop orchestration + nested streaming; [factory hub](/concepts/factory-toolchain.md) |
| https://www.solo.io/blog/agentgateway-mcp-authentication-multi-provider-ai | Solo.io | 2026-03-12 | 2026-08-18 | [factory hub](/concepts/factory-toolchain.md) — Solo Enterprise for agentgateway 2.2 (hosted-MCP auth) |
| https://www.solo.io/blog/kagent-enterprise | Solo.io | 2025-09-15 | 2026-08-18 | [factory hub](/concepts/factory-toolchain.md) — context-aware Kubernetes (kagent) |
| https://github.com/githubnext/gh-aw-workshop | gh-aw | n/a (repo entry) | 2026-08-18 | none — workshop repo entry, part of the living gh-aw catalogue |
| https://zed.dev/blog/sequoia-backs-zed | Zed | 2026-08-17 | 2026-08-17 | none (company/funding announcement; no new durable concept) |
| https://zed.dev/blog/not-building-ai-for-the-money | Zed | 2026-08-17 | 2026-08-17 | none — DeltaDB (character-level sync engine) noted as watchlist/saved-context on the [factory hub](/concepts/factory-toolchain.md) |
| https://zed.dev/blog/terms-update | Zed | 2026-03-02 | 2026-08-17 | none |
| https://zed.dev/blog/student-plan | Zed | 2026-08-17 | 2026-08-17 | none |
| https://zed.dev/blog/dev-containers | Zed | 2026-08-17 | 2026-08-17 | none |
| https://www.solo.io/blog/mcp-progressive-disclosure | Solo.io | 2026-08-17 | 2026-08-17 | none — watchlist (teaser snippets only) |
| https://www.solo.io/blog/keeping-context-and-tokens-low-with-progressive-disclosure-in-agentgateway | Solo.io | 2026-08-17 | 2026-08-17 | none — watchlist |
| https://www.solo.io/resources/video/solo-enterprise-for-agentgateway-demo-on-behalf-of | Solo.io | 2026-08-17 | 2026-08-17 | none — watchlist (OBO demo) |
| https://www.solo.io/blog/aaif-announcement-agentgateway | Solo.io | 2026-08-17 | 2026-08-17 | none — watchlist |
| https://www.solo.io/blog/mcp-authorization-patterns-for-upstream-api-calls | Solo.io | 2026-08-17 | 2026-08-17 | none — watchlist |
| https://mastra.ai/blog/announcing-mastra-1 | Mastra | 2026-08-17 | 2026-08-17 | [Mastra agentic-UI](/frameworks/mastra-agentic-ui.md) — Mastra 1.0 stable runtime facts |
| https://mastra.ai/blog/changelog-2026-03-23 | Mastra | 2026-03-23 | 2026-08-17 | [Mastra agentic-UI](/frameworks/mastra-agentic-ui.md) — runtime signals (watchlist) |
| https://mastra.ai/blog/aitracing | Mastra | 2025-09-30 | 2026-08-17 | [Mastra agentic-UI](/frameworks/mastra-agentic-ui.md) — AI Tracing feature |
| https://mastra.ai/blog/aiuidojo | Mastra | 2025-11-14 | 2026-08-17 | none — UI Dojo already synthesized in a prior run |
| https://mastra.ai/blog/introducing-agent-to-agent-support | Mastra | 2026-05-19 | 2026-08-17 | [Mastra agentic-UI](/frameworks/mastra-agentic-ui.md) — Agent-to-Agent (A2A) support |
| https://github.github.com/gh-aw/blog/2026-01-12-welcome-to-pelis-agent-factory | gh-aw | 2026-01-12 | 2026-08-17 | [factory hub](/concepts/factory-toolchain.md) — agentic-workflow taxonomy |
| https://github.github.com/gh-aw/blog/2026-01-13-meet-the-workflows-continuous-documentation | gh-aw | 2026-01-13 | 2026-08-17 | [factory hub](/concepts/factory-toolchain.md) — docs-workflow taxonomy |
| https://github.github.com/gh-aw/blog (index: Weekly Update 2026-07-13, v0.82.8) | gh-aw | 2026-07-13 | 2026-08-17 | none — index page; release version watchlist |
| https://github.github.com/gh-aw/introduction/how-they-work | gh-aw | 2026-08-17 | 2026-08-17 | [factory hub](/concepts/factory-toolchain.md) — Markdown-compiled-to-Actions model |
| https://github.com/github/gh-aw-mcpg | gh-aw | 2026-08-17 | 2026-08-17 | none — repo entry, MCP gateway (watchlist) |

> **Publication-date provenance:** rows whose *Published* equals the run date (2026-08-17 or 2026-08-22) for a post that is older than the feeds' first run carry the run date as an *upper bound* when the retrieved snippet did not show a real date (Zed corporate posts, all Solo.io posts, `announcing-mastra-1`, `how-they-work`, `gh-aw-mcpg`, the 2026-08-22 Solo.io Linux Foundation post, and the Zed sandboxing post). The ledger's dedup identity is always the canonical URL, so the exact date does not affect future runs.

## Confidence and gaps

- **Confirmed:** the feed list and the ledger protocol, both configured in the `web-search-factory-tools` source instance.
- Ingested rows: 20 added 2026-08-17 (7 produced wiki changes, 13 none); 4 more added 2026-08-18 (3 produced wiki changes — Mastra AI-SDK-v5, Solo 2.2, Solo kagent — plus the gh-aw-workshop repo entry recorded with `none`); 1 more added by the 2026-08-18 generative-UI re-pull (Mastra `copilotkitmastra` → Mastra agentic-UI + CopilotKit); 2 more added by the 2026-08-22 re-pull (Solo Linux Foundation → factory hub; Zed sandboxing → `none`). Rows: 27 in total.
- Note: the gh-aw gallery and repo-style entries (e.g. `gh-aw-workshop`) are deliberately outside the ledger (see *Living index pages* above) or recorded only as repo entries; if the gallery later gains dated, individually addressable entries, ledger those entries like posts.
- Note: the Mastra domain is also configured on the `web-search-generative-ui` instance for its integration docs. Blog posts from `mastra.ai/blog` are ledgered here regardless of which instance retrieved them, so the two instances cannot ingest the same post twice.
