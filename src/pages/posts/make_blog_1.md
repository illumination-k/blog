---
title: Next.jsでブログを作ってみた
description: Wordpressでブログを作っていたが、パフォーマンスが遅いのでNext.jsで作り直した。ほしい要件、使うフレームワークの選定など。
layout:
    path: ../../components/BlogPostLayout
    component: BlogPostLayout
---

## TL;DR

WordPressが激重だしこんなに機能はいらないな、と思ったので、1からブログでも作るか、と思いました。
後、VScodeで記事を書きたいので、markdownとかそのへんをpushして終わりにしたい。コピペしたくない。
あと画像とかをQiitaみたいに簡単に貼り付けたい（VSCodeならできる）。WordpressはPHPがわからなくてカスタマイズが進まない。ブラックボックスが多すぎる。

## 要件

ということで、要件としては、以下のものがほしいです。とはいえ全部できてから公開だと永遠に終わりそうにないので、順次作成していきます。

### ブログ機能

- 静的ホスティング（Netrifyとかで管理したい）
- markdownとmdxで記事を書いてGithubにpushすれば自動で更新される。
- Toc機能
- Qiitaみたいなサイドバー
- category別に別れた記事一覧
- 記事の検索機能
- tag機能
- gitと連動したhistory機能
- 連載機能（連載タグがついた記事が順番にページネーションできる、みたいな。長い記事を書きがちなので）

### スタイル

- material-ui
- Prism.jsでのcode syntax
- Katexでの数式
- Github markdown css

### Google関係

- SEO
- Google Analytics
- AMP対応（やれるだけ）
- Google Adsense

### その他の希望

- ある程度の理解を伴った上で作成できる

## Framework

個人的によく触っているのが`React`なので、`React`のフレームワークから選びたいです。よく話に出てくるのは

- Gatsby
- Next.js

かなあ、と思います。ブログ作るだけなら`Gatsby`が有力だと思うんですが、以下の理由からnext.jsを選びました。

- AMP対応が楽そう
- 今後に活かせそう
- 構成がシンプルで好き
- Gatsby使うとプラグイン関係で結局ブラックボックスになりそう

ということで、ブログ作っていきます。ついでなので、悪戦苦闘している分を記事にして残しておきたいと思っています。


