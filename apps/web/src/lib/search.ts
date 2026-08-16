import type { WikiEntry } from "./wiki.js";
import { entryPath, isConceptEntry, titleFor } from "./wiki.js";

export interface SearchDocument {
  title: string;
  description: string;
  body: string;
  tags: string[];
  type: string;
  path: string;
}

export function createSearchIndex(entries: WikiEntry[]): SearchDocument[] {
  return entries.filter(isConceptEntry).map((entry) => ({
    title: titleFor(entry),
    description: entry.data.description ?? "",
    body: (entry.body ?? "").replace(/[#_*`>[\]()]/g, " ").slice(0, 12000),
    tags: entry.data.tags,
    type: entry.data.type ?? "Concept",
    path: entryPath(entry.id),
  }));
}
