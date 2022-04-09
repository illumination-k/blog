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
  const { posts, page, totalPages, category } = props;

  const cards = posts.map((post, idx) => (
    <Grid item xs={12} key={idx}>
      <BlogPostCard
        key={idx}
        meta={post2meta(post)}
        url={`/techblog/posts/${post.slug}`}
      />
    </Grid>
  ));

  return (
    <Layout>
      <NextSeo
        title={`illumination-dev: ${category}`}
        description={`illumination-dev: Category ${page}`}
      />
      <h1>{`Recent Posts: ${category}`}</h1>
      <Grid container spacing={1}>
        {cards}
      </Grid>
      <Pager
        path={`/techblog/categories/${category}`}
        page={page}
        total_pages={totalPages}
      />
    </Layout>
  );
};

export default CategoryPage;

export async function getStaticProps({ params }) {
  const page = parseInt(params.page, 10);
  const posts = (await BackendApi.postsGet(undefined, params.category)).data;

  let props = getPageInfo(posts, page, COUNT_PER_PAGE);
  props["category"] = params.category;

  return {
    props,
  };
}

export async function getStaticPaths() {
  const categories = (await BackendApi.categoriesGet()).data;

  const paths_arr = await Promise.all(
    categories.map(async (category) => {
      const posts = (await BackendApi.postsGet(undefined, category)).data;
      const pages = range(Math.ceil(posts.length / COUNT_PER_PAGE));

      return pages.map((page) => {
        return { params: { page: page.toString(), category } };
      });
    })
  );

  const paths = paths_arr.flat();

  return {
    paths: paths,
    fallback: false,
  };
}
