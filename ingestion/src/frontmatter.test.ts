import { describe, expect, test } from "vitest";
import { parseOkf, stringifyOkf } from "./frontmatter.js";

describe("OKF frontmatter", () => {
  test("parses and preserves producer extensions", () => {
    const input = `---\ntype: Concept\ntitle: Test\nproducer_extension:\n  answer: 42\n---\n\n# Test\n`;
    expect(parseOkf(input).data.producer_extension).toEqual({ answer: 42 });
    expect(stringifyOkf(input)).toContain("producer_extension:");
  });
  test("requires a type", () =>
    expect(() => parseOkf("---\ntitle: Missing\n---\n")).toThrow());
});
