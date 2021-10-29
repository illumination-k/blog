import React from "react";
import Head from "next/head";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { Theme } from "@mui/material/styles";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

import { NextSeo } from "next-seo";

import Layout from "@components/Layout";
import Toc from "@components/Toc";
import Drawer from "@components/Drawer";
import AmpSidebar from "@components/amp/AmpSidebar";

import BlogPostHeader from "./BlogPostHeader";
import BlogPostFooter from "./BlogPostFooter";
import BlogPostContent from "./BlogPostContent";

import { githubMarkdownCss } from "../../src/styles/github_markdown";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up("sm")]: {
        marginRight: 240,
      },
    },
  })
);

const BlogPostLayout = ({ meta, children }) => {
  const classes = useStyles();
  const listitems = (
    <>
      <Typography
        variant="h2"
        style={{ marginBottom: "0.5rem", fontSize: "1.7em" }}
      >
        Table of Contents
      </Typography>
      <Toc headings={meta.toc} />
    </>
  );

  return (
    <>
      <Head>
        <link rel="canonical" href={`https://illumination-k.dev/${meta.url}`} />
      </Head>
      <NextSeo title={meta.title} description={meta.description} />
      <Layout>
        <Container>
          <div className={classes.root}>
            <BlogPostHeader meta={meta} />
            <BlogPostContent meta={meta}>{children}</BlogPostContent>
            <BlogPostFooter meta={meta} />
          </div>
        </Container>
        <AmpSidebar listitems={listitems} />
        <Drawer listitems={listitems} />
      </Layout>
    </>
  );
};

export default BlogPostLayout;
