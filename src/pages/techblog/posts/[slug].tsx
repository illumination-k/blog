import * as runtime from "react/jsx-runtime";
import { compile, runSync } from "@mdx-js/mdx";

// remark plugins
import remarkMath from "remark-math";
import remarkFootnotes from "remark-footnotes";
import remarkGfm from "remark-gfm";

import Api, { basePath } from "@libs/api";

// custom loader
import {
  toAmpImage,
  toGithubRepoImage,
  toMathml,
  highlighter,
  codeTitle,
  autoHeadings,
} from "blog-remark";

import Seq, { P5, P7, S5, S7, T7, Me } from "@components/seq/Seq";

import { githubMarkdownCss } from "src/styles/github_markdown";
import { prismCss } from "src/styles/prism.css.js";
import { codeTitleCss } from "src/styles/codetitle.css.js";

import BlogPostLayout from "@components/BlogPostLayout";
import { Grid } from "@mui/material";
import RecommendPost from "@components/RecommendPost";
import { Meta } from "@components/BlogPostLayout/Props";
import { post2meta } from "@libs/utils";

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
          <Content
            components={{ Grid, Seq, P5, P7, S5, S7, T7, Me, RecommendPost }}
          />
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

  const code = String(
    await compile(post.body || "", {
      outputFormat: "function-body",
      format: "mdx",
      remarkPlugins: [
        autoHeadings,
        remarkMath,
        remarkFootnotes,
        codeTitle,
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
              to: `${basePath}/public/`,
            },
          },
        ],
      ],
    })
  );

  const meta = post2meta(post);

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
