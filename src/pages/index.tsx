import React from "react";
import Layout from "@components/Layout";

import Grid from "@material-ui/core/Grid";
import BlogPostCard from "@components/BlogPostCard";

import { getAllPosts, getMeta } from "@libs/contentLoader";

export const config = { amp: true };

const index = (props) => {
  const { post_info } = props;
  const cards = post_info.map((post) => (
    <Grid item xs={12}>
      <BlogPostCard
        meta={post.meta}
        url={`posts/${post.categoryId}/${post.name}`}
      />
    </Grid>
  ));

  return (
    <Layout>
      <h2>Home</h2>
      <Grid container spacing={1} xs>
        {cards}
      </Grid>
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
