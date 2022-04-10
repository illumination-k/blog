import { NextSeo } from "next-seo";

import Layout from "@components/DefaultLayout";
import BlogPostCard from "@components/BlogPostCard";
import Grid from "@mui/material/Grid";

import BackendApi from "@libs/api";
import { post2meta } from "@libs/utils";
import { NextPageContext } from "next";

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

export async function getServerSideProps(ctx: NextPageContext) {
  let query;
  if ("q" in ctx.query) {
    if (typeof ctx.query.q === "string") {
      query = ctx.query.q;
    } else {
      return { query: "", metas: [] };
    }
  }

  const resp = await BackendApi.searchGet(query);

  if (resp.status !== 200) {
    console.error(resp);
  }

  const posts = resp.data;
  const metas = posts.map((p) => post2meta(p));
  return {
    props: { query, metas },
  };
}

export default SearchResult;
