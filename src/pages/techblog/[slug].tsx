import axios from "axios";
import * as runtime from "react/jsx-runtime";
import { compile, runSync } from "@mdx-js/mdx";
import { MDXProvider } from "@mdx-js/react";

// remark plugins
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMath from "remark-math";
import remarkFootnotes from "remark-footnotes";
import remarkGfm from "remark-gfm";

// custom loader
import {
  toAmpImage,
  toGithubRepoImage,
  toMathml,
  extractHeader,
  highlighter,
  codeTitle,
} from "blog-remark";
import { githubMarkdownCss } from "src/styles/github_markdown";
import { prismCss } from "src/styles/prism.css.js";
import { codeTitleCss } from "src/styles/codetitle.css.js";

import Layout from "@components/Layout";
import BlogPostLayout from "@components/BlogPostLayout";
import { Grid } from "@mui/material";
import remarkStringify from "remark-stringify";

export const config = { amp: true };

const BlogPost = (props) => {
  const { code, body, ...meta } = props;

  const css = `${githubMarkdownCss}${prismCss}${codeTitleCss}`;
  //@ts-ignore
  const Content = runSync(code, runtime).default;

  return (
    <Layout>
      <Grid container className="markdown-body">
        <Grid item xs={12}>
          <Content components={{ Grid }} />
          <amp-mathml
            data-formula="[f(a) = \frac{1}{2\pi i} \oint\frac{f(z)}{z-a}dz]"
            layout="container"
          />
          <style jsx global>
            {css}
          </style>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default BlogPost;

export async function getStaticProps({ params, locale }) {
  const post = (
    await axios.get(
      `http://localhost:8080/post/slug?slug=${params.slug}&lang=${locale}`
    )
  ).data;

  const prosessor = unified()
    //@ts-ignore
    .use(remarkParse)
    .use(remarkStringify)
    .use(extractHeader);

  const vfile = await prosessor.process(post.body);

  console.log(vfile.data.headings);
  const code = String(
    await compile(post.body, {
      outputFormat: "function-body",
      format: "mdx",
      remarkPlugins: [
        remarkMath,
        remarkFootnotes,
        // codeTitle,
        highlighter,
        toMathml,
        remarkGfm,
        toGithubRepoImage,
        [
          toAmpImage,
          {
            height: 500,
            width: 500,
            replacePattern: {
              pattern: /^\/images\/|^\/public\/|^\.\.\/\.\.\/public\//,
              to: "http://localhost:8080/public/",
            },
          },
        ],
      ],
    })
  );

  return {
    props: { ...post, code },
  };
}

export async function getStaticPaths() {
  const posts = (await axios.get("http://localhost:8080/posts")).data;

  const paths = posts.map((post) => {
    return {
      params: { slug: post.slug },
      locale: post.lang,
    };
  });
  return {
    paths,
    fallback: false,
  };
}
