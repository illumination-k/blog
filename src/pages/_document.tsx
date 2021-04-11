import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/core/styles";

import AmpAnalytics from "@components/amp/AmpAnalytics";
import theme from "@libs/theme";
import { GA_TRACKING_ID } from "@libs/gtag";

// @ts-ignore
import css from "!!raw-loader!../styles/github_markdown.css";
// @ts-ignore
import prismCss from "!!raw-loader!../styles/prism.css";
// @ts-ignore
import globalCss from "!!raw-loader!../styles/global.css";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head>
          {/* PWA primary color */}
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/icons/favicon.ico" />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <script
            data-ad-client="ca-pub-3483824909024831"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          ></script>
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
          __html: `${globalCss}\n${css}\n${prismCss}`,
        }}
      />,
      sheets.getStyleElement(),
    ],
  };
};
