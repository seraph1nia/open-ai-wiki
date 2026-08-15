import type { PipelineResult } from "./pipeline.js";
export function printSummary(results: PipelineResult[]): void {
  const count = (status: PipelineResult["status"]) =>
    results.filter((r) => r.status === status).length;
  console.log(
    `DISCOVERED ${results.length}\nREJECTED ${count("rejected")}\nDUPLICATES ${count("duplicate")}\nACCEPTED ${count("accepted")}\n`,
  );
  for (const result of results) {
    if (result.candidate)
      console.log(
        `[${result.candidate.score.overall.toFixed(2)}] ${result.candidate.source.title}\n  → ${result.change?.action.replace("_", " ")} ${result.change?.target ?? "source only"}`,
      );
  }
}
