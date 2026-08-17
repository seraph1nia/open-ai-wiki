import { glob } from "astro/loaders";
import type { Loader } from "astro/loaders";

/**
 * Adapts the Open Knowledge Format bundle in `openwiki/` to Starlight's `docs`
 * collection.
 *
 * `openwiki/` is generated: the scheduled workflow regenerates it and
 * `scripts/wiki-update.sh` mirrors it with `rsync --delete`, so nothing in
 * there can be hand-edited to suit Starlight and any adaptation has to happen
 * on the way in. The two formats already agree on the fields that matter —
 * `title` and `description` mean the same thing in both — so this is a thin
 * layer over the stock glob loader rather than a translation.
 *
 * It closes the one real gap. OKF writes frontmatter on documents but not on
 * the `index.md` it generates for the corpus root and for each directory, while
 * Starlight requires `title` on every page. Those titles are derived here, the
 * same way the wiki's own index pages label a directory.
 */

interface OkfLoaderOptions {
  /** Corpus root, relative to the Astro project root. */
  base: string;
  /** Title given to the corpus root page, which OKF leaves untitled. */
  rootTitle: string;
}

/**
 * Titles an OKF page that carries no frontmatter. Entry ids are directory
 * paths with the `index` segment already collapsed by the glob loader, so the
 * last segment is the directory being indexed and an empty id is the root.
 */
export function derivedTitle(id: string, rootTitle: string): string {
  const directory = id
    .replace(/(?:^|\/)index$/u, "")
    .split("/")
    .filter(Boolean)
    .at(-1);
  if (!directory) return rootTitle;
  return directory
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Fills in the Starlight frontmatter OKF does not write. Anything OKF does
 * write wins, so a future generator that starts emitting `title` on index pages
 * silently takes over from the derivation above.
 */
export function toStarlightFrontmatter<T extends Record<string, unknown>>(
  id: string,
  data: T,
  rootTitle: string,
): T {
  const patch: Record<string, unknown> = {};

  if (typeof data["title"] !== "string" || data["title"].length === 0) {
    patch["title"] = derivedTitle(id, rootTitle);
  }

  // OKF's `timestamp` is the retrieval date the linter requires on source
  // pages, which is exactly what Starlight renders as "Last updated". YAML
  // hands it over as a string or a Date depending on the quoting, and
  // Starlight's schema only accepts a Date, so normalize it here rather than
  // letting a string fail validation.
  if (data["lastUpdated"] === undefined) {
    const timestamp = data["timestamp"];
    const parsed =
      timestamp instanceof Date
        ? timestamp
        : typeof timestamp === "string" || typeof timestamp === "number"
          ? new Date(timestamp)
          : undefined;
    if (parsed && !Number.isNaN(parsed.getTime()))
      patch["lastUpdated"] = parsed;
  }

  return Object.keys(patch).length === 0 ? data : ({ ...data, ...patch } as T);
}

/** The stock glob loader over `openwiki/`, plus the frontmatter fill-in. */
export function okfLoader({ base, rootTitle }: OkfLoaderOptions): Loader {
  const files = glob({
    base,
    // `INSTRUCTIONS.md` is guidance for the OpenWiki agent rather than a page,
    // and `large_tool_results/` is raw tool output the agent spilled to disk;
    // `.openwikiignore` keeps both out of the corpus, so keep them out of the
    // site too.
    pattern: ["**/*.md", "!INSTRUCTIONS.md", "!large_tool_results/**"],
  });

  return {
    name: "okf-loader",
    load: (context) =>
      files.load({
        ...context,
        parseData: (props) =>
          context.parseData({
            ...props,
            data: toStarlightFrontmatter(props.id, props.data, rootTitle),
          }),
      }),
  };
}
