import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createAIClient } from "./ai.js";
import { loadInterests } from "./config.js";
import { discover } from "./discover.js";
import { printSummary } from "./log.js";
import { processUrl, type PipelineResult } from "./pipeline.js";
import { loadState, saveState } from "./state.js";
import { stateRoot } from "./paths.js";
const dryRun = process.argv.slice(2).includes("--dry-run");
const started = new Date();
const state = await loadState();
const config = await loadInterests();
const client = createAIClient();
const since =
  state.lastSuccessfulHarvest ??
  new Date(Date.now() - 7 * 86400000).toISOString();
const discovered = await discover(config, since, client);
const results: PipelineResult[] = [];
let failures = 0;
for (const item of discovered) {
  try {
    results.push(await processUrl(item.url, { client, config, state, dryRun }));
  } catch (error) {
    failures += 1;
    console.error(
      `ERROR ${item.url}: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
if (!dryRun) {
  if (failures === 0) state.lastSuccessfulHarvest = started.toISOString();
  await saveState(state);
  const accepted = results.filter((r) => r.status === "accepted");
  const summary = [
    "# Harvest summary",
    "",
    `- Sources discovered: ${discovered.length}`,
    `- Sources rejected: ${results.filter((r) => r.status === "rejected").length}`,
    `- Duplicates: ${results.filter((r) => r.status === "duplicate").length}`,
    `- Sources ingested: ${accepted.length}`,
    `- Processing failures: ${failures}`,
    `- Concepts created: ${accepted.filter((r) => r.change?.action === "create_concept").length}`,
    `- Concepts enriched: ${accepted.filter((r) => r.change?.action === "enrich_concept").length}`,
    `- Framework/protocol changes: ${accepted.filter((r) => ["update_framework", "update_protocol"].includes(r.change?.action ?? "")).length}`,
    "",
    ...accepted.map(
      (r) =>
        `- [${r.candidate?.score.overall.toFixed(2)}] ${r.candidate?.source.title} → ${r.change?.action} ${r.change?.target ?? ""}`,
    ),
  ].join("\n");
  await writeFile(
    resolve(stateRoot, "last-harvest-summary.md"),
    `${summary}\n`,
  );
}
printSummary(results);
if (failures > 0) process.exitCode = 1;
