// import App from "next/app";
import type { AppProps /*, AppContext */ } from "next/app";

import React from "react";
import Router from "next/router";
import PropTypes from "prop-types";
import Head from "next/head";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "@libs/theme";
import * as gtag from "@libs/gtag";
Router.events.on("routeChangeComplete", (url) => gtag.pageview(url));

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Bioinformaticsしたい!</title>
        {/* <meta
          name="viewport"
          content="width=device-width,minimum-scale=1,initial-scale=1"
        /> */}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
