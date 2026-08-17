---
type: Source Evidence
title: Web-search Agent wiki source evidence
description: Ingestion and coverage notes for the 2026-08-17 web-search-agent-wiki run (3 Tavily queries over the OKF spec, the OpenWiki repository, and its releases page) — the durable OKF v0.2 and OpenWiki facts adopted plus reliability warnings for synthesized answers.
resource: https://github.com/langchain-ai/openwiki
tags: [web-search, source, evidence, okf, openwiki, agent-wiki, coverage]
timestamp: 2026-08-17
---

# Web-search Agent wiki — source evidence

This page records the 2026-08-17 web-search ingestion for the **`web-search-agent-wiki`** source instance (Agent wiki scope: the OpenWiki repository and its release pages, plus the Open Knowledge Format specification in `GoogleCloudPlatform/knowledge-catalog`). It is an evidence index, not the synthesis layer — durable knowledge lives on the [Open Knowledge Format](/protocols/open-knowledge-format.md) and [OpenWiki](/frameworks/openwiki.md) pages.

## Source instance and run facts

- **Instance:** `web-search-agent-wiki` (Agent wiki)
- **Fetched:** 2026-08-17T22:31:23Z
- **Search:** Tavily, 3 queries × 5 max results (15 result objects)
- **Raw data:** `2026-08-17T22-31-02-239Z/web-search-results.json`

## Queries and results

| # | Query | In-scope hits | Notes |
|---|---|---|---|
| 1 | `https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md` | 3 canonical + 2 ecosystem | SPEC.md (full raw content retrieved), `okf/` dir README, README.md; AKB issue #86; openknowledge-sh/openknowledge CLI |
| 2 | `https://github.com/langchain-ai/openwiki` | 5 | Repo page, README.md, quickstart.md, architecture/overview.md, CLAUDE.md |
| 3 | `https://github.com/langchain-ai/openwiki/releases` | 4 relevant + 1 off-target | architecture/overview.md, quickstart.md, operations/credentials-and-updates.md, CONTRIBUTING.md, plus off-target `langchain-ai/deepagents` hit |

**No release artifacts/versions were retrieved** — the `/releases` query returned repository documentation pages, not release files.

## Durable knowledge adopted

- **OKF v0.2 specification** (primary source, full content in raw): bundle structure, reserved filenames `index.md`/`log.md`, required `type` + recommended fields, provenance (`sources`, credibility signals, `usage_window`), trust (`generated`, `verified`, trust tiers), lifecycle (`status`, `stale_after`), cross-linking and the `references/` convention, actor convention, index/log files, Attested Computation (§10), conformance, versioning, and the v0.1→v0.2 breaking changes. Spec last updated 2026-07-24.
- **knowledge-catalog repo**: reference agent (BQ pass + web pass with `--web-seed`, `--web-max-pages`, same-domain allowed-hosts), `visualize` subcommand (self-contained HTML, Cytoscape.js graph, marked markdown), sample bundles.
- **OpenWiki**: MIT/TypeScript CLI, two modes, 12 providers, connector list, OKF v0.1 output + validated Mermaid diagrams, visualizer behavior, CI self-update examples, Changesets release flow.

## Reliability warnings

The Tavily `response.answer` fields were **unreliable and not adopted**:

- Repo query answer claimed OpenWiki is "built by a team of inventors at Amazon" — no such claim appears in any result content; treated as hallucinated.
- Releases query answer ("the repository contains various source files and workflows for managing updates and credentials") was generic boilerplate and contained **no release version**. The off-target `langchain-ai/deepagents` hit (6th result for the releases query) was excluded as irrelevant.

Rule applied: raw web-search content and its synthesized answers are untrusted evidence; only directly relevant, authoritative hits are source-backed. The spec and README raw content is treated as primary source-backed evidence; everything from the Tavily `answer` field stays unverified.

## Mapping to wiki pages

- Created [Open Knowledge Format](/protocols/open-knowledge-format.md) — canonical OKF v0.2 concept page (bundle model, frontmatter families, attestation, conformance, ecosystem).
- Created [OpenWiki](/frameworks/openwiki.md) — canonical OpenWiki tooling concept page.
- Updated [/quickstart.md](/quickstart.md), [/themes.md](/themes.md), [/open-questions.md](/open-questions.md) — new domain section/navigation, theme row, and corpus-coverage questions.
- No release reference page: the source data contained no release versions for OpenWiki on this run.

## Confidence and gaps

- **Confirmed:** run metadata, the 15 hit objects, full OKF v0.2 spec content, OpenWiki README/architecture content (directly from raw file).
- **Source-backed:** knowledge-catalog README claims (reference agent, visualizer), AKB/openknowledge ecosystem mentions (single GitHub hits each).
- **Watchlist:** OpenWiki's current release version; whether the current OpenWiki build emits OKF v0.1 or v0.2 (README says v0.1; spec is v0.2).
- Gap: no release-page artifacts; the OKF implementations field has no formal registry (AKB issue #86 asks upstream for one).