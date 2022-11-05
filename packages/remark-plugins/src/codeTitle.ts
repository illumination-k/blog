import { Parent, visit } from "unist-util-visit";
import { Code } from "mdast";
import { Plugin } from "unified";
import { MdxJsxTextElement } from "mdast-util-mdx-jsx";

export default function codeTitle(): Plugin {
  return transformer;

  function transformer(ast: Parent) {
    const prefix = ":title=";
    visit(ast, "code", (node: Code, index: number) => {
      const lang = node.lang || "";

      const separatorIndex = lang.lastIndexOf(prefix);
      let newLang = lang;

      if (separatorIndex !== -1) {
        newLang = lang.slice(0, separatorIndex);
        const title = lang.slice(separatorIndex + prefix.length);

        const titleNodeclassName = "code-title";

        const titleNode: MdxJsxTextElement = {
          type: "mdxJsxTextElement",
          name: "div",
          attributes: [
            {
              type: "mdxJsxAttribute",
              name: "className",
              value: titleNodeclassName,
            },
          ],
          children: [
            {
              type: "mdxJsxTextElement",
              name: "span",
              attributes: [],
              children: [{ type: "text", value: title }],
            },
          ],
        };

        ast.children.splice(index, 0, titleNode);
      }

      node.lang = newLang;
    });
  }
}
