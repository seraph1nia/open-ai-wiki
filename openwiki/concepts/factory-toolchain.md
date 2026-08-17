---
type: Concept
title: Agentic SDLC factory toolchain
description: The composition of protocols and SDKs behind an agentic software development lifecycle (SDLC) factory — ACP and AHP for agent wiring and hosting, with Pierre, t3code, Effect, OpenCode, and the Pi SDK as the tooling layer, and how they compose into one pipeline.
tags: [factory, toolchain, agentic-sdlc, ai-agents, sdks]
timestamp: 2026-08-16
---

# Agentic SDLC factory toolchain

This is the canonical hub for the **toolchain behind an agentic SDLC factory** — how protocols, runtime SDKs, and agent-control frontends compose into one software-delivery pipeline. It was synthesized from the 2026-08-16 web-search Factory tools run (evidence on the [web-search Factory tools source page](/sources/web-search-factory-tools.md)).

The factory idea: an agent orchestrates coding, hosting, diffs, durable tasks, and editor UI through a shared set of standardized parts rather than one monolithic tool.

## The wire-protocol layer

- **[Agent Client Protocol (ACP)](/protocols/agent-client-protocol.md)** — the editor↔agent wire protocol ("connecting any editor to any agent"), officially implemented in TypeScript by `@agentclientprotocol/sdk`. It is what lets editor clients and coding agents speak a negotiated `protocolVersion`, independent of the harness.
- **[Agent Host Protocol (AHP)](/protocols/agent-host-protocol.md)** — Microsoft's synchronized, multi-client sessions-server state protocol (JSON-RPC 2.0, channel-based routing). Its role in the factory is *hosting* agents and exposing their session state to multiple clients. AHP also speaks an `mcp://` side-channel, which links it into the [MCP Apps](/protocols/mcp-apps.md) generative-UI domain.

## The tooling / control layer

- **[Pierre](/frameworks/pierre.md)** — the Pierre Computer Company's open-source toolkit (diffs, trees, memes) plus its in-place file-diff editors, used to visualize and edit the outputs agents produce.
- **[t3code](/frameworks/t3code.md)** — an "agent harness control surface" that controls the agents already on your machine (Claude Code, Codex, Cursor, Grok Build, OpenCode) from one mobile/web/desktop app.
- **[Effect](/frameworks/effect.md)** — the TypeScript library (v4 era) providing the typed, effectful orchestration foundation; the intended durable-execution surface (Workflow, Activity, DurableQueue) was not yet confirmed by retrieved evidence.
- **[OpenCode SDK](/frameworks/opencode-sdk.md)** — the type-safe JS/TS client (`@opencode-ai/sdk`) for controlling the opencode server programmatically.
- **[Pi SDK](/frameworks/pi-sdk.md)** — programmatic access (`pi.dev/docs/latest/sdk`) to the Pi coding agent's capabilities for embedding in applications and automated workflows.

## How they compose

```mermaid
flowchart LR
    E[Editor / client] -->|ACP| AG[Agent]
    H[AHP sessions server] -->|mcp:// channel| MA[MCP Apps UIs]
    AG -->|produces| DIFF[Files / diffs]
    DIFF --> PI[Pierre diffs/editors]
    H --> T[t3code control surface]
    T -->|controls| OPC[OpenCode]
    T -->|controls| AG
    EFF[Effect durable orchestration] --> OPC
    PI[Pi SDK] -->|embeds coding agent| APP[Apps / workflows]
```

The same ACP/AHP foundation that powers editors and agent hosts is reused by control surfaces (t3code) and embedding SDKs (OpenCode, Pi), with Pierre handling the diff/edit presentation and Effect providing durable task orchestration.

## Key facts (source-backed)

- ACP and AHP are distinct, documented on their own canonical pages; this run confirms ACP's official library set includes TypeScript, Python, Rust, and Kotlin SDKs plus a `registry` (see [ACP source evidence](/sources/github-acp-typescript-sdk.md)).
- The VS Code agent host is the first-party AHP reference server and uses AHP to power AI coding agents (confirmed by VS Code issue evidence in this run).
- AHP's `mcp://` channel reuses the upstream MCP wire format for a capability-gated subset served to MCP Apps-style UIs (see [AHP page](/protocols/agent-host-protocol.md)).
- Pierre's `@pierre/diffs` reached v1.3.0 ("the Edit release") — adopting in-place code editing for rendered diffs (see [Pierre page](/frameworks/pierre.md)).
- t3code is early-stage, launched via `npx t3@latest`, and controls OpenCode among other agents (see [t3code page](/frameworks/t3code.md)).

## Followed idea feeds

Since 2026-08-17 this hub is also fed by three engineering blogs, tracked by the same `web-search-factory-tools` source instance: the [Zed blog](https://zed.dev/blog) (editor and agent-harness design, the ACP end of the factory), the [Solo.io blog](https://www.solo.io/blog) (gateway and agent-infrastructure layer), and the [Mastra blog](https://mastra.ai/blog) (agent runtime, workflows, memory). Durable concepts and ideas from those posts are folded into this hub and the tool pages above rather than kept as per-post summaries. Which posts have already been consumed is recorded in the [blog post ingestion ledger](/sources/blog-post-ledger.md), which is what keeps repeated scheduled runs from ingesting the same post twice.

## Backlog
- **Effect durable-execution surface** (Workflow, Activity, DurableQueue): no in-scope evidence was retrieved this run (the one result was off-target for a different agent). Confirm against the Effect v4 docs before promoting claims to canonical fact.