import type { NormalizedSource, SourceAdapter } from "./types.js";
import { GitHubAdapter } from "./sources/github.js";
import { YouTubeAdapter } from "./sources/youtube.js";
import { WebpageAdapter } from "./sources/webpage.js";
export const adapters: SourceAdapter[] = [
  new GitHubAdapter(),
  new YouTubeAdapter(),
  new WebpageAdapter(),
];
export function adapterFor(input: string, available = adapters): SourceAdapter {
  const adapter = available.find((item) => item.canHandle(input));
  if (!adapter) throw new Error(`No source adapter supports: ${input}`);
  return adapter;
}
export const acquireSource = (input: string): Promise<NormalizedSource> =>
  adapterFor(input).acquire(input);
