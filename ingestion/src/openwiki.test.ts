import { describe, expect, test, vi } from "vitest";
import { synthesizeCandidate } from "./openwiki.js";
import type { Candidate } from "./types.js";

describe("dry-run synthesis", () => {
  test("returns a proposed change without writing", async () => {
    const title = `dry run ${randomUUID()}`;
    const client = {
      responses: {
        parse: vi.fn().mockResolvedValue({
          output_parsed: {
            action: "create_concept",
            title,
            summary: "A technical summary",
          },
        }),
      },
    };
    const source = {
      title: "Source",
      url: "https://example.com",
      canonicalUrl: "https://example.com/",
      sourceType: "article" as const,
      retrievedAt: "2026-01-01T00:00:00Z",
    };
    const candidate = {
      id: "1234567890",
      source,
      contentReference: "state/content/x",
      score: {
        relevance: 1,
        novelty: 1,
        authority: 1,
        technicalDepth: 1,
        overall: 1,
        reason: "good",
      },
      extraction: {
        source,
        concepts: [
          { title: "New durable idea", summary: "Summary", evidence: [] },
        ],
        references: [],
        entities: [],
        relationships: [],
      },
      recommendedAction: "create_concept",
    } satisfies Candidate;
    const change = await synthesizeCandidate(candidate, {
      client: client as never,
      dryRun: true,
    });
    expect(change.target).toMatch(/^concepts\/dry-run-/);
    expect(change.changed).toBe(true);
    await expect(access(resolve("openwiki", change.target!))).rejects.toThrow();
  });
});
import { randomUUID } from "node:crypto";
import { access } from "node:fs/promises";
import { resolve } from "node:path";
