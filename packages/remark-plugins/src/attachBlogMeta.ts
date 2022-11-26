import {} from "remark-frontmatter";

import { Node } from "unist";
import { visit } from "unist-util-visit";

import { postMetaSchema } from "common/post";

export function attachBlogMeta(ast: Node) {
  visit(ast, "yaml", (node: Node) => {
  });
}
