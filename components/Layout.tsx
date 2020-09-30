import Head from "next/head";

import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </Head>
      <amp-install-serviceworker
        src="/serviceworker.js"
        data-iframe-src="/install-serviceworker.html"
        layout="nodisplay"
      />
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
