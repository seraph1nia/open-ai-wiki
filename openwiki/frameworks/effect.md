---
type: Framework
title: Effect
description: Effect is a powerful TypeScript library for building complex synchronous and asynchronous programs with typed, composable effects; v4 is the current era. Its durable-execution surface (DurableQueue ported to v4, @effect/workflow in alpha) is confirmed source-backed from the official Effect v4 beta documentation.
resource: https://www.effect.website/docs/v4/api/effect
tags: [effect, typescript, durable-execution, framework, v4]
timestamp: 2026-08-17
---

# Effect

**Effect** is a powerful TypeScript library designed to help developers easily create complex, synchronous, and asynchronous programs. Core concepts center on typed, composable `Effect<A, E, R>` values; the durable-execution surface of interest to this corpus centers on the protocols for **wrapping agent and workflow execution in long-lived, recoverable steps** (Workflow, Activity, DurableQueue).

Source: [`effect.website`](https://www.effect.website/docs/v4/api/effect) (v4 API surface) and the Effect blog. Evidence for this page lives on the [web-search Factory tools source page](/sources/web-search-factory-tools.md).

## Position in the factory toolchain

Effect is the **typed orchestration / durable-execution foundation** of the [agentic SDLC factory toolchain](/concepts/factory-toolchain.md): where [t3code](/frameworks/t3code.md), [OpenCode SDK](/frameworks/opencode-sdk.md), and [Pi SDK](/frameworks/pi-sdk.md) drive or embed coding agents, Effect is the layer that models the pipeline's control flow as strongly-typed, recoverable effects rather than ad-hoc async code.

## What the retrieved evidence confirms

- Effect is an official, actively-maintained TypeScript library with a full documentation site; v4 is the current API generation (`effect.website/docs/v4/…`).
- The v4 Beta **launched on 2026-02-18** (official release post); the alpha **February–May recap** (effect.website blog) documents real API additions/removals:
  - Added `Effect.abortSignal`, `Socket.make`, the `Effectable` module (custom effect-like types), `Effect.acquireDisposable` (TC39 Explicit Resource Management / `using`), `firstSuccessOf` (ported from v3), a `Crypto` service in `@effect/platform`, and `Layer.suspend` (from the official recap, reconfirmed by the 2026-08-17 pull).
  - Removed `Effect.Yieldable`, `Schema.Codec.ToAsserts`, a duplicated `stringifyCircular` utility, and some cleanup patterns.
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

Still unverified from retrieved evidence: the *Activity* primitive's exact semantics and the full v4 workflow packaging/API surface — target the official `@effect/workflow` docs for a future run.