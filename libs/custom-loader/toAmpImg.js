const visit = require("unist-util-visit");
const p = require("path");
const sizeOf = require("image-size");

// sync-requestを使わないと整形が終わったあとにリクエストされる。
const sr = require("sync-request");

module.exports = toAmpImg;

function toAmpImg() {
  return transformer;

  function makeValue(url, alt, dimensions) {
    const width = dimensions.width;
    const height = dimensions.height;
    const value = `<amp-img layout="responsive" src="${url}" alt="${alt}" height="${height}" width="${width}" />`;
    return value;
  }

  function transformToJsxNode(parent, index, value, position) {
    const newNode = {
      type: "jsx",
      value: value,
      postion: position,
    };

    parent.children[index] = newNode;
  }

  function transformer(ast) {
    visit(ast, "image", visitor);
    function visitor(node, index, parent) {
      const url = node.url;
      const alt = node.alt;
      const position = node.position;
      let path = url;

      if (url.startsWith("/")) {
        path = p.join(process.cwd(), "public", url);
        const dimensions = sizeOf(path);
        const value = makeValue(url, alt, dimensions);

        transformToJsxNode(parent, index, value, position);
      } else if (url.startsWith("http") || url.startsWith("ftp")) {
        const res = sr("GET", url);
        const buf = Buffer.from(res.getBody());
        const dimensions = sizeOf(buf);
        const value = makeValue(url, alt, dimensions);

        transformToJsxNode(parent, index, value, position);
      }
    }
  }
}
