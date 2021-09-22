// remark plugins
const stringify = require("remark-stringify");
const remarkMath = require("remark-math");
const remarkFrontmatter = require("remark-frontmatter");
const remarkSlug = require("remark-slug");
const remarkHeadings = require("remark-autolink-headings");
const remarkFootnotes = require("remark-footnotes");
const remarkGfm = require("remark-gfm");

// custom loader
const extractHeaderAndMeta = require("./libs/custom-loader/extractHeaderAndMeta");
const toMathml = require("./libs/custom-loader/toMathml");
const toGithubRepoImage = require("./libs/custom-loader/toGithubRepoImage");
const toAmpImg = require("./libs/custom-loader/toAmpImg");
const highlighter = require("./libs/custom-loader/highlighter");
const codeTitle = require("./libs/custom-loader/codeTitle");

const path = require("path");

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
      toGithubRepoImage,
      toAmpImg,
      remarkGfm,
    ],
    // rehypePlugins: [rehypeKatex, katexToMathml, highlighter],
  },
});

const i18n = {
  locales: ["ja"],
  defaultLocale: "ja"
}

module.exports = withMDX({
  i18n: i18n,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  async redirects() {
    return [
      {
        source: "/posts",
        destination: "/posts/1",
        permanent: true,
      },
      {
        source: "/posts/atcoder/:id",
        destination: "/posts/algorithm/:id",
        permanent: true,
      }
    ];
  },

  webpack(config, options) {
    config.resolve.alias["@component"] = path.join(__dirname, "component");
    config.resolve.alias["@libs"] = path.join(__dirname, "libs");

    // console.log(config.module.rules)
    config.module.rules.push({
      test: /\.css/,
      resourceQuery: /raw/,
      type: "asset/source",
    });
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },

  // future: { webpack5: true }
  webpack5: true,
});
