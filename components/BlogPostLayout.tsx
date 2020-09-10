import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { NextSeo } from "next-seo";

import Layout from "./Layout";
import Toc from "./Toc";
import ClippedDrawer from "./Drawer";

const BlogPostLayout = ({ meta, children }) => {
  const listitems = (
    <>
      <Typography variant="h5" style={{ marginBottom: "0.5rem" }}>
        Table of Contents
      </Typography>
      <Toc headings={meta.toc} />
    </>
  );
  return (
    <>
      <Layout>
        <NextSeo title={meta.title} description={meta.description} />
        <Grid container spacing={1}>
          <Grid
            item
            xs={12}
            style={{ marginRight: "2rem" }}
            className="markdown-body"
          >
            <h1>{meta.title}</h1>

            <details>
              <summary>Table of Contents</summary>
              {meta.toc.map((heading, idx) => {
                return (
                  <div key={idx}>
                    <a href={heading.url}>
                      {`\xa0`.repeat((heading.depth - 1) * 2) + "-"}
                      &nbsp;
                      {heading.text}
                    </a>
                  </div>
                );
              })}
            </details>
            {children}
          </Grid>
          <Grid item>
            <ClippedDrawer listitems={listitems} />
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default BlogPostLayout;
