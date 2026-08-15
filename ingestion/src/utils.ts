import { createHash } from "node:crypto";
export const sha256 = (value: string): string =>
  createHash("sha256").update(value).digest("hex");
export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 90);
export function canonicalizeUrl(input: string): string {
  const url = new URL(input);
  url.hash = "";
  url.hostname = url.hostname.toLowerCase().replace(/^www\./, "");
  const tracking = [...url.searchParams.keys()].filter((key) =>
    /^(utm_.+|fbclid|gclid|mc_cid|mc_eid|ref|source)$/i.test(key),
  );
  tracking.forEach((key) => url.searchParams.delete(key));
  url.searchParams.sort();
  url.pathname = url.pathname.replace(/\/+$/, "/");
  if (url.pathname !== "/") url.pathname = url.pathname.replace(/\/$/, "");
  return url.toString();
}
export const isoDate = (
  value: Date | string | undefined,
): string | undefined => (value ? new Date(value).toISOString() : undefined);
