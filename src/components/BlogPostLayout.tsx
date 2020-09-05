import React from "react";

// import { MDXProvider } from "@mdx-js/react";

import Layout from "./Layout";
import Grid from "@material-ui/core/Grid";
import { NextSeo } from "next-seo";

import Toc from "./Toc";
// import Highlight from "./Highlight";

// const components = {
//   pre: (props) => <div {...props} />,
//   code: Highlight,
// };

const BlogPostLayout = ({ meta, children }) => {
  console.log(meta);
  return (
    <>
      <Layout>
        <NextSeo title={meta.title} description={meta.description} />
        <Grid container spacing={1} className="markdown-body">
          {/* <MDXProvider components={components}> */}
          <Grid item>
            <h1>{meta.title}</h1>
            <details>
              <Toc headings={meta.toc} />
            </details>
            {children}
          </Grid>
          {/* </MDXProvider> */}
        </Grid>
      </Layout>
    </>
  );
};

export default BlogPostLayout;
