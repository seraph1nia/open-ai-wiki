import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const wiki = defineCollection({
  loader: glob({
    pattern: ["**/*.md", "!INSTRUCTIONS.md", "!large_tool_results/**"],
    base: "../../openwiki",
  }),
  schema: z.looseObject({
    title: z.string().optional(),
    description: z.string().optional(),
    type: z.string().optional(),
    tags: z.array(z.string()).default([]),
    timestamp: z.coerce.date().optional(),
    resource: z.string().optional(),
  }),
});

/**
 * One immutable fragment per ingestion run, recorded by
 * `scripts/wiki-changelog.ts` from the Git diff of `openwiki/`. It lives outside
 * the bundle because `scripts/wiki-update.sh` mirrors `openwiki/` with
 * `rsync --delete` and would erase anything the generator did not write.
 */
const changelog = defineCollection({
  loader: glob({ pattern: "*.json", base: "../../changelog" }),
  schema: z.object({
    runAt: z.coerce.date(),
    commit: z.string().optional(),
    entries: z
      .array(
        z.object({
          kind: z.enum(["new", "updated", "removed"]),
          path: z.string(),
          title: z.string(),
          summary: z.string().default(""),
          minor: z.boolean().default(false),
          added: z.number().default(0),
          removed: z.number().default(0),
          type: z.string().optional(),
          tags: z.array(z.string()).default([]),
          resource: z.string().optional(),
        }),
      )
      .default([]),
  }),
});

export const collections = { wiki, changelog };
