import React from "react";
import Link from "next/link";
import Head from "next/head";
import { NextSeo } from "next-seo";
import Layout from "@components/DefaultLayout";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";

import Typography from "@mui/material/Typography";

import LabelIcon from "@mui/icons-material/Label";
import { getCategories } from "@libs/contentLoader";
import { Grid } from "@mui/material";

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
  const categories = getCategories();

  return {
    props: {
      categories: categories,
    },
  };
}

export default Category;
