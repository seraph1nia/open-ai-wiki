import { describe, expect, test, vi } from "vitest";
import {
  buildRepairRequest,
  maxRepairAttempts,
  validateAndRepair,
  type CommandOutcome,
  type ValidateRepairOptions,
} from "./wiki-validate-repair.ts";

type Lint = ValidateRepairOptions["lint"];
type Repair = ValidateRepairOptions["repair"];

const findings =
  "concepts/a2ui.md:12 [broken_internal_link] Link target ../protocols/mcp.md does not exist.";

/**
 * A validator scripted with one outcome per call, so a test states exactly how
 * the corpus behaves across the repair loop. No model, no child processes.
 */
function scriptedLint(
  ...results: readonly boolean[]
): () => Promise<CommandOutcome> {
  let call = 0;
  return () => {
    const ok = results[Math.min(call, results.length - 1)] ?? false;
    call += 1;
    return Promise.resolve({ ok, output: ok ? "WIKI_OK files=42" : findings });
  };
}

function repairs(ok = true): (request: string) => Promise<CommandOutcome> {
  return () =>
    Promise.resolve({ ok, output: ok ? "updated" : "provider error" });
}

describe("repair request", () => {
  test("drops the task runner's echo so it is not read as a finding", () => {
    // `vp run` prints this before the validator's own output; the file it names
    // is whatever invalidated the cache, not a page with a problem.
    const request = buildRepairRequest(
      `\u001B[1m$ node scripts/wiki-lint.ts\u001B[0m ○ cache miss: 'openwiki/concepts/factory-toolchain.md' modified, executing\n${findings}`,
    );

    expect(request).not.toContain("cache miss");
    expect(request).not.toContain("factory-toolchain");
    expect(request).toContain(findings);
  });

  test("carries the exact findings and bounds the work", () => {
    const request = buildRepairRequest(findings);
    expect(request).toContain(findings);
    expect(request).toContain("Do not ingest new sources");
    expect(request).toContain("rather than suppressing errors");
    expect(request).toContain("Keep changes surgical.");
  });
});

describe("validate and repair", () => {
  test("a valid corpus never calls OpenWiki", async () => {
    const repair = vi.fn<Repair>(repairs());
    const result = await validateAndRepair({
      lint: scriptedLint(true),
      repair,
    });

    expect(result).toEqual({ status: "valid", attempts: 0 });
    expect(repair).not.toHaveBeenCalled();
  });

  test("one failure is repaired in one attempt", async () => {
    const repair = vi.fn<Repair>(repairs());
    const result = await validateAndRepair({
      lint: scriptedLint(false, true),
      repair,
    });

    expect(result).toEqual({ status: "repaired", attempts: 1 });
    expect(repair).toHaveBeenCalledTimes(1);
    expect(repair.mock.calls[0]?.[0]).toContain(findings);
  });

  test("repairs across multiple attempts", async () => {
    const repair = vi.fn<Repair>(repairs());
    const result = await validateAndRepair({
      lint: scriptedLint(false, false, true),
      repair,
    });

    expect(result).toEqual({ status: "repaired", attempts: 2 });
    expect(repair).toHaveBeenCalledTimes(2);
  });

  test("an unrepairable corpus fails with the surviving findings", async () => {
    const repair = vi.fn<Repair>(repairs());
    const result = await validateAndRepair({
      lint: scriptedLint(false),
      repair,
    });

    expect(result).toEqual({
      status: "unrepaired",
      attempts: maxRepairAttempts,
      findings,
    });
    expect(repair).toHaveBeenCalledTimes(maxRepairAttempts);
  });

  test("a failing repair command aborts immediately", async () => {
    const lint = vi.fn<Lint>(scriptedLint(false));
    const result = await validateAndRepair({ lint, repair: repairs(false) });

    expect(result).toMatchObject({ status: "repair_failed", attempts: 1 });
    // The corpus is not revalidated after a failed repair: nothing ran.
    expect(lint).toHaveBeenCalledTimes(1);
  });

  test("no-progress failures stay bounded by the attempt budget", async () => {
    // Identical findings every time, and a repair that reports success while
    // changing nothing — the loop must still stop rather than run forever.
    const lint = vi.fn<Lint>(scriptedLint(false));
    const repair = vi.fn<Repair>(repairs());
    const result = await validateAndRepair({ lint, repair, maxAttempts: 2 });

    expect(result).toMatchObject({ status: "unrepaired", attempts: 2 });
    expect(repair).toHaveBeenCalledTimes(2);
    expect(lint).toHaveBeenCalledTimes(3);
    // Every attempt is briefed with the findings that are still open.
    for (const call of repair.mock.calls) expect(call[0]).toContain(findings);
  });
});
