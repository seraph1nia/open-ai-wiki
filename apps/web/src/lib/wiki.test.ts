import { describe, expect, test } from "vitest";
import {
  buildGraph,
  extractInternalLinks,
  renderedWikiHref,
  withBase,
} from "./wiki";
describe("wiki graph helpers", () => {
  test("resolves internal markdown links", () =>
    expect(
      extractInternalLinks(
        "[MCP](../protocols/mcp.md) [web](https://x.test)",
        "concepts/auth",
      ),
    ).toEqual(["protocols/mcp"]));
  test("prefixes project Pages paths", () => {
    expect(withBase("/concepts/auth/", "/wiki/")).toBe("/wiki/concepts/auth/");
    expect(withBase("/concepts/auth/", "/")).toBe("/concepts/auth/");
  });
  test("rewrites wiki-relative links for project Pages", () => {
    expect(
      renderedWikiHref(
        "../protocols/mcp.md#auth",
        "concepts/security",
        "/repo/",
      ),
    ).toBe("/repo/protocols/mcp/#auth");
  });
  test("generates backlinks from outbound Markdown links", () => {
    const entries = [
      { id: "concepts/auth", body: "[MCP](../protocols/mcp.md)" },
      { id: "protocols/mcp", body: "" },
    ] as never;
    expect(buildGraph(entries).backlinks.get("protocols/mcp")).toEqual([
      "concepts/auth",
    ]);
  });
});
