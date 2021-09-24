---
title: Next.jsでブログを作ってみた
description: Wordpressでブログを作っていたが、パフォーマンスが遅いのでNext.jsで作り直した。ほしい要件、使うフレームワークの選定など。
layout:
  path: "@components/BlogPostLayout"
  component: BlogPostLayout
---

## TL;DR

WordPress が激重だしこんなに機能はいらないな、と思ったので、1 からブログでも作るか、と思いました。
後、VScode で記事を書きたいので、markdown とかそのへんを push して終わりにしたい。コピペしたくない。
Wordpress は PHP がわからなくてカスタマイズが進まない。ブラックボックスが多すぎる。

Wordpress のトップ画面はこんな感じなので、これよりはよくしたい。あと Wordpress は AMP にフルでは対応できていない（数式とか）なので、そのへんも頑張りたい。

現状のブログコードはこちら

[illumination-k/blog](https://github.com/illumination-k/blog)

**Before**

![lighthouse-wordpress-top](/images/lighthouse-wordpress-top.PNG)

**After 2020/09/30**

![lighthouse-next-blog](/images/lighthouse-nextblog-top.PNG)

## 要件

ということで、要件としては、以下のものがほしいです。とはいえ全部できてから公開だと永遠に終わりそうにないので、順次作成していきます。

### ブログ機能

- [x] Vertical でホスティング
- [x] カスタムドメイン
- [x] markdown と mdx で記事を書いて Github に push すれば自動で更新される。
- [x] Toc 機能
- [x] Qiita みたいなサイドバー
- [x] category 別に別れた記事一覧
- [x] 記事の検索機能
- [ ] tag 機能
- [x] git と連動した history 機能
- [ ] 連載機能（連載タグがついた記事が順番にページネーションできる、みたいな。長い記事を書きがちなので）

### スタイル

- [x] material-ui
- [x] Prism.js での code syntax
- [x] amp-mathml での数式
- [x] Github markdown css

### Google 関係

- [x] SEO
- [x] Google Analytics
- [x] AMP 対応
- [x] PWA 対応
- [x] Google Adsense

### その他の希望

- ある程度の理解を伴った上で作成できる

## Framework

個人的によく触っているのが`React`なので、`React`のフレームワークから選びたいです。よく話に出てくるのは

- Gatsby
- Next.js

かなあ、と思います。ブログ作るだけなら`Gatsby`が有力だと思うんですが、以下の理由から next.js を選びました。

- AMP 対応が楽そう
- 今後に活かせそう
- 構成がシンプルで好き
- Gatsby 使うとプラグイン関係で結局ブラックボックスになりそう

ということで、ブログ作っていきます。ついでなので、悪戦苦闘している分を記事にして残しておきたいと思っています。

## 実際の作業へのリンク

- [#2 MDX or Markdown ?](https://illumination-k.dev/posts/frontend/make_blog_2)
- [#3 Next.js で作ったブログに Style を適用していく](https://illumination-k.dev/posts/frontend/make_blog_3)
- [#4 Next.js でカスタムローダーを使って mdx を AMP 対応させる](https://illumination-k.dev/posts/frontend/make_blog_4)
- [#5 next.js で作ってみたブログに検索機能を導入する](https://illumination-k.dev/posts/frontend/make_blog_5)
- [#6 next.js で作ってみたブログに amp-sidebar を導入する](https://illumination-k.dev/posts/frontend/make_blog_6)
- [#7 Next.js で作ったブログを AMP と PWA に対応させる](https://illumination-k.dev/posts/frontend/make_blog_7)
