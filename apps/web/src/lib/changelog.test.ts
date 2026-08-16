import { describe, expect, test } from "vitest";
import type { ChangelogEntryData, ChangelogFragmentData } from "./changelog";
import { groupByDay, highlights, toItems } from "./changelog";

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
): ChangelogFragmentData {
  return { runAt: new Date(runAt), entries: entries.map(entry) };
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

  test("merges runs that land on the same UTC day", () => {
    const days = groupByDay(
      toItems([
        fragment("2026-08-16T06:00:00Z", [{ title: "Morning" }]),
        fragment("2026-08-16T21:00:00Z", [{ title: "Evening" }]),
        fragment("2026-08-15T06:00:00Z", [{ title: "Yesterday" }]),
      ]),
    );
    expect(days.map((day) => day.day)).toEqual(["2026-08-16", "2026-08-15"]);
    expect(days[0]?.items.map((item) => item.title)).toEqual([
      "Evening",
      "Morning",
    ]);
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
