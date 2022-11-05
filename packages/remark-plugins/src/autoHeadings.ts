import { Heading as AstHeading, Text } from "mdast";
import { toString } from "mdast-util-to-string";
import { visit, Parent } from "unist-util-visit";
import { Plugin } from "unified";
import { MdxJsxAttribute, MdxJsxTextElement } from "mdast-util-mdx-jsx";

type Option = {
  depth: number;
};

export function createHeadingWithId(
  node: AstHeading,
  id: number
): MdxJsxTextElement {
  const attributes: MdxJsxAttribute[] = [
    {
      type: "mdxJsxAttribute",
      name: "id",
      value: id.toString(),
    },
  ];

  const name = `h${node.depth.toString()}`;

  let text: Text = {
    type: "text",
    value: toString(node),
  };

  return {
    type: "mdxJsxTextElement",
    name,
    attributes,
    children: [text],
  };
}

export default function (option: Option = { depth: 3 }): Plugin {
  let id = 0;

  return (ast: Parent) => {
    visit(ast, "heading", (node: AstHeading, index: number, parent: Parent) => {
      if (option.depth < node.depth) {
        return;
      }
      const newNode = createHeadingWithId(node, id);
      parent.children[index] = newNode;

      id += 1;
    });
  };
}
