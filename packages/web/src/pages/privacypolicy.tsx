import { NextSeo } from "next-seo";
import Head from "next/head";

import Layout from "@components/Layout";
import { Container, Typography } from "@mui/material";
import { Paper } from "@mui/material";

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
        <Container maxWidth="md">
          <Paper style={{ padding: "1rem" }}>
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
        </Container>
      </Layout>
    </>
  );
};

export default PrivacyPolicy;
