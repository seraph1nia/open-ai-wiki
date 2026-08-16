---
type: Source Evidence
title: GitHub agent-host-protocol source evidence
description: Ingestion and coverage notes for the Microsoft agent-host-protocol GitHub releases resource and repository used as evidence for the Agent Host Protocol wiki pages.
resource: https://github.com/microsoft/agent-host-protocol
tags: [agent-host-protocol, source, github, evidence]
timestamp: 2026-08-15
---

# GitHub agent-host-protocol — source evidence

This page records which raw evidence was ingested and how it maps to the durable wiki content. It is an evidence index, not the synthesis layer.

## Source resource
- **Repository:** <https://github.com/microsoft/agent-host-protocol> (`microsoft/agent-host-protocol`, MIT, language Swift)
- **Releases resource (requested):** <https://github.com/microsoft/agent-host-protocol/releases>
- **Homepage:** <https://microsoft.github.io/agent-host-protocol/>

## Ingested evidence

Scheduled run `2026-08-15` fetched the repository metadata, the full releases list (21 GitHub releases across `spec/v*`, `v*` Swift, and `clients/go/v*` artifact families), each release body, the repository README, and the specification pages used to ground foundational claims (overview, channels/subscriptions, transport, versioning).

### Repo metadata snapshot
- Description: "Synchronized multi-client state for AI agent sessions"
- created 2026-03-12; last pushed 2026-08-14; **220 stars / 58 forks** at ingest time
- License: MIT; main language: Swift

### Release window coverage
Spec versions released between 2026-05-28 (v0.2.0) and 2026-07-31 (v0.7.0). All 21 releases are non-prerelease and non-draft. v0.1.0 is not independently tagged.

## Mapping to wiki pages
- Repo identity, framing, channels, versioning, servers/clients → [Agent Host Protocol](/protocols/agent-host-protocol.md)
- Release history + current-version features + MCP/auth evolution → [Agent Host Protocol Releases](/references/agent-host-protocol-releases.md)
- This page and the above two are the navigation surface via [quickstart](/quickstart.md).

## Confidence and gaps
- **High confidence** for repo-level facts and release metadata (directly from the GitHub API).
- **Source-backed** for protocol semantics (official release bodies + spec docs; single source of truth, not independently cross-checked).
- Gap: Rust/TypeScript/Kotlin client changelogs live in native registries, not GitHub releases, so they are out of scope for this resource.