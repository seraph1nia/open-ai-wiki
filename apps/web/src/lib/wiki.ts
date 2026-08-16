import type { CollectionEntry } from "astro:content";

export type WikiEntry = CollectionEntry<"wiki">;

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

export function isConceptEntry(entry: WikiEntry): boolean {
  return Boolean(entry.data.type);
}

export function isRootIndex(entry: WikiEntry): boolean {
  return normalizeWikiId(entry.id) === "index";
}

export function isDirectoryIndex(entry: WikiEntry): boolean {
  return !isRootIndex(entry) && /(?:^|\/)index\.md$/.test(entry.filePath ?? "");
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

export function titleFor(entry: WikiEntry): string {
  const id = normalizeWikiId(entry.id);
  if (isDirectoryIndex(entry)) {
    const directory = id.split("/").at(-1) ?? id;
    return directory
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }
  return (
    entry.data.title ??
    entry.body?.match(/^#\s+(.+)$/m)?.[1] ??
    id.split("/").at(-1) ??
    entry.id
  );
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
