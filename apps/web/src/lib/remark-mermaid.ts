interface Node {
  type?: string | undefined;
  lang?: string | null | undefined;
  value?: string | undefined;
  children?: Node[] | undefined;
}

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

/**
 * Rewrites ```mermaid fences into `<pre class="mermaid">` blocks so the client
 * renderer picks them up instead of the syntax highlighter.
 */
export function remarkMermaid() {
  return (tree: Node): void => {
    const visit = (node: Node): void => {
      node.children?.forEach((child, index) => {
        if (child.type === "code" && child.lang === "mermaid") {
          node.children![index] = {
            type: "html",
            value: `<pre class="mermaid">${escapeHtml(child.value ?? "")}</pre>`,
          };
          return;
        }
        visit(child);
      });
    };
    visit(tree);
  };
}
