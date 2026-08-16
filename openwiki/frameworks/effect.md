---
type: Framework
title: Effect
description: Effect is a powerful TypeScript library for building complex synchronous and asynchronous programs with typed, composable effects; v4 is the current era. The durable-execution surface (Workflow, Activity, DurableQueue) is in scope but not yet confirmed from retrieved evidence.
resource: https://www.effect.website/docs/v4/api/effect
tags: [effect, typescript, durable-execution, framework, v4]
timestamp: 2026-08-16
---

# Effect

**Effect** is a powerful TypeScript library designed to help developers easily create complex, synchronous, and asynchronous programs. Core concepts center on typed, composable `Effect<A, E, R>` values; the durable-execution surface of interest to this corpus centers on the protocols for **wrapping agent and workflow execution in long-lived, recoverable steps** (Workflow, Activity, DurableQueue).

Source: [`effect.website`](https://www.effect.website/docs/v4/api/effect) (v4 API surface) and the Effect blog. Evidence for this page lives on the [web-search Factory tools source page](/sources/web-search-factory-tools.md).

## Position in the factory toolchain

Effect is the **typed orchestration / durable-execution foundation** of the [agentic SDLC factory toolchain](/concepts/factory-toolchain.md): where [t3code](/frameworks/t3code.md), [OpenCode SDK](/frameworks/opencode-sdk.md), and [Pi SDK](/frameworks/pi-sdk.md) drive or embed coding agents, Effect is the layer that models the pipeline's control flow as strongly-typed, recoverable effects rather than ad-hoc async code.

## What the retrieved evidence confirms

- Effect is an official, actively-maintained TypeScript library with a full documentation site; v4 is the current API generation (`effect.website/docs/v4/…`).
- The v4 Beta **February–May recap** (effect.website blog) documents real API additions/removals:
  - Added `Effect.abortSignal`, `Socket.make`, the `Effectable` module (custom effect-like types), `Effect.acquireDisposable` (TC39 Explicit Resource Management / `using`), `firstSuccessOf` (ported from v3), a `Crypto` service in `@effect/platform`, and `Layer.suspend`.
  - Removed `Effect.Yieldable`, `Schema.Codec.ToAsserts`, a duplicated `stringifyCircular` utility, and some cleanup patterns.
- The module ecosystem spans Core (Option, Result, Either, Duration, etc.), Schema, Platform (`@effect/platform`), Data, micro, AI, and SQL packages (`@effect/sql`, `@effect/sql-pg`, etc.), per the API reference index.

## Durable-execution surface — NOT yet confirmed (gap)

The specific **durable-execution** terms central to this corpus — **Workflow, Activity, and DurableQueue** — were **not** retrieved in-scope this run. The single web-search hit for "Effect v4 Workflow Activity DurableQueue durable execution" returned an off-target issue (`NousResearch/hermes-agent`) about an unrelated CLI auto-queue feature, and the synthesized `answer` conflated that unrelated tool with Effect.

**Confidence:** the Effect-v4 existence and the v4-beta API changes above are **source-backed** (official blog/docs). All claims about Effect's Workflow/Activity/DurableQueue semantics remain **unverified** until the Effect v4 durable-execution documentation is ingested directly — see the backlog note on the [factory toolchain](/concepts/factory-toolchain.md) hub.