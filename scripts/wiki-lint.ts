import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, extname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { findInvalidMermaidFences } from "openwiki/dist/mermaid/validate.js";
import {
  parseFrontmatterFields,
  validateOkfFrontmatter,
} from "openwiki/dist/okf/frontmatter.js";

/**
 * Deterministic validation of the `openwiki/` Open Knowledge Format bundle.
 *
 * This is the content counterpart to `vp lint`: Oxlint owns the code, this owns
 * the generated wiki. It is intentionally offline and model-free so it can gate
 * a pull request, including the ones the scheduled OpenWiki workflow opens.
 */

export interface WikiIssue {
  code: string;
  file: string;
  message: string;
  line?: number;
}

export interface WikiValidationReport {
  files: number;
  links: number;
  issues: WikiIssue[];
}

export const wikiRoot = fileURLToPath(new URL("../openwiki", import.meta.url));

const reservedDocuments = new Set(["index.md", "log.md", "INSTRUCTIONS.md"]);
const linkPattern = /(?<!!)\[[^\]]*\]\(([^)]+)\)/gu;
const headingPattern = /^#{1,6}\s+(.+?)\s*#*\s*$/gmu;
// OpenWiki has used two provenance vocabularies: `url`/`retrieved_at` and the
// current `resource`/`timestamp`. Accept either, and require the substance:
// a source-typed page pointing at an absolute URL with a retrieval date.
const resourceFields = ["resource", "url"] as const;
const retrievedFields = ["timestamp", "retrieved_at"] as const;

