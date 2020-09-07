const visit = require('unist-util-visit');
const p = require('path')
const sizeOf = require('image-size');

module.exports = toAmpImg;

function toAmpImg() {
    return transformer

    function transformer(ast) {
        visit(ast, "image", visitor)
        function visitor(node, index, parent) {
            const url = node.url;
            const alt = node.alt;
            
            let path = url;
            if (url.startsWith("/")) {
                path = p.join(process.cwd(), "public", url)
            }
            
            const dimensions = sizeOf(path)
            const height = dimensions.height;
            const width = dimensions.width;

            const position = node.postion;
            const value = `<amp-img layout="responsive" src="${url}" alt="${alt}" height="${height}" width="${width}" />`
            const newNode = {
                type: "jsx",
                value: value,
                postion: position
            }

            parent.children[index] = newNode;
        }
    }
}