import Link from "next/link";
import Layout from "../components/Layout";
import { getMdxNames } from "../lib/contentLoader";

const Archive = (props) => {
  const { posts } = props;
  console.log(posts);
  const links = posts.map((path, idx) => (
    <li key={idx}>
      <Link href={`/posts/${path}`}>
        <a>{path}</a>
      </Link>
    </li>
  ));

  return (
    <Layout>
      <ul>{links}</ul>
    </Layout>
  );
};

export async function getStaticProps() {
  const mdxNames = await getMdxNames();

  return {
    props: {
      posts: mdxNames,
    },
  };
}

export default Archive;
