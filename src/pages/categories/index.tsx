import React from "react";
import Link from "next/link";

import Layout from "@components/Layout";
import { getCategories } from "@libs/contentLoader";
export const config = { amp: true };

const Category = (props) => {
  const { categories } = props;
  const links = categories.map((path, idx) => (
    <li key={idx}>
      <Link href={`/categories/${path}`}>
        <a>{path}</a>
      </Link>
    </li>
  ));

  return (
    <Layout>
      <h2>Categories</h2>
      <ul>{links}</ul>
    </Layout>
  );
};

export async function getStaticProps() {
  const categories = await getCategories();

  return {
    props: {
      categories: categories,
    },
  };
}

export default Category;
