import Layout from "@components/Layout";
import Head from "next/head";
import { NextSeo } from "next-seo";
import { Container } from "@material-ui/core";
import IconButtons from "@components/SocialIcons";
const AboutMe = ({ meta, children }) => {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://illumination-k.dev/about" />
      </Head>
      <NextSeo title={meta.title} description={meta.description} />
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
