import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import { toText } from "hast-util-to-text";

export const mdxToPlainText = async (mdx: string) => {
  const processor = unified().use(remarkParse).use(remarkMdx).use(remarkGfm);

  const mdast = processor.parse(mdx);

  stripJsx(mdast);

  const hast = await unified().use(remarkRehype).run(mdast);

  const text = toText(hast);

  return { text, mdast, hast };
};

import { visit, SKIP } from "unist-util-visit";
import type { Node, Parent } from "unist";

export const stripJsx = (ast: Node) => {
  visit(
    ast,
    [
      "mdxJsxFlowElement",
      "mdxJsxTextElement",
      "mdxjsEsm",
      "mdxFlowExpression",
      "mdxTextExpression",
    ],
    (node, index, parent) => {
      if (!parent) {
        return;
      }

      const parentNode = parent as Parent;
      const nodeChildren = (node as Parent).children || [];

      // Replace jsx node with its children (if any),
      // if not-just remove the node.
      parentNode.children.splice(index ?? 0, 1, ...nodeChildren);
      return [SKIP, index];
    },
  );
};

import { toString } from "mdast-util-to-string";

export const getHeadings = (ast: Node) => {
  const headings: string[] = [];

  visit(ast, "heading", (node: Element) => {
    headings.push(toString(node));
  });

  return headings;
};
