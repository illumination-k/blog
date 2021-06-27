// remark plugins
const stringify = require('remark-stringify')
const remarkMath = require("remark-math");
const remarkFrontmatter = require("remark-frontmatter");
const remarkSlug = require("remark-slug");
const remarkHeadings = require("remark-autolink-headings");
const remarkFootnotes = require("remark-footnotes");
const remarkGfm = require("remark-gfm");

// custom loader
const extractHeaderAndMeta = require("./libs/custom-loader/extractHeaderAndMeta");
const toMathml = require("./libs/custom-loader/toMathml");
const toAmpImg = require("./libs/custom-loader/toAmpImg");
const highlighter = require("./libs/custom-loader/highlighter");
const codeTitle = require("./libs/custom-loader/codeTitle");

const path = require('path')

// rehype plugins
// const rehypeKatex = require('rehype-katex')
// const rehypePrism = require('@mapbox/rehype-prism');

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      stringify,
      remarkFrontmatter,
      remarkSlug,
      remarkHeadings,
      [remarkFootnotes, ["yaml", "toml"]],
      extractHeaderAndMeta,
      codeTitle,
      highlighter,
      remarkMath,
      toMathml,
      toAmpImg,
      remarkGfm,
    ],
    // rehypePlugins: [rehypeKatex, katexToMathml, highlighter],
  },
});

module.exports = withMDX(
  {
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
    async redirects() {
      return [
        {
          source: "/archive",
          destination: "/archive/1",
          permanent: true,
        },
        {
          source: "/posts",
          destination: "/posts/1",
          permanent: true,
        }
      ]
    },

    webpack(config, options) {
      config.resolve.alias['@component'] = path.join(__dirname, "component")
      config.resolve.alias['@libs'] = path.join(__dirname, "libs")
      return config
    }
  }
);

