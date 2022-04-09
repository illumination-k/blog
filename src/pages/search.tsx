import { NextSeo } from "next-seo";

import Layout from "@components/DefaultLayout";
import BlogPostCard from "@components/BlogPostCard";
import Grid from "@mui/material/Grid";

import BackendApi from "@libs/api";
import { post2meta } from "@libs/utils";

export const config = { amp: true };

const SearchResult = (props) => {
  const listitems = props.metas.map((meta, idx) => {
    const url = `/techblog/posts/${meta.slug}`;
    return (
      <Grid key={idx} item xs={12}>
        <BlogPostCard key={idx} meta={meta} url={url} />
      </Grid>
    );
  });

  return (
    <Layout>
      <NextSeo
        title="search results"
        description={`search result, query=${props.query}`}
      />
      <h1>Search Results</h1>
      <h2>Query: {props.query}</h2>
      <Grid container spacing={1}>
        {listitems}
      </Grid>
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const query = ctx.query.q;

  const posts = (await BackendApi.searchGet(query)).data;
  const metas = posts.map((p) => post2meta(p));
  return {
    props: { query: query, metas },
  };
}

export default SearchResult;
