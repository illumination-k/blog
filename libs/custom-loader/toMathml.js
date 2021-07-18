const visit = require("unist-util-visit");
const utils = require("./utility")

module.exports = toMathml;

function toMathml() {
  return transformer;

  function transformToJsxNode(parent, index, value, position) {
    const newNode = {
      type: "jsx",
      value: value,
      position: position,
    };

    parent.children[index] = newNode;
  }

  function transformer(ast) {
    visit(ast, "math", mathVisitor);
    function mathVisitor(node, index, parent) {
      const value = `<amp-mathml layout="container" data-formula="\\[${node.value}\\]" />`;
      transformToJsxNode(parent, index, value, node.position);
    }

    visit(ast, "inlineMath", inlineMathVistor);
    function inlineMathVistor(node, index, parent) {
      const value = `<amp-mathml
                            layout="container"
                            inline
                            data-formula="\\[${node.value}\\]"
                            />`;
      transformToJsxNode(parent, index, value, node.position);
    }
  }
}
