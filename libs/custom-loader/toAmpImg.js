const visit = require("unist-util-visit");
const p = require("path");
const sizeOf = require("image-size");

// sync-requestを使わないと整形が終わったあとにリクエストされる。
const sr = require("sync-request");

module.exports = toAmpImg;

function parseAlt(ralt) {
  const alt_arr = ralt.split(":");
  if (alt_arr.length === 1) {
    return {
      meta: null,
      alt: ralt,
    };
  } else if (alt_arr.length !== 2) {
    throw `Invalit alt format: ${ralt}`;
  }

  const meta = alt_arr[0];
  const alt = alt_arr[1];

  return {
    meta,
    alt,
  };
}

function toAmpImg() {
  return transformer;

  function makeValue(url, alt, dimensions, meta = null) {
    const width = dimensions.width;
    const height = dimensions.height;

    const layout = `"responsive"`;
    const rvalue = `<amp-img layout=${layout} src="${url}" alt="${alt}" height="${height}" width="${width}" />`;
    let value;
    if (meta) {
      value = `<Grid item ${meta}>${rvalue}</Grid>`;
    } else {
      value = rvalue;
    }

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
    const gridImport = `import { Grid } from "@mui/material"`;
    const gridImportNode = {
      type: "import",
      value: gridImport,
    };
    ast.children.unshift(gridImportNode);

    visit(ast, "image", visitor);
    function visitor(node, index, parent) {
      let url = node.url;
      let dimensions;
      const { meta, alt } = parseAlt(node.alt);
      const position = node.position;
      let path = url;

      if (url.startsWith("/")) {
        // publicが補完で出てくるので、そのまま/publicでも使えるようにしておく。
        if (url.startsWith("/public")) {
          url = url.replace("/public", "");
        }
        path = p.join(process.cwd(), "public", url);
        dimensions = sizeOf(path);
      } else if (url.startsWith("http") || url.startsWith("ftp")) {
        const res = sr("GET", url);
        const buf = Buffer.from(res.getBody());
        dimensions = sizeOf(buf);
      }

      const value = makeValue(url, alt, dimensions, meta);

      transformToJsxNode(parent, index, value, position);
    }
  }
}
