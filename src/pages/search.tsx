import { NextSeo } from "next-seo";

import Layout from "@components/DefaultLayout";

import { NextPageContext } from "next";
import SearchResultPost from "@components/SearchResultPost";

export const config = { amp: true };

const SearchResult = (props) => {
  const { query } = props;

  return (
    <Layout>
      <NextSeo
        title="search results"
        description={`search result, query=${query}`}
      />
      <h1>Search Results</h1>
      <h2>Query: {props.query}</h2>

      <amp-list
        width="400"
        height="400"
        layout="responsive"
        src={`/api/search?q=${query}`}
        items="."
      >
        {/* @ts-ignore */}
        <template type="amp-mustache">
          <SearchResultPost
            title="{{title}}"
            description="{{description}}"
            url="{{url}}"
            category="{{category}}"
            category_url="{{category_url}}"
            updated_at="{{updated_at}}"
            created_at="{{created_at}}"
          />
        </template>
      </amp-list>
    </Layout>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  let query;

  if ("q" in ctx.query) {
    if (typeof ctx.query.q === "string") {
      query = ctx.query.q;
    } else {
      query = "";
    }
  } else {
    query = "";
  }

  return {
    props: { query },
  };
}

export default SearchResult;
