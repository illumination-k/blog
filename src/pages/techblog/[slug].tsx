import axios from "axios";
import * as runtime from "react/jsx-runtime";
import { compile, runSync } from "@mdx-js/mdx";

// remark plugins
import stringify from "remark-stringify";
import remarkMath from "remark-math";
import remarkFrontmatter from "remark-frontmatter";
import remarkSlug from "remark-slug";
import remarkHeadings from "remark-autolink-headings";
import remarkFootnotes from "remark-footnotes";
import remarkGfm from "remark-gfm";

// custom loader
import extractHeaderAndMeta from "@libs/custom-loader/extractHeaderAndMeta.js";
import toMathml from "@libs/custom-loader/toMathml.js";
import toGithubRepoImage from "@libs/custom-loader/toGithubRepoImage.js";
import toAmpImg from "@libs/custom-loader/toAmpImg.js";
import highlighter from "@libs/custom-loader/highlighter.js";
import codeTitle from "@libs/custom-loader/codeTitle.js";
import remarkMdx from "remark-mdx";

import { githubMarkdownCss } from "src/styles/github_markdown";
import { prismCss } from "src/styles/prism.css.js";

import Layout from "@components/Layout";

export const config = { amp: true };

const BlogPost = (props) => {
  const { code, body, ...meta } = props;
  const css = `${githubMarkdownCss}${prismCss}`;
  //@ts-ignore
  const Content = runSync(code, runtime).default;

  return (
    <Layout>
      <div className="markdown-body">
        <Content />
        <style jsx global>
          {css}
        </style>
      </div>
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

  const mycode = "## TL;DR\n $$\\sum$$";

  const code = String(
    await compile(mycode, {
      outputFormat: "function-body",
      format: "mdx",
      remarkPlugins: [
        remarkMath,
        // [remarkFootnotes, ["yaml", "toml"]],
        // // extractHeaderAndMeta,
        // codeTitle,
        // highlighter,
        toMathml,
        // toGithubRepoImage,
        // toAmpImg,
        // remarkGfm,
        toAmpImg,
      ],
    })
  );
  console.log(code);
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
