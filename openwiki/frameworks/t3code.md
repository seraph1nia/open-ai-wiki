---
type: Reference
title: t3code
description: T3 Code is an "agent harness control surface" for managing the coding agents on your machine (Claude Code, Codex, Cursor, Grok Build, OpenCode) from a mobile, web, or Electron desktop app; launched with npx t3@latest.
resource: https://github.com/pingdotgg/t3code
tags: [t3code, agent-control, harness, ai-agents, desktop]
timestamp: 2026-08-16
---

# T3 Code (t3code)

**T3 Code** is an **"agent harness control surface"** — a tool for controlling the coding agents already set up on your machine (Claude Code, Codex, Cursor, Grok Build, and OpenCode) from a single interface delivered as a **mobile app (iOS, Android), web app, and Electron-based desktop app**. The project states it was built because the team wanted the best possible agent development experience and found existing solutions (Codex desktop app, Conductor, Claude Desktop, Cursor Glass) lacking.

Source: [`pingdotgg/t3code`](https://github.com/pingdotgg/t3code). Evidence lives on the [web-search Factory tools source page](/sources/web-search-factory-tools.md).

## How it runs and installs

- Launch the backend + local web app: `npx t3@latest` (add `--help` for the full CLI reference).
- Desktop app via GitHub Releases or package registries: Windows `winget install T3Tools.T3Code`; macOS `brew install --cask t3-code`; Arch Linux via AUR (`t3code-bin` stable, `t3code-nightly-bin` nightly, packaging under `packaging/aur`).
- Noteworthily, it is **"very very early"** — expect bugs; contributions mostly not accepted yet (small fixes considered, big features not).

## Position in the factory toolchain

t3code is the **control/orchestration surface** of the [agentic SDLC factory toolchain](/concepts/factory-toolchain.md): rather than an agent or a protocol, it drives existing agents — including [OpenCode](/frameworks/opencode-sdk.md) — through the provider adapters their own servers expose. This pairs it with the [ACP](/protocols/agent-client-protocol.md) wire-protocol ecosystem (which standardizes editor↔agent wiring) and with Pierre's diff views of the produced changes ([Pierre](/frameworks/pierre.md)).

## Durable signals from retrieved evidence

- Supports provider subscriptions for Claude Code, Codex, Cursor, Grok Build, and OpenCode; the [OpenCode SDK](/frameworks/opencode-sdk.md) page describes one of those controllable agents.
- Early public issues flag performance overhead vs Codex (issue #695, "significantly slower"), a sub-agent customization UI gap (issue #1740), and a planned first-class remote backend target model (`local`/`wsl:`/`ssh:`, issue #671).
- A provider-adapter friction example: newer Codex CLI rejected `interactionMode: default` in favor of `code`/`plan` etc., hanging chat turns (issue #386) — illustrating the harness's dependency on provider server schema.

## Confidence
- **Source-backed:** purpose, install paths, provider list, and openness ("very very early") come directly from the retrieved `pingdotgg/t3code` README and issues.
- **Watchlist:** specific issue claims (performance ratios, remote-backend roadmap) reflect single user/feature reports, not confirmed shipped behavior.