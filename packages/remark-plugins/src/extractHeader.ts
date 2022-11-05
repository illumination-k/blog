import { Heading as AstHeading } from "mdast";
import { toString } from "mdast-util-to-string";
import { Plugin, VFileWithOutput } from "unified";
import { Node } from "unist";
import { visit } from "unist-util-visit";

type Heading = {
  depth: number;
  value: string;
};

export function headings(ast: Node, depth: number) {
  const headingsList: Heading[] = [];

  visit(ast, "heading", (node: AstHeading) => {
    if (node.depth > depth) {
      return;
    }
    headingsList.push({
      depth: node.depth,
      value: toString(node, { includeImageAlt: false }),
    });
  });

  return headingsList;
}

type Option = {
  depth: number;
};

export default function extractHeadings(option: Option = { depth: 3 }): Plugin {
  return (node: Node, file: VFileWithOutput<any>) => {
    file.data.headings = headings(node, option.depth);
  };
}
