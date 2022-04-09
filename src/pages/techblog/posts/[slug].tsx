import * as runtime from "react/jsx-runtime";
import { compile, runSync } from "@mdx-js/mdx";

// remark plugins
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMath from "remark-math";
import remarkFootnotes from "remark-footnotes";
import remarkGfm from "remark-gfm";

import Api from "@libs/api";

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

import BlogPostLayout from "@components/BlogPostLayout";
import { Grid } from "@mui/material";
import remarkStringify from "remark-stringify";
import { Meta } from "@components/BlogPostLayout/Props";

export const config = { amp: true };

type Props = {
  meta: Meta;
  code: string;
};

const BlogPost: React.VFC<Props> = (props) => {
  const { code, meta } = props;

  const css = `${githubMarkdownCss}${prismCss}${codeTitleCss}`;
  //@ts-ignore
  const Content = runSync(code, runtime).default;

  return (
    <BlogPostLayout meta={meta}>
      <Grid container>
        <Grid item xs={12} className="markdown-body">
          <Content components={{ Grid }} />
          <style jsx global>
            {css}
          </style>
        </Grid>
      </Grid>
    </BlogPostLayout>
  );
};

export default BlogPost;

export async function getStaticProps({ params, locale }) {
  const post = (await Api.postSlugGet(params.slug, locale)).data;

  const prosessor = unified()
    //@ts-ignore
    .use(remarkParse)
    .use(remarkStringify)
    .use(extractHeader);

  const vfile = await prosessor.process(post.body || "");
  const headings = vfile.data.headings;

  const code = String(
    await compile(post.body || "", {
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

  const { body, ...postMeta } = post;
  const meta = { headings, ...postMeta };

  return {
    props: { meta, code },
  };
}

export async function getStaticPaths() {
  const posts = await (await Api.postsGet()).data;
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
