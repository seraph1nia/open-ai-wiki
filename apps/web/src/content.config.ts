import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { ROOT_TITLE, WIKI_ROOT } from "./lib/constants.js";
import { okfDocsSchema, okfLoader } from "./okf/index.js";

/**
 * Starlight's `docs` collection, sourced from the generated OKF bundle in
 * `openwiki/` instead of `src/content/docs/`. See `src/okf/` for how the two
 * frontmatter formats are reconciled.
 */
const docs = defineCollection({
  loader: okfLoader({ base: WIKI_ROOT, rootTitle: ROOT_TITLE }),
  schema: okfDocsSchema,
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
    // Optional because a run without a model key, and every backfilled
    // fragment, records the facts but no prose.
    narrative: z.string().optional(),
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

export const collections = { docs, changelog };
