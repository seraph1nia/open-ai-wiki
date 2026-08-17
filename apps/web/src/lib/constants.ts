/** Shared between `astro.config.ts` and `content.config.ts`. */

export const SITE_TITLE = "AI Knowledge";

/**
 * Title for the corpus root. OKF leaves `openwiki/index.md` untitled, and
 * Starlight appends the site title to every page title, so naming it after the
 * site would render as "AI Knowledge | AI Knowledge".
 */
export const ROOT_TITLE = "Home";

export const SITE_DESCRIPTION =
  "A self-updating knowledge base for AI protocols and agent systems.";

/**
 * The generated Open Knowledge Format corpus, relative to the Astro project
 * root. It sits outside `src/` because the OpenWiki CLI owns the directory.
 */
export const WIKI_ROOT = "../../openwiki";
