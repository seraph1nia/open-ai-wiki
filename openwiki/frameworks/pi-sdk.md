---
type: SDK
title: Pi SDK
description: The Pi SDK provides programmatic access to the Pi coding agent's capabilities for embedding Pi in other applications, building custom interfaces, and integrating with automated workflows; documented at pi.dev/docs/latest/sdk, with an official release trail through v0.84.2 on pi.dev/news.
resource: https://pi.dev/docs/latest/sdk
tags: [pi, sdk, coding-agent, automation, workflows]
timestamp: 2026-08-18
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
- **Fork/rebrand and dev surface (2026-08-18, `pi.dev/docs/latest/development`):** the development docs add a `debug` command that writes to `~/.pi/agent/pi-debug.log` (rendered TUI lines with ANSI codes and the last messages sent to the LLM); the package structure is `packages/ai` (LLM provider abstraction), `packages/agent` (agent loop + message types), `packages/tui` (terminal UI), and `packages/coding-agent` (CLI + interactive mode). Everything for local dev runs through `pi-test.sh` from any directory.
- A package/extension ecosystem exists (`pi.dev/packages`), e.g. `@narumitw/pi-webui` (Radix UI web companion for the terminal session), `@amaster.ai/pi-web-access` (Tavily/Kimi/DeepSeek search + URL extraction), `@amaster.ai/pi-channels` (Feishu/DingTalk/WeCom/webhook messaging), `@danypops/pi-web-spider`, `macos-dev-code` (SwiftUI-first macOS coding guidance, uses the platform SDK), and a remote-control extension for the pi agent.

## Official release trail (`pi.dev/news`, source-backed)

The **Pi 0.84.x release family** is the current generation (0.84.2 is the latest in the retrieved news list; fetched 2026-08-16). A 2026-08-18 re-pull of the `pi.dev/news` list re-confirmed the trail and surfaced the **0.79.0/0.80.x** predecessors (`--approve`/`--no-approve`, `project_trust` trust-scope, `inline`-style extension loading, `models.json` compat flags, and `extended-keys-format csi-u` in 0.79.0; `Tool.constrainedSampling`/`supportsGrammarTools`/`supportsStrictTools`/`supportsStrictMode` and `bash_execution_update` around 0.81.x–0.82.x, plus the `PI_REASONING_LEVEL` env var):

- **Pi 0.84.2** — added `pi.sendUserMessage()`, `createGatewayBindingFetch()`, `AssistantMessage.endTurn` / `end_turn`, tool keybindings (`Ctrl+Shift+F`, `Ctrl+G`, `Shift+Enter`, `Ctrl+Shift+G`), `--use-theme <name>`, prompt-template expansion, and `AI_AGENT=pi` / `PI_CODING_AGENT=true` environment flags.
- **Pi 0.84.1** — added `pi auth check`, the `terminate` tool, and Qwen token-plan API key support.
- **Pi 0.84.0** — a large breaking SDK release:
  - Renamed inherited pi-ai `ModelsStreamTransforms` → `ModelsRequestTransforms` (header transformation now applies to all authenticated provider requests).
  - `message_update` events now emit only delta `assistantMessageEvent` chunks (removed quadratic-growth cumulative `message`/`partial` fields; clients assemble deltas between `message_start`/`message_end`, the latter authoritative).
  - Replaced the harness session model with v4 **lane-based `Session`, `SessionStorage`, and `SessionRepo`** APIs (durable operation records, global facts, shared sequence numbers); removed the legacy JSONL/in-memory repository APIs in favor of `JsonlSessionRepo`/`InMemorySessionRepo`.
  - Promoted the inherited v2 `AgentHarness` API from experimental to default; added public **`PiClient`** and `RemoteSession` under `@earendil-works/pi-coding-agent/client`.
  - `ModelRegistry.refresh()` now takes `ModelsRefreshOptions` and returns `ModelsRefreshResult`; `ModelRuntime.setRuntimeApiKey()` now takes auth-cancellation options; `pi.registerMarkdownTransformer()` added.
- Earlier generations visible in the news list: 0.83.0 (`pi auth print-api-key`/`print-bearer-token`), 0.82.0 (`Tool.constrainedSampling` with `prefer`/`require`, `PI_SESSION_ID`/`PI_SESSION_FILE`/`PI_PROVIDER`/`PI_MODEL` env), 0.81.0 (`get_available_thinking_levels`/`RpcClient.getAvailableThinkingLevels()`), 0.80.x (ModelRuntime + `ModelRegistry` refactor, `InMemorySessionStorage`/`JsonlSessionStorage`, `openai-responses` session-affinity compat), and 0.70.1 (DeepSeek API key, provider retry options).

The SDK surface (from the repo doc) includes `createAgentSession`, `createAgentSessionRuntime`, `AgentSessionRuntime`, `ModelRuntime`, `SessionManager`, `SettingsManager`, tool factories (`createReadOnlyTools`, `createCodingTools`, `createBashTool`, `createEditTool`, `createGrepTool`…), and the `Session`/`SessionStorage` types. Canonical release surfaces: `@earendil-works/pi-coding-agent` on npm and `earendil-works/pi/releases` on GitHub.

## Confidence
- **Source-backed:** SDK existence, purpose, quick-start, and forking/rebrand behavior from the official Pi docs and SDK reference; the 0.80.x–0.84.2 release notes come from `pi.dev/news` (official Pi release trail).
- **Watchlist:** platform-specific extension/package details; per-release full bodies beyond 0.84.0 were not retrieved, so the older generations are coverage-indexed rather than fully verified.