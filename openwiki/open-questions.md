---
type: Reference
title: Open Questions
description: Active, answered, and stale questions about the AI knowledge wiki's coverage and memory graph, including gaps in evidence about projects tracked in this corpus (e.g. Effect's deep Workflow/Activity API semantics, generative-UI SDK version resources). OpenWiki's OKF version and current-release questions are now answered (v0.3.3, OKF v0.2 output).
tags: [open-questions, memory-graph, wiki-quality, okf, openwiki]
timestamp: 2026-08-27
---

# Open Questions

## Active

### effect-durable-execution: What are the exact Workflow / Activity primitive semantics in Effect v4?
- Owner: unknown
- Seen: 2026-08-27
- Evidence: [Effect page](/frameworks/effect.md) — the v4 beta recap confirms `DurableQueue` ported from v3 to v4 with persistent semantics, workflow suspension/failure fixes, and `@effect/workflow` in alpha; the 2026-08-18 pull re-confirmed the v4 beta launch (2026-02-18) and v3 feature-freeze; the 2026-08-22 pull re-confirmed the official recap + This Week in Effect 116 and gave the community gist's STM transactional collections another supporting data point. The **2026-08-27 pull narrowed the gap**: the official **July 2026 recap** documents "fixed the activity retry policy" (confirming a retryable Activity surface), and **issue #6014** documents the exact Activity/Workflow replay model (dangerous `Effect.all({concurrency: N})` + `Activity.make` deadlock during durable replay; activity replay "worked" from the durable log) — but the full procedural primitive/API packaging of `@effect/workflow` is still not retrieved.
- Notes: The core semantics question is largely answered (see Answered); the Activity retry policy + a concrete replay edge case are now confirmed from official Effect sources, but the complete procedural `@effect/workflow` API surface and packaging remain un-retrieved. Confidence: watchlist — target the official v4 workflow docs directly before fully promoting.

### generative-ui-sdk-versions: Do the CopilotKit package versions and A2UI v1.0 GA match the release resources?
- Owner: unknown
- Seen: 2026-08-27
- Evidence: The **AG-UI side of this question is now answered** — the 2026-08-27 pull retrieved the AG-UI releases page with exact package/registry versions (latest release 2026-08-20): `@ag-ui/mastra@1.1.2`, `@ag-ui/langgraph@0.0.43`, `@ag-ui/langchain@0.0.3`, `@ag-ui/pydantic-ai@0.0.3`, `@ag-ui/ag2@0.0.2`, `@ag-ui/agno@0.0.6`, `@ag-ui/crewai@0.0.4`, `@ag-ui/llamaindex@0.2.0`, PyPI `ag-ui-langgraph==0.0.43`/`ag-ui-crewai==0.3.0`/`ag_ui_strands==0.3.0`, NuGet `AGUI.*@0.0.5`, Maven `com.ag-ui.community:java-*@0.1.0`, Kotlin `0.4.1` (see [AG-UI](/protocols/ag-ui.md)). Still open: **CopilotKit package versions** (only the watchlist #2840 peer-conflict detail `@copilotkit/runtime@1.10.6`/`@ag-ui/client@0.0.41` is available) and **A2UI v1.0 GA status** (v0.9.1 is the confirmed current production spec; v1.0 remains a Q4-2026 candidate). See [web-search generative-UI source page](/sources/web-search-generative-ui.md).
- Notes: The AG-UI portion was promoted to Answered (registry-confirmed). The remaining gap is CopilotKit package versions + A2UI v1.0 GA. Watchlist confidence for the residual items.

## Answered

### generative-ui-sdk-versions: Do the AG-UI SDK versions match the release resources?
- Evidence: The [AG-UI releases page](/protocols/ag-ui.md) (retrieved 2026-08-27) returned exact package/registry versions across NPM/PyPI/NuGet/Maven, confirming the AG-UI framework adapters and SDK packages (latest release 2026-08-20; `@ag-ui/mastra@1.1.2`, `@ag-ui/langgraph@0.0.43`, `@ag-ui/langchain@0.0.3`, `@ag-ui/crewai@0.0.4`, `@ag-ui/llamaindex@0.2.0`, `ag_ui_strands==0.3.0`, `AGUI.*@0.0.5`, `com.ag-ui.community:java-*@0.1.0`, Kotlin `0.4.1`, etc.). The earlier gap (no release resources) is superseded for AG-UI. The related open question is narrowed to CopilotKit package versions + A2UI v1.0 GA (see Active).
- Answered: 2026-08-27

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