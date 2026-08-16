import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import sitemap from "@astrojs/sitemap";
import { fileURLToPath } from "node:url";
import { remarkMermaid } from "./src/lib/remark-mermaid";
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

export default defineConfig({
  site,
  base,
  output: "static",
  trailingSlash: "always",
  markdown: {
    processor: unified({
      remarkPlugins: [
        remarkMermaid,
        [
          remarkWikiLinks,
          {
            wikiRoot: fileURLToPath(new URL("../../openwiki", import.meta.url)),
            base,
          },
        ],
      ],
    }),
  },
  integrations: [sitemap()],
});
