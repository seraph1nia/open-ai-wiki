import { describe, expect, test } from "vitest";
import { derivedTitle, toStarlightFrontmatter } from "./okf";

describe("OKF to Starlight frontmatter", () => {
  test("titles the index pages OKF leaves without frontmatter", () => {
    expect(derivedTitle("", "Home")).toBe("Home");
    expect(derivedTitle("index", "Home")).toBe("Home");
    expect(derivedTitle("concepts", "Home")).toBe("Concepts");
    expect(derivedTitle("concepts/index", "Home")).toBe("Concepts");
    expect(derivedTitle("large-tool-results", "Home")).toBe(
      "Large Tool Results",
    );
  });

  test("keeps the title OKF wrote", () => {
    const data = { title: "A2UI (Agent to UI) Protocol" };
    expect(toStarlightFrontmatter("protocols/a2ui", data, "Home")).toBe(data);
  });

  test("maps the OKF retrieval date onto Starlight's lastUpdated", () => {
    const fromString: Record<string, unknown> = {
      title: "A2UI",
      timestamp: "2026-08-16",
    };
    expect(
      toStarlightFrontmatter("protocols/a2ui", fromString, "Home")[
        "lastUpdated"
      ],
    ).toEqual(new Date("2026-08-16"));

    const parsed = new Date("2026-08-16");
    const fromDate: Record<string, unknown> = {
      title: "A2UI",
      timestamp: parsed,
    };
    expect(
      toStarlightFrontmatter("protocols/a2ui", fromDate, "Home")["lastUpdated"],
    ).toBe(parsed);
  });

  test("leaves lastUpdated alone when the timestamp is missing or unusable", () => {
    expect(
      toStarlightFrontmatter("protocols/a2ui", { title: "A2UI" }, "Home"),
    ).not.toHaveProperty("lastUpdated");
    expect(
      toStarlightFrontmatter(
        "protocols/a2ui",
        { title: "A2UI", timestamp: "not a date" },
        "Home",
      ),
    ).not.toHaveProperty("lastUpdated");
  });

  test("preserves the OKF fields Starlight does not know about", () => {
    expect(
      toStarlightFrontmatter(
        "concepts/index",
        { type: "Concept", tags: ["a2ui"], okf_version: "0.1" },
        "Home",
      ),
    ).toMatchObject({
      title: "Concepts",
      type: "Concept",
      tags: ["a2ui"],
      okf_version: "0.1",
    });
  });
});
