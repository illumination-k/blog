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

import { MetaWithChildren } from "./Props";
import BlogPostHeader from "./BlogPostHeader";
import BlogPostFooter from "./BlogPostFooter";
import BlogPostContent from "./BlogPostContent";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up("sm")]: {
        marginRight: 240,
      },
    },
  })
);

const BlogPostLayout: React.FC<MetaWithChildren> = (props) => {
  const { meta, children } = props;
  const classes = useStyles();
  const listitems = (
    <>
      <Typography
        variant="h2"
        style={{ marginBottom: "0.5rem", fontSize: "1.7em" }}
      >
        Table of Contents
      </Typography>
      <Toc headings={meta.headings} />
    </>
  );

  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={`https://illumination-k.dev/techblog/posts/${meta.slug}`}
        />
      </Head>
      <NextSeo title={meta.title} description={meta.description} />
      <Layout>
        <Container>
          <div className={classes.root}>
            <BlogPostHeader {...meta} />
            <BlogPostContent meta={meta}>{children}</BlogPostContent>
            <BlogPostFooter {...meta} />
          </div>
        </Container>
        <AmpSidebar listitems={listitems} />
        <Drawer listitems={listitems} />
      </Layout>
    </>
  );
};

export default BlogPostLayout;
