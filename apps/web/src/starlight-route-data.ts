/**
 * Starlight route middleware.
 *
 * Runs after every plugin's route middleware (Starlight puts plugin handlers
 * ahead of the user's), so it sees the finished sidebar and can correct it.
 */
import { defineRouteMiddleware } from "@astrojs/starlight/route-data";
import type { StarlightRouteData } from "@astrojs/starlight/route-data";

type SidebarEntry = StarlightRouteData["sidebar"][number];

/**
 * `starlight-tags` builds its "View all tags" sidebar link as
 * `${base}/${tagsIndexSlug}` with no trailing slash, unlike the per-tag links
 * beside it. Under `trailingSlash: "always"` that href is a hard 404, and it
 * sits in the sidebar of every page. Normalising the whole tree rather than
 * that one entry keeps this correct if the plugin adds further links.
 */
function normalizeTrailingSlashes(entries: SidebarEntry[]): void {
  for (const entry of entries) {
    if (entry.type === "group") {
      normalizeTrailingSlashes(entry.entries);
      continue;
    }
    // Leave external links, and anything carrying a fragment or query, alone:
    // only a bare internal pathname is safe to append to.
    if (/^(?:[a-z]+:|\/\/)|[#?]/i.test(entry.href)) continue;
    if (!entry.href.endsWith("/")) entry.href = `${entry.href}/`;
  }
}

export const onRequest = defineRouteMiddleware((context) => {
  const { starlightRoute } = context.locals;
  if (starlightRoute?.sidebar) normalizeTrailingSlashes(starlightRoute.sidebar);
});
