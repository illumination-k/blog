---
title: Next.jsで作ったブログにStyleを適用していく
description: Wordpressでブログを作っていたが、パフォーマンスが遅いのでNext.jsで作り直した。markdwonでレンダリングできるようになったので、Styleを適用していく。
layout:
    path: "@components/BlogPostLayout"
    component: BlogPostLayout
---

## TL;DR

前回の記事で、markdownをうまくレンダリングできるようになったので、次はStyleを適用していく。適用すべき対象は、最初の記事でに書いたように、

- material-ui
- Prism.jsでのcode syntax
- amp-mathmlによる数式
- Github markdown css

である。AMP対応するには鬼門である。

## Styleの適用

### Prism.js && Github markdown css

[prism.js](https://prismjs.com)公式サイトからcssをダウンロードしておく。[github-markdown-css](https://github.com/sindresorhus/github-markdown-css)からダウンロードする。github-markdown-cssの方は自動生成なので`!important`とかが使われていてAMPに対応できないのでそのへんは除いてしまう。そのあと、raw-loaderを使ってcssを_app.tsxでimportして、直接埋め込む。できるならMarkdownのページだけで読み込みたいが...

custom loaderでcodeをTokenに落とす作業をしておけばAMPでもコードがハイライトされる。順番の関係か、prismjsはダーク系のテーマにしたのに黒くならなかったので、github-markdown-css側で背景を黒にしておいた。

**example**

```rust
const MOD: usize = 1e9 as usize + 7;
```

```python
>>> import pandas as pd
>>> pd.read_csv("/path/to/file.csv")
```

### amp-mathml

KatexはAMPに対応できない。custom loaderを使って、`type === "math"`と`type === "inlineMath"`に対応するamp-mathmlを埋め込む（先にremark-mathを使っておく必要がある）。インラインの数式はparagraphのchildrenなので注意が必要。

**example**

インライン$\frac{a}{b}$数式

普通の数式

$$
\sum_{k=1}^{n}{\frac{N}{k}} = O(N\log{n})
$$

### material-ui

```bash
yarn add @material-ui/core
```

で終わりだと思ってたんだけど、そんなことはなかった。

というのは、サーバーサイドレンダリングを`next.js`でするときに、CSSの読み込みがリセットされてしまうことがあるらしい([参考](https://blog.narumium.net/2020/01/29/next-js-with-material-uiでスタイルが崩れる/))。実際に自分の画面でも崩れていて、結構時間を溶かした。
幸いなことに、material-uiの公式がテンプレート例を作成してくれているので([javascript](https://github.com/mui-org/material-ui/tree/master/examples/nextjs), [typescript](https://github.com/mui-org/material-ui/tree/master/examples/nextjs-with-typescript))、参考にしながら`_app.tsx`と`_document.tsx`を書き換えておく。あとnext.jsのリンクとmaterial-uiのリンクもclassNameの問題とかでうまく行かないことがあるので、Linkコンポーネントを作っておく。

それとコンポーネントの中に`!important`を生み出すやつがいるので、生み出されたら`next build && export`でhtml作って原因コンポーネントは削除しておく。InputBase的なやつが怪しかった。

## 感想

スタイルの適用はこんな感じ。しかし、material-uiは結構がっつりcssっぽいものを触らないとだめで結構難しい。Bootstrapはだいたいよしなにやってくれていたので、css力が本当に無い。