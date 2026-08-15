import { describe, expect, test } from "vitest";
import { calculateOverall } from "./rank.js";

const weights = {
  relevance: 0.35,
  novelty: 0.3,
  authority: 0.2,
  technicalDepth: 0.15,
  threshold: 0.75,
};

describe("candidate scoring", () => {
  test("uses configured weighted score", () =>
    expect(
      calculateOverall(
        {
          relevance: 1,
          novelty: 0.5,
          authority: 0.8,
          technicalDepth: 0.6,
          reason: "technical",
        },
        weights,
      ).overall,
    ).toBe(0.75));
});
