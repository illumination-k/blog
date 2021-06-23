import React from "react";
import Link from "next/link";
import Head from "next/head";
import Grid from "@material-ui/core/Grid";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

import { NextSeo } from "next-seo";

import Layout from "./Layout";
import Toc from "./Toc";
import Drawer from "./Drawer";
import AmpSidebar from "./amp/AmpSidebar";
import Ofuse from "./Ofuse";

import { get_formatted_date } from "@libs/utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    contents: {
      [theme.breakpoints.up("sm")]: {
        marginRight: 240,
      },
    },
    socialshare_container: {
      textAlign: "left",
      [theme.breakpoints.up("sm")]: {
        textAlign: "right",
      },
    },
    socialshare_button: {
      borderRadius: "30px",
      margin: "0.1rem",
    },
    modification_request: {
      maxWidth: 480,
      marginLeft: "auto",
    },
  })
);

const BlogPostLayout = ({ meta, children }) => {
  const classes = useStyles();
  const listitems = (
    <>
      <Typography
        variant="h2"
        style={{ marginBottom: "0.5rem", fontSize: "1.7em" }}
      >
        Table of Contents
      </Typography>
      <Toc headings={meta.toc} />
    </>
  );

  const modification_request = (
    <Card variant="outlined" className={classes.modification_request}>
      <CardContent>
        <Typography style={{ fontSize: 15, marginBottom: "" }}>
          記事に間違い等ありましたら、お気軽に以下までご連絡ください
        </Typography>
        <p style={{ margin: 0 }}>
          E-mail: illumination.k.27|gmail.com ("|" replaced to "@")
        </p>
        <p style={{ margin: 0 }}>Twitter: @illuminationK</p>
        <Ofuse />
      </CardContent>
    </Card>
  );

  const adDisplay = (
    <amp-ad
      width="100vw"
      height="320"
      type="adsense"
      data-ad-client="ca-pub-3483824909024831"
      data-ad-slot="3530822685"
      data-auto-format="rspv"
      data-full-width=""
    >
      {/* @ts-ignore */}
      <div overflow=""></div>
    </amp-ad>
  );

  // date settings
  const published = get_formatted_date(meta.published);
  const update = get_formatted_date(meta.update);

  // contents settings
  const contents = (
    <div className={classes.contents}>
      <Grid container className="markdown-body">
        <Grid item xs={12}>
          <amp-ad
            width="100vw"
            height="320"
            type="adsense"
            data-ad-client="ca-pub-3483824909024831"
            data-ad-slot="9343059166"
            data-auto-format="rspv"
            data-full-width=""
          >
            {/* @ts-ignore */}
            <div overflow=""></div>
          </amp-ad>
        </Grid>
        <Grid item xs={12}>
          <h1>{meta.title}</h1>
          <Typography style={{ color: "gray" }}>
            <b>published:</b> {published} <b>update:</b> {update}
          </Typography>
          <details>
            <summary>Table of Contents</summary>
            {meta.toc.map((heading, idx) => {
              return (
                <div key={idx}>
                  <a href={heading.url}>
                    {`\xa0`.repeat((heading.depth - 1) * 2) + "-"}
                    &nbsp;
                    {heading.text}
                  </a>
                </div>
              );
            })}
          </details>
          {children}
          <div className={classes.socialshare_container}>
            <amp-social-share
              type="twitter"
              className={classes.socialshare_button}
              aria-label="twitterShare"
              width="40"
              height="40"
            />
            <amp-social-share
              className={classes.socialshare_button}
              type="facebook"
              aria-label="facebookShare"
              width="40"
              height="40"
            />
            <amp-social-share
              className={classes.socialshare_button}
              type="line"
              aria-label="lineShare"
              width="40"
              height="40"
            />
          </div>
        </Grid>

        <Grid item xs={6}>
          {adDisplay}
        </Grid>
        <Grid item xs={6}>
          {modification_request}
        </Grid>
      </Grid>
    </div>
  );

  return (
    <>
      <Head>
        <link rel="canonical" href={`https://illumination-k.dev/${meta.url}`} />
      </Head>
      <NextSeo title={meta.title} description={meta.description} />
      <Layout>
        <amp-auto-ads
          type="adsense"
          data-ad-client="ca-pub-3483824909024831"
        ></amp-auto-ads>
        <Container>
          <Breadcrumbs aria-label="breadcrumb">
            <Link href="/"> Home </Link>
            <Link href={`/categories/${meta.category}/1`}>{meta.category}</Link>
            <p>{meta.title}</p>
          </Breadcrumbs>
          {contents}
        </Container>
        <AmpSidebar listitems={listitems} />
        <Drawer listitems={listitems} />
      </Layout>
    </>
  );
};

export default BlogPostLayout;
