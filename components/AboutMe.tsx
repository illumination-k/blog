import Layout from "@components/Layout";
import Head from "next/head";
import { NextSeo } from "next-seo";
import { Container } from "@mui/material";
import IconButtons from "@components/SocialIcons";
const AboutMe: React.FC = ({ children }) => {
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
