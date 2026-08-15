import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
import type OpenAI from "openai";
import { model } from "./ai.js";
import type {
  CandidateScore,
  InterestConfig,
  NormalizedSource,
} from "./types.js";

const scoreSchema = z.object({
  relevance: z.number().min(0).max(1),
  novelty: z.number().min(0).max(1),
  authority: z.number().min(0).max(1),
  technicalDepth: z.number().min(0).max(1),
  reason: z.string().min(1).max(500),
});
export function calculateOverall(
  score: Omit<CandidateScore, "overall">,
  weights: InterestConfig["scoring"],
): CandidateScore {
  const overall =
    score.relevance * weights.relevance +
    score.novelty * weights.novelty +
    score.authority * weights.authority +
    score.technicalDepth * weights.technicalDepth;
  return { ...score, overall: Number(overall.toFixed(4)) };
}
export async function rankCandidate(
  source: NormalizedSource,
  config: InterestConfig,
  client: OpenAI,
  knownSummary: string,
): Promise<CandidateScore> {
  const response = await client.responses.parse({
    model,
    instructions:
      "You are a conservative technical editor. Reject name-drops, generic news, SEO summaries, funding, and opinion without durable technical substance. Score the source against the configured interests. Novelty means durable information not already represented by the supplied known-source summary.",
    input: JSON.stringify({
      interests: config.topics,
      preferred: config.preferred_sources,
      exclude: config.exclude,
      source: source.metadata,
      content: source.content.slice(0, 45000),
      knownSummary,
    }),
    text: { format: zodTextFormat(scoreSchema, "candidate_score") },
  });
  if (!response.output_parsed)
    throw new Error("The AI provider returned no candidate score");
  return calculateOverall(response.output_parsed, config.scoring);
}
