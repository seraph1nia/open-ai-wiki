import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

const wiki = defineCollection({
  loader: glob({
    pattern: ["**/*.md", "!INSTRUCTIONS.md"],
    base: "../../openwiki",
  }),
  schema: z.looseObject({
    title: z.string().optional(),
    description: z.string().optional(),
    type: z.string().optional(),
    tags: z.array(z.string()).default([]),
    timestamp: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
    url: z.url().optional(),
    source_type: z.string().optional(),
    published_at: z.coerce.date().optional(),
    retrieved_at: z.coerce.date().optional(),
    author: z.string().optional(),
    channel: z.string().optional(),
    repository: z.string().optional(),
    supporting_sources: z.array(z.string()).default([]),
    related: z.array(z.string()).default([]),
  }),
});

export const collections = { wiki };
