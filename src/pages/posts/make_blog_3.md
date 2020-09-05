---
title: Next.jsで作ったブログにStyleを適用していく
description: Wordpressでブログを作っていたが、パフォーマンスが遅いのでNext.jsで作り直した。markdwonでレンダリングできるようになったので、Styleを適用していく。
layout:
    path: ../../components/BlogPostLayout
    component: BlogPostLayout
---

## TL;DR

前回の記事で、markdownをうまくレンダリングできるようになったので、次はStyleを適用していく。適用すべき対象は、最初の記事でに書いたように、

- material-ui
- Prism.jsでのcode syntax
- Katexでの数式
- Github markdown css

である。順番的に簡単なものから進めていく。

## Styleの適用

### Prism.js

[prism.js](https://prismjs.com)公式サイトからcssをダウンロードしておく。CDN使ってもいいが、パフォーマンス的にローカルに置いたほうがいい気がする。そのあと、`_app.tsx`内部でimportする。

### Katex

[Katex Release](https://github.com/KaTeX/KaTeX/releases/tag/v0.12.0)にいって`katex.zip`とかをダウンロードして内部の`katex.css`か`katex.min.css`を`styles`などに移す。そのあとPrism.jsと同様にして`_app.tsx`でimportする。

### Github markdown css

[github-markdown-css](https://github.com/sindresorhus/github-markdown-css)からダウンロードする。`_app.tsx`でimportする。このとき、Prism.jsのCSSが上書きされてしまうので、`pre`のところのバックグラウンドカラーをオフにしておく。

### material-ui

```bash
yarn add @material-ui/core
```

で終わりだと思ってたんだけど、そんなことはなかった。

というのは、サーバーサイドレンダリングを`next.js`でするときに、CSSの読み込みがリセットされてしまうことがあるらしい([参考](https://blog.narumium.net/2020/01/29/next-js-with-material-uiでスタイルが崩れる/))。実際に自分の画面でも崩れていて、結構時間を溶かした。
幸いなことに、material-uiの公式がテンプレート例を作成してくれているので([javascript](https://github.com/mui-org/material-ui/tree/master/examples/nextjs), [typescript](https://github.com/mui-org/material-ui/tree/master/examples/nextjs-with-typescript))、`_app.tsx`と`_document.tsx`を書き換えておく。あとnext.jsのリンクとmaterial-uiのリンクもclassNameの問題とかでうまく行かないことがあるので、書き換えしておく。

スタイルの適用はこんな感じ。しかし、material-uiは結構がっつりcssっぽいものを触らないとだめで結構難しい。Bootstrapはだいたいよしなにやってくれていたので、css力が本当に無い。