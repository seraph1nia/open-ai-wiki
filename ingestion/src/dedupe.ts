import type { HarvestState, NormalizedSource } from "./types.js";
import { canonicalizeUrl } from "./utils.js";
export type DedupeResult = {
  duplicate: boolean;
  kind?: "exact_source" | "equivalent_source" | "unchanged_content";
  matchedUrl?: string;
};
export function deduplicate(
  source: NormalizedSource,
  state: HarvestState,
): DedupeResult {
  const canonical = canonicalizeUrl(source.metadata.canonicalUrl);
  if (state.sources[canonical])
    return { duplicate: true, kind: "exact_source", matchedUrl: canonical };
  for (const [url, item] of Object.entries(state.sources)) {
    if (canonicalizeUrl(url) === canonical)
      return { duplicate: true, kind: "equivalent_source", matchedUrl: url };
    if (item.contentHash === source.contentHash)
      return { duplicate: true, kind: "unchanged_content", matchedUrl: url };
  }
  return { duplicate: false };
}
