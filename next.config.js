// remark plugins
const remarkMath = require('remark-math')
const remarkFrontmatter = require('remark-frontmatter')
const remarkSlug = require("remark-slug");
const remarkHeadings = require('remark-autolink-headings')
const remarkFootnotes = require('remark-footnotes')

const customLoader = require("./customLoaderLib/extractHeaderAndMeta")
// const remarkToc = require('remark-toc')

// rehype plugins
const rehypeKatex = require('rehype-katex')
const rehypePrism = require('@mapbox/rehype-prism')

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkFrontmatter, remarkSlug, remarkHeadings, remarkFootnotes, remarkMath, customLoader],
    rehypePlugins: [rehypeKatex, rehypePrism],
  }
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx']
})