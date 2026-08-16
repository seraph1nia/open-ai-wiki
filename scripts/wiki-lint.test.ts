import { mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { afterEach, describe, expect, test } from "vitest";
import { validateWiki } from "./wiki-lint.ts";

const root = resolve(".test-wiki-lint");

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
  test("accepts OKF extensions and the legacy source vocabulary", async () => {
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

  test("accepts the current OpenWiki source vocabulary", async () => {
    await baseWiki();
    await write(
      "sources/evidence.md",
      "---\ntype: Source Evidence\ntitle: Evidence\nresource: https://example.com/releases\ntags: [source, evidence]\ntimestamp: 2026-08-16\n---\n\n# Evidence\n",
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

  test("reports source pages missing provenance", async () => {
    await baseWiki();
    await write(
      "sources/thin.md",
      "---\ntype: Source\ntitle: Thin\n---\n\n# Thin\n",
    );
    const issues = (await validateWiki(root)).issues.filter(
      (item) => item.code === "invalid_source_provenance",
    );
    expect(issues).toHaveLength(1);
    expect(issues[0]?.message).toContain("resource|url");
    expect(issues[0]?.message).toContain("timestamp|retrieved_at");
  });

  test("rejects a source resource that is not an absolute URL", async () => {
    await baseWiki();
    await write(
      "sources/relative.md",
      "---\ntype: Source Evidence\ntitle: Relative\nresource: ./somewhere\ntimestamp: 2026-08-16\n---\n\n# Relative\n",
    );
    const issues = (await validateWiki(root)).issues.filter(
      (item) => item.code === "invalid_source_provenance",
    );
    expect(issues[0]?.message).toContain("absolute URL");
  });

  test("reports directories without an index and unresolved anchors", async () => {
    await baseWiki();
    await write(
      "protocols/orphan.md",
      "---\ntype: Concept\ntitle: Orphan\n---\n\n# Orphan\n\n[Nowhere](../concepts/index.md#absent)\n",
    );
    const codes = (await validateWiki(root)).issues.map((item) => item.code);
    expect(codes).toContain("missing_directory_index");
    expect(codes).toContain("missing_anchor");
  });

  test("flags OpenWiki degradation markers left in a page", async () => {
    await baseWiki();
    await write(
      "concepts/degraded.md",
      "---\ntype: Concept\ntitle: Degraded\n---\n\n# Degraded\n\n<!-- openwiki: mermaid parse failed: boom -->\n",
    );
    const codes = (await validateWiki(root)).issues.map((item) => item.code);
    expect(codes).toContain("openwiki_degradation_marker");
  });
});
