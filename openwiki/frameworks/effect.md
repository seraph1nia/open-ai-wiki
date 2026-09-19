---
type: Framework
title: Effect
description: Effect is a powerful TypeScript library for building complex synchronous and asynchronous programs with typed, composable effects; v4 is the current era and is now in Release Candidate (2026-08-14) with the API presumed stable. Its durable-execution surface (DurableQueue ported to v4, @effect/workflow in alpha, cluster/persisted-queue fixes, activity retry policy) is confirmed source-backed from the official Effect v4 beta/RC documentation.
resource: https://www.effect.website/docs/v4/api/effect
tags: [effect, typescript, durable-execution, framework, v4]
timestamp: 2026-09-19
---

# Effect

**Effect** is a powerful TypeScript library designed to help developers easily create complex, synchronous, and asynchronous programs. Core concepts center on typed, composable `Effect<A, E, R>` values; the durable-execution surface of interest to this corpus centers on the protocols for **wrapping agent and workflow execution in long-lived, recoverable steps** (Workflow, Activity, DurableQueue).

Source: [`effect.website`](https://www.effect.website/docs/v4/api/effect) (v4 API surface) and the Effect blog. Evidence for this page lives on the [web-search Factory tools source page](/sources/web-search-factory-tools.md).

## Position in the factory toolchain

Effect is the **typed orchestration / durable-execution foundation** of the [agentic SDLC factory toolchain](/concepts/factory-toolchain.md): where [t3code](/frameworks/t3code.md), [OpenCode SDK](/frameworks/opencode-sdk.md), and [Pi SDK](/frameworks/pi-sdk.md) drive or embed coding agents, Effect is the layer that models the pipeline's control flow as strongly-typed, recoverable effects rather than ad-hoc async code. The [OpenCode SDK V2](/frameworks/opencode-sdk.md) is explicitly **Effect-native** — it hosts OpenCode inside an Effect `Scope`, so it composes directly with this durable-orchestration foundation.

## What the retrieved evidence confirms

- Effect is an official, actively-maintained TypeScript library with a full documentation site; v4 is the current API generation (`effect.website/docs/v4/…`).
- The v4 Beta **launched on 2026-02-18** (official release post); the alpha **February–May recap** (effect.website blog) documents real API additions/removals:
  - Added `Effect.abortSignal`, `Socket.make`, the `Effectable` module (custom effect-like types), `Effect.acquireDisposable` (TC39 Explicit Resource Management / `using`), `firstSuccessOf` (ported from v3), a `Crypto` service in `@effect/platform`, and `Layer.suspend` (from the official recap, reconfirmed by the 2026-08-17 pull; the 2026-08-18 pull re-surfaced the same recap, this time with the `Socket.make`/`Effectable`/`Crypto`/`Layer.suspend` details).
  - Removed `Effect.Yieldable`, `Schema.Codec.ToAsserts`, a duplicated `stringifyCircular` utility, and some cleanup patterns.
- **v3 lifecycle / feature-freeze (2026-08-18, official v4 beta post):** Effect **v3 will continue to receive active maintenance after v4 reaches stability**, with a published maintenance schedule once v4 is stable; there is a **feature freeze on v3** — bug fixes and security patches continue, but **new features are developed exclusively for v4**. The core programming model (`Effect`, `Layer`, `Schema`, `Stream`) is unchanged; the differences are in package organization, module versioning, and specific APIs. Two migration guides exist (v3→v4 Migration Guide, Schema v4 Migration Guide).
- v4 rewrote the core fiber runtime and core modules: a minimal program using Effect, Stream, and Schema drops from roughly **70 kB in v3 to about 20 kB in v4**.
- The module ecosystem spans Core (Option, Result, Either, Duration, etc.), Schema, Platform (`@effect/platform`), Data, micro, AI, and SQL packages (`@effect/sql`, `@effect/sql-pg`, etc.), per the API reference index.
- **This Week in Effect 116** (community blog) lists "Durable workflows in TypeScript with `@effect/workflow` — currently in alpha" as a major update.

## Durable-execution surface — source-backed (was a gap)

The 2026-08-16T12:51Z web-search pull **closed the durable-execution gap** with official Effect content; the 2026-08-17 pull reconfirmed it:

- **`DurableQueue` was ported from v3 to v4**, bringing persistent queue semantics to the beta (official v4 Beta February–May recap).
- Workflow fixes landed during the beta: workflow failures no longer squashed by suspension interrupts; workflow suspension isolated in `DurableDeferred.into`; `Latch.release` fixed; parent pointer forwarding fixed when spawning a child with `discard: true`.
- The durable workflow story is delivered by the **`@effect/workflow`** package, "currently in alpha" per the This Week in Effect 116 newsletter.

**Confidence:**
- **Source-backed** — official Effect v4 beta release post (2026-02-18), the v4 beta February–May recap blog, and the This Week in Effect community newsletter. The single-hit DurableQueue result from the earlier run (an off-target `NousResearch/hermes-agent` issue) is superseded.
- **Watchlist** — GitHub issue `Effect-TS/effect#6379` reports **missing migration documentation for many removed/renamed functions/types** in v4 (opened 2026-02-20), a friction point for adopting v4 in large codebases; the gist "What's New in Effect v4" is a community summary, not an official doc.
- **Watchlist (added 2026-08-18 from the community "What's New in Effect v4" gist)** — v4 adds **enhanced STM transactional collections** for lock-free concurrent state management that compose atomically with `Effect.atomic()`: `TxHashMap`, `TxHashSet`, `TxQueue`, `TxChunk`, `TxSemaphore` (positioned for lock-free rate limiters, caches, and job queues), plus a `getOrThrow` behavior change (throws the error directly instead of wrapping) and `zipWith`/`ap`/`all()` API notes. This is a *community* summary gist, not an official doc — keep watchlist until confirmed on the official v4 docs.

Still unverified from retrieved evidence: the *Activity* primitive's exact semantics and the full v4 workflow packaging/API surface — target the official `@effect/workflow` docs for a future run.

## Durable-execution surface — partially closed (2026-08-27) + STM watchlist

The 2026-08-27 web-search pull added two directly relevant data points for the durable-execution surface:

- **Official Effect v4 Beta July 2026 recap** (source-backed, [`effect-v4beta-july-recap`](https://www.effect.website/blog/effect-v4beta-july-recap)) documents durable-execution and SQL fixes during the beta: **"Fixed the activity retry policy"**, plus `SQL.valuesUnprepared` for raw value interpolation, fixed `sqlite-do` Durable Object transactions, `sqlite-bun` now failing with a typed `SqlError` on statement-preparation throw, scoping unknown request-tag failures to the request instead of the connection, and **fixed SQL-backed persisted queues**. This reconfirms the `@effect/workflow` durable-execution story and confirms the *Activity* primitive exists with an explicit retry-policy surface.
- **Concrete `@effect/workflow` Activity semantics from issue `Effect-TS/effect#6014`** (source-backed issue): a workflow using `Effect.all(activities, { concurrency: N })` where each branch is an `Activity.make(...)` completes on first execution but **deadlocks during durable replay** when `N > 1` (sequential `concurrency: 1` replays correctly). The issue is pinned to `@effect/workflow` **0.15.2 → 0.16.0** and describes the durable-replay model (activities replayed from the durable log; concurrent combinators must resume all branches). This is direct evidence of the Activity primitive's durable semantics and a known concurrency/replay edge case. Confidence: **source-backed** (official Effect issue tracker).
- **backpine/durable-effect** (`@durable-effect/workflow`, third-party, **watchlist**): an experimental "first pass at making Durable Objects effectful" that only supports **Cloudflare Durable Objects as the execution engine**; API surface uses `Workflow.make`, `Workflow.step({ name, execute })`, `Workflow.sleep(...)`. Not an official Effect package — evidence the community is experimenting with effectful durability, not a v4 API.

The 2026-08-16/2026-08-17 discoveries stand: the **July recap + issue reconfirm but do not replace** the earlier finding that the full v4 Workflow/Activity packaging surface still needs a direct read of the official `@effect/workflow` docs (the waveform persisted-queue fixes and retry policy are now captured, but the complete primitive semantic doc is not).

## STM transactional collections — watchlist (updated 2026-08-22)

The community "What's New in Effect v4" gist was **re-confirmed by the 2026-08-22 pull** — the official v4 Beta recap and the v4-beta release post also re-surfaced (reconfirmation only; no new v4 API surface beyond what is documented). The gist's `Enhanced STM Collections` section contains the durable content; "This Week in Effect 116" remains official. Summary, **watchlist** until confirmed against the official v4 docs:

- All operations compose atomically with `Effect.atomic()`; collections: **`TxHashMap`, `TxHashSet`, `TxQueue`, `TxChunk`, `TxSemaphore`**.
- Positioned for lock-free rate limiters, caches, and job queues; automatic rollback on errors.
- Additional gist claims (watchlist, community summary): `getOrThrow` now throws the error directly instead of wrapping; `zipWith`/`ap` removed in favor of `all()` for parallel composition; first-class, composable transformations and filters (with `errors: "all"` multi-issue reporting) replacing v3's schema-embedded equivalents; core `Effect<A, E, R>` unchanged across v3→v4.

## 2026-08-29 re-pull (reconfirmation + secondary signals)

- **Reconfirmation (no new v4 API surface):** the v4 API query returned the deterministic official set — the "What's New in Effect v4" gist (community, watchlist), the official [February–May recap](https://www.effect.website/blog/effect-v4beta-launch-to-may-recap), the official [v4 Beta release post](https://effect.website/blog/releases/effect/40-beta), plus the **`Effect-TS/effect` repo's own `LLMS.md`** (an LLM-oriented summary of the Effect repo on `main`) and the repo itself. The February–May recap's durable facts (DurableQueue port, `@effect/workflow` alpha, STM collections) were reconfirmed; the STM/`getOrThrow` gist claims remain watchlist.
- **Durable-execution query (secondary, watchlist):** the top hits stayed on the official `Effect-TS/effect#6014` Activity-replay bug (already documented above) plus community durable-engine material that remains **out of scope** (`backpine/durable-effect`, `durable-workflow/workflow` — the former Laravel Workflow package rebranded, and `dotty-cps-async/durable-monad`'s replay-vs-snapshot design notes). The durable-monad notes are a useful secondary description of replay-based vs snapshot-based durable execution but are not Effect v4 documentation.
- **Gap unchanged:** the full procedural `@effect/workflow` primitive/API packaging is still un-retrieved; the official v4 workflow docs remain the target.

## 2026-09-19 re-pull — v4 is Release Candidate (source-backed)

The 2026-09-19 `web-search-factory-tools` pull (evidence on the [Factory tools source page](/sources/web-search-factory-tools.md)) advanced the durable-execution story with the **v4 Release Candidate milestone**:

- **Effect v4 is now in Release Candidate** ("[This Week in Effect 131](https://effect.website/blog/this-week-in-effect/131)", 2026-08-14): **the API surface is presumed stable** and the project's focus has shifted entirely to correctness, reliability, and documentation. This upgrades the durability framing from beta-era fixes to a stabilization posture — and makes the official v4 docs (the gap target) the stated priority.
- **Cluster & durable-execution fixes (RC window):** fixed a **cluster shutdown hang from abandoned requests**; fixed **defecting execution-plan observers replacing outcomes and leaving events unpaired**; fixed **TxPubSub subscriber release interrupting after hub shutdown**; fixed SQL `findById` resolvers invoking NonEmpty callbacks with empty batches; fixed SQL resolvers executing empty batches; **used migrations for SQL persisted queues**; added integration coverage for **entity shutdown, replay, workflow owner-loss, and cluster transport failure** scenarios. This closes out the beta-era fix trail (activity retry policy, persisted queues) into an explicit correctness/reliability program.
- **New unstable CLI module in the v4 API reference:** `effect/unstable/cli/HelpDoc` — a **"structured help documentation model" for the unstable CLI package** capturing the user-facing parts of a command (description, usage string, positional arguments, flags, global flags, subcommands, annotations, examples); the module defines **data shapes only**, with terminal-text rendering handled by `CliOutput`. Added in v4.0.0. (API-reference surface, source-backed.)
- **Third-party adopter signal (out of scope):** LionSR/TeXRA tracking issues #12025/#12081 document an external project adopting `effect/unstable/workflow` — Workflow, Activity, DurableDeferred, DurableQueue, DurableClock — as its durable-execution model with a repo-owned WorkflowEngine. Confirms external consumption of the unstable workflow surface but is not Effect documentation.
- **Gap unchanged:** the complete procedural `@effect/workflow` primitive/API packaging is still not directly retrieved, but with the API "presumed stable" in RC, the official v4 workflow docs are now the explicit next target. The [open question](/open-questions.md) stays Active with the RC milestone recorded.