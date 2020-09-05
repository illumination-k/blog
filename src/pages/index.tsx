import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";

const index = () => {
  return (
    <Layout>
      <h2>Home</h2>
      <Link href="/archive" className="LinkedStyle">
        <a>archive</a>
      </Link>
    </Layout>
  );
};

export default index;
