// import App from "next/app";
import type { AppProps /*, AppContext */ } from "next/app";

import React from "react";
import Router from "next/router";
import Head from "next/head";

import { ThemeProvider } from "@mui/material/styles";

import { CacheProvider, EmotionCache } from "@emotion/react";

import CssBaseline from "@mui/material/CssBaseline";
import theme from "@libs/theme";
import createEmotionCache from "@libs/createEmotionCache";

import * as gtag from "@libs/gtag";
Router.events.on("routeChangeComplete", (url) => gtag.pageview(url));

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // React.useEffect(() => {
  //   // Remove the server-side injected CSS.
  //   const jssStyles = document.querySelector("#jss-server-side");
  //   if (jssStyles) {
  //     jssStyles.parentElement!.removeChild(jssStyles);
  //   }
  // }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>illumination-dev</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
