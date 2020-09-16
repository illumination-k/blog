import Head from "next/head";
import { NextSeo } from "next-seo";

import Layout from "@components/Layout";
import Typography from "@material-ui/core/Typography";
import { Grid, Paper } from "@material-ui/core";

export const config = { amp: true };

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://illumination-k.dev/privacypolicy" />
      </Head>
      <NextSeo
        title="illumination-dev: privacy policy"
        description="google analytics privacy policy"
      />
      <Layout>
        <div style={{ textAlign: "center" }}>
          {" "}
          <Paper style={{ textAlign: "center", padding: "1rem" }}>
            <Typography>
              当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を使用しています。このGoogleアナリティクスはデータの収集のためにCookieを使用しています。このデータは匿名で収集されており、個人を特定するものではありません。
            </Typography>
            <Typography>
              この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関しての詳細は
              <a
                href="https://marketingplatform.google.com/about/analytics/terms/jp/"
                rel="canonical"
              >
                Googleアナリティクスサービス利用規約のページ
              </a>
              や
              <a
                href="https://policies.google.com/technologies/ads?hl=ja"
                rel="canonical"
              >
                Googleポリシーと規約ページ
              </a>
              をご覧ください。
            </Typography>
          </Paper>
        </div>
      </Layout>
    </>
  );
};

export default PrivacyPolicy;
