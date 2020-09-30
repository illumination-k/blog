import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
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
