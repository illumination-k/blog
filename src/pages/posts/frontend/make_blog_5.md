---
title: "Next.jsで作ってみたブログに検索機能を導入する"
description: "Next.jsで作ってみたブログに形態素解析とflexsearchで検索機能を導入する"
---

## TL;DR

検索機能がやっぱり欲しかったので、とりあえず形態素解析と[flexsearch](https://github.com/nextapps-de/flexsearch)を使って実装してみた。やっぱり感度がなんかなあ、という感じなので、ngram とかを併用したほうがいいかもしれない。

## 基本戦略

完全 AMP 対応させたいので、`getServerSideProps`内で query を受け取って、flexsearch にかける。検索対象は、サーバーに上げる前に`data.js`みたいな感じでキャッシュしておいて、そこを参照する。

form はこんな感じで作成して、get で search ページに`/search?q=word`みたいな感じで飛ばす。

```jsx
<form
method="get"
action="/search"
target="_top"
>
<input
    type="text"
    name="q"
></input>>
```

amp のときに form で必要になってくるのは、`target`部分で`_top`か`_blank`を指定する必要があり、`_top`だとそのまま、`_blank`だと新しいタブで開くらしい。

## 形態素解析

[kuromojin](https://github.com/azu/kuromojin)を使った。まずは blog post を全部とってきて、markdown を text に変換した後形態素解析して、それを`cache/data.js`のような形で保存する。markdown -> text には[strip-markdown](https://github.com/remarkjs/strip-markdown)を利用した。

形態素解析した結果は regex に関わりそうな部分を抜いて（highlight 機能とかのときに邪魔かなと思った）、検索に使用しそうな名詞、動詞、形容詞を残した。また、単語長は 2 以上のものだけにした。このへんは設定詰めたほうが良さそう。今回はタイトルと本体部分だけを検索するようにしているが、そのへんは足すだけなので足せばいいと思う。

大まかな流れは、`getAllPosts`で全体をとってきて、中身を`gray-matter`でよんで、`filterTocken`でほしいトークンだけとってきて、とってきたトークンを全部 word として保存しているだけ。

```js:title=makeCache.js
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const glob = require("glob");
const remark = require(`remark`);
const strip = require(`strip-markdown`);
const { tokenize } = require(`kuromojin`);

const POSTDIRPATH = path.join(process.cwd(), "src", "pages", "posts");

function getAllPosts() {
  const pattern = path.join(POSTDIRPATH, "**", "*.md");
  const posts = glob.sync(pattern);
  return posts;
}

function markdownToText(content) {
  let text;
  remark()
    .use(strip, { keep: ["code"] })
    .process(content, (err, file) => {
      if (err) throw err;
      text = file.contents;
    });
  return text;
}

async function filterToken(text) {
  const res = await tokenize(text);
  const POS_LIST = [`名詞`, `動詞`, `形容詞`];
  const IGNORE_REGEX = /^[!-/:-@[-`{-~、-〜”’・]+$/;
  return res
    .filter((token) => POS_LIST.includes(token.pos))
    .map((token) => token.surface_form)
    .filter((word) => !IGNORE_REGEX.test(word))
    .filter((word) => word.length >= 2);
}

async function makePostsCache() {
  const filepaths = getAllPosts();

  const posts = await Promise.all(
    filepaths.map(async (filepath) => {
      const id = path.parse(filepath).base.replace(".md", "");
      const contents = fs.readFileSync(filepath);
      const matterResult = matter(contents);
      const text = markdownToText(matterResult.content);

      const text_words = await filterToken(text);
      const title_words = await filterToken(matterResult.data.title);
      const all_words = [
        ...text_words,
        ...title_words,
      ];
      const words = [...new Set(all_words)];

      return {
        id: id,
        data: {
          title: matterResult.data.title,
          words: words.join(" "),
        },
      };
    })
  );

  const fileContents = `export const posts = ${JSON.stringify(posts)}`;
  const outdir = path.join(process.cwd(), "cache");
  fs.writeFileSync(path.join(outdir, "data.js"), fileContents);
}

makePostsCache();
```

## pre-commit

毎回これを実行するなんて間違いなく忘れるので、[husky](https://github.com/typicode/husky)というパッケージを使った。

package.json の build とかの部分を以下のように変更する。

```json:title=package.json
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start",
    "cache-posts": "node script/makeCache.js"
  },
  "husky": {
    "hooks": {
      "pre-commit": "yarn cache-posts && git add cache/data.js"
    }
  },
```

こうすると、commit するたびに自動で`makeCache.js`が走るので楽。

husky で設定した`pre-commit`の動作を走らせたくないときは、

```bash
git commit -m "no-hooks!" --no-verify
```

でスルー出来る。

## search page

ということで search page を作っていく。`getServerSideProps`は ctx 変数をうけとる。ctx には大体の情報が入っている。今回は query 結果だけほしいので`ctx.query`だけ使う。

```jsx
import Link from "next/link";
import Layout from "@components/Layout";

const SearchResult = (props) => {
  const { query, meta } = props;
  const listitems = meta.map((res, idx) => {
    const url = `/posts/${res.id}`;
    return (
      <li key={idx}>
        <Link href={url}>{res.title}</Link>
      </li>
    );
  });
  return (
    <Layout>
      <h1>Search Results</h1>
      <h2>Query: {query}</h2>
      <ul>{listitems}</ul>
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const { posts } = await require("../../cache/data");
  const FlexSearch = require("flexsearch");
  const query = ctx.query.q;

  let index = new FlexSearch({
    tokenize: function (str) {
      return str.split(" ");
    },
    doc: {
      id: "id",
      field: ["data:words"],
    },
  });

  await index.add(posts);

  const res = await index.search(query);
  const meta = res.map((r) => ({
    id: r.id,
    title: r.data.title,
  }));

  return {
    props: { query: query, meta: meta },
  };
}

export default SearchResult;
```

words は makeCache.js 時点でスペース区切りで保存してあるので、flexsearch の tokenize はカスタムしたもの（空白区切りで array にするだけ）を使う。それ以外は flexsearch のドキュメントに書いてあるとおりだと思う。id が url 用のパスになっているので、そのまま渡している。

ということで、とりあえずこんな形でサイト内の記事検索を実装してみた。Google はすごい。

## 参考

- [Gridsome でイチからブログを作る - サイト内全文検索機能をつける](https://blog.solunita.net/posts/develop-blog-by-gridsome-from-scratch-full-text-search/)
- [Building a search component for your Next.js markdown blog](https://medium.com/@matswainson/building-a-search-component-for-your-next-js-markdown-blog-9e75e0e7d210)
