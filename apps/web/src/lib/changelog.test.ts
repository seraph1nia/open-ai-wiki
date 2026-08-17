import { describe, expect, test } from "vitest";
import type { ChangelogEntryData, ChangelogFragmentInput } from "./changelog";
import { highlights, toItems, toRuns } from "./changelog";

function entry(overrides: Partial<ChangelogEntryData>): ChangelogEntryData {
  return {
    kind: "updated",
    path: "protocols/a2ui.md",
    title: "A2UI",
    summary: "",
    minor: false,
    added: 40,
    removed: 2,
    tags: [],
    ...overrides,
  };
}

function fragment(
  runAt: string,
  entries: Partial<ChangelogEntryData>[],
  narrative?: string,
): ChangelogFragmentInput {
  return {
    // Shaped like the real fragment file names, e.g. `2026-08-16-0600`.
    runId: `${runAt.slice(0, 10)}-${runAt.slice(11, 13)}${runAt.slice(14, 16)}`,
    runAt: new Date(runAt),
    entries: entries.map(entry),
    ...(narrative === undefined ? {} : { narrative }),
  };
}

describe("changelog feed", () => {
  test("resolves a route for surviving pages and none for removed ones", () => {
    const items = toItems([
      fragment("2026-08-16T06:00:00Z", [
        { kind: "new", path: "protocols/a2ui.md" },
        {
          kind: "removed",
          path: "frameworks/langgraph.md",
          title: "LangGraph",
        },
      ]),
    ]);
    expect(items.find((item) => item.kind === "new")?.href).toBe(
      "/protocols/a2ui/",
    );
    expect(items.find((item) => item.kind === "removed")?.href).toBeUndefined();
  });

  test("orders newest run first, then news before rewordings", () => {
    const items = toItems([
      fragment("2026-08-14T06:00:00Z", [{ title: "Older run" }]),
      fragment("2026-08-16T06:00:00Z", [
        { kind: "removed", title: "Gone" },
        { kind: "updated", title: "Reworded", minor: true },
        { kind: "updated", title: "Expanded" },
        { kind: "new", title: "Fresh" },
      ]),
    ]);
    expect(items.map((item) => item.title)).toEqual([
      "Fresh",
      "Expanded",
      "Gone",
      "Reworded",
      "Older run",
    ]);
  });

  test("keeps runs on the same UTC day separate, newest first", () => {
    const runs = toRuns([
      fragment("2026-08-16T06:00:00Z", [{ title: "Morning" }]),
      fragment("2026-08-16T21:00:00Z", [{ title: "Evening" }], "Evening prose"),
      fragment("2026-08-15T06:00:00Z", [{ title: "Yesterday" }]),
    ]);
    expect(runs.map((run) => run.items[0]?.title)).toEqual([
      "Evening",
      "Morning",
      "Yesterday",
    ]);
    expect(runs[0]?.narrative).toBe("Evening prose");
    expect(runs[1]?.narrative).toBeUndefined();
  });

  test("orders a run's own entries by news value", () => {
    const [run] = toRuns([
      fragment("2026-08-16T06:00:00Z", [
        { kind: "updated", title: "Reworded", minor: true },
        { kind: "removed", title: "Gone" },
        { kind: "new", title: "Fresh" },
        { kind: "updated", title: "Expanded" },
      ]),
    ]);
    expect(run?.items.map((item) => item.title)).toEqual([
      "Fresh",
      "Expanded",
      "Gone",
      "Reworded",
    ]);
  });

  test("carries the run id onto every item, for the run permalink", () => {
    const items = toItems([
      fragment("2026-08-16T06:00:00Z", [{ title: "One" }]),
    ]);
    expect(items[0]?.runId).toBe("2026-08-16-0600");
  });

  test("highlights exclude rewordings, removals, and anything past the limit", () => {
    const items = toItems([
      fragment("2026-08-16T06:00:00Z", [
        { kind: "new", title: "One" },
        { kind: "new", title: "Two" },
        { kind: "updated", title: "Minor", minor: true },
        { kind: "removed", title: "Gone" },
        { kind: "new", title: "Three" },
        { kind: "new", title: "Four" },
      ]),
    ]);
    expect(highlights(items, 3).map((item) => item.title)).toEqual([
      "Four",
      "One",
      "Three",
    ]);
  });
});
