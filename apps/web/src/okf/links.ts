import { relative } from "node:path";
import { renderedWikiHref } from "./routes.js";

interface Node {
  type?: string;
  url?: string;
  children?: Node[];
}
interface VFile {
  path?: string;
}

export function remarkWikiLinks(options: { wikiRoot: string; base: string }) {
  return (tree: Node, file: VFile): void => {
    if (!file.path) return;
    const fromId = relative(options.wikiRoot, file.path)
      .replaceAll("\\", "/")
      .replace(/\.md$/, "");
    const visit = (node: Node): void => {
      if (node.type === "link" && node.url && !/^(?:[a-z]+:|#)/i.test(node.url))
        node.url = renderedWikiHref(node.url, fromId, options.base);
      node.children?.forEach(visit);
    };
    visit(tree);
  };
}
