import { mkdir, writeFile } from "node:fs/promises";
import { basename, resolve } from "node:path";
import type { Candidate } from "./types.js";
import { inboxRoot } from "./paths.js";
import { slugify } from "./utils.js";
export async function writeCandidate(candidate: Candidate): Promise<string> {
  const path = resolve(
    inboxRoot,
    `${new Date().toISOString().slice(0, 10)}-${slugify(candidate.source.title)}-${candidate.id.slice(0, 8)}.json`,
  );
  await mkdir(inboxRoot, { recursive: true });
  await writeFile(path, `${JSON.stringify(candidate, null, 2)}\n`);
  return `ingestion/inbox/${basename(path)}`;
}
