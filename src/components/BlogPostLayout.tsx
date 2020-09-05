import Layout from "./Layout";
import Toc from "./Toc";

import { NextSeo } from "next-seo";

import { MDXProvider } from "@mdx-js/react";

const BlogPostLayout = ({ meta, children }) => {
  console.log(meta);
  return (
    <>
      <Layout>
        <NextSeo title={meta.title} />
        <div className="markdown-body">
          <h1>{meta.title}</h1>
          <Toc headings={meta.toc} />
          {children}
        </div>
      </Layout>
    </>
  );
};

export default BlogPostLayout;
