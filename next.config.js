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

const withOffline = require("next-offline");

const nextOfflineConfig = {
  workboxOpts: {
    swDest: process.env.NEXT_EXPORT
      ? "service-worker.js"
      : "static/service-worker.js",
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: "NetworkFirst",
        options: {
          cacheName: "offlineCache",
          expiration: {
            maxEntries: 200,
          },
        },
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/service-worker.js",
        destination: "/_next/static/service-worker.js",
      },
    ];
  },
};

module.exports = withOffline(
  withMDX(
    {
      pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
    },
    nextOfflineConfig
  )
);
