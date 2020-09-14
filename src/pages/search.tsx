import { NextSeo } from "next-seo";

import Layout from "@components/Layout";
import BlogPostCard from "@components/BlogPostCard";
import Grid from "@material-ui/core/Grid";
import Drawer from "@components/Drawer";

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
      <Drawer />
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const posts = await require("../../cache/data.json");
  const getGitHistory = require("@libs/getGitHistory");
  const path = require("path");
  const FlexSearch = require("flexsearch");
  const query = ctx.query.q;

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
  // console.log(posts[0].data.words.split(" "));

  const res = await index.search(query);
  const meta = res.map((r) => {
    const filePath = path.join(
      process.cwd(),
      "src",
      "pages",
      "posts",
      r.category,
      r.id + ".md"
    );

    const { update, published } = getGitHistory(filePath);

    return {
      id: r.id,
      category: r.category,
      title: r.data.title,
      description: r.data.description,
      update: update,
      published: published,
    };
  });

  return {
    props: { query: query, meta: meta },
  };
}

export default SearchResult;
