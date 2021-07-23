import React from "react";
import Head from "next/head";

import { NextSeo } from "next-seo";

import {
  Grid,
  Container,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";

// custom components
import Layout from "@components/Layout";
import Link from "@components/Link";
import SocialIcons from "@components/SocialIcons";

export const config = { amp: true };

const index = () => {
  return (
    <Layout>
      <Head>
        <link rel="canonical" href="https://illumination-k.dev"></link>
      </Head>
      <NextSeo title="illumination-dev" description="illumination-dev" />
      <Container maxWidth="md">
        <Grid container spacing={1} style={{ textAlign: "center" }}>
          <Grid item xs={12}>
            <amp-img
              alt="header"
              src="/images/header-nature003.jpg"
              width="1024"
              height="341"
              layout="responsive"
            />
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Link href="/posts">
                  <Typography variant="h6">Blog</Typography>
                </Link>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Link href="/about">
                  <Typography variant="h6">About</Typography>
                </Link>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs />
          <Grid item xs={6}>
            <SocialIcons />
          </Grid>
          <Grid item xs />
        </Grid>
      </Container>
    </Layout>
  );
};

export default index;
