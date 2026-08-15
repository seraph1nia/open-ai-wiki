# AI Knowledge

A production-oriented, self-updating technical wiki for AI protocols, agent frameworks, interoperability standards, and related tooling. Acquisition, evaluation, extraction, candidate review, wiki synthesis, and static rendering are separate layers. The canonical knowledge base is plain OKF-compatible Markdown in `openwiki/`; Astro renders it but never owns a second copy.

## Quickstart

Requirements: Git, a supported shell, and [mise](https://mise.jdx.dev/). mise installs the repository's pinned Node.js and pnpm versions, so neither needs a separate global installation.

```bash
git clone <repository>
cd ai-knowledge

mise install
pnpm install

pnpm dev
```

If you want the pinned tools available automatically in your shell, follow mise's shell integration instructions and run the activation hook appropriate for that shell, for example `mise activate zsh`.

Common commands:

```bash
mise install
pnpm install
pnpm dev
pnpm ingest https://example.com
pnpm ingest https://github.com/org/repo
pnpm ingest https://youtube.com/watch?v=...
pnpm ingest https://example.com -- --dry-run
pnpm harvest -- --dry-run
pnpm typecheck
pnpm test
pnpm lint
pnpm wiki:check
pnpm wiki:visualize
pnpm format
pnpm build
```

This repository supports pnpm exclusively. The root scripts route work to the correct workspace package.

## How it works

```text
Official sources, search, GitHub, articles, video
                    │
                    ▼
            source acquisition
                    │
                    ▼
      relevance and novelty classification
                    │
                    ▼
      deduplication + structured extraction
                    │
                    ▼
       auditable ingestion/inbox candidate
                    │
                    ▼
       official OpenWiki code-mode synthesis
                    │
                    ▼
                openwiki/
                 ├─ Astro → GitHub Pages
                 └─ personal OpenWiki input
```

Manual ingestion and scheduled harvesting call the same acquisition, normalization, scoring, deduplication, extraction, and synthesis functions. Arbitrary source text never writes directly to the wiki. Accepted candidates are recorded under `ingestion/inbox/`. Candidate records refer to normalized inputs by canonical source URL and SHA-256 content hash while retaining the structured extraction and evidence instead of committing a second copy of the source body.

## OpenRouter configuration

Put your key in a root `.env` as `OPENROUTER_API_KEY=...`, or export it in the shell before ingestion. The ingestion CLI loads the root `.env` automatically. The key is used only by the command-line ingestion package and CI; it is never included in Astro code or site output.

All model-backed stages use the fixed OpenRouter model `deepseek/deepseek-v4-flash-0731` by default, including discovery, ranking, extraction, and official OpenWiki synthesis. The dated slug is used because OpenWiki's current model-ID validator does not accept OpenRouter's leading-tilde aliases. Override `OPENWIKI_MODEL_ID` only with an ID supported by both OpenRouter and OpenWiki. `OPENROUTER_BASE_URL`, `OPENROUTER_APP_NAME`, and `OPENROUTER_HTTP_REFERER` are optional. Tests inject mocked model and OpenWiki runners and make no paid calls.

Discovery uses OpenRouter's Responses API and `openrouter:web_search` server tool for broad research, plus the GitHub Releases API for deterministic checks of official tracked repositories. GitHub authentication is optional locally but recommended for rate limits.

## Interests and scoring

Edit `ingestion/config/interests.yaml` to add topics, exclusions, preferred source classes, official repositories, scoring weights, or the acceptance threshold. Scores are weighted by relevance (35%), novelty (30%), authority (20%), and technical depth (15%) by default. Items below 0.75 are retained in `ingestion/state/seen.json` as rejected decisions, preventing repeated reconsideration.

State format version 1 records the last successful harvest, canonical URLs, content hashes, publication dates, decisions, and scores. This repository state remains JSON and is separate from OpenWiki's private LangGraph conversation checkpoint at `~/.openwiki/openwiki.sqlite`; the checkpoint is runtime state, not a second knowledge base.

## Manual ingestion and dry runs

```bash
pnpm ingest https://example.com/technical-article
pnpm ingest https://github.com/org/repo/releases/tag/v1.2.3
pnpm ingest https://youtube.com/watch?v=...
```

Web pages are reduced to readable content and metadata. GitHub acquisition selects the README plus bounded architecture, specification, changelog, and docs files instead of transmitting an entire repository. YouTube acquisition keeps transcript offsets and fails with a useful message when neither captions nor a substantive description are available.

Add `-- --dry-run` to manual ingestion or harvesting to print scores and an official OpenWiki sandbox diff without changing `openwiki/`, the inbox, or persistent state. Dry runs still invoke the configured models and can incur provider usage:

```bash
pnpm ingest https://example.com -- --dry-run
pnpm harvest -- --dry-run
```

## OpenWiki and OKF

The wiki follows current OpenWiki OKF v0.1 conventions: the root `index.md` declares `okf_version: "0.1"`; nested indexes and `log.md` are reserved documents; concept documents have a non-empty `type`; normal Markdown links express relationships; and unknown producer extension fields are accepted and preserved.

OpenWiki `0.3.3` is pinned in the pnpm lockfile. `ingestion/src/openwiki.ts` isolates it behind `synthesizeCandidate(candidate)`: every accepted candidate is staged in a temporary Git repository, then the official `openwiki code --update --print` lifecycle searches and edits the wiki. Its OKF migration, frontmatter middleware, index synchronization, internal-link pass, Mermaid validation, update metadata, and managed `AGENTS.md`/`CLAUDE.md` integration therefore remain active.

The sandbox is also the write boundary. After OpenWiki exits, the pipeline rejects changes outside `openwiki/`, `AGENTS.md`, and `CLAUDE.md`, rejects edits to `openwiki/INSTRUCTIONS.md`, blocks deletion of existing knowledge, requires a provenance page for durable changes, and runs deterministic validation before copying approved output back. `.openwikiignore` prevents the agent from reading credentials, Git internals, dependency trees, build output, and scheduler state.

`pnpm wiki:check` is the non-model CI quality gate. It uses OpenWiki's current frontmatter and Mermaid validators, then adds strict broken-link, directory-index, root-version, degradation-marker, and source-provenance checks. Both Pages deployment and harvest PRs must pass it.

OpenWiki also includes a local interactive reader and graph. It is optional and does not replace Astro or publish anything:

```bash
pnpm wiki:visualize
```

The separate OpenWiki personal mode still stores its configuration and wiki under `~/.openwiki/`. It is not part of this repository pipeline; configure its local `git-repo` connector if you want a personal wiki to consume this repository.

`openwiki/INSTRUCTIONS.md` is the durable editorial brief. Edit it to tune synthesis intent without changing application code.

To use this knowledge base with a personal OpenWiki installation, clone the repository and configure OpenWiki personal mode's local git-repository connector to include this repository (or the `openwiki/` directory). The directory is also portable to any OKF v0.1-aware reader without conversion.

## Astro site

Astro's content layer loads `../../openwiki/**/*.md` directly. Build-time utilities create collection routes, internal relationships, automatic backlinks, and a lightweight client-side search index over titles, descriptions, bodies, tags, and types. OpenWiki has a local visualizer but no production static publishing step, so Astro remains the read-only GitHub Pages renderer. No server or API key exists in the deployed site.

```bash
pnpm dev
pnpm build
```

The homepage reports topic counts, featured protocols/frameworks, recent updates, and recent sources. Source pages expose original links, authorship or repository identity, publication date, retrieval date, source type, and derived concepts.

## Scheduled harvesting

`.github/workflows/harvest.yml` runs daily at 06:00 UTC and can be dispatched manually. It installs the exact mise toolchain and pinned OpenWiki runtime, restores the pnpm store, performs discovery and official OpenWiki synthesis, validates the wiki and repository, and opens a review pull request with the generated human-readable summary. It never auto-merges. OpenWiki telemetry is disabled in this workflow.

For a public repository, open **Settings → Secrets and variables → Actions → New repository secret**, create a secret named `OPENROUTER_API_KEY`, and paste only the key as its value. Do not add it as an Actions variable, commit it to `.env.example`, paste it into workflow YAML, or expose it through an Astro `PUBLIC_` variable. The local `.env` is ignored by git. The harvest job receives the secret only at runtime, and GitHub does not provide repository secrets to workflows triggered from forks.

The built-in workflow token supplies GitHub API access and pull-request creation. If repository policy prevents workflow tokens from opening pull requests, enable that permission under Actions settings or replace the token with a narrowly scoped repository secret. Avoid adding `pull_request_target` triggers to secret-bearing workflows.

## GitHub Pages

Before the first deployment, open **Settings → Pages → Build and deployment** in the GitHub repository and select **GitHub Actions** as the source. This one-time step creates the Pages site; without it, `actions/configure-pages` returns `404 Not Found`. The normal workflow token deliberately cannot enable Pages on a new repository, so no extra administrative token is required or recommended for this setup.

After Pages is enabled, `.github/workflows/pages.yml` typechecks, tests, builds, uploads the static artifact, and deploys after every push to `main`. Astro derives a project-repository base path from `GITHUB_REPOSITORY`, so assets and navigation work at `https://USERNAME.github.io/REPOSITORY/`.

For a custom domain, set the repository Actions variable `CUSTOM_DOMAIN` to the hostname and add the appropriate DNS records. Create `apps/web/public/CNAME` containing that hostname if your Pages configuration requires a committed CNAME. When `CUSTOM_DOMAIN` is set, Astro uses `/` as its base. Do not include a protocol in the variable.

## Repository layout

- `openwiki/` — canonical OKF Markdown knowledge
- `ingestion/src/` — discovery, source adapters, scoring, dedupe, extraction, inbox, and synthesis
- `.openwikiignore` — OpenWiki agent read boundary
- `AGENTS.md` and `CLAUDE.md` — official OpenWiki-managed agent pointers
- `ingestion/config/interests.yaml` — editable editorial scope and weights
- `ingestion/state/seen.json` — incremental discovery state and prior decisions
- `apps/web/` — Astro static renderer only
- `.github/workflows/` — reviewed harvest PRs and Pages deployment

## Quality and security

Strict TypeScript, OpenWiki's write middleware, deterministic wiki validation, linting, formatting, mocked unit tests, a frozen lockfile in CI, bounded acquisition, content hashes, canonical URLs, sandboxed synthesis, and an auditable candidate boundary protect the pipeline. Acquired content is treated as untrusted evidence. Secrets belong only in environment variables or GitHub Actions secrets and must never use a public Astro environment prefix.
