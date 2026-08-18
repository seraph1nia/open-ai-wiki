---
type: Source Evidence
title: Web-search Agent wiki source evidence
description: Ingestion and coverage notes for the web-search-agent-wiki runs (2026-08-17 and 2026-08-18 re-pull; 3 Tavily queries each over the OKF spec, the OpenWiki repository, and its releases page) — the durable OKF v0.2 and OpenWiki facts adopted, the OKF ecosystem implementations surfaced (okc, erd2okf, okf-gem, openknowledge), plus reliability warnings for synthesized answers.
resource: https://github.com/langchain-ai/openwiki
tags: [web-search, source, evidence, okf, openwiki, agent-wiki, coverage, okf-ecosystem]
timestamp: 2026-08-18
---

# Web-search Agent wiki — source evidence

This page records the web-search ingestion for the **`web-search-agent-wiki`** source instance (Agent wiki scope: the OpenWiki repository and its release pages, plus the Open Knowledge Format specification in `GoogleCloudPlatform/knowledge-catalog`). It is an evidence index, not the synthesis layer — durable knowledge lives on the [Open Knowledge Format](/protocols/open-knowledge-format.md) and [OpenWiki](/frameworks/openwiki.md) pages.

## Run facts

- **Instance:** `web-search-agent-wiki` (Agent wiki)
- **Run 1 fetched:** 2026-08-17T22:31:23Z
- **Run 2 fetched:** 2026-08-18T11:45:58Z
- **Search:** Tavily, 3 queries × 5 max results per run
- **Raw data:** `2026-08-17T22-31-02-239Z/web-search-results.json`, `2026-08-18T11-45-41-328Z/web-search-results.json`

## Queries and results

| # | Query | In-scope hits | Notes |
|---|---|---|---|
| 1 | `https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md` | 3 canonical + 2 ecosystem | SPEC.md (full raw content retrieved), `okf/` dir README, README.md; AKB issue #86; openknowledge-sh/openknowledge CLI |
| 2 | `https://github.com/langchain-ai/openwiki` | 5 | Repo page, README.md, quickstart.md, architecture/overview.md, CLAUDE.md |
| 3 | `https://github.com/langchain-ai/openwiki/releases` | 4 relevant + 1 off-target | architecture/overview.md, quickstart.md, operations/credentials-and-updates.md, CONTRIBUTING.md, plus off-target `langchain-ai/deepagents` hit |

**No release artifacts/versions were retrieved** — the `/releases` query returned repository documentation pages, not release files.

## Run 2 (2026-08-18) — re-pull

- **Fetched:** 2026-08-18T11:45:58Z
- **Raw data:** `2026-08-18T11-45-41-328Z/web-search-results.json`
- Same 3 queries (OKF SPEC, openwiki repo, openwiki releases), 5 max results each.

### What this run added

Two of the three queries advanced evidence; the third (releases) again returned no release artifacts:

