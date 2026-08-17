import { docsSchema } from "@astrojs/starlight/schema";
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { ROOT_TITLE, WIKI_ROOT } from "./lib/constants.js";
import { okfLoader } from "./lib/okf.js";

/**
 * Starlight's `docs` collection, sourced from the generated OKF bundle in
 * `openwiki/` instead of `src/content/docs/`. See `lib/okf.ts` for how the two
 * frontmatter formats are reconciled.
 *
 * The schema extension declares the OKF fields Starlight does not know about so
 * they survive validation instead of being stripped, and so the linter's
 * vocabulary is visible from the site side.
 */
const docs = defineCollection({
  loader: okfLoader({ base: WIKI_ROOT, rootTitle: ROOT_TITLE }),
  schema: docsSchema({
    extend: z.looseObject({
      /** OKF page kind, e.g. `Protocol`, `Framework`, `Source*`. */
      type: z.string().optional(),
      tags: z.array(z.string()).default([]),
      /** Retrieval date; surfaced through Starlight's `lastUpdated`. */
      timestamp: z.coerce.date().optional(),
      /** Absolute URL the page's evidence was retrieved from. */
      resource: z.string().optional(),
      okf_version: z.string().optional(),
    }),
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

export const collections = { docs, changelog };
