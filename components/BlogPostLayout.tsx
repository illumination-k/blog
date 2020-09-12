import React from "react";

import Grid from "@material-ui/core/Grid";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { NextSeo } from "next-seo";

import Layout from "./Layout";
import Toc from "./Toc";
import Drawer from "./Drawer";
import { mergeClasses } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

const BlogPostLayout = ({ meta, children }) => {
  const classes = useStyles();
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
        <Grid container spacing={1} className={classes.content}>
          <Grid
            item
            xs={12}
            style={{ marginRight: "2rem", flexGrow: 1 }}
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
          <Grid container>
            <Drawer listitems={listitems} />
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default BlogPostLayout;
