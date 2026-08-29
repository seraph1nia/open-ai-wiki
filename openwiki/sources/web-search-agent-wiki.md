---
type: Source Evidence
title: Web-search Agent wiki source evidence
description: Ingestion and coverage notes for the web-search-agent-wiki runs (2026-08-17, 2026-08-18, 2026-08-22, 2026-08-27, and 2026-08-29; 3 Tavily queries each over the OKF spec, the OpenWiki repository, and its releases page). Adopted durable OKF v0.2 and OpenWiki facts, the OpenWiki v0.3.3 release trail and OKF-v0.2 output claim, the OKF ecosystem implementations surfaced (okc, erd2okf, okf-gem, openknowledge, okf-ingest, okf-skill, okf-lint, KSoR/KSP-001, the standalone open-knowledge-format repo, and a langsmith connector signal), the 2026-08-29 canonical-home move for OKF (open-knowledge-format repo) and OpenWiki main's v0.4.3 package.json signal, plus reliability warnings for synthesized answers.
resource: https://github.com/langchain-ai/openwiki
tags: [web-search, source, evidence, okf, openwiki, agent-wiki, coverage, okf-ecosystem]
timestamp: 2026-08-29
---

# Web-search Agent wiki — source evidence

This page records the web-search ingestion for the **`web-search-agent-wiki`** source instance (Agent wiki scope: the OpenWiki repository and its release pages, plus the Open Knowledge Format specification in `GoogleCloudPlatform/knowledge-catalog`). It is an evidence index, not the synthesis layer — durable knowledge lives on the [Open Knowledge Format](/protocols/open-knowledge-format.md) and [OpenWiki](/frameworks/openwiki.md) pages.

## Run facts

- **Instance:** `web-search-agent-wiki` (Agent wiki)
- **Run 1 fetched:** 2026-08-17T22:31:23Z
- **Run 2 fetched:** 2026-08-18T11:45:58Z
- **Run 3 fetched:** 2026-08-22T07:17:32Z (Tavily `advanced`, `timeRange: year`, 3 queries × 5 max results)
- **Run 4 fetched:** 2026-08-27T11:31:19Z (Tavily, 3 queries × 5 max results, `timeRange: year`)
- **Run 5 fetched:** 2026-08-29T13:06:59Z (Tavily, 3 queries × 5 max results, 24h window)
- **Search:** Tavily, 3 queries × 5 max results per run
- **Raw data:** `2026-08-17T22-31-02-239Z/web-search-results.json`, `2026-08-18T11-45-41-328Z/web-search-results.json`, `2026-08-22T07-17-15-731Z/web-search-results.json`, `2026-08-27T11-31-11-630Z/web-search-results.json`, and `2026-08-29T13-06-51-465Z/web-search-results.json`

## Queries and results

| # | Query | In-scope hits | Notes |
|---|---|---|---|
| 1 | `https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md` | 3 canonical + 2 ecosystem | SPEC.md (full raw content retrieved), `okf/` dir README (2026-08-29: frozen-snapshot notice → canonical home moved), README.md; AKB issue #86; openknowledge-sh/openknowledge CLI |
| 2 | `https://github.com/langchain-ai/openwiki` | 5 | Repo page, README.md, quickstart.md, architecture/overview.md, CLAUDE.md |
| 3 | `https://github.com/langchain-ai/openwiki/releases` | 4 relevant + 1 off-target | architecture/overview.md, quickstart.md, operations/credentials-and-updates.md, CONTRIBUTING.md, plus off-target `langchain-ai/deepagents` hit |

**No release artifacts/versions were retrieved in runs 1–2** — the `/releases` query returned repository documentation pages, not release files. Run 3 (below) first retrieved the actual releases-page fragment.

## Run 3 (2026-08-22) — release-page re-pull

- **Fetched:** 2026-08-22T07:17:32Z
- **Raw data:** `2026-08-22T07-17-15-731Z/web-search-results.json`
- Same 3 queries (OKF SPEC, openwiki repo, openwiki releases), 5 max results each.

### What this run added

