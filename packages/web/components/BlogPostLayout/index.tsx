import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Head from "next/head";
import React from "react";

import { Theme } from "@mui/material/styles";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

import { NextSeo } from "next-seo";

import AmpSidebar from "@components/amp/AmpSidebar";
import Drawer from "@components/Drawer";
import Layout from "@components/Layout";
import Toc from "@components/Toc";

import BlogPostContent from "./BlogPostContent";
import BlogPostFooter from "./BlogPostFooter";
import BlogPostHeader from "./BlogPostHeader";
import { MetaWithChildren } from "./Props";

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
