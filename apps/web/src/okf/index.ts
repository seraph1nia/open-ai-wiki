/**
 * The Open Knowledge Format adapter: everything needed to serve the generated
 * `openwiki/` corpus through Starlight, in one place.
 *
 * This is deliberately *not* a Starlight plugin. Starlight plugins get two
 * hooks, `config:setup` and `i18n:setup`, and neither can supply a content
 * collection loader — the `docs` collection has to be declared in
 * `content.config.ts` by the site itself. What the adapter actually consists of
 * is a loader, a schema and a remark plugin, so a plugin wrapper would add
 * indirection around the config line it could own without removing any of the
 * rest. Kept as a module, it stays liftable into its own package unchanged.
 */

export { okfLoader } from "./loader.js";
export { okfDocsSchema } from "./schema.js";
export { remarkWikiLinks } from "./links.js";
export { entryPath, withBase } from "./routes.js";
