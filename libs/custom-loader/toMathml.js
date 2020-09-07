module.exports = toMathml

function toMathml() {
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

            if (n.type === "paragraph") {
                n.children.forEach((nn, ii) => {
                    if (nn.type === "inlineMath") {
                        const newNode = {
                            type: "jsx",
                            value: `<amp-mathml
                            layout="container"
                            inline
                            data-formula="\\[${nn.value}\\]"
                            />`,
                            position: nn.position,
                        };
                        n.children[ii] = newNode;
                    }
                })
                // }
            }
        });
    }
}
