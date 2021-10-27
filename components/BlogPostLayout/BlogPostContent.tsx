import BlogPostContentHeader from "./BlogPostContentHeader";
import BlogPostContentFooter from "./BlogPostContentFooter";
import Grid from "@mui/material/Grid";

import { githubMarkdownCss } from "src/styles/github_markdown";
import { prismCss } from "src/styles/prism.css.js";
import { codeTitleCss } from "src/styles/codetitle.css.js";

const BlogPostContent = ({ meta, children }) => {
  const css = `${githubMarkdownCss}${prismCss}${codeTitleCss}`;
  return (
    <>
      <BlogPostContentHeader meta={meta} />
      <Grid container className="markdown-body">
        <Grid item xs={12}>
          {children}
          <style jsx global>
            {css}
          </style>
        </Grid>
      </Grid>
      <BlogPostContentFooter meta={meta} />
    </>
  );
};

export default BlogPostContent;
