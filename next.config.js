// remark plugins
const remarkMath = require('remark-math')
const remarkFrontmatter = require('remark-frontmatter')
const remarkSlug = require("remark-slug");
const remarkHeadings = require('remark-autolink-headings')
const remarkFootnotes = require('remark-footnotes')

const customLoader = require("./customLoaderLib/extractHeaderAndMeta")
const ToMathml = require("./customLoaderLib/katexToMathml")
// const remarkToc = require('remark-toc')

const highlighter = require("./customLoaderLib/highlighter")

// rehype plugins
// const rehypeKatex = require('rehype-katex')
// const rehypePrism = require('@mapbox/rehype-prism');

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkFrontmatter, remarkSlug, remarkHeadings, remarkFootnotes, customLoader, highlighter, remarkMath, ToMathml],
    // rehypePlugins: [rehypeKatex, katexToMathml, highlighter],
  }
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx']
})