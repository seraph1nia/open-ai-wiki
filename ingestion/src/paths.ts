import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

export const repositoryRoot = fileURLToPath(new URL("../..", import.meta.url));
export const ingestionRoot = resolve(repositoryRoot, "ingestion");
export const inboxRoot = resolve(ingestionRoot, "inbox");
export const stateRoot = resolve(ingestionRoot, "state");
export const wikiRoot = resolve(repositoryRoot, "openwiki");
