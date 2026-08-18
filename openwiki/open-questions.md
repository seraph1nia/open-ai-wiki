---
type: Reference
title: Open Questions
description: Active, answered, and stale questions about the AI knowledge wiki's coverage and memory graph, including gaps in evidence about projects tracked in this corpus (e.g. Effect's deep Workflow/Activity API semantics, version alignment between OKF v0.2 and the OpenWiki README, and OpenWiki's current release).
tags: [open-questions, memory-graph, wiki-quality, okf, openwiki]
timestamp: 2026-08-18
---

# Open Questions

## Active

### effect-durable-execution: What are the exact Workflow / Activity primitive semantics in Effect v4?
- Owner: unknown
- Seen: 2026-08-18
- Evidence: [Effect page](/frameworks/effect.md) — the v4 beta recap confirms `DurableQueue` ported from v3 to v4 with persistent semantics, workflow suspension/failure fixes, and `@effect/workflow` in alpha; the 2026-08-18 pull re-confirmed the v4 beta launch (2026-02-18) and v3 feature-freeze, but the precise Workflow/Activity primitive semantics and packaging are still not fully retrieved. A community gist adds STM transactional collections (`TxHashMap`/`TxHashSet`/`TxQueue`/`TxChunk`/`TxSemaphore`) as watchlist only.
- Notes: The core semantics question is now largely **answered** (see Answered); this narrower gap remains for the deep Workflow/Activity API surface. Confidence: watchlist — target the official v4 workflow docs directly before fully promoting.

### generative-ui-sdk-versions: Do the AG-UI / CopilotKit SDK versions and A2UI v1.0 match the release resources?
- Owner: unknown
- Seen: 2026-08-18
- Evidence: Version-adjacent claims — CopilotKit issue #2840's `@copilotkit/runtime@1.10.6` / `@ag-ui/client@0.0.41` peer conflict (watchlist bug), the A2UI v1.0 candidate spec (incl. its `AccessibilityAttributes`), and AG-UI Java/Go/Kotlin SDK package structure — come from docs/README/issues, not formal release files. The 2026-08-17 and 2026-08-18 re-pulls re-surfaced the SDK docs tree (including `docs/sdk/kotlin/overview.mdx`) but no package registry/release resources. See [web-search generative-UI source page](/sources/web-search-generative-ui.md) and the [AG-UI](/protocols/ag-ui.md) / [OpenUI](/frameworks/openui.md) pages.
- Notes: This is a corpus-coverage gap (version claims not yet cross-checked against release resources), matching the existing backlog entry in [quickstart](/quickstart.md). Watchlist confidence.

### openwiki-okf-version: Which OKF version does OpenWiki actually emit — v0.1 or v0.2?
- Owner: unknown
- Seen: 2026-08-18
- Evidence: The [OpenWiki README](/frameworks/openwiki.md) advertises "Open Knowledge Format (OKF v0.1) output", while the upstream [OKF spec](/protocols/open-knowledge-format.md) is at **v0.2** (2026-07-24 SPEC.md revision). The 2026-08-17 and 2026-08-18 web-search Agent wiki runs retrieved repository docs, not release artifacts, so the emitted version could not be confirmed. The ecosystem is split: `okc` and the legacy `timestamp` frontmatter target v0.1, while `okf-gem` explicitly "speaks OKF v0.2".
- Notes: Affects how producers/consumers treat this corpus (v0.1 fallbacks like legacy `timestamp` and `# Citations`). Resolve by direct release-file ingestion of `langchain-ai/openwiki` or its `src/okf/` source. Watchlist confidence.

### openwiki-current-release: What is the current released OpenWiki version (npm), and what does the release trail contain?
- Owner: unknown
- Seen: 2026-08-18
- Evidence: The OpenWiki repo shows a Changesets release flow (`CHANGELOG.md`, `chore: version packages` PRs), but the 2026-08-17 and 2026-08-18 web-search Agent wiki runs returned **no release artifacts** — only repository docs (README, quickstart, architecture overview, credentials/CI page). Current npm version and release dates are unknown.
- Notes: Direct release ingestion of `langchain-ai/openwiki/releases` would close this; both runs' Tavily `answer` fields were hallucinated/generic and rejected. Watchlist confidence.

## Answered

### effect-durable-execution: What exactly are Effect v4's Workflow, Activity, and DurableQueue semantics?
- Evidence: [Effect page](/frameworks/effect.md) — the 2026-08-16 web-search Factory tools run retrieved the official Effect v4 beta February–May recap, which documents `DurableQueue` ported from v3 to v4 (persistent queue semantics), workflow suspension/failure fixes, and `@effect/workflow` delivering durable workflows in alpha. The earlier gap entry (off-target `NousResearch/hermes-agent` hit) is superseded. See [web-search Factory tools source page](/sources/web-search-factory-tools.md).
- Answered: 2026-08-16

### pierre-project: What is `pierrecomputer/pierre` and does it publish releases?
- Evidence: [Pierre page](/frameworks/pierre.md) — the repo README ("pierre's open source code") and org ("The Pierre Computer Company") answered its identity, and the `@pierre/diffs` v1.3.0 release answered the releases question. Grounded in [web-search Factory tools evidence](/sources/web-search-factory-tools.md).
- Answered: 2026-08-16

## Stale

_None yet._