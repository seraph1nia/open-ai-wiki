import { entryPath } from "../okf/routes.js";

/**
 * Reads the changelog fragments that `scripts/wiki-changelog.ts` records after
 * each ingestion run and flattens them into a reverse-chronological feed.
 *
 * The fragments store a wiki-relative `path` rather than a URL so that route
 * shape and base-path handling stay in `wiki.ts`, where the rest of the site
 * gets them from.
 */

export type ChangeKind = "new" | "updated" | "removed";

export interface ChangelogEntryData {
  kind: ChangeKind;
  path: string;
  title: string;
  summary: string;
  minor: boolean;
  added: number;
  removed: number;
  tags: string[];
  // Spelled `| undefined` because these are read back from a Zod-inferred
  // collection schema, which the repository's `exactOptionalPropertyTypes`
  // setting will not silently widen for us.
  type?: string | undefined;
  resource?: string | undefined;
}

export interface ChangelogFragmentData {
  runAt: Date;
  commit?: string | undefined;
  entries: ChangelogEntryData[];
}

export interface ChangelogItem extends ChangelogEntryData {
  runAt: Date;
  /** Site-relative route, absent once the page no longer exists. */
  href?: string;
}

export interface ChangelogDay {
  day: string;
  date: Date;
  items: ChangelogItem[];
}

const kindOrder: Record<ChangeKind, number> = {
  new: 0,
  updated: 1,
  removed: 2,
};

function isoDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/**
 * Newest run first; within a run, substantive changes before reworded ones and
 * new pages before edits, so the top of the list is the part worth reading.
 */
export function toItems(fragments: ChangelogFragmentData[]): ChangelogItem[] {
  return fragments
    .flatMap((fragment) =>
      fragment.entries.map((entry) => ({
        ...entry,
        runAt: fragment.runAt,
        ...(entry.kind === "removed" ? {} : { href: entryPath(entry.path) }),
      })),
    )
    .sort(
      (first, second) =>
        second.runAt.getTime() - first.runAt.getTime() ||
        Number(first.minor) - Number(second.minor) ||
        kindOrder[first.kind] - kindOrder[second.kind] ||
        first.title.localeCompare(second.title),
    );
}

/** Two runs on the same day read as one day's news, not two. */
export function groupByDay(items: ChangelogItem[]): ChangelogDay[] {
  const days: ChangelogDay[] = [];
  for (const item of items) {
    const day = isoDay(item.runAt);
    const current = days.at(-1);
    if (current?.day === day) current.items.push(item);
    else days.push({ day, date: item.runAt, items: [item] });
  }
  return days;
}

/**
 * The homepage and the feed advertise the wiki, so they carry only entries that
 * are actually news: no rewordings, and nothing that leads to a dead route.
 */
export function highlights(
  items: ChangelogItem[],
  limit: number,
): ChangelogItem[] {
  return items
    .filter((item) => !item.minor && item.kind !== "removed")
    .slice(0, limit);
}
