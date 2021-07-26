import React from "react";
import Link from "next/link";
import Head from "next/head";
import { NextSeo } from "next-seo";
import Layout from "@components/DefaultLayout";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import Typography from "@material-ui/core/Typography";

import LabelIcon from "@material-ui/icons/Label";
import { getCategories } from "@libs/contentLoader";
import { Grid } from "@material-ui/core";

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
      <Head>
        <link rel="canonical" href="https://illumination-k.dev/categories" />
      </Head>
      <NextSeo title="illumination-dev: category" description="category page" />
      <Layout>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h4">Categories</Typography>
            <List>{links}</List>
          </Grid>
        </Grid>
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
