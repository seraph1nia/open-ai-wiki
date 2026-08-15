import { YoutubeTranscript } from "youtube-transcript";
import type { NormalizedSource, SourceAdapter } from "../types.js";
import { canonicalizeUrl, sha256 } from "../utils.js";
export class YouTubeAdapter implements SourceAdapter {
  canHandle(input: string) {
    try {
      return /(^|\.)youtube\.com$|^youtu\.be$/.test(
        new URL(input).hostname.toLowerCase(),
      );
    } catch {
      return false;
    }
  }
  async acquire(input: string): Promise<NormalizedSource> {
    const page = await fetch(input, {
      headers: { "user-agent": "Mozilla/5.0 ai-knowledge-harvester" },
    });
    if (!page.ok)
      throw new Error(`YouTube page acquisition failed (${page.status})`);
    const html = await page.text();
    const title =
      html.match(/<meta name="title" content="([^"]+)"/)?.[1] ??
      "YouTube video";
    const channel = html.match(/<link itemprop="name" content="([^"]+)"/)?.[1];
    const published = html.match(
      /itemprop="datePublished" content="([^"]+)"/,
    )?.[1];
    const description =
      html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
    let transcript: Array<{
      text: string;
      offsetSeconds: number;
      durationSeconds: number;
    }> = [];
    try {
      transcript = (await YoutubeTranscript.fetchTranscript(input)).map(
        (item) => ({
          text: item.text,
          offsetSeconds: item.offset / 1000,
          durationSeconds: item.duration / 1000,
        }),
      );
    } catch {
      /* Missing or disabled captions: metadata is still a valid source. */
    }
    const content = [
      description,
      ...transcript.map(
        (line) =>
          `[${Math.floor(line.offsetSeconds / 60)}:${String(Math.floor(line.offsetSeconds % 60)).padStart(2, "0")}] ${line.text}`,
      ),
    ].join("\n");
    if (content.trim().length < 40)
      throw new Error(
        "YouTube captions are unavailable and the description is not substantive enough to ingest",
      );
    const metadata = {
      title,
      url: input,
      canonicalUrl: canonicalizeUrl(input),
      sourceType: "youtube" as const,
      retrievedAt: new Date().toISOString(),
      ...(channel ? { channel, author: channel } : {}),
      ...(published ? { publishedAt: new Date(published).toISOString() } : {}),
    };
    return { metadata, content, contentHash: sha256(content), transcript };
  }
}
