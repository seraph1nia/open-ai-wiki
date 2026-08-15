import { access, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { describe, expect, test } from "vitest";
import type { Candidate } from "./types.js";
import { synthesizeCandidate, type OpenWikiExecutor } from "./openwiki.js";

function candidate(): Candidate {
  const source = {
    title: "Source",
    url: "https://example.com",
    canonicalUrl: "https://example.com/",
    sourceType: "article" as const,
    retrievedAt: "2026-01-01T00:00:00Z",
  };
  return {
    id: "1234567890abcdef",
    source,
    contentReference: "https://example.com/#sha256=test",
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
  };
}

async function fixture(root: string): Promise<void> {
  await mkdir(resolve(root, "openwiki/concepts"), { recursive: true });
  await mkdir(resolve(root, "openwiki/sources"), { recursive: true });
  await mkdir(resolve(root, "ingestion/inbox"), { recursive: true });
  await writeFile(
    resolve(root, "openwiki/index.md"),
    '---\nokf_version: "0.1"\n---\n\n# Wiki\n',
  );
  await writeFile(resolve(root, "openwiki/concepts/index.md"), "# Concepts\n");
  await writeFile(resolve(root, "openwiki/sources/index.md"), "# Sources\n");
  await writeFile(resolve(root, "openwiki/log.md"), "# Log\n");
  await writeFile(
    resolve(root, "openwiki/INSTRUCTIONS.md"),
    "# Instructions\n",
  );
}

const mockOpenWiki: OpenWikiExecutor = async ({
  sandboxRoot,
  expectedSourcePath,
}) => {
  const source = resolve(sandboxRoot, "openwiki", expectedSourcePath);
  const concept = resolve(sandboxRoot, "openwiki/concepts/new-durable-idea.md");
  await mkdir(dirname(source), { recursive: true });
  await writeFile(
    source,
    '---\ntype: Source\ntitle: Source\nurl: https://example.com\nsource_type: article\nretrieved_at: "2026-01-01T00:00:00Z"\n---\n\n# Source\n',
  );
  await writeFile(
    concept,
    `---\ntype: Concept\ntitle: New durable idea\n---\n\n# New durable idea\n\n[Source](../${expectedSourcePath})\n`,
  );
  return { stdout: "Integrated candidate." };
};

describe("official OpenWiki synthesis boundary", () => {
  test("dry run reports an isolated diff without writing", async () => {
    const root = resolve(".test-openwiki-dry");
    await fixture(root);
    try {
      const change = await synthesizeCandidate(candidate(), {
        root,
        executor: mockOpenWiki,
        dryRun: true,
      });
      expect(change.engine).toBe("openwiki");
      expect(change.target).toBe("concepts/new-durable-idea.md");
      await expect(
        access(resolve(root, "openwiki/concepts/new-durable-idea.md")),
      ).rejects.toThrow();
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  test("applies only validated OpenWiki output", async () => {
    const root = resolve(".test-openwiki-apply");
    await fixture(root);
    try {
      const change = await synthesizeCandidate(candidate(), {
        root,
        executor: mockOpenWiki,
      });
      expect(change.action).toBe("create_concept");
      expect(
        await readFile(
          resolve(root, "openwiki/concepts/new-durable-idea.md"),
          "utf8",
        ),
      ).toContain("New durable idea");
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  test("rejects changes outside the controlled OpenWiki boundary", async () => {
    const root = resolve(".test-openwiki-boundary");
    await fixture(root);
    try {
      await expect(
        synthesizeCandidate(candidate(), {
          root,
          executor: async ({ sandboxRoot }) => {
            await writeFile(
              resolve(sandboxRoot, "README.md"),
              "uncontrolled\n",
            );
            return {};
          },
        }),
      ).rejects.toThrow("uncontrolled change");
      await expect(access(resolve(root, "README.md"))).rejects.toThrow();
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  test("blocks deletion of existing knowledge", async () => {
    const root = resolve(".test-openwiki-deletion");
    await fixture(root);
    const existing = resolve(root, "openwiki/concepts/existing.md");
    await writeFile(
      existing,
      "---\ntype: Concept\ntitle: Existing\n---\n\n# Existing\n",
    );
    try {
      await expect(
        synthesizeCandidate(candidate(), {
          root,
          executor: async ({ sandboxRoot }) => {
            await rm(resolve(sandboxRoot, "openwiki/concepts/existing.md"));
            return {};
          },
        }),
      ).rejects.toThrow("delete existing knowledge");
      expect(await readFile(existing, "utf8")).toContain("Existing");
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