- **OpenWiki release trail (source-backed, first release artifacts retrieved).** The releases query returned the actual [releases page](https://github.com/langchain-ai/openwiki/releases) fragment: **v0.3.x is now the latest line (v0.3.3 Latest; also v0.3.2, v0.3.1, v0.3.0), followed by v0.2.5, 0.2.4, 0.2.3, 0.2.2, 0.2.1, 0.2.0.** The v0.3.3 release body lists: `release: 0.2.4 by Brace Sproul (@bracesproul) in #522`; `docs: update OpenWiki` (#473, #488); `fix: cap retry-after delays for connector retries` (#466, Willow Lopez); `fix: harden raw connector file handling` (#401, HwangJohn); `fix: reject invalid hackernews feed configs` (#483); `fix: prevent file/image content blocks from leaking into CLI output` (#215); `feat: add github copilot as a model provider for inference` (#192, jyje); `feat: add support for multilingual output in openwiki agent` (#477); `chore(deps): bump postcss` (#493). Note: the release body headers "release: 0.2.4" / "Latest" reflect the Changesets changelog/README prose (the "latest" banner text sits above the v0.3.3 fragment), so **v0.3.3 is the observed latest release** — the 0.2.4 reference is a historical changelog line. Release dates and full v0.3.x changelogs were not captured in the fragment.
- **OpenWiki OKF output claim resolved (repo README).** The repository README retrieved this run explicitly states: **"OpenWiki emits Google Open Knowledge Format (OKF) v0.2 bundles in both modes, so your wiki is portable to any OKF-aware tool."** Also re-confirmed in the README/quickstart/usage docs: **12 model providers** ("from OpenAI and Anthropic to Bedrock, Gemini, and any OpenAI-compatible gateway" — the current README count, down from the earlier 13-provider list which included the GitHub Copilot provider, added as a v0.3.3 feature), two modes, eight built-in connectors (Custom MCP, Notion, Slack, Gmail, X, Web Search, Hacker News, local git), CI self-update, and validated Mermaid diagrams. The usage doc sample frontmatter shows `verified: by openwiki/0.3.3` (2026-08-21 08:12:50 UTC) — engine-side version stamping in personal-mode bundles.
- **OpenWiki maintenance/architecture signals (source-backed).** The workflow-runs hit shows open PRs/commits such as **"fix: harden okf claims provenance and update grounding (#692)"** (a PR/commit on branch `colifran/improve-okf`) and a `changeset-release/main` action-required workflow — i.e., ongoing OKF-provenance hardening and the Changesets release flow are active on `main`. The architecture overview hit re-lists the repo source modules (`src/okf/`, `src/mermaid/`, `src/auth/`, `src/connectors/`, `src/ingestion/`, telemetry, etc.), consistent with the existing OpenWiki page.
- **OKF spec/ecosystem re-confirmations.** The SPEC query re-surfaced the knowledge-catalog `okf/` README (v0.2 headline; "universal, vendor-neutral format"; reference agent + visualizer PoCs; bundles for GA4, Stack Overflow, Bitcoin, Acme Retail) and the **openknowledge CLI** repo (`openknowledge-sh/openknowledge`, Apache-2.0, **~40 stars / 6 forks, 504 commits**; OKF v0.2 badge; Go CLI `okn` with `setup`/`validate`/`search`/`view`/`mcp`/`export` commands; a `.codex/skills/openknowledge-wiki`; telemetry on by default with `--no-telemetry`; Apache-2.0 with embedded Apache-2.0 OKF spec material).
- **New ecosystem signals (watchlist, single hits):**
  - **`okf-ingest`** (`travisjakel/okf-ingest`, ~4 stars) — a **consumer-side conformance harness**: documents OKF §11 "hard rules" (parseable frontmatter, non-empty `type`, reserved-file structure), v0.2 `generated.at`↔legacy `timestamp` fallback (§13), permissive-consumption (records findings, never rejects), untyped-link cross-link resolution with bundle-absolute/relative forms, and `okf_version` read from a bundle-root `index.md` — an independent corroboration of the OKF v0.2 conformance model.
  - **`okf-skill`** (`seanrobertwright/okf-skill`) — a working condensation of the **OKF v0.1** spec as an agent skill file (v0.1 target).
- **Reliability.** The releases-query Tavily `answer` reported "latest release version 0.3.3 … released by Brace Sproul" with "improving Open Knowledge Format claims and grounding" — this run it matched the raw release-page fragment (v0.3.3 latest, Changesets flow). Still, v0.3.3 was treated as source-backed from the raw fragment, not from the answer. The `himanshu231204` (6th hit, off-target GitHub profile) and workflow-runs hits were filtered for in-scope signals only. The OKF-instance `answer` stays generic and unverified. No new OpenWiki release *dates* were captured, and the fragment does not enumerate the full v0.2.x–v0.3.x trail details.

## Run 5 (2026-08-29) — re-pull

- **Fetched:** 2026-08-29T13:06:59Z
- **Raw data:** `2026-08-29T13-06-51-465Z/web-search-results.json`
- Same 3 queries (OKF SPEC, openwiki repo, openwiki releases), 5 max results each, 24h window.

### What this run added

- **OKF canonical home moved (source-backed, primary signal).** The `knowledge-catalog/okf/` directory README now carries an "Important" banner: **"OKF now lives in its own repository: `GoogleCloudPlatform/open-knowledge-format`. That repository is the canonical home of the specification, the reference agent, and the sample bundles. … Stop using the copy under `okf/` in this repository. It is a frozen snapshot, no longer maintained, and anything built against it will drift out of date."** The standalone `open-knowledge-format` repo (previously a run-4 watchlist signal) is thereby **upgraded to the canonical OKF home**, and the `knowledge-catalog/okf/` snapshot is deprecated. The [OKF page](/protocols/open-knowledge-format.md) `resource` now points at `open-knowledge-format/blob/main/SPEC.md`; the old `knowledge-catalog/okf/SPEC.md` URL is preserved in evidence history.
- **OpenWiki `main` HEAD is v0.4.3 (source-backed signal).** The repo query and the releases query both returned [`package.json`](https://github.com/langchain-ai/openwiki/blob/main/package.json) with **`"version": "0.4.3"`** — the first version data beyond the v0.3.3 releases-page trail. Also visible: name `openwiki`, `"description": "A CLI that uses a DeepAgents documentation agent to generate and maintain an OpenWiki for a codebase."`, license MIT, `"type": "module"`, engines `node >=22`, bin `./dist/cli/cli.js`, files `["dist","integrations","skills","README.md","LICENSE"]`, dependencies `deepagents@1.12.0`, `langchain@^1.5.3`, `langsmith@^0.8.3`, `@modelcontextprotocol/sdk@^1.30.0`, `@anthropic-ai/vertex-sdk@^0.19.0`, `@langchain/tavily@1.2.0`, `cron-parser`, `cronstrue`, `ink`, `marked`, `posthog-node`, `yaml`, `zod`, etc. **No v0.4.x releases-page fragment** was captured, so this is a HEAD/package.json signal, not a release-page confirmation — the v0.3.3-latest trail from run 3 is still the shipped-release authority. The Tavily `answer` fields ("latest version is 0.4.3") matched the package.json read but remain secondary to the raw fragment.
- **OpenWiki architecture "Claims" wording (source-backed).** The repo's `openwiki/architecture/overview.md` (raw hit) frames the output as **"a portable OKF v0.2 Markdown bundle grounded in versioned source Claims"** and its frontmatter `sources` example lists typed `id`/`resource` entries (e.g. `openwiki-source-23775c3de52f3ab95a13cb8b` → `repo://README.md`, `repo://src/agent/index.ts`). Corroborates the OKF [§5.1 `sources`](/protocols/open-knowledge-format.md#51-provenance-sources) family and the claim-grounding direction of `harden okf claims provenance (#692)`. Same run's architecture hit also references `agent/overview.md` for the run lifecycle (orchestration, transactional init, no-op detection, streaming, crash handling).
- **OpenWiki CONTRIBUTING "v1 boundary" + Changesets mechanics (source-backed).** Direct quote: **"Keep the v1 boundary narrow: host agents use their native repository tools for investigation and Markdown authoring; OpenWiki owns deterministic preparation, finalization, metadata, provenance, and managed setup files."** The same file documents the Changesets release flow precisely: PR → `pnpm changeset` (with bump-type summary) → merged PR opens "chore: version packages" → merge bumps, updates CHANGELOG.md, publishes; docs/CI-only changes need no changeset; `pnpm changeset --empty` records no-release intent.
- **Watchlist items (single hits, not adopted as durable):** OpenWiki issue tracker re-surfaced open issues — **#700** (use each directory's `README.md` content as its `index.md`), **#719** (Anthropic prompt caching to cut token cost on multi-turn runs), **#696** (openai-compatible opt-in to `OPENWIKI_REASONING_EFFORT`), **#686** (OpenRouter free-tier 429 without Retry-After aborts the run; `OPENWIKI_PROVIDER_RETRY_ATTEMPTS` never applies), and **#114** (v0.0.1 Anthropic-provider crash on Python `__pycache__` binary reads — historical). These are repo activity signals, not features; noted here for the record. **`zai-org/feedback#120`** asks to add OpenWiki to the GLM Coding Plan supported-tools list (~10.9k stars claim in that issue) — an ecosystem-adoption signal, out of the source scope.
- **Ecosystem re-confirmations (no durable delta):** `okf-skill` (`spec.md` condensed OKF v0.1 reference with §10 versioning notes), KSoR/KSP-001 draft9 (References list pinning the OKF v0.2 commit `3fcbb9f…` plus `/llms.txt` v2, MCP spec, RFC 2119/8174), AKB issue #86 (independent producer + conformance validator, `backend/app/services/okf.py`, own `okf/` sample bundle), and the `open-knowledge-format` repo README (6 commits; `bundles/`, `samples/`, `connectors/`, `src/reference_agent/`, `tests/`, `pyproject.toml`).
- **Releases query:** returned `package.json` twice (version 0.4.3), the `aitoolnet.com` mirror of the repo README (OKF v0.2 output claim re-confirmed), CONTRIBUTING.md, the GLM issue, and the issues page — **no release-page artifact**, consistent with run 4.

### Reliability

- The Tavily `answer` fields this run were closer to the raw content ("The latest specification is version 0.2"; "The latest version is 0.4.3") but remain secondary; adoptions come from the raw fragments (`package.json`, `architecture/overview.md`, CONTRIBUTING.md, the `okf/` README). All new ecosystem signals are single GitHub/document hits — **source-backed as existence signals, watchlist for adoption/quality claims**. The v0.4.3 version is explicitly a HEAD/package.json signal until a v0.4.x release fragment appears.

### Mapping to wiki pages

- Updated the [OKF page](/protocols/open-knowledge-format.md): canonical `resource` → `open-knowledge-format` SPEC.md; ecosystem section reflects the canonical-home/frozen-snapshot status; Evidence/Confidence updated.
- Updated the [OpenWiki page](/frameworks/openwiki.md): Releases section now distinguishes the v0.3.3 releases-page trail from the v0.4.3 package.json HEAD signal; added the "grounded in versioned source Claims" architecture wording, the v1 boundary, and the Changesets mechanics.
- Refreshed the [agent-maintained-knowledge-bases](/themes.md) theme row.
- Added a new latest-ingestion note to [/quickstart.md](/quickstart.md).
- No new open questions — no corpus-coverage gap introduced.

## Run 4 (2026-08-27) — re-pull

- **Fetched:** 2026-08-27T11:31:19Z
- **Raw data:** `2026-08-27T11-31-11-630Z/web-search-results.json`
- Same 3 queries (OKF SPEC, openwiki repo, openwiki releases), 5 max results each, `timeRange: year`.

### What this run added

- **OKF ecosystem additions (all single-hit, source-backed as ecosystem entries / watchlist for adoption claims):**
  - **`okf-lint`** (`thisismydesign/okf-lint`) — a **linter for OKF bundles** ("ESLint or RuboCop, but for OKF"): reports **errors** for mandatory OKF conformance (e.g. a concept document missing its `type` field) and **warnings** for optional-but-useful conventions (no `index.md`, no `log.md`, or a concept without a `description`). It is opinionated in exactly the spec's split — only true conformance failures are errors; recommendations are warnings that can be disabled. **Supports OKF `0.1` only**; when a bundle specifies no version (or one the linter does not support), the highest supported version is used. Independent corroboration that `okf_version` is per-bundle and consumers must tolerate unknown versions.
  - **KSoR / KSP-001** (`panaversity/ksor` `research/ksor-standard-proposal-001-v0.1-draft9.md`) — an independent "Knowledge as a Service" standard proposal **built on OKF**: it presents OKF as the portable knowledge-at-rest format (markdown concepts with YAML frontmatter; trust vocabulary `sources`/`generated`/`verified`/`status`/`stale_after`/`Attested Computation`), normatively targets the **immutable OKF v0.2 spec revision at commit `3fcbb9f828c2f23d109c855ee403c3a4c81f3a96`** (2026-07-24) rather than a moving branch, and declares `okf_version: "0.2"` in a bundle-root `index.md` using the mechanism OKF defines. It also references the /llms.txt v2 spec (Answer.AI, revised August 2026), the MCP spec, and RFC 2119/8174. Signal: **third-party standards adoption of OKF v0.2 plus immutable-version pinning**.
- **`GoogleCloudPlatform/open-knowledge-format`** — a **separate open-source repository** (distinct from `knowledge-catalog`, ~6 commits) that hosts the OKF spec and tooling directly: its own `SPEC.md`, `bundles/`, `connectors/`, `src/reference_agent/`, `tests/`, `pyproject.toml`. README frames OKF v0.2 as "a universal, vendor-neutral format" that "anyone can produce" (humans, agents on any framework — Google ADK, LangChain, custom — or export pipelines from Dataplex, Unity Catalog, Collibra) and "anyone can serve and consume" (static server, management UI, an LLM loading files, a search index, or the bundled graph viewer). Corroborates the existing OKF v0.2 wording and the reference-agent/visualizer claims.
- **OpenWiki connector detail (source-backed from `quickstart.md`):** the repo lists a **`langsmith` built-in connector** (`src/connectors/sources/langsmith/` with `api.ts`, `index.ts`, `repo-config.ts`, `runs.ts`, `setup.ts`, `types.ts`) — evidence of a LangSmith sources connector alongside git-repo, gmail, hackernews, slack, web-search, x, mcp. See the [OpenWiki page](/frameworks/openwiki.md).
- **Re-confirmations (no durable delta):** the OKF-spec query re-surfaced `seanrobertwright/okf-skill` (v0.1 condensed reference keyed to upstream SPEC.md; §10 versioning: minor bump = backward-compatible, major = breaking, `okf_version` only in bundle-root `index.md`) and `travisjakel/okf-ingest` (already recorded); the openwiki queries re-surfaced `architecture/overview.md`, `quickstart.md`, and `README.md` (199 lines / 33.4 KB) — all re-confirming the OKF v0.2 output claim, the 12-provider README list, the two modes, the Deep Agents docs agent, and the `verified: openwiki/0.3.3` engine stamp. The `AGENTS.md` hit was **not** adopted (agent-instruction file, out of scope).
- **Releases query:** again returned **no release artifacts** — hits were repo docs, the `langchain-ai` org page, and an off-target `langchain-ai/deepagents` repo, all excluded. **No new OpenWiki release versions or dates**; the v0.3.3-latest line from run 3 stands.

### Reliability

- The Tavily `answer` fields were generic and unverified (OKF "targets version 0.2 specification"; OpenWiki "generates and maintains a wiki" / "outputs OKF v0.2"). As before, adoptions come from raw fragments, not answers. All new ecosystem entries are single GitHub/document hits — **source-backed as existence signals, watchlist for adoption/quality claims**.

### Mapping to wiki pages

- Added `okf-lint`, KSoR/KSP-001, and the standalone `open-knowledge-format` repo to the [OKF ecosystem section](/protocols/open-knowledge-format.md#ecosystem-and-tooling).
- Added the `langsmith` connector evidence to the [OpenWiki connectors section](/frameworks/openwiki.md#connectors-and-ingestion).
- Refreshed the [agent-maintained-knowledge-bases](/themes.md) theme row.
- Added a new latest-ingestion note to [/quickstart.md](/quickstart.md).
- No new open questions ([open-questions.md](/open-questions.md) unchanged) — all new signals are single-hit source-backed/watchlist without a corpus-coverage gap.

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
- **OpenWiki (run 3)**: release trail now source-backed at **v0.3.3 latest** (v0.3.2/v0.3.1/v0.3.0 before it, then v0.2.5 … 0.2.0); README now declares **OKF v0.2 output** in both modes; current provider count is **12** in the README (the 13th — GitHub Copilot — shipped as a v0.3.3 feature, so the count may be 13 on newer builds); `verified: openwiki/0.3.3` engine-side stamps in generated bundles; v0.3.3 features/fixes listed above; ongoing `harden okf claims provenance` work on `main`.
- **OpenWiki (run 5, 2026-08-29)**: `main`'s `package.json` declares **v0.4.3** (HEAD signal; not yet a releases-page-confirmed release); the OKF-v0.2 output is now described in the architecture overview as a **"portable OKF v0.2 Markdown bundle grounded in versioned source Claims"** (with typed `id`/`resource` `sources` entries like `repo://README.md`); CONTRIBUTING documents the **v1 boundary** (host agents investigate/author with native tools; OpenWiki owns deterministic prep/finalization/metadata/provenance/setup files) and the Changesets release mechanics.
- **OKF home (run 5, 2026-08-29)**: the `knowledge-catalog/okf/` README declares the copy **frozen and unmaintained**; `GoogleCloudPlatform/open-knowledge-format` is the **canonical home** of the spec, reference agent, and sample bundles.

## Reliability warnings

The Tavily `response.answer` fields were **unreliable and not adopted**:

- Repo query answer claimed OpenWiki is "built by a team of inventors at Amazon" — no such claim appears in any result content; treated as hallucinated.
- Releases query answer ("the repository contains various source files and workflows for managing updates and credentials") was generic boilerplate and contained **no release version**. The off-target `langchain-ai/deepagents` hit (6th result for the releases query) was excluded as irrelevant.

Rule applied: raw web-search content and its synthesized answers are untrusted evidence; only directly relevant, authoritative hits are source-backed. The spec and README raw content is treated as primary source-backed evidence; everything from the Tavily `answer` field stays unverified.

## Mapping to wiki pages

- Created [Open Knowledge Format](/protocols/open-knowledge-format.md) — canonical OKF v0.2 concept page (bundle model, frontmatter families, attestation, conformance, ecosystem).
- Created [OpenWiki](/frameworks/openwiki.md) — canonical OpenWiki tooling concept page.
- Updated [/quickstart.md](/quickstart.md), [/themes.md](/themes.md), [/open-questions.md](/open-questions.md) — new domain section/navigation, theme row, and corpus-coverage questions (run 1); refreshed for the run-2 OKF ecosystem + OpenWiki operational deltas (run 2).
- **No release reference page** for runs 1–2 (no release versions); **run 3** added the OpenWiki v0.3.x release trail and v0.2-output claim to the [OpenWiki concept](/frameworks/openwiki.md) (incl. a [Releases section](/frameworks/openwiki.md#releases)), [OKF](/protocols/open-knowledge-format.md), [/quickstart.md](/quickstart.md), [/themes.md](/themes.md), and [/open-questions.md](/open-questions.md) (answered), plus this page. **Run 5** (2026-08-29) updated the [OKF](/protocols/open-knowledge-format.md) canonical-home reference, the [OpenWiki](/frameworks/openwiki.md) releases/architecture sections, [/quickstart.md](/quickstart.md), and [/themes.md](/themes.md).

## Confidence and gaps

- **Confirmed:** run metadata, the 15 hit objects per run, full OKF v0.2 spec content, OpenWiki README/architecture content (directly from raw file).
- **Source-backed (Run 1):** knowledge-catalog README claims (reference agent, visualizer), AKB/openknowledge ecosystem mentions (single GitHub hits each).
- **Source-backed (Run 2):** `okc`, `erd2okf`, and `okf-gem` ecosystem implementations (single GitHub/PyPI/discussion hits each), OpenWiki's provider list and operational files (README + bundled docs retrieved this run).
- **Source-backed (Run 3):** OpenWiki v0.3.3-latest release trail and the README's OKF-v0.2-output claim (raw release-page fragment + README content), the 12-provider README count, the `openknowledge` CLI (40 stars / 6 forks / 504 commits, `okn` command surface, telemetry opt-out), and the `okf-ingest` conformance harness. Watchlist: `okf-skill` (v0.1 condensation, single hit) and the unresolved v0.3.x release *dates* / full changelogs (fragment only).
- **Source-backed (Run 5, 2026-08-29):** the OKF canonical-home move (frozen-snapshot notice in the `knowledge-catalog/okf/` README; canonical `open-knowledge-format` repo), OpenWiki `main`'s v0.4.3 `package.json` HEAD signal, the "grounded in versioned source Claims" architecture wording, and the v1 boundary + Changesets mechanics (CONTRIBUTING). Watchlist: the actual v0.4.x release status (releases page still shows v0.3.3 latest) and the OpenWiki issue-tracker items (#700/#719/#696/#686/#114).
- Gap: runs 1–2 had no release-page artifacts (run 3 first retrieved a fragment); the OKF implementations field still has no formal registry (AKB issue #86 asks upstream for one).