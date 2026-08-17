/**
 * Route helpers for the OKF corpus.
 *
 * Starlight owns page rendering and routing now, so what is left here is the
 * mapping between an OKF path and the URL Starlight publishes it at: used by
 * `remarkWikiLinks` to rewrite the corpus's internal `.md` links, and by the
 * changelog, whose fragments record wiki-relative paths rather than URLs.
 */

export function normalizeWikiId(value: string): string {
  return value
    .replace(/^\.\//, "")
    .replace(/^\//, "")
    .replace(/\.md(?:#.*)?$/, "")
    .replace(/\/$/, "");
}

export function entryPath(id: string): string {
  let clean = normalizeWikiId(id);
  if (clean === "index") return "/";
  if (clean.endsWith("/index")) clean = clean.slice(0, -6);
  return `/${clean}/`;
}

export function renderedWikiHref(
  href: string,
  fromId: string,
  base: string,
): string {
  if (/^(?:[a-z]+:|#)/i.test(href)) return href;
  const [rawPath = "", fragment] = href.split("#", 2);
  const directory = fromId.includes("/")
    ? fromId.slice(0, fromId.lastIndexOf("/"))
    : "";
  const parts = (
    rawPath.startsWith("/") ? rawPath : `${directory}/${rawPath}`
  ).split("/");
  const resolved: string[] = [];
  for (const part of parts) {
    if (part === "..") resolved.pop();
    else if (part !== "." && part !== "") resolved.push(part);
  }
  let target = normalizeWikiId(resolved.join("/"));
  if (target.endsWith("/index")) target = target.slice(0, -6);
  const result = withBase(entryPath(target), base);
  return fragment ? `${result}#${fragment}` : result;
}

export function withBase(pathname: string, base: string): string {
  if (/^(?:[a-z]+:|#)/i.test(pathname)) return pathname;
  const normalizedBase =
    base === "/" ? "" : `/${base.replace(/^\/+|\/+$/g, "")}`;
  return `${normalizedBase}/${pathname.replace(/^\/+/, "")}`.replace(
    /\/+/g,
    "/",
  );
}
