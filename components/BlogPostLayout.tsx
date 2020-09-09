import React from "react";

import Grid from "@material-ui/core/Grid";
import { NextSeo } from "next-seo";

import Layout from "./Layout";
import Toc from "./Toc";
import ClippedDrawer from "./Drawer";

const BlogPostLayout = ({ meta, children }) => {
  return (
    <>
      <Layout>
        <NextSeo title={meta.title} description={meta.description} />
        <Grid container spacing={1} className="markdown-body">
          <Grid item xs={12} style={{ marginRight: "2rem" }}>
            <h1>{meta.title}</h1>

            <details>
              <summary>Table of Contents</summary>
              <Toc headings={meta.toc} />
            </details>
            {children}
          </Grid>
          <Grid item>
            <ClippedDrawer listitems={<Toc headings={meta.toc} />} />
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default BlogPostLayout;
