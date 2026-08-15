import { mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { afterEach, describe, expect, test } from "vitest";
import { validateWiki } from "./wiki-validator.js";

const root = resolve(".test-wiki-validator");

async function write(path: string, content: string): Promise<void> {
  const target = resolve(root, path);
  await mkdir(resolve(target, ".."), { recursive: true });
  await writeFile(target, content);
}

async function baseWiki(): Promise<void> {
  await write(
    "index.md",
    '---\nokf_version: "0.1"\n---\n\n# Wiki\n\n[Concepts](concepts/index.md)\n',
  );
  await write("log.md", "# Log\n");
  await write("INSTRUCTIONS.md", "# Instructions\n");
  await write("concepts/index.md", "# Concepts\n");
  await write("sources/index.md", "# Sources\n");
}

afterEach(() => rm(root, { recursive: true, force: true }));

describe("deterministic wiki validation", () => {
  test("accepts OKF extensions and source provenance", async () => {
    await baseWiki();
    await write(
      "sources/example.md",
      '---\ntype: Source\ntitle: Example\nurl: https://example.com\nsource_type: article\nretrieved_at: "2026-01-01"\nproducer_extension: true\n---\n\n# Example\n',
    );
    await write(
      "concepts/example.md",
      "---\ntype: Concept\ntitle: Example\n---\n\n# Example\n\n[Source](../sources/example.md)\n",
    );
    expect((await validateWiki(root)).issues).toEqual([]);
  });

  test("reports malformed frontmatter and broken internal links", async () => {
    await baseWiki();
    await write(
      "concepts/broken.md",
      "---\ntitle: Broken\n---\n\n# Broken\n\n[Missing](missing.md)\n",
    );
    const codes = (await validateWiki(root)).issues.map((item) => item.code);
    expect(codes).toContain("missing_type");
    expect(codes).toContain("broken_internal_link");
  });
});
