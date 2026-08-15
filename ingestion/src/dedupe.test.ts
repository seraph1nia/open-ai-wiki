import { describe, expect, test } from "vitest";
import { deduplicate } from "./dedupe.js";
import type { HarvestState, NormalizedSource } from "./types.js";

const source = {
  metadata: {
    title: "x",
    url: "https://example.com/post?utm_source=x",
    canonicalUrl: "https://example.com/post",
    sourceType: "article",
    retrievedAt: "2026-01-01T00:00:00Z",
  },
  content: "body",
  contentHash: "abc",
} satisfies NormalizedSource;

describe("deduplication", () => {
  test("finds canonical URLs", () => {
    const state: HarvestState = {
      version: 1,
      lastSuccessfulHarvest: null,
      sources: {
        "https://example.com/post": {
          canonicalUrl: "https://example.com/post",
          contentHash: "other",
          discoveredAt: "2026-01-01",
          decision: "rejected",
        },
      },
    };
    expect(deduplicate(source, state).kind).toBe("exact_source");
  });
  test("finds unchanged mirrors", () => {
    const state: HarvestState = {
      version: 1,
      lastSuccessfulHarvest: null,
      sources: {
        "https://mirror.test/x": {
          canonicalUrl: "https://mirror.test/x",
          contentHash: "abc",
          discoveredAt: "2026-01-01",
          decision: "accepted",
        },
      },
    };
    expect(deduplicate(source, state).kind).toBe("unchanged_content");
  });
});
