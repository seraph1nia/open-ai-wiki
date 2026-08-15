import type OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
import { model } from "./ai.js";
import type { InterestConfig } from "./types.js";
import { canonicalizeUrl } from "./utils.js";
interface DiscoveryItem {
  title: string;
  url: string;
  publishedAt?: string;
  reason: string;
}
const discoverySchema = z.object({
  items: z.array(
    z.object({
      title: z.string(),
      url: z.string(),
      publishedAt: z.string().nullable(),
      reason: z.string(),
    }),
  ),
});
const ghHeaders = {
  accept: "application/vnd.github+json",
  "user-agent": "ai-knowledge-harvester/0.1",
  ...(process.env.GITHUB_TOKEN
    ? { authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
};
export async function discoverGitHub(
  config: InterestConfig,
  since: string,
): Promise<DiscoveryItem[]> {
  const items: DiscoveryItem[] = [];
  for (const repo of config.github_repositories) {
    const response = await fetch(
      `https://api.github.com/repos/${repo}/releases?per_page=10`,
      { headers: ghHeaders },
    );
    if (!response.ok) continue;
    for (const release of (await response.json()) as Array<{
      name: string | null;
      tag_name: string;
      html_url: string;
      published_at: string;
      draft: boolean;
      prerelease: boolean;
    }>) {
      if (!release.draft && release.published_at > since)
        items.push({
          title: release.name ?? `${repo} ${release.tag_name}`,
          url: release.html_url,
          publishedAt: release.published_at,
          reason: "GitHub release from a tracked official repository",
        });
    }
  }
  return items;
}
export async function discoverWeb(
  config: InterestConfig,
  since: string,
  client: OpenAI,
): Promise<DiscoveryItem[]> {
  const response = await client.responses.parse({
    model,
    tools: [
      {
        type: "openrouter:web_search",
        parameters: { max_results: 5, max_total_results: 15 },
      } as unknown as OpenAI.Responses.Tool,
    ],
    instructions:
      "Search for technically substantive primary sources published after the cutoff. Prioritize specifications, official release notes, repositories, engineering posts, and research. Exclude generic news and return JSON only as an array of {title,url,publishedAt,reason}. Publication dates must reflect original publication, not discovery.",
    input: JSON.stringify({
      cutoff: since,
      topics: config.topics,
      preferred: config.preferred_sources,
      exclude: config.exclude,
    }),
    text: { format: zodTextFormat(discoverySchema, "discovery_results") },
  });
  if (!response.output_parsed)
    throw new Error("The AI provider returned no discovery results");
  return response.output_parsed.items
    .map((item) => ({
      title: item.title,
      url: item.url,
      reason: item.reason,
      ...(item.publishedAt ? { publishedAt: item.publishedAt } : {}),
    }))
    .filter((item) => {
      try {
        return Boolean(item.title && canonicalizeUrl(item.url));
      } catch {
        return false;
      }
    });
}
export async function discover(
  config: InterestConfig,
  since: string,
  client: OpenAI,
): Promise<DiscoveryItem[]> {
  const [github, web] = await Promise.all([
    discoverGitHub(config, since),
    discoverWeb(config, since, client),
  ]);
  const seen = new Set<string>();
  return [...github, ...web].filter((item) => {
    const url = canonicalizeUrl(item.url);
    if (seen.has(url)) return false;
    seen.add(url);
    return true;
  });
}
