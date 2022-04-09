import Pager from "@components/Pager";
import { NextSeo } from "next-seo";

import Grid from "@mui/material/Grid";
import BackendApi from "@libs/api";

// custom components
import ListLayout from "@components/DefaultLayout";
import BlogPostCard from "@components/BlogPostCard";

import { post2meta } from "@libs/utils";
import { getPageInfo, PageInfo, range } from "@libs/pager";
export const config = { amp: true };

const COUNT_PER_PAGE = 10;

const Page: React.VFC<PageInfo> = (props) => {
  const { posts, page, totalPages } = props;
  const cards = posts.map((post, i) => (
    <Grid item xs={12} key={i}>
      <BlogPostCard
        meta={post2meta(post)}
        url={`/techblog/posts/${post.slug}`}
      ></BlogPostCard>
    </Grid>
  ));

  return (
    <ListLayout>
      <NextSeo
        title="illumination-dev tech blog: Home"
        description={`illumination-dev tech blog : Page ${page}`}
      />
      <h1>Recent Posts</h1>
      <Grid container spacing={1}>
        {cards}
      </Grid>
      <Pager path="/techblog/page" page={page} total_pages={totalPages} />
    </ListLayout>
  );
};

export async function getStaticProps({ params }) {
  const page = parseInt(params.page, 10);
  const posts = (await BackendApi.postsGet()).data;
  const pageInfo = getPageInfo(posts, page, COUNT_PER_PAGE);

  return {
    props: pageInfo,
  };
}

export async function getStaticPaths() {
  const post_count = (await BackendApi.postCountGet()).data.count;
  const pages = range(Math.ceil(post_count / COUNT_PER_PAGE));
  const paths = pages.map((page) => ({
    params: { page: `${page}` },
  }));

  return { paths: paths, fallback: false };
}

export default Page;
