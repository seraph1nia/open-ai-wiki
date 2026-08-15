import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import type { NormalizedSource, SourceAdapter, SourceType } from "../types.js";
import { canonicalizeUrl, sha256 } from "../utils.js";

export class WebpageAdapter implements SourceAdapter {
  canHandle(input: string) {
    try {
      return ["http:", "https:"].includes(new URL(input).protocol);
    } catch {
      return false;
    }
  }
  async acquire(input: string): Promise<NormalizedSource> {
    const response = await fetch(input, {
      headers: {
        "user-agent": "ai-knowledge-harvester/0.1 (+https://github.com/)",
      },
      redirect: "follow",
    });
    if (!response.ok)
      throw new Error(
        `Web acquisition failed (${response.status}) for ${input}`,
      );
    const html = await response.text();
    const dom = new JSDOM(html, { url: response.url });
    const doc = dom.window.document;
    const article = new Readability(doc.cloneNode(true) as Document).parse();
    const canonical =
      doc.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ??
      response.url;
    const published =
      doc.querySelector<HTMLMetaElement>(
        'meta[property="article:published_time"],meta[name="date"],time[datetime]',
      )?.content ??
      doc.querySelector("time")?.getAttribute("datetime") ??
      undefined;
    const content = (article?.textContent ?? doc.body.textContent ?? "")
      .replace(/\s+/g, " ")
      .trim();
    if (content.length < 100)
      throw new Error(`No substantive readable content at ${input}`);
    const sourceType: SourceType = /\b(docs?|specification|reference)\b/i.test(
      response.url,
    )
      ? "documentation"
      : "article";
    const metadata = {
      title: article?.title ?? doc.title ?? input,
      url: response.url,
      canonicalUrl: canonicalizeUrl(canonical),
      sourceType,
      retrievedAt: new Date().toISOString(),
      ...(published ? { publishedAt: new Date(published).toISOString() } : {}),
      ...(article?.byline ? { author: article.byline } : {}),
    };
    return { metadata, content, contentHash: sha256(content) };
  }
}
