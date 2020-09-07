import React from "react";
import Link from "next/link";
import Layout from "@components/Layout";

export const config = { amp: true };

const index = () => {
  return (
    <Layout>
      <h2>Home</h2>
      <Link href="/archive">
        <a>archive</a>
      </Link>
    </Layout>
  );
};

export default index;
