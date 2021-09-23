import Pager from "@components/Pager";
import { NextSeo } from "next-seo";

import Grid from "@mui/material/Grid";

// custom components
import Layout from "@components/DefaultLayout";
import BlogPostCard from "@components/BlogPostCard";

import { getCategories, getFileNames } from "@libs/contentLoader";
import { range, getPageInfo } from "@libs/utils";

export const config = { amp: true };

const COUNT_PER_PAGE = 10;

const CategoryPage = (props) => {
  const { post_info, page, total_pages, categoryId } = props;
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
      <NextSeo
        title={`illumination-dev: ${categoryId}`}
        description={`illumination-dev: Category ${page}`}
      />
      <h1>{`Recent Posts: ${categoryId}`}</h1>
      <Grid container spacing={1}>
        {cards}
      </Grid>
      <Pager
        path={`/categories/${categoryId}`}
        page={page}
        total_pages={total_pages}
      />
    </Layout>
  );
};

export default CategoryPage;

export async function getStaticProps({ params }) {
  const path = require("path");
  const page = parseInt(params.page, 10);
  const categoryIdPostsNames = await getFileNames(params.categoryId);
  const categoryIdPosts = await Promise.all(
    categoryIdPostsNames.map(async (categoryIdPostName) => {
      const filePath = path.join(
        process.cwd(),
        "src",
        "pages",
        "posts",
        params.categoryId,
        categoryIdPostName
      );
      return filePath;
    })
  );

  let props = await getPageInfo(categoryIdPosts, page, COUNT_PER_PAGE);
  props["categoryId"] = params.categoryId;

  return {
    props: props,
  };
}

export async function getStaticPaths() {
  const categories = await getCategories();
  var paths: Array<any> = [];

  await Promise.all(
    categories.map(async (categoryId) => {
      const posts = await getFileNames(categoryId);
      const pages = range(Math.ceil(posts.length / COUNT_PER_PAGE));
      pages.forEach((page) => {
        paths.push({
          params: {
            page: `${page}`,
            categoryId: categoryId,
          },
        });
      });
    })
  );

  return {
    paths: paths,
    fallback: false,
  };
}
