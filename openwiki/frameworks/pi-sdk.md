---
type: SDK
title: Pi SDK
description: The Pi SDK provides programmatic access to the Pi coding agent's capabilities for embedding Pi in other applications, building custom interfaces, and integrating with automated workflows; documented at pi.dev/docs/latest/sdk.
resource: https://pi.dev/docs/latest/sdk
tags: [pi, sdk, coding-agent, automation, workflows]
timestamp: 2026-08-16
---

# Pi SDK

The **Pi SDK** provides programmatic access to Pi's agent capabilities, letting developers embed Pi in other applications, build custom interfaces, or integrate Pi into automated workflows. Example use cases span custom UIs (web, desktop, mobile), embedding agent capabilities into existing apps, building automated pipelines with agent reasoning, spawning sub-agents from custom tools, and testing agent behavior programmatically.

Source: [`pi.dev/docs/latest/sdk`](https://pi.dev/docs/latest/sdk) and the `earendil-works/pi` repository's `packages/coding-agent/docs/sdk.md`. Evidence for this page lives on the [web-search Factory tools source page](/sources/web-search-factory-tools.md).

## Position in the factory toolchain

The Pi SDK is an **embedding route** into the [agentic SDLC factory toolchain](/concepts/factory-toolchain.md): like [OpenCode SDK](/frameworks/opencode-sdk.md), it exposes a coding agent's capabilities over a programmatic SDK rather than a terminal. It slots alongside the wire/state protocols ([ACP](/protocols/agent-client-protocol.md), [AHP](/protocols/agent-host-protocol.md)) and the [Effect](/frameworks/effect.md) orchestration layer.

## Durable signals from retrieved evidence

- The SDK reference (`packages/coding-agent/docs/sdk.md`) is substantial (≈1,200 lines) and includes working examples under `examples/sdk/` from minimal to full control.
- Pi is designed to be **forked/rebranded** via `package.json` `piConfig` (`name`, `configDir: ".pi"`, and `bin`), affecting CLI banner, config paths, and environment variable names.
- Path resolution supports three execution modes: npm install, standalone binary, and tsx-from-source; always import package assets via `src/config.ts`.
- A package/extension ecosystem exists (`pi.dev/packages`), e.g. `@narumitw/pi-webui` (Radix UI web companion for the terminal session), `@amaster.ai/pi-web-access` (Tavily/Kimi/DeepSeek search + URL extraction), `@amaster.ai/pi-channels` (Feishu/DingTalk/WeCom/webhook messaging), `@danypops/pi-web-spider`, and a remote-control extension for the pi agent.

## Confidence
- **Source-backed:** SDK existence, purpose, quick-start, and forking/rebrand behavior from the official Pi docs and SDK reference.
- **Watchlist:** platform-specific package details and any release-version claims are third-party and version-unspecific; confirm against `pi.dev/docs/latest/sdk` directly before promoting.