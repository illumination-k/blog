import Pager from "@components/Pager";
import { NextSeo } from "next-seo";

import Grid from "@material-ui/core/Grid";

// custom components
import ListLayout from "@components/DefaultLayout";
import BlogPostCard from "@components/BlogPostCard";

import { getAllPosts } from "@libs/contentLoader";
import { range, getPageInfo } from "@libs/utils";

export const config = { amp: true };

const COUNT_PER_PAGE = 10;

const ArchivePage = (props) => {
  const { post_info, page, total_pages } = props;
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
    <ListLayout>
      <NextSeo
        title="illumination-dev Blog: Archive"
        description={`illumination-dev Blog : Archive ${page}`}
      />
      <h1>Recent Posts</h1>
      <Grid container spacing={1}>
        {cards}
      </Grid>
      <Pager path="/archive" page={page} total_pages={total_pages} />
    </ListLayout>
  );
};

export async function getStaticProps({ params }) {
  const page = parseInt(params.page, 10);
  const all_posts = await getAllPosts();
  const props = await getPageInfo(all_posts, page, COUNT_PER_PAGE);

  return {
    props: props,
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts();
  const pages = range(Math.ceil(posts.length / COUNT_PER_PAGE));
  const paths = pages.map((page) => ({
    params: { page: `${page}` },
  }));

  return { paths: paths, fallback: false };
}

export default ArchivePage;
