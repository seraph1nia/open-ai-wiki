import matter from "gray-matter";
import { validateOkfFrontmatter } from "openwiki/dist/okf/frontmatter.js";

export function parseOkf(markdown: string) {
  const validation = validateOkfFrontmatter(markdown);
  if (!validation.valid)
    throw new Error(
      validation.issues
        .map((finding) => `[${finding.code}] ${finding.message}`)
        .join("\n"),
    );
  const parsed = matter(markdown);
  return { data: parsed.data, content: parsed.content };
}

export function stringifyOkf(markdown: string): string {
  const parsed = parseOkf(markdown);
  return matter.stringify(parsed.content, parsed.data);
}
