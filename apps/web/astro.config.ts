import { unified } from "@astrojs/markdown-remark";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import mermaid from "astro-mermaid";
import { fileURLToPath } from "node:url";
import { SITE_DESCRIPTION, SITE_TITLE, WIKI_ROOT } from "./src/lib/constants";
import { remarkWikiLinks } from "./src/lib/remark-wiki-links";

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1];
const customDomain = process.env.CUSTOM_DOMAIN;
const base =
  process.env.BASE_PATH ??
  (process.env.GITHUB_ACTIONS === "true" && repository && !customDomain
    ? `/${repository}`
    : "/");
const site = customDomain
  ? `https://${customDomain}`
  : (process.env.SITE_URL ?? "https://example.github.io");

const wikiRoot = fileURLToPath(new URL(WIKI_ROOT, import.meta.url));

export default defineConfig({
  site,
  base,
  output: "static",
  trailingSlash: "always",
  markdown: {
    // Both `astro-mermaid` and Starlight append their own plugins to this
    // processor, so the OKF link rewriter runs alongside the built-in Markdown
    // pipeline rather than replacing it.
    processor: unified({
      remarkPlugins: [[remarkWikiLinks, { wikiRoot, base }]],
    }),
  },
  integrations: [
    // Ahead of Starlight so that Starlight extends the processor this replaces,
    // rather than the other way round. Rewrites ```mermaid fences and injects
    // the client renderer, following Starlight's `data-theme` on the way.
    mermaid({ autoTheme: true, enableLog: false }),
    starlight({
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      // The corpus lives outside `src/content/docs/`, so Starlight has to be
      // told to run its Markdown pipeline (heading anchors, asides) over it.
      markdown: { processedDirs: [WIKI_ROOT] },
      // No `sidebar`: Starlight autogenerates one from the file tree, which is
      // what a corpus whose directories are generated needs. Anything the next
      // ingestion run adds shows up without a config change.
      social: [
        {
          icon: "rss",
          label: "What's new",
          href: `${base.replace(/\/$/, "")}/whats-new/`,
        },
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/seraph1nia/open-ai-wiki",
        },
      ],
    }),
  ],
});
