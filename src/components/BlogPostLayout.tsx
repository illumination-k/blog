import Layout from "./Layout";
import Grid from "@material-ui/core/Grid";

import Toc from "./Toc";

import { NextSeo } from "next-seo";

const BlogPostLayout = ({ meta, children }) => {
  console.log(meta);
  return (
    <>
      <Layout>
        <NextSeo title={meta.title} description={meta.description} />
        <Grid container spacing={1} className="markdown-body">
          <Grid item>
            <h1>{meta.title}</h1>
            <details>
              <Toc headings={meta.toc} />
            </details>
            {children}
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default BlogPostLayout;
