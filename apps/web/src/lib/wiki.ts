import type { CollectionEntry } from "astro:content";

export type WikiEntry = CollectionEntry<"wiki">;
export type WikiGraph = {
  outbound: Map<string, string[]>;
  backlinks: Map<string, string[]>;
};

export function normalizeWikiId(value: string): string {
  return value
    .replace(/^\.\//, "")
    .replace(/^\//, "")
    .replace(/\.md(?:#.*)?$/, "")
    .replace(/\/$/, "");
}

export function entryPath(id: string): string {
  const clean = normalizeWikiId(id);
  return clean === "index" ? "/" : `/${clean}/`;
}

export function isReservedEntry(entry: WikiEntry): boolean {
  return (
    entry.id === "index" ||
    entry.id === "log" ||
    /(?:^|\/)index\.md$/.test(entry.filePath ?? "")
  );
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

export function extractInternalLinks(
  markdown: string,
  fromId: string,
): string[] {
  const links = [...markdown.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)].map(
    (match) => match[1] ?? "",
  );
  const directory = fromId.includes("/")
    ? fromId.slice(0, fromId.lastIndexOf("/"))
    : "";
  return [
    ...new Set(
      links
        .filter((link) => !/^(?:[a-z]+:|#)/i.test(link))
        .map((link) => {
          const noHash = link.split("#")[0] ?? "";
          if (noHash.startsWith("/")) return normalizeWikiId(noHash);
          const parts = `${directory}/${noHash}`.split("/");
          const resolved: string[] = [];
          for (const part of parts) {
            if (part === "..") resolved.pop();
            else if (part !== "." && part !== "") resolved.push(part);
          }
          return normalizeWikiId(resolved.join("/"));
        })
        .filter(Boolean),
    ),
  ];
}

export function buildGraph(entries: WikiEntry[]): WikiGraph {
  const ids = new Set(entries.map((entry) => normalizeWikiId(entry.id)));
  const outbound = new Map<string, string[]>();
  const backlinks = new Map<string, string[]>();
  for (const entry of entries) {
    const from = normalizeWikiId(entry.id);
    const links = extractInternalLinks(entry.body ?? "", from).filter((link) =>
      ids.has(link),
    );
    outbound.set(from, links);
    for (const target of links)
      backlinks.set(target, [...(backlinks.get(target) ?? []), from]);
  }
  return { outbound, backlinks };
}

export function titleFor(entry: WikiEntry): string {
  return (
    entry.data.title ??
    entry.body?.match(/^#\s+(.+)$/m)?.[1] ??
    entry.id.split("/").at(-1) ??
    entry.id
  );
}

export function sectionFor(entry: WikiEntry): string {
  return normalizeWikiId(entry.id).split("/")[0] ?? "";
}
