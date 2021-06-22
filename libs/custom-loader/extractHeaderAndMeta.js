"use strict";

const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

module.exports = extractHeaderAndMeta;

function getLayout(meta_obj) {
  let layout_path = "@components/BlogPostLayout";
  let component = "BlogPostLayout";
  if ("layout" in meta_obj) {
    layout_path = meta_obj["layout"]["path"];
    component = meta_obj["layout"]["component"];
  }

  const import_value = `import ${component} from "${layout_path}"`;
  const import_layout = {
    type: "import",
    value: import_value,
  };

  return {import_layout: import_layout, component: component}
}

// importしたい他のコンポーネントなどがあれば入れる
function getImports(meta_obj) {}

function extractHeaderAndMeta(options) {
  const settings = options || {};
  const depth = settings.maxDepth || 3;

  const cachePath = path.join(process.cwd(), "cache", "data.json");
  const posts = JSON.parse(fs.readFileSync(cachePath));

  return transformer;

  function transformer(ast) {
    let meta_obj = yaml.safeLoad(
      ast.children.filter((t) => t.type === "yaml")[0].value
    );

    const post = posts.filter(
      (post) =>
        post.data.title == meta_obj.title &&
        post.data.description == meta_obj.description
    );

    const { update, published, id, category } = post[0];

    meta_obj["published"] = published;
    meta_obj["update"] = update;

    meta_obj["url"] = `/posts/${category}/${id}`;
    meta_obj["id"] = id;
    meta_obj["category"] = category;

    const headings = ast.children
      .filter((t) => t.type === "heading")
      .filter((t) => t.depth <= depth);

    const toc = headings.map((h) => {
      return {
        depth: h.depth,
        url: h.children[0].url,
        text: h.children[1].value,
      };
    });

    meta_obj["toc"] = toc;

    const meta_value = `export const meta = ${JSON.stringify(meta_obj)}`;

    const meta = {
      default: false,
      type: "export",
      value: meta_value,
    };


    // import layout
    const {import_layout, component} = getLayout(meta_obj)

    const export_default = {
      default: true,
      type: "export",
      value: `export default ({meta, children}) => <${component} children={children} meta={meta} />`,
    };

    const export_amp = {
      default: false,
      type: "export",
      value: `export const config = { amp: true }`,
    };

    ast.children.unshift(export_amp);
    ast.children.unshift(export_default);
    ast.children.unshift(meta);
    ast.children.unshift(import_layout);
  }
}
