import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { Candidate } from "./types.js";
import { slugify } from "./utils.js";
export async function writeCandidate(candidate: Candidate): Promise<string> {
  const path = resolve(
    "ingestion/inbox",
    `${new Date().toISOString().slice(0, 10)}-${slugify(candidate.source.title)}-${candidate.id.slice(0, 8)}.json`,
  );
  await mkdir(resolve("ingestion/inbox"), { recursive: true });
  await writeFile(path, `${JSON.stringify(candidate, null, 2)}\n`);
  return path;
}
