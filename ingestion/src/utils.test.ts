import { describe, expect, test } from "vitest";
import { canonicalizeUrl } from "./utils.js";

describe("canonicalizeUrl", () => {
  test("removes tracking and fragments", () =>
    expect(
      canonicalizeUrl("https://WWW.Example.com/a/?utm_source=x&b=2#part"),
    ).toBe("https://example.com/a?b=2"));
  test("keeps meaningful parameters", () =>
    expect(
      canonicalizeUrl("https://youtube.com/watch?v=abc&utm_medium=social"),
    ).toBe("https://youtube.com/watch?v=abc"));
});
