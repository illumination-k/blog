import { NextPage } from "next";
import Head from "next/head";
import BackendApi from "@libs/api";
import TagChip from "@components/TagChip";
import Layout from "@components/DefaultLayout";
import { NextSeo } from "next-seo";
export const config = { amp: true };

interface Props {
  tags: string[];
  tag_counts: number[];
}

const TagPage: NextPage<Props> = (props) => {
  const { tags, tag_counts } = props;

  const list = tags.map((tag, i) => (
    <TagChip
      style={{ margin: "0.1rem" }}
      key={i}
      size="medium"
      tag={tag}
      tag_count={tag_counts[i].toString()}
    />
  ));

  return (
    <>
      <Head>
        <link rel="canonical" href="https://illumination-k.dev/techblog/tags" />
      </Head>
      <NextSeo title="illumintaion-k-dev: tag" description="tag page" />

      <Layout>
        <h1>Tags</h1>
        {list}
      </Layout>
    </>
  );
};

export async function getStaticProps({ locale }) {
  const tags = (await BackendApi.tagsGet()).data;

  const tag_counts = await Promise.all(
    tags.map(async (tag) => {
      return (await BackendApi.postCountGet(locale, "techblog", tag)).data
        .count;
    })
  );

  return {
    props: {
      tags,
      tag_counts,
    },
  };
}

export default TagPage;
