---
type: Reference
title: Open Questions
description: Active, answered, and stale questions about the AI knowledge wiki's coverage and memory graph, including gaps in evidence about projects tracked in this corpus.
tags: [open-questions, memory-graph, wiki-quality]
timestamp: 2026-08-16
---

# Open Questions

## Active

### effect-durable-execution: What exactly are Effect v4's Workflow, Activity, and DurableQueue semantics?
- Owner: unknown
- Seen: 2026-08-16
- Evidence: [web-search Factory tools source page](/sources/web-search-factory-tools.md) (2026-08-16 run; the single query for "Effect v4 Workflow Activity DurableQueue durable execution" returned an off-target `NousResearch/hermes-agent` hit and a synthesized answer that conflated an unrelated CLI auto-queue feature with Effect's DurableQueue)
- Notes: The corpus's canonical set includes Effect's **durable-execution** surface, but this run returned no in-scope documentation for it. The general Effect v4 existence and v4-beta API changes are source-backed (official blog), yet Workflow/Activity/DurableQueue semantics remain **unverified**. Confidence: watchlist — do not claim semantics until the Effect v4 workflow docs are ingested directly.

## Answered

### pierre-project: What is `pierrecomputer/pierre` and does it publish releases?
- Evidence: [Pierre page](/frameworks/pierre.md) — the repo README ("pierre's open source code") and org ("The Pierre Computer Company") answered its identity, and the `@pierre/diffs` v1.3.0 release answered the releases question. Grounded in [web-search Factory tools evidence](/sources/web-search-factory-tools.md).
- Answered: 2026-08-16

## Stale

_None yet._