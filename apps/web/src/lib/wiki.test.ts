import { describe, expect, test } from "vitest";
import { entryPath, renderedWikiHref, withBase } from "./wiki";

describe("OKF route helpers", () => {
  test("maps root, directory indexes, and concepts to clean routes", () => {
    expect(entryPath("index")).toBe("/");
    expect(entryPath("concepts/index")).toBe("/concepts/");
    expect(entryPath("concepts/context-engineering")).toBe(
      "/concepts/context-engineering/",
    );
  });

  test("prefixes project Pages paths", () => {
    expect(withBase("/concepts/auth/", "/wiki/")).toBe("/wiki/concepts/auth/");
    expect(withBase("/concepts/auth/", "/")).toBe("/concepts/auth/");
  });

  test("rewrites wiki-relative concept and index links", () => {
    expect(
      renderedWikiHref(
        "../protocols/mcp.md#auth",
        "concepts/security",
        "/repo/",
      ),
    ).toBe("/repo/protocols/mcp/#auth");
    expect(renderedWikiHref("concepts/", "index", "/repo/")).toBe(
      "/repo/concepts/",
    );
  });
});
