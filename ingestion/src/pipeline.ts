import type OpenAI from "openai";
import { acquireSource } from "./acquire.js";
import { deduplicate } from "./dedupe.js";
import { extractKnowledge } from "./extract.js";
import { writeCandidate } from "./inbox.js";
import { summarizeWiki, synthesizeCandidate } from "./openwiki.js";
import { rankCandidate } from "./rank.js";
import type {
  Candidate,
  HarvestState,
  InterestConfig,
  WikiChange,
} from "./types.js";
import { sha256 } from "./utils.js";
export interface PipelineDeps {
  client: OpenAI;
  config: InterestConfig;
  state: HarvestState;
  dryRun: boolean;
}
export type PipelineResult = {
  status: "accepted" | "rejected" | "duplicate";
  candidate?: Candidate;
  change?: WikiChange;
  reason?: string;
};
export async function processUrl(
  url: string,
  deps: PipelineDeps,
): Promise<PipelineResult> {
  const source = await acquireSource(url);
  const duplicate = deduplicate(source, deps.state);
  if (duplicate.duplicate)
    return { status: "duplicate", reason: duplicate.kind ?? "duplicate" };
  const knownSummary = `${Object.values(deps.state.sources)
    .slice(-200)
    .map((s) => `${s.canonicalUrl} ${s.decision}`)
    .join("\n")}\nExisting wiki:\n${await summarizeWiki()}`;
  const score = await rankCandidate(
    source,
    deps.config,
    deps.client,
    knownSummary,
  );
  if (score.overall < deps.config.scoring.threshold) {
    if (!deps.dryRun)
      deps.state.sources[source.metadata.canonicalUrl] = {
        canonicalUrl: source.metadata.canonicalUrl,
        contentHash: source.contentHash,
        ...(source.metadata.publishedAt
          ? { publicationDate: source.metadata.publishedAt }
          : {}),
        discoveredAt: new Date().toISOString(),
        decision: "rejected",
        score,
      };
    return { status: "rejected", reason: score.reason };
  }
  const extraction = await extractKnowledge(source, deps.client);
  const id = sha256(`${source.metadata.canonicalUrl}:${source.contentHash}`);
  const contentReference = `${source.metadata.canonicalUrl}#sha256=${source.contentHash}`;
  const candidate: Candidate = {
    id,
    source: source.metadata,
    contentReference,
    score,
    extraction,
    recommendedAction: extraction.concepts.length
      ? "enrich_concept"
      : "source_only",
  };
  const inboxPath = deps.dryRun ? undefined : await writeCandidate(candidate);
  const change = await synthesizeCandidate(candidate, { dryRun: deps.dryRun });
  candidate.recommendedAction = change.action;
  candidate.proposedChange = change;
  if (!deps.dryRun) await writeCandidate(candidate);
  if (change.action === "no_durable_knowledge") {
    if (!deps.dryRun)
      deps.state.sources[source.metadata.canonicalUrl] = {
        canonicalUrl: source.metadata.canonicalUrl,
        contentHash: source.contentHash,
        ...(source.metadata.publishedAt
          ? { publicationDate: source.metadata.publishedAt }
          : {}),
        discoveredAt: new Date().toISOString(),
        decision: "rejected",
        score,
        ...(inboxPath ? { inboxPath } : {}),
      };
    return {
      status: "rejected",
      candidate,
      change,
      reason: "Synthesis found no durable knowledge",
    };
  }
  if (!deps.dryRun) {
    deps.state.sources[source.metadata.canonicalUrl] = {
      canonicalUrl: source.metadata.canonicalUrl,
      contentHash: source.contentHash,
      ...(source.metadata.publishedAt
        ? { publicationDate: source.metadata.publishedAt }
        : {}),
      discoveredAt: new Date().toISOString(),
      decision: "accepted",
      score,
      ...(inboxPath ? { inboxPath } : {}),
    };
  }
  return { status: "accepted", candidate, change };
}
