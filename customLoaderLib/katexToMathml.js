const yaml = require('js-yaml');

module.exports = katexToMathml

function katexToMathml(options) {
    return transformer

    function transformer(ast){
        ast.children.forEach((n, index) => {
            if (n.type === "math") {
                const newNode = {
                    type: "jsx",
                    value: `<amp-mathml
                    layout="container"
                    data-formula="\\[${n.value}\\]"
                    />`,
                    position: n.position,
                };
                ast.children[index] = newNode;
            }
        });
    }
}
