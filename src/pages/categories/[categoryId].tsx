import Link from "next/link";

import Layout from "@components/Layout";
import { getCategories, getNames } from "@libs/contentLoader";

export const config = { amp: true };

const PostList = (props) => {
  const { mdNames, categoryId } = props;

  const links = mdNames.map((mdName, idx) => (
    <li key={idx}>
      <Link href={`/posts/${categoryId}/${mdName}`}>
        <a>{mdName}</a>
      </Link>
    </li>
  ));

  return (
    <Layout>
      <ul>{links}</ul>
    </Layout>
  );
};

export default PostList;

export async function getStaticProps({ params }) {
  const mdNames = await getNames(params.categoryId);

  return {
    props: {
      mdNames: mdNames,
      categoryId: params.categoryId,
    },
  };
}

export async function getStaticPaths() {
  const categories = await getCategories();
  const paths = categories.map((category) => ({
    params: {
      categoryId: category,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
