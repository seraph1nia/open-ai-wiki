---
type: Reference
title: Pierre (Pierre Computer Company)
description: Pierre is the open-source TypeScript toolkit from the Pierre Computer Company for diffs, trees, and memes, including the @pierre/diffs library that renders and edits file diffs; maintained at github.com/pierrecomputer/pierre.
resource: https://github.com/pierrecomputer/pierre
tags: [pierre, diffs, sdlc, toolkit, typescript]
timestamp: 2026-08-16
---

# Pierre (Pierre Computer Company)

**Pierre** is the open-source project of **The Pierre Computer Company** (`@pierrecomputer`), described in-repo as "pierre's open source code". It is a TypeScript monorepo (apps + packages) whose library surface centers on **diffs**, **trees**, and custom components, with a companion theme package (`pierrecomputer/theme`, a custom theme for VS Code, Zed, and Shiki built on Pierre's color scheme).

Source: [`pierrecomputer/pierre`](https://github.com/pierrecomputer/pierre). Evidence for this page lives on the [web-search Factory tools source page](/sources/web-search-factory-tools.md).

## Position in the factory toolchain

Pierre is the **diff / file-presentation and editing layer** of the [agentic SDLC factory toolchain](/concepts/factory-toolchain.md): it renders the file diffs and multi-file changeset views that coding agents produce, and (as of `@pierre/diffs` v1.3.0) edits them in place. It is complementary to the [ACP](/protocols/agent-client-protocol.md) and [AHP](/protocols/agent-host-protocol.md) wire/state protocols and to the [t3code](/frameworks/t3code.md) control surface rather than a competing protocol.

## The diff library and v1.3.0 ("the Edit release")

`@pierre/diffs` is the library "that renders your diffs and files". Version **v1.3.0** was released via `@amadeus` (commit `0f60018`). Highlights from the release:

- **Edit capability** — any rendered `File`, `FileDiff`, `MultiFileDiff`, `PatchDiff`, or `CodeView` item can switch into a real, in-place code editor with the same DOM, syntax highlighting, and virtualization; includes find & replace, multiple cursors, markers, and undo history.
- **On-demand loading** of full file contents for patch-based diffs (improves large-file performance — a known pain point, see issue #273 on diff lag).
- Added/deleted-file support in more places; custom header/footer regions for `CodeView`; a batch of rendering and virtualization fixes.

Project repo metadata (path listing) shows a pnpm/moon workspace with `packages/`, `apps/`, and a `skills/` directory, plus `AGENTS.md`/`CLAUDE.md` — a modern, agent-native monorepo layout.

## Confidence and gaps

- **Source-backed:** the repo's existence, TypeScript/monorepo nature, `@pierre/diffs` v1.3.0 release content, and focus on diffs/trees (retrieved from the GitHub repo and releases pages this run).
- **Watchlist:** the Tavily `answer` fields (e.g. "over 6,000 stars", focus claims) are synthesized and not independently verified; treat star counts as unconfirmed.
- Gap: the repository and its releases resource were only witnessed via web-search results this run, not ingested directly. Direct repo/release ingestion would confirm version history and cadence.

## Activity signals (2026-08-16 run, watchlist)

- Open issue #331 proposes a `collapsed` prop / collapse–expand control for individual file diffs — consistent with large-file diff performance concerns (issue #273: loading-state request for thousands-of-lines diffs).
- Open bug issue #450: `FileContent.lang` override does not change syntax highlighting in `@pierre/diffs` — a concrete library bug report.
- A companion `pierrecomputer/sdk` ("Code Storage SDKs") exists alongside the main repo and an `icons` repo, indicating a growing org surface.