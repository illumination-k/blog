import path from "path"

// dirname is not supported in esm:
// refer to https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-when-using-the-experimental-modules-flag
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// remark plugins
import stringify from "remark-stringify"
import remarkMath from "remark-math"
import remarkFrontmatter from "remark-frontmatter";
import remarkSlug from "remark-slug"
import remarkHeadings from "remark-autolink-headings"
import remarkFootnotes from "remark-footnotes";
import remarkGfm from "remark-gfm"

// custom loader

import extractHeaderAndMeta from "./libs/custom-loader/extractHeaderAndMeta.js";
import toMathml from "./libs/custom-loader/toMathml.js";
import toGithubRepoImage from "./libs/custom-loader/toGithubRepoImage.js";
import toAmpImg from "./libs/custom-loader/toAmpImg.js";
import highlighter from "./libs/custom-loader/highlighter.js";
import codeTitle from "./libs/custom-loader/codeTitle.js";



// rehype plugins
// const rehypeKatex = require('rehype-katex')
// const rehypePrism = require('@mapbox/rehype-prism');
import _withMDX from "@next/mdx"
const withMDX = _withMDX({
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
    ]
  },
})


const i18n = {
  locales: ["ja"],
  defaultLocale: "ja"
}

const nextConfig = withMDX({
  // i18n: i18n,
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

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  }
});

export default nextConfig;
