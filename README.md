# AI Knowledge

A small, Git-native knowledge wiki for AI protocols, frameworks, concepts, and references. [OpenWiki](https://github.com/langchain-ai/openwiki) personal mode ingests configured external sources; [Astro](https://astro.build/) renders the resulting OKF Markdown as a static site.

There is no database, ingestion service, or second content model.

## Setup

Requirements are Git, Bash, rsync, and [mise](https://mise.jdx.dev/). The repository uses pnpm exclusively.

```bash
mise install
pnpm install
pnpm dev            # or: pnpm exec vp run -r dev
```

The repository-level `mise.toml` adds `node_modules/.bin` to `PATH`, so installed commands such as `openwiki`, `vp`, and `astro` resolve directly whenever mise is active.

`mise.toml` pins the provider (`OPENWIKI_PROVIDER=openrouter`) and model (`OPENWIKI_MODEL_ID`) and loads a gitignored `.env`, so a model-backed command needs `OPENROUTER_API_KEY` there or in the environment. External Web Search ingestion also requires `TAVILY_API_KEY`. OpenWiki may store local provider credentials under `~/.openwiki/`; credentials are used by the CLI only and are never copied into the repository or exposed to Astro.

The publishing wrapper claims the machine-wide personal OpenWiki workspace with `~/.openwiki/.ai-knowledge-publisher`. It refuses to overwrite an existing unclaimed personal configuration or wiki because everything in that wiki would otherwise be eligible for publication. Use a dedicated account or CI runner if the machine already has an unrelated personal OpenWiki.

## Knowledge model

The `openwiki/` directory is an Open Knowledge Format v0.1 bundle:

- Every Markdown document other than `index.md`, `log.md`, and `INSTRUCTIONS.md` is a concept.
- `type` is the only required concept field and remains free-form.
- External material is normally a `type: Reference` concept with its canonical URI in `resource`.
- Ordinary Markdown links express relationships between concepts.
- OpenWiki maintains directory indexes and update metadata.

The current directories—`concepts/`, `frameworks/`, `protocols/`, `references/`, and `sources/`—are organizational choices, not application schemas. Astro discovers them from OpenWiki’s indexes instead of hard-coding a taxonomy.

`openwiki/INSTRUCTIONS.md` is the durable editorial brief. The wrapper installs it as the personal wiki goal before every run, keeping OpenWiki focused on external evidence and preventing this repository’s implementation from becoming an ingestion source. It also binds the agent to `openwiki/sources/blog-post-ledger.md`, the append-only record of every blog post already considered, so followed feeds are ingested once rather than re-summarized on each run.

`config/openwiki/onboarding.json` is the committed, non-secret personal-source configuration. It currently defines four Web Search source instances—Factory tools, Generative UI, Agent wiki, and Agent integration protocols—each with its own ingestion goal, domain allowlist, and query set. Edit that file to change query coverage or add supported personal-mode connectors; keep credentials in environment variables or OpenWiki’s private local configuration.

`.openwikiignore` bounds what the agent may read: secrets, `changelog/`, spilled `large_tool_results/`, and generated or private directories are never visible to it.

## Add and update knowledge

Use the official OpenWiki CLI through the repository scripts.

Ingest every configured external source and reconcile the published wiki:

```bash
pnpm wiki:ingest
```

`pnpm wiki:update` without a request performs the same ingestion run. Pass a source-instance id to ingest one source instead of all of them:

```bash
pnpm wiki:ingest web-search-generative-ui
```

Start an interactive personal-mode OpenWiki session with:

```bash
pnpm wiki
```

`pnpm wiki:visualize` renders the bundle's link graph and `pnpm wiki:help` prints the CLI's own help.

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

`changelog/` is the wiki's change history, rendered by the site at `/whats-new`, at one permalink per run under `/whats-new/<date>-<time>/`, and as a feed at `/whats-new.xml`. It is derived from Git rather than maintained by OpenWiki: `openwiki/` is mirrored with `rsync --delete` on every run, so nothing hand-written survives inside it, and an agent-authored log could silently rewrite its own past. OKF reserves the file name `log.md` but defines no schema or generator for it, and the OpenWiki CLI has no changelog command, so this is the repository's own.

Record the current run after ingesting:

```bash
pnpm wiki:ingest
pnpm wiki:changelog
```

That writes one immutable fragment, `changelog/<date>-<time>.json`, holding an entry per changed page—direction (new, updated, removed), title, line counts, and a one-line summary—plus a `narrative`, two to four sentences about the run as a whole. Which pages changed and by how much comes from the diff. Only the prose is model-written, from `OPENROUTER_API_KEY` and `OPENWIKI_MODEL_ID`, and both parts degrade rather than fail: without a key, or if the call fails, each summary falls back to the page's own `description` and the narrative is omitted, because a changelog is not worth failing an ingestion run over. One request produces both. Pass `--no-ai` to skip it, and `--markdown <file>` to also write the summary the update pull request uses as its body, which leads with the narrative.

Directory indexes, `sources/`, and `large_tool_results/` are excluded as ingestion bookkeeping, and an edit under fifteen changed lines is recorded as minor, so the feed collapses it into a footnote instead of announcing it.

The site groups the feed by run rather than by calendar day: two runs on one day are two updates, each with its own narrative and its own page. The home page carries the three most recent notable changes above the fold, so the wiki opens on what is new.

Backfilled fragments never call a model, so they carry page descriptions and no narrative. Bootstrap the feed from history that predates it with a one-time backfill, keyed by commit:

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
pnpm exec vp run fmt:astro        # format .astro with Prettier
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

Generated content that fails those rules is repaired by regenerating it, never
by relaxing them:

```bash
pnpm wiki:validate-repair
```

`scripts/wiki-validate-repair.ts` runs `lint:wiki`, and while the corpus is
invalid it hands the validator's exact findings back to OpenWiki through
`pnpm wiki:update`, as a repair-only brief: fix these findings, do not ingest new
sources, do not make unrelated edits, and fix the underlying problem rather than
deleting the marker that reports it. It revalidates after each pass and gives up
after three, so a corpus OpenWiki cannot fix — or a repair command that fails —
fails the run instead of reaching a pull request. OpenWiki generates and repairs,
the validator decides, this orchestrator retries or aborts.

Run `pnpm exec vp config` once if you want the pre-commit hook that applies the
`staged` rules from `vite.config.ts`.

The site is Astro + [Starlight](https://starlight.astro.build/), themed with `starlight-theme-galaxy`. Starlight's `docs` collection is sourced from `openwiki/**/*.md` rather than `src/content/docs/`, through the adapter in `apps/web/src/okf/`: a loader that supplies the titles OKF omits on generated indexes, a schema that extends Starlight's with the OKF fields so producer extensions survive validation, and a remark plugin that rewrites bundle-relative and corpus-absolute `.md` links to clean URLs under the Pages base path. `starlight-tags` surfaces the `tags` OKF writes on every page, `astro-mermaid` renders `mermaid` code fences, and Starlight contributes the sidebar, heading anchors, and the static client-side search index.

A second `changelog` collection reads `changelog/*.json` for the `/whats-new` pages and the feed. Two routes live outside the corpus and are written by hand: `src/pages/index.astro`, which takes `/` over from the generated OKF root index and renders Starlight's `splash` template—a hero over the latest changes—and `src/pages/whats-new/`, the combined feed and the per-run permalinks.

## Automation

`.github/workflows/openwiki-update.yml` runs scheduled personal-mode Web Search ingestion twice a week—Thursday and Saturday nights UTC—and on manual dispatch. It ingests with `--scheduled`, validates and repairs the bundle, records the run's changelog fragment, runs the full `vp run ci` sequence, and only then opens a review pull request containing only `openwiki/` and `changelog/`, using the generated summary as its body; it never auto-merges.

```text
pnpm wiki:ingest -- --scheduled
pnpm wiki:validate-repair     # lint:wiki, repaired by OpenWiki, up to three times
pnpm wiki:changelog -- --markdown …
pnpm exec vp run ci
create-pull-request
```

Each stage is a gate: the pull request only exists if the corpus validates and the whole repository still passes CI. Application, test and build failures from that CI run fail the update; they are not handed to the OpenWiki repair loop, which exists only for the deterministic wiki findings.

`.github/workflows/ci.yml` runs the full `vp` validation sequence — format, lint, wiki validation, type check, tests, and build — on every pull request.

It does not cover the generated OpenWiki pull requests, which is why the update workflow runs that sequence itself. `create-pull-request` pushes with the default `GITHUB_TOKEN`, and GitHub suppresses `pull_request` events from that token so a workflow cannot trigger further workflows; a PR the update job opens or updates therefore arrives with no checks attached. Before this was gated in the job, an invalid corpus merged unchecked and only failed later, in the Pages deploy on `main`.

`.github/workflows/pages.yml` runs that same sequence and then deploys the Astro site after changes reach `main`. Enable GitHub Pages with **GitHub Actions** as its source before the first deployment.

Scheduled OpenWiki updates read `OPENROUTER_API_KEY` and `TAVILY_API_KEY` as secrets on the `prd` environment, which is why the update job declares `environment: prd`. Keeping them there rather than at repository level means the environment's protection rules gate every run that can spend provider credit. A job that uses these keys without claiming the environment sees empty strings, not an error.

## Repository layout

- `openwiki/` — canonical OpenWiki/OKF knowledge bundle, plus `INSTRUCTIONS.md`, the editorial brief the wrapper installs before every run
- `changelog/` — one immutable fragment per update run, derived from Git
- `config/openwiki/onboarding.json` — public personal-mode connector configuration
- `apps/web/` — read-only Astro + Starlight static renderer
  - `src/okf/` — the OKF adapter: loader, schema, link rewriting, and route mapping
  - `src/content.config.ts` — the `docs` and `changelog` collections
  - `src/pages/index.astro` — the splash landing page and its what's-new digest
  - `src/pages/whats-new/` — the combined feed (`index.astro`) and one page per run (`[run].astro`)
  - `src/pages/whats-new.xml.ts` — the RSS feed
  - `src/components/` — the shared changelog entry and list markup
  - `src/starlight-route-data.ts` — route middleware fixing plugin-emitted sidebar hrefs
- `scripts/wiki-update.sh` — guarded personal-workspace staging and publication wrapper
- `scripts/wiki-changelog.ts` — records what a run changed, for `/whats-new`
- `scripts/wiki-lint.ts` — offline OKF validation of the bundle (`vp run lint:wiki`)
- `scripts/wiki-validate-repair.ts` — validates, and has OpenWiki repair its own findings (`pnpm wiki:validate-repair`)
- `vite.config.ts` — Vite+ tasks, including the `ci` sequence and the staged-file hooks
- `mise.toml` — Node and pnpm versions, `PATH`, and the OpenWiki provider variables
- `.github/workflows/` — scheduled knowledge updates, pull-request CI, and Pages deployment
