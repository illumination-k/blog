import Layout from "@components/Layout";
import IconButtons from "@components/SocialIcons";
import { Container } from "@mui/material";
import { NextSeo } from "next-seo";
import Head from "next/head";
import React from "react";
const AboutMe: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://illumination-k.dev/about" />
      </Head>
      <NextSeo title="About" description="Profile of illumination-k" />
      <Layout>
        <Container maxWidth="md" className="markdown-body">
          {children}
          <IconButtons />
        </Container>
      </Layout>
    </>
  );
};

export default AboutMe;
