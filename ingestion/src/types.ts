export type SourceType =
  "article" | "documentation" | "github" | "github_release" | "youtube";

export interface SourceMetadata {
  title: string;
  url: string;
  canonicalUrl: string;
  sourceType: SourceType;
  publishedAt?: string;
  retrievedAt: string;
  author?: string;
  channel?: string;
  repository?: string;
  commit?: string;
  release?: string;
  tag?: string;
}
export interface Evidence {
  quote: string;
  sourceUrl: string;
  timestampSeconds?: number;
  locator?: string;
}
export interface NormalizedSource {
  metadata: SourceMetadata;
  content: string;
  contentHash: string;
  transcript?: Array<{
    text: string;
    offsetSeconds: number;
    durationSeconds: number;
  }>;
}
export interface SourceAdapter {
  canHandle(input: string): boolean;
  acquire(input: string): Promise<NormalizedSource>;
}
export interface CandidateScore {
  relevance: number;
  novelty: number;
  authority: number;
  technicalDepth: number;
  overall: number;
  reason: string;
}
export interface KnowledgeExtraction {
  source: SourceMetadata;
  concepts: Array<{ title: string; summary: string; evidence: Evidence[] }>;
  references: Array<{ title: string; description: string }>;
  entities: Array<{ name: string; type: string }>;
  relationships: Array<{ from: string; to: string; relation: string }>;
}
export type RecommendedAction =
  | "create_concept"
  | "enrich_concept"
  | "create_reference"
  | "update_framework"
  | "update_protocol"
  | "source_only"
  | "no_durable_knowledge";
export interface WikiChange {
  action: RecommendedAction;
  target?: string;
  title: string;
  summary: string;
  markdown: string;
  supportingSourcePath: string;
  changed: boolean;
}
export interface Candidate {
  id: string;
  source: SourceMetadata;
  contentReference: string;
  score: CandidateScore;
  extraction: KnowledgeExtraction;
  recommendedAction: RecommendedAction;
  proposedChange?: WikiChange;
}
export interface SourceDecision {
  canonicalUrl: string;
  contentHash: string;
  publicationDate?: string;
  discoveredAt: string;
  decision: "accepted" | "rejected" | "duplicate";
  score?: CandidateScore;
  inboxPath?: string;
}
export interface HarvestState {
  version: 1;
  lastSuccessfulHarvest: string | null;
  sources: Record<string, SourceDecision>;
}
export interface InterestConfig {
  topics: Record<string, string[]>;
  preferred_sources: string[];
  exclude: string[];
  scoring: {
    relevance: number;
    novelty: number;
    authority: number;
    technicalDepth: number;
    threshold: number;
  };
  github_repositories: string[];
}
