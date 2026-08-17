---
type: Source Evidence
title: Blog post ingestion ledger
description: Cumulative, append-only record of blog posts already ingested into this wiki (Zed, Solo.io, Mastra), used to keep blog ingestion idempotent — posts listed here are never fetched, summarized, or adopted again.
resource: https://zed.dev/blog
tags: [source, evidence, ledger, blog, deduplication, factory-tools]
timestamp: 2026-08-17
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
| _(no blog posts ingested yet — the feeds were added on 2026-08-17 and the first scheduled run will populate this table)_ | | | | |

## Confidence and gaps

- **Confirmed:** the feed list and the ledger protocol, both configured in the `web-search-factory-tools` source instance.
- Gap: no blog run has happened yet, so no post has been evaluated. The first run should populate the table for every post it sees, including the ones it discards.
- Note: the Mastra domain is also configured on the `web-search-generative-ui` instance for its integration docs. Blog posts from `mastra.ai/blog` are ledgered here regardless of which instance retrieved them, so the two instances cannot ingest the same post twice.
