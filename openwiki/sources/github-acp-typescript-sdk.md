---
type: Source Evidence
title: GitHub ACP TypeScript SDK source evidence
description: Ingestion and coverage notes for the agentclientprotocol/typescript-sdk GitHub releases resource used as evidence for the Agent Client Protocol wiki pages.
resource: https://github.com/agentclientprotocol/typescript-sdk
tags: [agent-client-protocol, acp, source, github, evidence, typescript-sdk]
timestamp: 2026-08-15
---

# GitHub ACP TypeScript SDK — source evidence

This page records which raw evidence was ingested and how it maps to the durable wiki content. It is an evidence index, not the synthesis layer.

## Source resource
- **Repository (requested):** <https://github.com/agentclientprotocol/typescript-sdk> (`agentclientprotocol/typescript-sdk`, Apache-2.0, language TypeScript)
- **Releases resource:** <https://github.com/agentclientprotocol/typescript-sdk/releases>
- **Homepage / protocol docs:** <https://agentclientprotocol.com>
- **Spec repo (grounding):** <https://github.com/agentclientprotocol/agent-client-protocol>
- **NPM package:** `@agentclientprotocol/sdk`

## Ingested evidence

The fetch (2026-08-15, read-only via the GitHub public API) retrieved the repository metadata, the full releases list (47 release tags `v0.4.7` → `v1.3.0`, each with its release body), the repository README, and the `MIGRATION_0.26_0.27.md` guide. Release bodies for all 47 tags and the README/migration text were inspected directly.

### Repo metadata snapshot (2026-08-15)
- Description: "TypeScript SDK for ACP clients and agents."
- created 2025-10-11; **230 stars / 39 forks**; language TypeScript; default branch `main`
- License: Apache-2.0; homepage: agentclientprotocol.com

### Spec repo metadata snapshot (2026-08-15)
- Description: "A protocol for connecting any editor to any agent."
- **3981 stars / 342 forks**; language Rust; written/published by the `agentclientprotocol` GitHub org.

### Release window coverage
- 47 non-prerelease, non-draft releases; `v1.0.0` first stable (2026-06-24); latest `v1.3.0` (2026-07-21).
- The SDK tracks the versioned ACP JSON schema (schema versions from 0.8.0 to v1.19.0/v1.20.0, plus draft v2.0.0-alpha.2) and adds its own API evolution (app-style rewrite at v0.27.0).

## Mapping to wiki pages
- Protocol identity, agent/client model, transport, ACP v2, relationship to AHP → [Agent Client Protocol](/protocols/agent-client-protocol.md)
- Release history + headline features + API evolution → [ACP TypeScript SDK Releases](/references/agent-client-protocol-typescript-sdk-releases.md)
- This page and the two above are the navigation surface via [quickstart](/quickstart.md).

## Confidence and gaps
- **High confidence** for repo-level facts and release metadata (directly from the GitHub API).
- **Source-backed** for SDK semantics (official README + migration guide + release bodies; single high-quality source, not independently cross-checked).
- Gap: the canonical ACP *protocol* spec detail (session/prompt/turn shapes) belongs to the spec repo and site docs, not this releases resource; only a durable summary is kept on the concept page. The ACP specification repo as a full protocol source is out of scope for this run and could be ingested separately.