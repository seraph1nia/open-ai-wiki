import { describe, expect, test } from "vitest";
import { adapterFor } from "./acquire.js";
import { GitHubAdapter } from "./sources/github.js";
import { YouTubeAdapter } from "./sources/youtube.js";
import { WebpageAdapter } from "./sources/webpage.js";

describe("source routing", () => {
  test("routes specialized sources before generic web", () => {
    expect(adapterFor("https://github.com/org/repo")).toBeInstanceOf(
      GitHubAdapter,
    );
    expect(adapterFor("https://youtube.com/watch?v=x")).toBeInstanceOf(
      YouTubeAdapter,
    );
    expect(adapterFor("https://example.com/post")).toBeInstanceOf(
      WebpageAdapter,
    );
  });
});
