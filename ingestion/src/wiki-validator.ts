import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, extname, relative, resolve, sep } from "node:path";
import matter from "gray-matter";
import { findInvalidMermaidFences } from "openwiki/dist/mermaid/validate.js";
import { validateOkfFrontmatter } from "openwiki/dist/okf/frontmatter.js";
import { z } from "zod";
import { wikiRoot as defaultWikiRoot } from "./paths.js";

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

const reservedDocuments = new Set(["index.md", "log.md", "INSTRUCTIONS.md"]);
const linkPattern = /(?<!!)\[[^\]]*\]\(([^)]+)\)/gu;
const headingPattern = /^#{1,6}\s+(.+?)\s*#*\s*$/gmu;
const sourceSchema = z.looseObject({
  type: z.literal("Source"),
  url: z.string().url(),
  source_type: z.string().min(1),
  retrieved_at: z.string().min(1),
});

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

export async function validateWiki(
  root = defaultWikiRoot,
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
    const data = matter(await readFile(rootIndex, "utf8")).data;
    if (data.okf_version !== "0.1")
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
      const parsed = sourceSchema.safeParse(matter(markdown).data);
      if (!parsed.success)
        issues.push(
          issue(
            relativeFile,
            "invalid_source_provenance",
            "Source pages require type Source, url, source_type, and retrieved_at.",
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
          ? resolve(dirname(root), `.${linkPath}`)
          : resolve(dirname(file), linkPath);
        const targetExists = await exists(target);
        if (!targetExists) {
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

export function assertValidWiki(report: WikiValidationReport): void {
  if (report.issues.length === 0) return;
  const details = report.issues
    .map(
      (finding) =>
        `${finding.file}${finding.line ? `:${finding.line}` : ""} [${finding.code}] ${finding.message}`,
    )
    .join("\n");
  throw new Error(`Wiki validation failed:\n${details}`);
}
