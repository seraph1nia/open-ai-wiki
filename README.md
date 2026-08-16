# AI Knowledge

A small, Git-native knowledge wiki for AI protocols, frameworks, concepts, and references. [OpenWiki](https://github.com/langchain-ai/openwiki) personal mode ingests configured external sources; [Astro](https://astro.build/) renders the resulting OKF Markdown as a static site.

There is no database, ingestion service, or second content model.

## Setup

Requirements are Git, Bash, rsync, and [mise](https://mise.jdx.dev/). The repository uses pnpm exclusively.

```bash
mise install
pnpm install
pnpm exec vp run -r dev
```

The repository-level `mise.toml` adds `node_modules/.bin` to `PATH`, so installed commands such as `openwiki`, `vp`, and `astro` resolve directly whenever mise is active.

Export the provider variables before running a model-backed command. External Web Search ingestion also requires `TAVILY_API_KEY`. OpenWiki may store local provider credentials under `~/.openwiki/`; credentials are used by the CLI only and are never copied into the repository or exposed to Astro.

The publishing wrapper claims the machine-wide personal OpenWiki workspace with `~/.openwiki/.ai-knowledge-publisher`. It refuses to overwrite an existing unclaimed personal configuration or wiki because everything in that wiki would otherwise be eligible for publication. Use a dedicated account or CI runner if the machine already has an unrelated personal OpenWiki.

## Knowledge model

The `openwiki/` directory is an Open Knowledge Format v0.1 bundle:

- Every Markdown document other than `index.md`, `log.md`, and `INSTRUCTIONS.md` is a concept.
- `type` is the only required concept field and remains free-form.
- External material is normally a `type: Reference` concept with its canonical URI in `resource`.
- Ordinary Markdown links express relationships between concepts.
- OpenWiki maintains directory indexes and update metadata.

The current directories—`concepts/`, `frameworks/`, `protocols/`, and `references/`—are organizational choices, not application schemas. Astro discovers them from OpenWiki’s indexes instead of hard-coding a taxonomy.

`openwiki/INSTRUCTIONS.md` is the durable editorial brief. The wrapper installs it as the personal wiki goal before every run, keeping OpenWiki focused on external evidence and preventing this repository’s implementation from becoming an ingestion source.

`config/openwiki/onboarding.json` is the committed, non-secret personal-source configuration. It currently defines Web Search queries for the tracked AI ecosystem topics. Edit that file to change query coverage or add supported personal-mode connectors; keep credentials in environment variables or OpenWiki’s private local configuration.

## Add and update knowledge

Use the official OpenWiki CLI through the repository scripts.

Ingest every configured external source and reconcile the published wiki:

```bash
pnpm wiki:ingest
```

`pnpm wiki:update` without a request performs the same ingestion run. Start an interactive personal-mode OpenWiki session with:

```bash
pnpm wiki
```

Add an external reference and update affected concepts:

```bash
pnpm wiki:update -- "Add https://example.com/article as a reference and update affected concepts."
```

Create or expand a canonical concept from existing references:

```bash
pnpm wiki:update -- "Create the canonical concept for agent memory, grounded in references already present."
```

Refresh one reference from its canonical resource:

```bash
pnpm wiki:update -- "Refresh references/example.md from its resource and reconcile linked concepts."
```

Reconcile the whole knowledge bundle:

```bash
pnpm wiki:update
```

The publishing wrapper seeds `~/.openwiki/wiki` from the committed bundle, installs the committed source configuration and editorial goal, runs either `openwiki ingest all` or `openwiki personal`, and copies the personal wiki back into `openwiki/` only after a successful run. OpenWiki never receives this repository’s code as an evidence source. Direct `openwiki` commands are available through mise, but use the pnpm wrappers when changes need to be published because they enforce the guarded synchronization boundary.

Treat generated changes like any other documentation change: inspect the diff, run the checks, and commit it. If a resource cannot be fetched, include the relevant notes or evidence in the update request rather than introducing a separate acquisition store.

## What's new

`changelog/` is the wiki's change history, rendered by the site at `/whats-new` and `/whats-new.xml`. It is derived from Git rather than maintained by OpenWiki: `openwiki/` is mirrored with `rsync --delete` on every run, so nothing hand-written survives inside it, and an agent-authored log could silently rewrite its own past.

Record the current run after ingesting:

```bash
pnpm wiki:ingest
pnpm wiki:changelog
```

That writes one immutable fragment, `changelog/<date>-<time>.json`, holding an entry per changed page: direction (new, updated, removed), title, line counts, and a one-line summary. Which pages changed and by how much comes from the diff. Only the summary is model-written, from `OPENROUTER_API_KEY` and `OPENWIKI_MODEL_ID`; without a key, or if the call fails, the entry falls back to the page's own `description`, because a changelog is not worth failing an ingestion run over. Pass `--no-ai` to skip the call, and `--markdown <file>` to also write the summary the update pull request uses as its body.

Directory indexes, `sources/`, and `large_tool_results/` are excluded as ingestion bookkeeping, and an edit under fifteen changed lines is recorded as minor, so the feed collapses it into a footnote instead of announcing it.

Bootstrap the feed from history that predates it with a one-time backfill, keyed by commit:

```bash
pnpm wiki:changelog -- --backfill
```

The scheduled workflow runs the same command between ingestion and the pull request, so a merged update carries its own changelog entry.

## Develop and validate

The toolchain is [Vite+](https://viteplus.dev). Its `vp` CLI provides formatting
(Oxfmt), linting and type checking (Oxlint), and tests (Vitest); it is
configured in the root `vite.config.ts`.

```bash
pnpm exec vp run ci          # everything the deploy pipeline runs
```

Or step by step:

```bash
pnpm exec vp check           # format, lint and type check .ts/.js
pnpm exec vp check --fix     # ... and fix what is fixable
pnpm exec vp run fmt:astro:check
pnpm exec vp run lint:astro
pnpm exec vp run lint:wiki   # OKF validation of openwiki/
pnpm exec vp run -r typecheck
pnpm exec vp test
pnpm exec vp run -r build
pnpm exec vp run -r dev
pnpm wiki:visualize
```

`.astro` components are formatted and linted by Prettier and ESLint, because
Oxfmt and Oxlint have no Astro parser yet; everything else goes through `vp`.
Generated `openwiki/**` content is excluded from both.

`lint:wiki` is the content counterpart to `vp lint`: `scripts/wiki-lint.ts`
validates the OKF bundle offline — root and directory indexes, OKF frontmatter,
source-page provenance, internal links and heading anchors, mermaid fences, and
leftover OpenWiki degradation markers. It needs no model or API key, so it gates
pull requests including the ones the scheduled workflow opens.

Run `pnpm exec vp config` once if you want the pre-commit hook that applies the
`staged` rules from `vite.config.ts`.

Astro uses one permissive content collection over `openwiki/**/*.md`. It validates standard OKF fields while preserving producer extensions, renders root and directory indexes at their natural routes, rewrites bundle-relative Markdown links for clean URLs and GitHub Pages base paths, and builds a static client-side search index.

## Automation

`.github/workflows/openwiki-update.yml` runs scheduled personal-mode Web Search ingestion every day and on manual dispatch. It opens a review pull request containing only generated OpenWiki content; it never auto-merges.

`.github/workflows/ci.yml` runs the full `vp` validation sequence — format, lint, wiki validation, type check, tests, and build — on every pull request, so the generated OpenWiki pull requests are checked before merge.

`.github/workflows/pages.yml` runs that same sequence and then deploys the Astro site after changes reach `main`. Enable GitHub Pages with **GitHub Actions** as its source before the first deployment.

Scheduled OpenWiki updates read `OPENROUTER_API_KEY` and `TAVILY_API_KEY` as secrets on the `prd` environment, which is why the update job declares `environment: prd`. Keeping them there rather than at repository level means the environment's protection rules gate every run that can spend provider credit. A job that uses these keys without claiming the environment sees empty strings, not an error.

## Repository layout

- `openwiki/` — canonical OpenWiki/OKF knowledge bundle
- `changelog/` — one immutable fragment per update run, derived from Git
- `config/openwiki/onboarding.json` — public personal-mode connector configuration
- `apps/web/` — read-only Astro static renderer
- `scripts/wiki-update.sh` — guarded personal-workspace staging and publication wrapper
- `scripts/wiki-changelog.ts` — records what a run changed, for `/whats-new`
- `scripts/wiki-lint.ts` — offline OKF validation of the bundle (`vp run lint:wiki`)
- `.github/workflows/` — scheduled knowledge updates and Pages deployment
