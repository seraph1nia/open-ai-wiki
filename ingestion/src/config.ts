import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import YAML from "yaml";
import { z } from "zod";
import type { InterestConfig } from "./types.js";
import { ingestionRoot } from "./paths.js";

const schema = z.object({
  topics: z.record(z.string(), z.array(z.string())),
  preferred_sources: z.array(z.string()),
  exclude: z.array(z.string()),
  scoring: z.object({
    relevance: z.number(),
    novelty: z.number(),
    authority: z.number(),
    technicalDepth: z.number(),
    threshold: z.number().min(0).max(1),
  }),
  github_repositories: z.array(z.string()).default([]),
});
export async function loadInterests(
  path = resolve(ingestionRoot, "config/interests.yaml"),
): Promise<InterestConfig> {
  return schema.parse(YAML.parse(await readFile(path, "utf8")));
}
