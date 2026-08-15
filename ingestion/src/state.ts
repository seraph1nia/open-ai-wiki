import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import type { HarvestState } from "./types.js";
import { stateRoot } from "./paths.js";
export const statePath = resolve(stateRoot, "seen.json");
export async function loadState(path = statePath): Promise<HarvestState> {
  try {
    return JSON.parse(await readFile(path, "utf8")) as HarvestState;
  } catch {
    return { version: 1, lastSuccessfulHarvest: null, sources: {} };
  }
}
export async function saveState(
  state: HarvestState,
  path = statePath,
): Promise<void> {
  await mkdir(dirname(path), { recursive: true });
  const temp = `${path}.tmp`;
  await writeFile(temp, `${JSON.stringify(state, null, 2)}\n`);
  await rename(temp, path);
}
