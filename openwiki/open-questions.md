---
type: Reference
title: Open Questions
description: Active, answered, and stale questions about the AI knowledge wiki's coverage and memory graph, including gaps in evidence about projects tracked in this corpus (e.g. Effect's deep Workflow/Activity API semantics).
tags: [open-questions, memory-graph, wiki-quality]
timestamp: 2026-08-16
---

# Open Questions

## Active

### effect-durable-execution: What are the exact Workflow / Activity primitive semantics in Effect v4?
- Owner: unknown
- Seen: 2026-08-16
- Evidence: [Effect page](/frameworks/effect.md) — the v4 beta recap confirms `DurableQueue` ported from v3 to v4 with persistent semantics, workflow suspension/failure fixes, and `@effect/workflow` in alpha, but the precise Workflow/Activity primitive semantics and packaging are not fully retrieved.
- Notes: The core semantics question is now largely **answered** (see Answered); this narrower gap remains for the deep Workflow/Activity API surface. Confidence: watchlist — target the official v4 workflow docs directly before fully promoting.

### generative-ui-sdk-versions: Do the AG-UI / CopilotKit SDK versions and A2UI v1.0 match the release resources?
- Owner: unknown
- Seen: 2026-08-16
- Evidence: Version-adjacent claims in the second generative-UI pull — CopilotKit issue #2840's `@copilotkit/runtime@1.10.6` / `@ag-ui/client@0.0.41` peer conflict (watchlist bug), the A2UI v1.0 candidate spec, and AG-UI Java/Go SDK package structure — come from docs/README/issues, not formal release files. See [web-search generative-UI source page](/sources/web-search-generative-ui.md) and the [OpenUI](/frameworks/openui.md) page.
- Notes: This is a corpus-coverage gap (version claims not yet cross-checked against release resources), matching the existing backlog entry in [quickstart](/quickstart.md). Watchlist confidence.

## Answered

### effect-durable-execution: What exactly are Effect v4's Workflow, Activity, and DurableQueue semantics?
- Evidence: [Effect page](/frameworks/effect.md) — the 2026-08-16 web-search Factory tools run retrieved the official Effect v4 beta February–May recap, which documents `DurableQueue` ported from v3 to v4 (persistent queue semantics), workflow suspension/failure fixes, and `@effect/workflow` delivering durable workflows in alpha. The earlier gap entry (off-target `NousResearch/hermes-agent` hit) is superseded. See [web-search Factory tools source page](/sources/web-search-factory-tools.md).
- Answered: 2026-08-16

### pierre-project: What is `pierrecomputer/pierre` and does it publish releases?
- Evidence: [Pierre page](/frameworks/pierre.md) — the repo README ("pierre's open source code") and org ("The Pierre Computer Company") answered its identity, and the `@pierre/diffs` v1.3.0 release answered the releases question. Grounded in [web-search Factory tools evidence](/sources/web-search-factory-tools.md).
- Answered: 2026-08-16

## Stale

_None yet._