import { describe, expect, test } from "vitest";
import { remarkMermaid } from "./remark-mermaid";

const transform = (tree: unknown) => {
  remarkMermaid()(tree as Parameters<ReturnType<typeof remarkMermaid>>[0]);
  return tree as { children: { type?: string; value?: string }[] };
};

describe("remarkMermaid", () => {
  test("replaces mermaid fences with a client-rendered pre block", () => {
    const tree = transform({
      type: "root",
      children: [{ type: "code", lang: "mermaid", value: "graph TD;\nA-->B;" }],
    });
    expect(tree.children[0]).toEqual({
      type: "html",
      value: '<pre class="mermaid">graph TD;\nA--&gt;B;</pre>',
    });
  });

  test("escapes markup in the diagram source", () => {
    const tree = transform({
      type: "root",
      children: [
        { type: "code", lang: "mermaid", value: 'A["<img> & </pre>"]' },
      ],
    });
    expect(tree.children[0]?.value).toBe(
      '<pre class="mermaid">A["&lt;img&gt; &amp; &lt;/pre&gt;"]</pre>',
    );
  });

  test("leaves other code fences untouched and visits nested nodes", () => {
    const tree = transform({
      type: "root",
      children: [
        { type: "code", lang: "ts", value: "const a = 1;" },
        {
          type: "blockquote",
          children: [{ type: "code", lang: "mermaid", value: "graph TD;" }],
        },
      ],
    });
    expect(tree.children[0]).toEqual({
      type: "code",
      lang: "ts",
      value: "const a = 1;",
    });
    expect(
      (tree.children[1] as unknown as { children: { type?: string }[] })
        .children[0]?.type,
    ).toBe("html");
  });
});
