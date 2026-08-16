import { describe, expect, test } from "vitest";
import {
  asAddedLines,
  buildEntry,
  classifyStatus,
  countLines,
  formatMarkdown,
  fragmentName,
  isInterestingPage,
  splitDiffByPath,
} from "./wiki-changelog.ts";

const page = [
  "---",
  "type: Protocol",
  "title: A2UI (Agent to UI) Protocol",
  "description: A declarative UI protocol for agent-driven interfaces.",
  "resource: https://a2ui.org",
  "tags: [a2ui, generative-ui]",
  "timestamp: 2026-08-16",
  "---",
  "",
  "# A2UI (Agent to UI) Protocol",
  "",
].join("\n");

describe("changed page selection", () => {
  test("keeps concept pages and drops generated bookkeeping", () => {
    expect(isInterestingPage("protocols/a2ui.md")).toBe(true);
    expect(isInterestingPage("themes.md")).toBe(true);

    // Regenerated navigation, ingestion evidence and raw tool output all churn
    // on every run and would bury the pages a reader came for.
    expect(isInterestingPage("index.md")).toBe(false);
    expect(isInterestingPage("protocols/index.md")).toBe(false);
    expect(isInterestingPage("INSTRUCTIONS.md")).toBe(false);
    expect(isInterestingPage("sources/web-search.md")).toBe(false);
    expect(isInterestingPage("large_tool_results/call_abc.txt")).toBe(false);
    expect(isInterestingPage(".last-update.json")).toBe(false);
  });

  test("maps git status letters to reader-facing directions", () => {
    // `git diff --name-status`, used when backfilling from history.
    expect(classifyStatus("A")).toBe("new");
    expect(classifyStatus("M")).toBe("updated");
    expect(classifyStatus("D")).toBe("removed");
    expect(classifyStatus("U")).toBeUndefined();

    // `git status --porcelain`, used for the working tree an ingestion run
    // leaves behind: staged column, worktree column, or untracked.
    expect(classifyStatus("??")).toBe("new");
    expect(classifyStatus(" M")).toBe("updated");
    expect(classifyStatus("M ")).toBe("updated");
    expect(classifyStatus(" D")).toBe("removed");
    expect(classifyStatus("AM")).toBe("new");
    expect(classifyStatus("  ")).toBeUndefined();
  });
});

describe("entry construction", () => {
  test("carries frontmatter through as the deterministic fallback", () => {
    const entry = buildEntry(
      { kind: "new", path: "protocols/a2ui.md", added: 83, removed: 0 },
      page,
    );
    expect(entry).toMatchObject({
      kind: "new",
      title: "A2UI (Agent to UI) Protocol",
      summary: "A declarative UI protocol for agent-driven interfaces.",
      type: "Protocol",
      resource: "https://a2ui.org",
      tags: ["a2ui", "generative-ui"],
      minor: false,
    });
  });

  test("falls back to the first heading, then the file name", () => {
    expect(
      buildEntry(
        { kind: "new", path: "concepts/untitled.md", added: 4, removed: 0 },
        "---\ntype: Concept\n---\n\n# Heading title\n",
      ).title,
    ).toBe("Heading title");
    expect(
      buildEntry(
        { kind: "removed", path: "concepts/gone.md", added: 0, removed: 9 },
        "",
      ).title,
    ).toBe("gone");
  });

  test("marks small edits minor, but never a new or removed page", () => {
    const path = "protocols/a2ui.md";
    expect(
      buildEntry({ kind: "updated", path, added: 3, removed: 1 }, page).minor,
    ).toBe(true);
    expect(
      buildEntry({ kind: "updated", path, added: 40, removed: 6 }, page).minor,
    ).toBe(false);
    expect(
      buildEntry({ kind: "new", path, added: 2, removed: 0 }, page).minor,
    ).toBe(false);
  });

  test("omits absent optional fields rather than emitting empties", () => {
    const entry = buildEntry(
      { kind: "updated", path: "concepts/bare.md", added: 20, removed: 2 },
      "# Bare\n",
    );
    expect(entry).not.toHaveProperty("type");
    expect(entry).not.toHaveProperty("tags");
    expect(entry).not.toHaveProperty("resource");
    expect(entry.summary).toBe("");
  });
});

describe("diff handling", () => {
  test("keys each file's diff by its wiki-relative path", () => {
    const diff = [
      "diff --git a/openwiki/protocols/a2ui.md b/openwiki/protocols/a2ui.md",
      "index 1111111..2222222 100644",
      "--- a/openwiki/protocols/a2ui.md",
      "+++ b/openwiki/protocols/a2ui.md",
      "@@ -1 +1 @@",
      "+surfaces",
      "diff --git a/openwiki/themes.md b/openwiki/themes.md",
      "--- a/openwiki/themes.md",
      "+++ b/openwiki/themes.md",
      "+convergence",
      "",
    ].join("\n");
    const chunks = splitDiffByPath(diff);
    expect([...chunks.keys()]).toEqual(["protocols/a2ui.md", "themes.md"]);
    expect(chunks.get("protocols/a2ui.md")).toContain("+surfaces");
    expect(chunks.get("protocols/a2ui.md")).not.toContain("+convergence");
  });

  test("counts a new page's lines the way git numstat would", () => {
    // OpenWiki writes pages with no trailing newline; both must count as 3.
    expect(countLines("one\ntwo\nthree")).toBe(3);
    expect(countLines("one\ntwo\nthree\n")).toBe(3);
    expect(countLines("")).toBe(0);
  });

  test("shows an untracked page as added lines, since no diff covers it", () => {
    expect(asAddedLines("# New page\n\nBody.\n")).toBe(
      "+# New page\n+\n+Body.\n+",
    );
  });

  test("truncates an oversized diff instead of dropping it", () => {
    const diff = `diff --git a/openwiki/big.md b/openwiki/big.md\n${"+line\n".repeat(4000)}`;
    const chunk = splitDiffByPath(diff).get("big.md") ?? "";
    expect(chunk).toContain("… (diff truncated)");
    expect(chunk.length).toBeLessThan(7000);
  });
});

describe("fragment output", () => {
  test("names fragments so they sort chronologically in UTC", () => {
    expect(fragmentName(new Date("2026-08-16T06:04:11Z"), "0604")).toBe(
      "2026-08-16-0604.json",
    );
    // Late UTC must not roll forward into the next local day.
    expect(fragmentName(new Date("2026-08-16T23:30:00Z"), "abc1234")).toBe(
      "2026-08-16-abc1234.json",
    );
  });

  test("groups the pull-request body by direction", () => {
    const markdown = formatMarkdown({
      runAt: "2026-08-16T06:04:11.000Z",
      entries: [
        buildEntry(
          { kind: "new", path: "protocols/a2ui.md", added: 83, removed: 0 },
          page,
        ),
        buildEntry(
          { kind: "removed", path: "frameworks/old.md", added: 0, removed: 15 },
          "---\ntype: Framework\ntitle: Old\n---\n",
        ),
      ],
    });
    expect(markdown).toContain("### New");
    expect(markdown).toContain("### Removed");
    expect(markdown).not.toContain("### Updated");
    expect(markdown).toContain("`protocols/a2ui.md`, +83/-0");
  });

  test("says so plainly when a run changed nothing", () => {
    expect(
      formatMarkdown({ runAt: "2026-08-16T06:04:11.000Z", entries: [] }),
    ).toBe("No wiki pages changed.\n");
  });
});
