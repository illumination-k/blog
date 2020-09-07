import React from "react";
import { NextSeo } from "next-seo";

import Grid from "@material-ui/core/Grid";

// custom components
import Layout from "@components/Layout";
import BlogPostCard from "@components/BlogPostCard";

import { getAllPosts, getMeta } from "@libs/contentLoader";

export const config = { amp: true };

const index = (props) => {
  const { post_info } = props;
  const cards = post_info.map((post, idx) => (
    <Grid item xs={12} key={idx}>
      <BlogPostCard
        key={idx}
        meta={post.meta}
        url={`posts/${post.categoryId}/${post.name}`}
      />
    </Grid>
  ));

  return (
    <Layout>
      <NextSeo
        title="Bioinformaticsしたい！"
        description="Bioinformaticsがしたい実験系生物学生のブログ"
      />
      <h1>Recent Posts</h1>
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
