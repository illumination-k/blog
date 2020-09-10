import React from "react";
import Link from "next/link";

import Layout from "@components/ListLayout";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import Typography from "@material-ui/core/Typography";

import LabelIcon from "@material-ui/icons/Label";
import { getCategories } from "@libs/contentLoader";

export const config = { amp: true };

const Category = (props) => {
  const { categories } = props;
  const links = categories.map((path, idx) => (
    <ListItem key={idx} button>
      <ListItemIcon>
        <LabelIcon />
      </ListItemIcon>
      <Link href={`/categories/${path}/1`}>
        <a style={{ textDecoration: "none", fontSize: "1.5em" }}>{path}</a>
      </Link>
    </ListItem>
  ));

  return (
    <>
      <Layout>
        <Typography variant="h4">Categories</Typography>
        <List>{links}</List>
      </Layout>
    </>
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
