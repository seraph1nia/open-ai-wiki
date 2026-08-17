import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { highlights, toItems } from "../lib/changelog.js";
import { entryPath, withBase } from "../okf/index.js";

/**
 * The changelog as a feed, so the wiki can be followed without visiting it.
 * `highlights` drops rewordings and deleted pages: a feed reader should only be
 * notified about things it can actually go and read.
 */
export async function GET(context: APIContext): Promise<Response> {
  const base = import.meta.env.BASE_URL;
  const fragments = (await getCollection("changelog")).map(
    (fragment) => fragment.data,
  );

  return rss({
    title: "AI Knowledge — What's new",
    description:
      "New and updated pages in the AI Knowledge wiki, recorded after each scheduled ingestion run.",
    site: context.site ?? "https://example.github.io",
    items: highlights(toItems(fragments), 50).map((item) => ({
      title: item.title,
      description: item.summary,
      pubDate: item.runAt,
      link: withBase(entryPath(item.path), base),
      categories: item.tags,
    })),
  });
}
