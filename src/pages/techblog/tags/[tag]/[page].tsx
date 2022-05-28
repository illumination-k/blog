import Pager from "@components/Pager";
import { NextSeo } from "next-seo";

import Grid from "@mui/material/Grid";

// custom components
import Layout from "@components/DefaultLayout";
import BlogPostCard from "@components/BlogPostCard";

import { range, getPageInfo } from "@libs/pager";
import BackendApi from "@libs/api";
import { post2meta } from "@libs/utils";

export const config = { amp: true };

const COUNT_PER_PAGE = 10;

const CategoryPage = (props) => {
  const { posts, page, totalPages, tag } = props;

  const cards = posts.map((post, idx) => (
    <Grid item xs={12} key={idx}>
      <BlogPostCard key={idx} {...post2meta(post)} />
    </Grid>
  ));

  return (
    <Layout>
      <NextSeo
        title={`illumination-dev: ${tag}`}
        description={`illumination-dev: Tag ${page}`}
      />
      <h1>{`Recent Posts: ${tag}`}</h1>
      <Grid container spacing={1}>
        {cards}
      </Grid>
      <Pager
        path={`/techblog/tags/${tag}`}
        page={page}
        total_pages={totalPages}
      />
    </Layout>
  );
};

export default CategoryPage;

export async function getStaticProps({ params }) {
  const page = parseInt(params.page, 10);
  const posts = (await BackendApi.postsGet(undefined, "techblog", params.tag))
    .data;

  let props = getPageInfo(posts, page, COUNT_PER_PAGE);
  props["tag"] = params.tag;

  return {
    props,
  };
}

export async function getStaticPaths() {
  const tags = (await BackendApi.tagsGet()).data;

  const paths_arr = await Promise.all(
    tags.map(async (tag) => {
      const post_count = (
        await BackendApi.postCountGet(undefined, "techblog", tag)
      ).data.count;
      const pages = range(Math.ceil(post_count / COUNT_PER_PAGE));

      return pages.map((page) => {
        return { params: { page: page.toString(), tag } };
      });
    })
  );

  const paths = paths_arr.flat();

  return {
    paths: paths,
    fallback: false,
  };
}
