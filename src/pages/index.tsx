import React from "react";
import Head from "next/head";

import { NextSeo } from "next-seo";

import Grid from "@material-ui/core/Grid";

// custom components
import Layout from "@components/ListLayout";
import BlogPostCard from "@components/BlogPostCard";
import Drawer from "@components/Drawer";

import { getAllPosts, getMeta } from "@libs/contentLoader";

export const config = { amp: true };

const index = (props) => {
  const { post_info } = props;
  const cards = post_info.map((post, idx) => (
    <Grid item xs={12} key={idx}>
      <BlogPostCard
        key={idx}
        meta={post.meta}
        url={`/posts/${post.categoryId}/${post.name}`}
      />
    </Grid>
  ));

  return (
    <Layout>
      <Head>
        <link rel="canonical" href="https://illumination-k.dev"></link>
      </Head>
      <NextSeo title="illumination-dev" description="illumination-dev" />
      <h1>Recent Posts</h1>
      <Grid container spacing={1}>
        {cards}
      </Grid>
      <Drawer />
    </Layout>
  );
};

export async function getStaticProps() {
  const path = require("path");
  const posts = await getAllPosts();
  const post_info = await Promise.all(
    posts.map(async (post) => {
      const meta = await getMeta(post);
      const { dir, name } = path.parse(post);
      const categoryId = path.basename(dir);
      return {
        name,
        categoryId,
        meta,
      };
    })
  );

  return {
    props: {
      post_info: post_info,
    },
  };
}

export default index;
