import { docsSchema } from "@astrojs/starlight/schema";
import { z } from "astro/zod";
import { starlightTagsExtension } from "starlight-tags/schema";

/**
 * Starlight's frontmatter schema extended with the Open Knowledge Format fields
 * it has no equivalent for, so they survive validation instead of being
 * stripped and the linter's vocabulary is visible from the site side.
 *
 * `title` and `description` are deliberately absent: OKF and Starlight already
 * agree on both, so Starlight's own definitions apply unchanged.
 */
export const okfDocsSchema = docsSchema({
  extend: z.looseObject({
    // `starlight-tags` reads `tags` and adds `featuredTags` / `hideTags` /
    // `tagsPosition`. Spread from its own export so the fields track the
    // plugin rather than a copy of them.
    ...starlightTagsExtension.shape,

    /** OKF page kind, e.g. `Protocol`, `Framework`, `Source*`. */
    type: z.string().optional(),
    // Redeclared after the spread: OKF always writes `tags`, and defaulting to
    // an empty array keeps the untitled index pages, which write no
    // frontmatter at all, out of the plugin's undefined-tag path.
    tags: z.array(z.string()).default([]),
    /** Retrieval date; surfaced through Starlight's `lastUpdated`. */
    timestamp: z.coerce.date().optional(),
    /** Absolute URL the page's evidence was retrieved from. */
    resource: z.string().optional(),
    okf_version: z.string().optional(),
  }),
});
