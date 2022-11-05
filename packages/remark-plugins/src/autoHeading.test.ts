import { deepEqual, strictEqual } from "assert";
import { Heading, Text } from "mdast";
import { createHeadingWithId } from "./autoHeadings";

describe("createHeadingWithId", () => {
  it("basic", () => {
    for (let i = 1; i <= 6; i++) {
      const text: Text = {
        type: "text",
        value: "heading text",
      };

      // 1 <= i <= 6
      const node: Heading = {
        type: "heading",
        // @ts-ignore
        depth: i,
        children: [text],
      };

      const newNode = createHeadingWithId(node, 0);

      const expected = {
        type: "mdxJsxTextElement",
        name: `h${i}`,
        attributes: [{ type: "mdxJsxAttribute", name: "id", value: "0" }],
        children: [{ type: "text", value: "heading text" }],
      };

      strictEqual(newNode.type, expected.type);
      strictEqual(newNode.name, expected.name);
      deepEqual(newNode.attributes, expected.attributes);
      deepEqual(newNode.children, expected.children);
    }
  });
});
