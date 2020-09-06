import React from "react";

import Grid from "@material-ui/core/Grid";
import { NextSeo } from "next-seo";

import Layout from "./Layout";
import Toc from "./Toc";

const BlogPostLayout = ({ meta, children }) => {
  return (
    <>
      <Layout>
        <NextSeo title={meta.title} description={meta.description} />
        <Grid container spacing={1} className="markdown-body">
          <Grid item xs>
            <h1>{meta.title}</h1>
            <details>
              <Toc headings={meta.toc} />
            </details>
            {children}
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default BlogPostLayout;
