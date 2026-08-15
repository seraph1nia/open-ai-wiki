import { createAIClient } from "./ai.js";
import { loadInterests } from "./config.js";
import { printSummary } from "./log.js";
import { processUrl } from "./pipeline.js";
import { loadState, saveState } from "./state.js";
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const url = args.find((arg) => !arg.startsWith("--"));
if (!url) {
  console.error("Usage: pnpm ingest <URL> [-- --dry-run]");
  process.exit(2);
}
try {
  new URL(url);
} catch {
  console.error(`Invalid URL: ${url}`);
  process.exit(2);
}
const state = await loadState();
const result = await processUrl(url, {
  client: createAIClient(),
  config: await loadInterests(),
  state,
  dryRun,
});
if (!dryRun) await saveState(state);
printSummary([result]);
