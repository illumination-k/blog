import { NextSeo } from "next-seo";

import Layout from "@components/DefaultLayout";
import BlogPostCard from "@components/BlogPostCard";
import Grid from "@mui/material/Grid";

export const config = { amp: true };

const SearchResult = (props) => {
  // console.log(props.meta);
  const listitems = props.meta.map((res, idx) => {
    const meta = {
      title: res.title,
      description: res.description,
      published: res.published,
      update: res.update,
      category: res.category,
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
  const { Document } = require("flexsearch");

  function newIndex() {
    const config = {
      tokenize: function (str) {
        return str.split(" ");
      },
      document: {
        id: "id",
        field: ["data:words"],
        store: [
          "category",
          "data:title",
          "data:description",
          "update",
          "published",
        ],
      },
    };

    const index = new Document(config);

    return index;
  }

  const query = ctx.query.q;

  const { posts } = require("../../cache/data");

  let index = newIndex();

  for (const post of posts) {
    await index.add(post);
  }

  const res = await index.search(query, { enrich: true });
  const meta = res[0].result.map((r) => {
    return {
      id: r.id,
      category: r.doc.category,
      title: r.doc.data.title,
      description: r.doc.data.description,
      update: r.doc.update,
      published: r.doc.published,
    };
  });

  return {
    props: { query: query, meta: meta },
  };
}

export default SearchResult;
