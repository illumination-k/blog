'use strict'

const yaml = require('js-yaml');

module.exports = extractHeaderAndMeta

function extractHeaderAndMeta(options) {
  const settings = options || {}
  const depth = settings.maxDepth || 3

  return transformer

  function transformer(tree) {
    let meta_obj = yaml.safeLoad(
      tree.children.filter(t => t.type === "yaml")[0].value
    )

    const headings = tree.children
                          .filter(t => t.type === "heading")
                          .filter(t => t.depth <= depth);
    
    const toc = headings.map(h => {
      return {
        depth: h.depth,
        url: h.children[0].url,
        text: h.children[1].value,
      }
    })

    meta_obj["toc"] = toc
    
    const meta_value = `export const meta = ${JSON.stringify(meta_obj)}`;

    const meta = {
      default: false,
      type: 'export',
      value: meta_value,
    };

    const layout_path = meta_obj["layout"]["path"]
    const component = meta_obj["layout"]["component"]
    const import_value = `import ${component} from "${layout_path}"`
    const import_layout = {
      type: "import",
      value: import_value,
    }

    const export_default = {
      default: true,
      type: "export",
      value: `export default ({meta, children}) => <${component} children={children} meta={meta} />`
    }
    tree.children.unshift(export_default)
    tree.children.unshift(meta)
    tree.children.unshift(import_layout)
  }    
}