const visit = require("unist-util-visit");
const p = require("path");
const sizeOf = require("image-size");

// sync-requestを使わないと整形が終わったあとにリクエストされる。
const sr = require("sync-request");

module.exports = toAmpImg;

function toAmpImg() {
  return transformer;

  function transformNode(parent, index, url, alt, width, height, position) {
    const value = `<amp-img layout="responsive" src="${url}" alt="${alt}" height="${height}" width="${width}" />`;
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
        const height = dimensions.height;
        const width = dimensions.width;

        transformNode(parent, index, url, alt, width, height, position);
      } else if (url.startsWith("http") || url.startsWith("ftp")) {
        const res = sr("GET", url);
        const buf = Buffer.from(res.getBody());
        const size = sizeOf(buf);
        transformNode(
          parent,
          index,
          url,
          alt,
          size.width,
          size.height,
          position
        );
      }
    }
  }
}
