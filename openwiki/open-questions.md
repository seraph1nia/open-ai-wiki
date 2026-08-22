---
type: Reference
title: Open Questions
description: Active, answered, and stale questions about the AI knowledge wiki's coverage and memory graph, including gaps in evidence about projects tracked in this corpus (e.g. Effect's deep Workflow/Activity API semantics, generative-UI SDK version resources). OpenWiki's OKF version and current-release questions are now answered (v0.3.3, OKF v0.2 output).
tags: [open-questions, memory-graph, wiki-quality, okf, openwiki]
timestamp: 2026-08-22
---

# Open Questions

## Active

### effect-durable-execution: What are the exact Workflow / Activity primitive semantics in Effect v4?
- Owner: unknown
- Seen: 2026-08-22
- Evidence: [Effect page](/frameworks/effect.md) — the v4 beta recap confirms `DurableQueue` ported from v3 to v4 with persistent semantics, workflow suspension/failure fixes, and `@effect/workflow` in alpha; the 2026-08-18 pull re-confirmed the v4 beta launch (2026-02-18) and v3 feature-freeze; the 2026-08-22 pull re-confirmed the official recap + This Week in Effect 116 and gave the community gist's STM transactional collections (`TxHashMap`/`TxHashSet`/`TxQueue`/`TxChunk`/`TxSemaphore`) another supporting data point, but the precise Workflow/Activity primitive semantics and packaging are still not fully retrieved.
- Notes: The core semantics question is now largely **answered** (see Answered); this narrower gap remains for the deep Workflow/Activity API surface. The 2026-08-22 durable-execution query again returned no on-target official v4 workflow docs — only the recap, the newsletter, and off-target material. Confidence: watchlist — target the official v4 workflow docs directly before fully promoting.

### generative-ui-sdk-versions: Do the AG-UI / CopilotKit SDK versions and A2UI v1.0 match the release resources?
- Owner: unknown
- Seen: 2026-08-18
- Evidence: Version-adjacent claims — CopilotKit issue #2840's `@copilotkit/runtime@1.10.6` / `@ag-ui/client@0.0.41` peer conflict (watchlist bug), the A2UI v1.0 candidate spec (incl. its `AccessibilityAttributes`), and AG-UI Java/Go/Kotlin SDK package structure — come from docs/README/issues, not formal release files. The 2026-08-17, 2026-08-18, and 2026-08-22 re-pulls re-surfaced the SDK docs tree (including `docs/sdk/kotlin/overview.mdx`) but no package registry/release resources. See [web-search generative-UI source page](/sources/web-search-generative-ui.md) and the [AG-UI](/protocols/ag-ui.md) / [OpenUI](/frameworks/openui.md) pages.
- Notes: This is a corpus-coverage gap (version claims not yet cross-checked against release resources), matching the existing backlog entry in [quickstart](/quickstart.md). The 2026-08-22 re-pull returned no release/registry material, so it remains open. Watchlist confidence.

## Answered

### effect-durable-execution: What exactly are Effect v4's Workflow, Activity, and DurableQueue semantics?
- Evidence: [Effect page](/frameworks/effect.md) — the 2026-08-16 web-search Factory tools run retrieved the official Effect v4 beta February–May recap, which documents `DurableQueue` ported from v3 to v4 (persistent queue semantics), workflow suspension/failure fixes, and `@effect/workflow` delivering durable workflows in alpha. The earlier gap entry (off-target `NousResearch/hermes-agent` hit) is superseded. See [web-search Factory tools source page](/sources/web-search-factory-tools.md).
- Answered: 2026-08-16

### pierre-project: What is `pierrecomputer/pierre` and does it publish releases?
- Evidence: [Pierre page](/frameworks/pierre.md) — the repo README ("pierre's open source code") and org ("The Pierre Computer Company") answered its identity, and the `@pierre/diffs` v1.3.0 release answered the releases question. Grounded in [web-search Factory tools evidence](/sources/web-search-factory-tools.md).
- Answered: 2026-08-16

### openwiki-okf-version: Which OKF version does OpenWiki actually emit — v0.1 or v0.2?
- Evidence: The [OpenWiki README](/frameworks/openwiki.md) now declares **"OpenWiki emits Google Open Knowledge Format (OKF) v0.2 bundles in both modes"** (retrieved 2026-08-22; the earlier v0.1 declaration on `main` is superseded). The upstream [OKF spec](/protocols/open-knowledge-format.md) is at v0.2 (2026-07-24 SPEC.md revision), so README and spec now align. The ecosystem split shrinks to producer-side only: `okc` and the legacy `timestamp` frontmatter target v0.1, while `okf-gem` and OpenWiki target v0.2; `okf-ingest` supports both via the §13 fallback.
- Answered: 2026-08-22

### openwiki-current-release: What is the current released OpenWiki version (npm), and what does the release trail contain?
- Evidence: The [OpenWiki releases page](https://github.com/langchain-ai/openwiki/releases) fragment (retrieved 2026-08-22) is **v0.3.3 Latest** — the v0.3.x line (v0.3.2, v0.3.1, v0.3.0) above v0.2.5, 0.2.4, 0.2.3, 0.2.2, 0.2.1, 0.2.0 — with the v0.3.3 body listing Copilot-provider and multilingual-output features plus connector/retry fixes (see the [Releases section](/frameworks/openwiki.md#releases)). Engine stamps in generated bundles read `verified: by openwiki/0.3.3` (2026-08-21). Release dates and complete changelogs remain un-captured.
- Answered: 2026-08-22

## Stale

_None yet._