import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import ServerStyleSheets from '@mui/styles/ServerStyleSheets';

import AmpAnalytics from "@components/amp/AmpAnalytics";
import theme from "@libs/theme";
import { GA_TRACKING_ID } from "@libs/gtag";

// @ts-ignore
import css from "../styles/github_markdown.css?raw";
// @ts-ignore
import prismCss from "../styles/prism.css?raw";
// @ts-ignore
import globalCss from "../styles/global.css?raw";
// @ts-ignore
import ampSelectorCss from "../styles/amp_selector.css?raw";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head>
          {/* PWA primary color */}
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/icons/favicon.ico" />
          <meta name="theme-color" content={theme.palette.primary.main} />
        </Head>
        <body>
          <Main />
          <NextScript />
          <AmpAnalytics
            type="googleanalytics"
            script={{
              vars: {
                account: GA_TRACKING_ID,
                gtag_id: GA_TRACKING_ID,
                config: {
                  [GA_TRACKING_ID]: { groups: "default" },
                },
              },
              triggers: {
                trackPageview: {
                  on: "visible",
                  request: "pageview",
                },
              },
            }}
          />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      <style
        key="custom"
        dangerouslySetInnerHTML={{
          __html: `${globalCss}\n${css}\n${prismCss}\n${ampSelectorCss}`,
        }}
      />,
      sheets.getStyleElement(),
    ],
  };
};
