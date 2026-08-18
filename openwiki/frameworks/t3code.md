---
type: Reference
title: t3code
description: T3 Code is an "agent harness control surface" for managing the coding agents on your machine (Claude Code, Codex, Cursor, Grok Build, OpenCode) from a mobile, web, or Electron desktop app; launched with npx t3@latest.
resource: https://github.com/pingdotgg/t3code
tags: [t3code, agent-control, harness, ai-agents, desktop]
timestamp: 2026-08-18
---

# T3 Code (t3code)

**T3 Code** is an **"agent harness control surface"** — a tool for controlling the coding agents already set up on your machine (Claude Code, Codex, Cursor, Grok Build, and OpenCode) from a single interface delivered as a **mobile app (iOS, Android), web app, and Electron-based desktop app**. The project states it was built because the team wanted the best possible agent development experience and found existing solutions (Codex desktop app, Conductor, Claude Desktop, Cursor Glass) lacking.

Source: [`pingdotgg/t3code`](https://github.com/pingdotgg/t3code). Evidence lives on the [web-search Factory tools source page](/sources/web-search-factory-tools.md).

## How it runs and installs

- Launch the backend + local web app: `npx t3@latest` (add `--help` for the full CLI reference).
- Desktop app via GitHub Releases or package registries: Windows `winget install T3Tools.T3Code`; macOS `brew install --cask t3-code`; Arch Linux via AUR (`t3code-bin` stable, `t3code-nightly-bin` nightly, packaging under `packaging/aur`).
- **Active nightly release trail (2026-08-18):** GitHub Releases carries a continuous `0.0.34-nightly.YYYYMMDD.HHMM` build stream (auto-released and signed by `@github-actions`; latest at fetch `0.0.34-nightly.20260818.1124`). These nightly pre-releases are the current distribution cadence ahead of any labeled stable tag. The `npx t3@latest` npm path and the platform packaging above track this stream.
- Noteworthily, it is **"very very early"** — expect bugs; contributions mostly not accepted yet (small fixes considered, big features not).

## Position in the factory toolchain

t3code is the **control/orchestration surface** of the [agentic SDLC factory toolchain](/concepts/factory-toolchain.md): rather than an agent or a protocol, it drives existing agents — including [OpenCode](/frameworks/opencode-sdk.md) — through the provider adapters their own servers expose. This pairs it with the [ACP](/protocols/agent-client-protocol.md) wire-protocol ecosystem (which standardizes editor↔agent wiring) and with Pierre's diff views of the produced changes ([Pierre](/frameworks/pierre.md)).

## Durable signals from retrieved evidence

- Supports provider subscriptions for Claude Code, Codex, Cursor, Grok Build, and OpenCode; the [OpenCode SDK](/frameworks/opencode-sdk.md) page describes one of those controllable agents.
- Early public issues flag performance overhead vs Codex (issue #695, "significantly slower"), a sub-agent customization UI gap (issue #1740), and a planned first-class remote backend target model (`local`/`wsl:`/`ssh:`, issue #671 — an architecture proposal, now **closed** as of the 2026-08-18 fetch).
- A provider-adapter friction example: newer Codex CLI rejected `interactionMode: default` in favor of `code`/`plan` etc., hanging chat turns (issue #386 — **closed** as of 2026-08-18) — illustrating the harness's dependency on provider server schema. Issue #386's repro pins **T3 Code `v0.0.4` (2026-03-07 release)** and `codex-cli 0.94.0`.
- **Current issue stream (2026-08-17 fetch):** Codex slash commands are not surfaced in T3Code (issue #2637 — only `/model`, `/plan`, `/default` appear; `/help`, `/status`, `/use`, `/review` missing), and a feature request to show Codex image-generation results as first-class chat outputs (issue #2398). These are concrete harness-surface gaps of the same class as issue #386.
- The repo is active: ~**19.2k stars**, 4.5k forks per the retrieved GitHub page (2026-08-18 fetch), and a community **nix packaging flake** (`Sawrz/t3code-nix`) follows upstream releases. Windows onboarding friction is visible in issue #335 ("codex cli on windows").

## Confidence
- **Source-backed:** purpose, install paths, provider list, and openness ("very very early") come directly from the retrieved `pingdotgg/t3code` README and issues; the `0.0.34-nightly.*` release stream and install channels (winget/brew cask/AUR) from the GitHub releases/README (2026-08-18).
- **Watchlist:** specific issue claims (performance ratios, remote-backend roadmap) reflect single user/feature reports, not confirmed shipped behavior; star/fork counts are GitHub page snapshots, not official release metadata.