- **OKF ecosystem implementations enriched (source-backed).** The OKF SPEC query surfaced several independent OKF producers alongside the canonical spec:
  - **`okc`** — a PyPI tool ([discussion #84](https://github.com/GoogleCloudPlatform/knowledge-catalog/discussions/84)) that reads a database schema (SQLite, PostgreSQL) and produces a deterministic, cross-linked OKF bundle (FK relationships become markdown links, auto-`index.md`, zero-config). Implements **OKF v0.1**.
  - **`erd2okf`** (thorsti, in discussion #84 comments) — Postgres → one OKF concept per table, with an ownership split between generated frontmatter and hand-written body, and a `erd2okf check` drift check that fails CI on structural schema drift.
  - **`okf-gem`** (serradura) — "Open Knowledge Format for coding agents", speaking **OKF v0.2**: Agent Skill (authors/curates/writes the bundle) + CLI (`okf validate`/`lint`) + library + interactive/static Graph + **`okf-mcp`** (an MCP server with 14 read-only tools for any MCP host), shipped via RubyGems, Docker, and a **Claude Code plugin**; 100% local.
- **knowledge-catalog sample bundles confirmed:** `bundles/` ships four ready-to-browse bundles (GA4, Stack Overflow, Bitcoin, Acme Retail), each with a `viz.html`.
- **OpenWiki (re-confirmed + new detail):** the README re-confirms the two modes, 12 connectors, 13 model providers, OKF v0.1 output, and visualizer. New durable operational/architecture detail surfaced from the bundled docs: the 13-provider list (incl. Gemini Enterprise via Google ADC, Bedrock via AWS keys, Copilot via GitHub CLI), `~/.openwiki/INSTRUCTIONS.md` (personal wiki brief) and `~/.openwiki/onboarding.json` (source/schedule metadata), the internal **wiki link validator** that stamps broken links inline with `openwiki:` HTML comments instead of failing the run, the **DeepSWE evaluation harness**, the repo-root `.openwikiignore` read boundary, and the `/skills/` + `/conversation_history/` virtual filesystem mounts.

### Reliability warnings

- The releases query again returned **no release artifacts**; its hits were off-target GitHub profiles/repos (`himanshu231204`, `langchain-ai/deepagents`, a `langchain==1.2.10` release) and repo docs — all excluded as irrelevant. The `response.answer` fields were generic/uninformative and not adopted.
- The OpenWiki README continues to declare **OKF v0.1** output while the upstream spec is v0.2 (open question unchanged).

## Durable knowledge adopted

- **OKF v0.2 specification** (primary source, full content in raw): bundle structure, reserved filenames `index.md`/`log.md`, required `type` + recommended fields, provenance (`sources`, credibility signals, `usage_window`), trust (`generated`, `verified`, trust tiers), lifecycle (`status`, `stale_after`), cross-linking and the `references/` convention, actor convention, index/log files, Attested Computation (§10), conformance, versioning, and the v0.1→v0.2 breaking changes. Spec last updated 2026-07-24.
- **knowledge-catalog repo**: reference agent (BQ pass + web pass with `--web-seed`, `--web-max-pages`, same-domain allowed-hosts), `visualize` subcommand (self-contained HTML, Cytoscape.js graph, marked markdown), sample bundles.
- **OpenWiki**: MIT/TypeScript CLI, two modes, 13 providers (source-backed 2026-08-18), connector list, OKF v0.1 output + validated Mermaid diagrams, visualizer behavior, CI self-update examples, Changesets release flow. Durable operational detail in run 2: `~/.openwiki/INSTRUCTIONS.md` + `onboarding.json`, the wiki link validator, DeepSWE eval harness, `.openwikiignore`, and the `/skills/` + `/conversation_history/` mounts.

## Reliability warnings

The Tavily `response.answer` fields were **unreliable and not adopted**:

- Repo query answer claimed OpenWiki is "built by a team of inventors at Amazon" — no such claim appears in any result content; treated as hallucinated.
- Releases query answer ("the repository contains various source files and workflows for managing updates and credentials") was generic boilerplate and contained **no release version**. The off-target `langchain-ai/deepagents` hit (6th result for the releases query) was excluded as irrelevant.

Rule applied: raw web-search content and its synthesized answers are untrusted evidence; only directly relevant, authoritative hits are source-backed. The spec and README raw content is treated as primary source-backed evidence; everything from the Tavily `answer` field stays unverified.

## Mapping to wiki pages

- Created [Open Knowledge Format](/protocols/open-knowledge-format.md) — canonical OKF v0.2 concept page (bundle model, frontmatter families, attestation, conformance, ecosystem).
- Created [OpenWiki](/frameworks/openwiki.md) — canonical OpenWiki tooling concept page.
- Updated [/quickstart.md](/quickstart.md), [/themes.md](/themes.md), [/open-questions.md](/open-questions.md) — new domain section/navigation, theme row, and corpus-coverage questions (run 1); refreshed for the run-2 OKF ecosystem + OpenWiki operational deltas (run 2).
- No release reference page: neither run's source data contained release versions for OpenWiki.

## Confidence and gaps

- **Confirmed:** run metadata, the 15 hit objects per run, full OKF v0.2 spec content, OpenWiki README/architecture content (directly from raw file).
- **Source-backed:** knowledge-catalog README claims (reference agent, visualizer), AKB/openknowledge ecosystem mentions (single GitHub hits each).
- **Watchlist:** OpenWiki's current release version; whether the current OpenWiki build emits OKF v0.1 or v0.2 (README says v0.1; spec is v0.2).
- **Source-backed (Run 2):** `okc`, `erd2okf`, and `okf-gem` ecosystem implementations (single GitHub/PyPI/discussion hits each), OpenWiki's provider list and operational files (README + bundled docs retrieved this run).
- Gap: no release-page artifacts (both runs); the OKF implementations field has no formal registry (AKB issue #86 asks upstream for one).