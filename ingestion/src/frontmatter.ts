import matter from "gray-matter";
import { z } from "zod";

const known = z.looseObject({
  type: z.string().min(1),
  title: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  timestamp: z.string().datetime().optional(),
});

export function parseOkf(markdown: string) {
  const parsed = matter(markdown);
  return { data: known.parse(parsed.data), content: parsed.content };
}

export function stringifyOkf(markdown: string): string {
  const parsed = parseOkf(markdown);
  return matter.stringify(parsed.content, parsed.data);
}
