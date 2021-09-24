---
title: amp-listを使ってNext.jsの静的サイトに他のブログ記事への誘導をランダムでつける
description: ブログでよくある、関係のある記事をランダムで記事の一番下につけるために、Next.jsでAPIを実装したあと、amp-listを使って動的にそれらを作成します。
---

## TL;DR

ブログでよくある、関係のある記事をランダムで記事の一番下につけたかったのですが、静的サイトだとどうすればいいのかよくわかりませんでした。一つは毎回`ServersideProps`呼ぶ、ということだと思うんですが、それと`getStaticsProps`の併用、どうやるんだ？ってところでよくわからなくなりました。毎回サーバーサイドレンダリングしてると、遅くなりそうで嫌なので...

そこで、今回とったアプローチは、Next.js で API をまず実装し、それを`amp-list`を使って fetch してその結果をレンダリングするというアプローチを取りました。

## amp-list と amp-mustache

`amp-list`は、AMP の拡張コンポーネントで JSON エンドポイントから動的にデータを取得し、`amp-mustache`の template を使用してレンダリングを行うことができます。

公式ドキュメント([amp-list](https://amp.dev/ja/documentation/components/amp-list/), [amp-mustache](https://amp.dev/ja/documentation/components/amp-mustache/))の例は以下の感じです。

```html
<amp-list
  width="auto"
  height="100"
  layout="fixed-height"
  src="/static/inline-examples/data/amp-list-urls.json"
>
  <template type="amp-mustache">
    <div class="url-entry">
      <a href="{{url}}">{{title}}</a>
    </div>
  </template>
</amp-list>
```

[公式プレイグランド](https://playground.amp.dev/?url=https%3A%2F%2Fpreview.amp.dev%2Fja%2Fdocumentation%2Fcomponents%2Famp-list.example.1.html%3Fformat%3Dwebsites&format=websites)

使用している JSON は以下

```json
{
  "items": [
    {
      "title": "AMP YouTube Channel",
      "url": "https://www.youtube.com/channel/UCXPBsjgKKG2HqsKBhWA4uQw"
    },
    {
      "title": "AMP.dev",
      "url": "https://amp.dev/"
    },
    {
      "title": "AMP Validator",
      "url": "https://validator.amp.dev/"
    },
    {
      "title": "AMP Playground",
      "url": "https://playground.amp.dev/"
    }
  ]
}
```

基本的には、`<amp-list>`内でレイアウトとエンドポイントを指定し、`<template type="amp-mustache">`内でどういうふうにレンダリングするかを決めます。

`amp-mustache`では、以下のように変数を利用できます。

1. ただの変数

`{{変数名}}`

```html
<!-- Using template tag. -->
<template type="amp-mustache"> Hello {{world}}! </template>
```

2. 変数が存在していればレンダリング

`{{#section}}{{/section}}`

```html
<!-- Using template tag. -->
<template type="amp-mustache">
  {{#world}} Hello {{world}}! {{/#world}}
</template>
```

3. 変数が存在していなければレンダリング

`{{^section}}{{/section}}`

```html
<!-- Using template tag. -->
<template type="amp-mustache"> {{^world}} No World! {{/#world}} </template>
```

### JSX 内でのテンプレート

JSX 内ではこれらのテンプレートは

```jsx
<template type="amp-mustache">Hello {"{{world}}"}!</template>
```

のように利用できます。

### 実装方針

これらのことから、`/api/otherarticles`のようなエンドポイントを作成し、そこから

```json
[
  {
    "title": "test post",
    "url": "/posts/test"
  }
]
```

のようなものを返すことにします。

そうすると`amp-list`の実装は

```jsx
<amp-list
  width="auto"
  height="200"
  layout="fixed-height"
  src={`/api/otherarticles`}
  items="."
>
  {/* @ts-ignore */}
  <template type="amp-mustache">
    title={"{{title}}"}
    url={"{{url}}"}
  </template>
</amp-list>
```

のようにすればよいです。

## API の実装

Next.js の API は、`pages/api/`下に`ts`などのファイルを作ればエンドポイントが作成できます。

```js:title=pages/api/otherarticles.js
export default function handler(req, res) {
    const articles = {
        title: "test post",
        url: "/posts/test"
    }

    res.status(200).json(articles)
}
```

のような感じです。

実際の実装では、[Next.js で作ってみたブログに検索機能を導入する](/posts/frontend/make_blog_5)のような感じでキャッシュを作成しておいて、そのキャッシュを参照してランダムな配列から規定数のファイルを取り出しています。このブログのその部分の実装は[github](https://github.com/illumination-k/blog/blob/master/src/pages/api/recommend.ts)にあります。