async function markdownFiles(root: string): Promise<string[]> {
  const files: string[] = [];
  for (const entry of await readdir(root, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const path = resolve(root, entry.name);
    if (entry.isDirectory()) files.push(...(await markdownFiles(path)));
    else if (entry.name.endsWith(".md")) files.push(path);
  }
  return files.sort();
}

function issue(
  file: string,
  code: string,
  message: string,
  line?: number,
): WikiIssue {
  return { file, code, message, ...(line === undefined ? {} : { line }) };
}

function isExternal(href: string): boolean {
  return /^(?:[a-z][a-z\d+.-]*:|\/\/)/iu.test(href);
}

function anchors(markdown: string): Set<string> {
  const result = new Set<string>();
  const duplicates = new Map<string, number>();
  for (const match of markdown.matchAll(headingPattern)) {
    const base = (match[1] ?? "")
      .trim()
      .toLowerCase()
      .replace(/<[^>]+>/gu, "")
      .replace(/[^\p{L}\p{N}\s_-]/gu, "")
      .replace(/\s+/gu, "-");
    const seen = duplicates.get(base) ?? 0;
    duplicates.set(base, seen + 1);
    result.add(seen === 0 ? base : `${base}-${seen}`);
  }
  return result;
}

async function exists(path: string): Promise<boolean> {
  return stat(path).then(
    () => true,
    () => false,
  );
}

function displayPath(root: string, path: string): string {
  return relative(root, path).split(sep).join("/");
}

function text(
  fields: Record<string, unknown>,
  keys: readonly string[],
): string | undefined {
  for (const key of keys) {
    const value = fields[key];
    if (typeof value === "string" && value.trim().length > 0) return value;
  }
  return undefined;
}

function isAbsoluteUrl(value: string): boolean {
  return URL.canParse(value) && /^[a-z][a-z\d+.-]*:/iu.test(value);
}

/**
 * A source page must carry provenance a reader can follow back: what it is, a
 * resolvable resource, and when it was retrieved. Returns the missing pieces.
 */
function missingSourceProvenance(
  fields: Record<string, unknown> | undefined,
): string[] {
  if (!fields) return ["frontmatter"];
  const missing: string[] = [];
  const type = text(fields, ["type"]);
  if (!type || !/^source\b/iu.test(type)) missing.push("type (Source*)");
  const resource = text(fields, resourceFields);
  if (!resource) missing.push(resourceFields.join("|"));
  else if (!isAbsoluteUrl(resource))
    missing.push(`${resourceFields.join("|")} (absolute URL)`);
  if (!text(fields, retrievedFields)) missing.push(retrievedFields.join("|"));
  return missing;
}

export async function validateWiki(
  root = wikiRoot,
): Promise<WikiValidationReport> {
  const issues: WikiIssue[] = [];
  const files = await markdownFiles(root);
  const fileSet = new Set(files);
  let links = 0;

  const rootIndex = resolve(root, "index.md");
  if (!fileSet.has(rootIndex))
    issues.push(
      issue("index.md", "missing_root_index", "Root index.md is required."),
    );
  else {
    const fields = parseFrontmatterFields(await readFile(rootIndex, "utf8"));
    if (fields?.okf_version !== "0.1")
      issues.push(
        issue(
          "index.md",
          "invalid_okf_version",
          'Root index.md must declare okf_version: "0.1".',
        ),
      );
  }

  const directories = new Set(files.map((file) => dirname(file)));
  for (const directory of directories) {
    if (directory !== root && !(await exists(resolve(directory, "index.md"))))
      issues.push(
        issue(
          displayPath(root, directory),
          "missing_directory_index",
          "Every wiki directory must contain index.md.",
        ),
      );
  }

  for (const file of files) {
    const name = file.split(sep).at(-1) ?? file;
    const relativeFile = displayPath(root, file);
    const markdown = await readFile(file, "utf8");

    if (!reservedDocuments.has(name)) {
      const result = validateOkfFrontmatter(markdown);
      if (!result.valid)
        for (const finding of result.issues)
          issues.push(
            issue(relativeFile, finding.code, finding.message, finding.line),
          );
    }

    if (relativeFile.startsWith("sources/") && name !== "index.md") {
      const missing = missingSourceProvenance(parseFrontmatterFields(markdown));
      if (missing.length > 0)
        issues.push(
          issue(
            relativeFile,
            "invalid_source_provenance",
            `Source page is missing provenance: ${missing.join(", ")}.`,
          ),
        );
    }

    if (
      /<!--\s*openwiki:\s*(?:broken internal link|mermaid parse failed)/iu.test(
        markdown,
      )
    )
      issues.push(
        issue(
          relativeFile,
          "openwiki_degradation_marker",
          "Resolve OpenWiki validation markers before publishing.",
        ),
      );

    for (const failure of await findInvalidMermaidFences(markdown))
      issues.push(
        issue(
          relativeFile,
          "invalid_mermaid",
          failure.error,
          failure.fence.openLine + 1,
        ),
      );

    const sourceAnchors = anchors(markdown);
    const lines = markdown.split(/\r?\n/u);
    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index] ?? "";
      for (const match of line.matchAll(linkPattern)) {
        const href = (match[1] ?? "").trim().replace(/^<|>$/gu, "");
        if (!href || isExternal(href)) continue;
        links += 1;
        const [rawPath = "", rawAnchor] = href.split("#", 2);
        const linkPath = decodeURIComponent(rawPath.split("?", 1)[0] ?? "");
        if (!linkPath) {
          if (rawAnchor && !sourceAnchors.has(decodeURIComponent(rawAnchor)))
            issues.push(
              issue(
                relativeFile,
                "missing_anchor",
                `Heading anchor #${rawAnchor} does not exist.`,
                index + 1,
              ),
            );
          continue;
        }
        const target = linkPath.startsWith("/")
          ? resolve(root, `.${linkPath}`)
          : resolve(dirname(file), linkPath);
        if (!(await exists(target))) {
          issues.push(
            issue(
              relativeFile,
              "broken_internal_link",
              `Link target ${linkPath} does not exist.`,
              index + 1,
            ),
          );
          continue;
        }
        if (rawAnchor && extname(target).toLowerCase() === ".md") {
          const targetMarkdown = await readFile(target, "utf8");
          if (!anchors(targetMarkdown).has(decodeURIComponent(rawAnchor)))
            issues.push(
              issue(
                relativeFile,
                "missing_anchor",
                `Heading anchor #${rawAnchor} does not exist in ${linkPath}.`,
                index + 1,
              ),
            );
        }
      }
    }
  }

  return { files: files.length, links, issues };
}

export function formatReport(report: WikiValidationReport): string {
  return report.issues
    .map(
      (finding) =>
        `${finding.file}${finding.line ? `:${finding.line}` : ""} [${finding.code}] ${finding.message}`,
    )
    .join("\n");
}

if (import.meta.main) {
  const report = await validateWiki(
    process.argv[2] ? resolve(process.argv[2]) : wikiRoot,
  );
  if (report.issues.length > 0) {
    console.error(formatReport(report));
    console.error(
      `\nWiki validation failed: ${report.issues.length} issue(s) in ${report.files} file(s).`,
    );
    process.exit(1);
  }
  console.log(`WIKI_OK files=${report.files} links=${report.links}`);
}
