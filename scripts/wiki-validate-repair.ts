import { spawn } from "node:child_process";

/**
 * Validate the generated `openwiki/` bundle and, when it is invalid, ask
 * OpenWiki to repair its own content until it passes.
 *
 * The architecture this preserves: OpenWiki generates and repairs, the
 * deterministic validator (`vp run lint:wiki`) decides, and this orchestrator
 * retries or aborts. The model never decides whether the corpus is valid, and
 * a corpus that still fails validation after the last attempt fails the run
 * rather than reaching changelog generation or a pull request.
 */

export const maxRepairAttempts = 3;

export interface CommandOutcome {
  ok: boolean;
  /** Combined stdout and stderr, as produced, for use as the repair brief. */
  output: string;
}

export interface ValidateRepairOptions {
  /** Runs the deterministic validator. */
  lint: () => Promise<CommandOutcome>;
  /** Hands a repair request to OpenWiki. */
  repair: (request: string) => Promise<CommandOutcome>;
  maxAttempts?: number;
  log?: (message: string) => void;
}

export type ValidateRepairResult =
  /** The corpus was already valid; OpenWiki was never called. */
  | { status: "valid"; attempts: number }
  /** OpenWiki repaired the reported findings within the attempt budget. */
  | { status: "repaired"; attempts: number }
  /** Findings survived every attempt. */
  | { status: "unrepaired"; attempts: number; findings: string }
  /** The repair command itself failed, so nothing can be concluded. */
  | { status: "repair_failed"; attempts: number; output: string };

// Built at runtime: an escape character written into a regex literal is a
// control character, which `no-control-regex` rejects.
const ansiPattern = new RegExp(`${String.fromCodePoint(27)}\\[[\\d;]*m`, "gu");

/**
 * `vp run` prefixes a task with a `$ <command>` echo carrying its cache
 * decision, which names whichever file invalidated the cache and so reads like
 * a finding. Keep the validator's own output; drop the runner's chrome.
 */
export function stripRunnerChrome(output: string): string {
  return output
    .replace(ansiPattern, "")
    .split(/\r?\n/u)
    .filter((line) => !/^\s*\$ /u.test(line))
    .join("\n")
    .trim();
}

/**
 * The brief OpenWiki receives. It carries the validator's exact findings and
 * bounds the work to repairing them: no new sources, no unrelated edits, and no
 * suppressing a finding by deleting the marker that reports it.
 */
export function buildRepairRequest(findings: string): string {
  return [
    "This is a validation-repair pass for the existing OpenWiki corpus.",
    "",
    "Do not ingest new sources or broaden the wiki.",
    "Repair only the deterministic validation findings below.",
    "Fix the underlying problems rather than suppressing errors or deleting degradation markers.",
    "Repair Mermaid diagrams, broken links, heading anchors and frontmatter properly.",
    'In Mermaid, quote labels that contain punctuation ("run (a + b)") rather than dropping the detail that made them fail to parse.',
    "Keep changes surgical.",
    "",
    "Validation findings:",
    stripRunnerChrome(findings),
  ].join("\n");
}

export async function validateAndRepair(
  options: ValidateRepairOptions,
): Promise<ValidateRepairResult> {
  const maxAttempts = options.maxAttempts ?? maxRepairAttempts;
  const log = options.log ?? (() => {});

  let validation = await options.lint();
  if (validation.ok) return { status: "valid", attempts: 0 };

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    log(`Wiki validation failed; repair attempt ${attempt}/${maxAttempts}.`);

    // Always brief OpenWiki with the newest findings, so an attempt that fixed
    // part of the corpus does not get asked to fix what it already fixed. A
    // pass that changes nothing simply repeats, which the attempt budget bounds.
    const repair = await options.repair(buildRepairRequest(validation.output));
    if (!repair.ok)
      return {
        status: "repair_failed",
        attempts: attempt,
        output: repair.output,
      };

    validation = await options.lint();
    if (validation.ok) return { status: "repaired", attempts: attempt };
  }

  return {
    status: "unrepaired",
    attempts: maxAttempts,
    findings: validation.output,
  };
}

/**
 * Runs a command, streaming it to this process's own streams so a CI log shows
 * progress live, while capturing the same bytes for the repair brief.
 */
export function runCommand(
  command: string,
  args: readonly string[],
): Promise<CommandOutcome> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, [...args], {
      stdio: ["ignore", "pipe", "pipe"],
    });
    let output = "";

    child.stdout.on("data", (chunk: Buffer) => {
      output += chunk.toString();
      process.stdout.write(chunk);
    });
    child.stderr.on("data", (chunk: Buffer) => {
      output += chunk.toString();
      process.stderr.write(chunk);
    });

    child.on("error", reject);
    child.on("close", (code) => {
      resolve({ ok: code === 0, output });
    });
  });
}

const lintCommand = ["exec", "vp", "run", "lint:wiki"] as const;

if (import.meta.main) {
  const result = await validateAndRepair({
    lint: () => runCommand("pnpm", lintCommand),
    // The `--` separator matches the documented `pnpm wiki:update -- "<request>"`
    // entry point; `scripts/wiki-update.sh` drops it.
    repair: (request) => runCommand("pnpm", ["wiki:update", "--", request]),
    log: (message) => {
      console.log(message);
    },
  });

  switch (result.status) {
    case "valid":
      console.log("WIKI_VALIDATE_OK attempts=0 (no repair needed)");
      break;
    case "repaired":
      console.log(`WIKI_VALIDATE_OK attempts=${result.attempts.toString()}`);
      break;
    case "repair_failed":
      console.error(
        `\nOpenWiki repair command failed on attempt ${result.attempts.toString()}; the corpus is still unvalidated.`,
      );
      process.exit(1);
      break;
    case "unrepaired":
      console.error(
        `\n${stripRunnerChrome(result.findings)}\n\nWiki validation still failing after ${result.attempts.toString()} repair attempt(s).`,
      );
      process.exit(1);
      break;
  }
}
