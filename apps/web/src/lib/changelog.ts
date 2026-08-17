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
  /** Prose about the run as a whole. Absent when no model was available. */
  narrative?: string | undefined;
  entries: ChangelogEntryData[];
}

/**
 * A fragment paired with the collection id it was loaded under. The id is the
 * fragment's file name (`2026-08-16-2024`), which is already URL-safe and is
 * what `/whats-new/[run]/` publishes each run at.
 */
export interface ChangelogFragmentInput extends ChangelogFragmentData {
  runId: string;
}

export interface ChangelogItem extends ChangelogEntryData {
  runAt: Date;
  runId: string;
  /** Site-relative route, absent once the page no longer exists. */
  href?: string;
}

export interface ChangelogRun {
  runId: string;
  runAt: Date;
  narrative?: string | undefined;
  items: ChangelogItem[];
}

const kindOrder: Record<ChangeKind, number> = {
  new: 0,
  updated: 1,
  removed: 2,
};

/**
 * Newest run first; within a run, substantive changes before reworded ones and
 * new pages before edits, so the top of the list is the part worth reading.
 */
function byNewsValue(first: ChangelogItem, second: ChangelogItem): number {
  return (
    second.runAt.getTime() - first.runAt.getTime() ||
    Number(first.minor) - Number(second.minor) ||
    kindOrder[first.kind] - kindOrder[second.kind] ||
    first.title.localeCompare(second.title)
  );
}

function toItem(
  fragment: ChangelogFragmentInput,
): (entry: ChangelogEntryData) => ChangelogItem {
  return (entry) => ({
    ...entry,
    runAt: fragment.runAt,
    runId: fragment.runId,
    ...(entry.kind === "removed" ? {} : { href: entryPath(entry.path) }),
  });
}

/** The whole feed as one flat list, for the RSS feed and the homepage digest. */
export function toItems(fragments: ChangelogFragmentInput[]): ChangelogItem[] {
  return fragments
    .flatMap((fragment) => fragment.entries.map(toItem(fragment)))
    .sort(byNewsValue);
}

/**
 * The feed as one section per ingestion run, newest first. Runs rather than
 * calendar days: several runs can land on the same day, and each is its own
 * update with its own narrative and its own permalink.
 */
export function toRuns(fragments: ChangelogFragmentInput[]): ChangelogRun[] {
  return fragments
    .map((fragment) => ({
      runId: fragment.runId,
      runAt: fragment.runAt,
      narrative: fragment.narrative,
      items: fragment.entries.map(toItem(fragment)).sort(byNewsValue),
    }))
    .sort((first, second) => second.runAt.getTime() - first.runAt.getTime());
}

/** Where `/whats-new/[run].astro` publishes a single run. */
export function runPath(runId: string): string {
  return `/whats-new/${runId}/`;
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
