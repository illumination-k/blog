const { read } = require("to-vfile");
const remark = require("remark");
const mdx = require("remark-mdx");
const frontmatter = require("remark-frontmatter");
const remark2rehype = require("remark-rehype");
const stringfy = require("rehype-stringify");
const slug = require("rehype-slug");
const sanitize = require("rehype-sanitize");
const remarkMath = require("remark-math");
const rehypeKatex = require("rehype-katex");
const rehypePrism = require("@mapbox/rehype-prism");

export async function getMdxData(filepath) {
  const file = await read(filepath);
  const content = await remark()
    .use(mdx)
    .use(frontmatter)
    .use(remarkMath)
    .use(() => (_tree) => console.log("remark!"))
    .use(remark2rehype)
    .use(slug)
    .use(rehypeKatex)
    .use(rehypePrism)
    .use(sanitize)
    .use(stringfy)
    .process(file);

  return JSON.stringify(content);
}
