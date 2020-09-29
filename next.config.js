// remark plugins
const remarkMath = require("remark-math");
const remarkFrontmatter = require("remark-frontmatter");
const remarkSlug = require("remark-slug");
const remarkHeadings = require("remark-autolink-headings");
const remarkFootnotes = require("remark-footnotes");

// custom loader
const extractHeaderAndMeta = require("./libs/custom-loader/extractHeaderAndMeta");
const toMathml = require("./libs/custom-loader/toMathml");
const toAmpImg = require("./libs/custom-loader/toAmpImg");
const highlighter = require("./libs/custom-loader/highlighter");
const codeTitle = require("./libs/custom-loader/codeTitle");

// rehype plugins
// const rehypeKatex = require('rehype-katex')
// const rehypePrism = require('@mapbox/rehype-prism');

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      remarkSlug,
      remarkHeadings,
      remarkFootnotes,
      extractHeaderAndMeta,
      codeTitle,
      highlighter,
      remarkMath,
      toMathml,
      toAmpImg,
    ],
    // rehypePlugins: [rehypeKatex, katexToMathml, highlighter],
  },
});

const withPWA = require("next-pwa");

module.exports = withPWA(
  withMDX(
    {
      pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
    },
    {
      pwa: {
        dest: "public",
      },
    }
  )
);
