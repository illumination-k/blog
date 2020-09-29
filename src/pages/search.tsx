import { NextSeo } from "next-seo";

import Layout from "@components/ListLayout";
import BlogPostCard from "@components/BlogPostCard";
import Grid from "@material-ui/core/Grid";

export const config = { amp: true };

const SearchResult = (props) => {
  // console.log(props.meta);
  const listitems = props.meta.map((res, idx) => {
    const meta = {
      title: res.title,
      description: res.description,
      published: res.published,
      update: res.update,
    };
    const url = `/posts/${res.category}/${res.id}`;
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
  const FlexSearch = require("flexsearch");
  const query = ctx.query.q;

  const { posts } = require("../../cache/data");

  let index = new FlexSearch({
    tokenize: function (str) {
      return str.split(" ");
    },
    doc: {
      id: "id",
      field: ["data:words"],
    },
  });

  await index.add(posts);

  const res = await index.search(query);
  const meta = res.map((r) => {
    return {
      id: r.id,
      category: r.category,
      title: r.data.title,
      description: r.data.description,
      update: r.update,
      published: r.published,
    };
  });

  return {
    props: { query: query, meta: meta },
  };
}

export default SearchResult;
