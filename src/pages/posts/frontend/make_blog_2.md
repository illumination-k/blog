---
title: "MDX or Markdown ?"
description: ブログ記事を書くのに、MDXを使うのか、Markdownを使うのか
layout:
  path: "@components/BlogPostLayout"
  component: BlogPostLayout
---

## TL;DR

Next.js を使ってブログを書く際に、Next.js は mdx フォーマットをサポートしている[@next/mdx](https://github.com/vercel/next.js/tree/canary/packages/next-mdx)があります。

mdx の特徴として、

1. Markdown 内で JSX がかける
2. 外部のコンポーネントを import できる
3. 内部の変数などを export できる

というものがあります。しかし、ブログ記事を書くだけならこれらの機能はオーバースペックに見えます。

記事書くだけならそんなに拡張性はいらない気がします。なので、今回は記事を書くときに`mdx`を採用しなかった理由について書きます。
簡単にまとめると、以下です。

1. `Next.js`の`dynamic import`が動かなかったので、メタデータの export ができない。
2. VSCode の拡張の補完が Markdown と比べてかなり弱い。

これらの理由は単純に発展途上であることに起因する問題なので、これ以後の流行りによっては改善されていくと期待されます。しかし、現時点では問題です。

なので、このブログでは`md`拡張子を使って記事を書き、レンダリングする際に`mdx`へと変換しています。また、`export`の代わりに frontmatter を使うことでメタデータを表現しています。

### mdx のデメリット

個人的にブログ書くときに mdx を使う際に不安だったのが、

```jsx
import snowfallData from './snowfall.json'
import BarChart from './charts/BarChart'
# Recent snowfall trends
2019 has been a particularly snowy year when compared to the last decade.
<BarChart data={snowfallData} />
```

上のようなコードです。サイトなどを作る際にはすごく便利に見えます。しかし、記事のテンプレートとしての統一がしにくくて、`<BarChart>`とかをもし変更してしまうと割と容易にエラーが出たりしそうでちょっといやだなーという感じでした。

また、もう 1 つの理由が、`mdx`は、

```jsx
export meta = {
    title: "new Blog!"
}
```

みたいなことができます。しかし、`dynamic import`するとうまく export されたメタデータを取得できませんでした。
いろんなブログとか見たんですけど、example が下の感じで、

```jsx
const meta = dynamic(() => import(`../_posts/${filename}`)).then((m) => m.meta);
```

見た目いけそうなんですけど、実際にはエラーが起こってうまく動かない。なので、記事用のコンポーネントとして切り出すときに export などが使えないので日付やタイトルなどのメタデータを扱いにくいという問題点があります。

また、記事を書くときに不満なのが、VSCode の mdx 向けの拡張です。markdown なら VSCode の Extension とかが充実しているので、補完や lint なども効いて生産効率が非常に高いです。しかし、mdx は補完がまだまだかなーという印象を受けました。

なので、ブログ記事はできるだけ純粋な Markdown で書けるようにしたいです。

### mdx のメリット

Next.js で mdx を使うメリットとして、Next.js の mdx に関するレンダリングシステムが挙げられます。Next.js では、mdx を`pages/posts/hoge.mdx`におくと`localhost:3000/posts/hoge`に mdx がページとしてレンダリングされます。また、`remark`とか`rehype`系のプラグインを`next.config.js`に書くだけで Mdx に対して適用できます。

とはいえ、これらのシステムは Markdown にも Next.js で適用できます。つまり、`next.config.js`に`remark`, `rehype`プラグインを書くだけで Markdown を容易に拡張でき、ページとしてレンダリングできます。そのためにやることはシンプルで、`next.config.js`内の`pageExtensions`に`.md`を加えるだけです。

例えば、以下のような感じで、コードシンタクスとか katex とかに対応でき、Markdown をレンダリングできます([参考](https://blog.hellorusk.net/posts/20191209))

```js:title=next.config.js
// remark plugins
const remarkMath = require('remark-math')
const remarkFrontmatter = require('remark-frontmatter')
const remarkSlug = require("remark-slug");
const remarkHeadings = require('remark-autolink-headings')
const remarkFootnotes = require('remark-footnotes')

// rehype plugins
const rehypeKatex = require('rehype-katex')
const rehypePrism = require('@mapbox/rehype-prism')

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkFrontmatter, remarkSlug, remarkHeadings, remarkFootnotes, remarkMath],
    rehypePlugins: [rehypeKatex, rehypePrism],
  }
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx']
})
```

もし Markdown を自前でレンダリングするなら、`react-markdown`を使ったり、remark と rehype でパースした HTML を`dangerousInnerHTML`で埋め込むことになります。それに比べると、`@next/mdx`を利用するのが非常に楽な方法だという印象を受けました。

## レンダリングする方法

Markdown をレンダリングする方法を一番素直に考えると、以下のようなコードが想定されます。`[postId].jsx`的な感じです。contentLoader は名前で察してくれるとありがたいです。

```jsx
import next/dynamic;
import Layout from "../components/Layout";
import {
    getFilePath,
    getFileMeta,
    getMdNames,
} from "../lib/contentLoader"

const BlogPostPage = ({filename, meta}) => {
    const MDContent = dynamic(() => import(`../post/${filename}`))
    return (
        <Layout meta={meta}>
            <MDContent />
        </Layout>
    )
}

export async function getStaticProps({ params} ) {
    const filename = params.postId + ".md"
    const filepath = await getFilePath(filename);
    const meta = await getFileMeta(filepath);
    return {
        props: {
            filename: filename,
            meta: meta,
        }
    }
}

export async function getStaticPaths() {
    const mdNames = await getMdNames();
    const paths = mdNames.map((mdName) => ({
        params: {
            postId: mdName
        }
    }));

    return {
        paths,
        fallback: false,
    }
}
```

`getStaticPaths`で`fs`モジュールを使って markdown ファイルの一覧を取得します。その後、`getStaticProps`でファイルの場所に戻して、ついでにメタデータをとってきて、そのパスに対応する markdown ファイルと、Layout にメタデータを渡します。
このときに Layout もメタデータで指定したいなら、

```yaml
layout:
  path: /path/to/Layout.tsx
  component: Layout
```

みたいなメタデータを作って`dynamic`を使えばそれも実現できます。
もはや大体これでいいじゃん、って思ったのですが、サイドバーが作れない。header をうまくとってきてそれを元にサイドバーが作りたい。

そこで考えたのが、remark の custom loader を作る方法です。
`remark-mdx`を使うと、だいたい下の mdx ファイルは以下のようにパースされます。

ただの frontmatter 付きのマークダウンファイルは以下のような感じで MDAST に変換されます。

```md
---
title: A
date: a/a/a/a
layout:
  path: ../../components/Layout
  component: Layout
---

# a

## aa

### aaa
```

`remark-frontmatter`を使うと、frontmatter 部分は`type === yaml`の children として取得できるようになります。また、header 部分は`type === headings`を探せば取得できます。つまり、MDAST を parse して frontmatter 部分と header を metadata として取得できます。
そして、layout で指定されたコンポーネントを行頭で import し、メタデータを export し、import したコンポーネントを export します。

つまり、上のような frontmatter 付きの Markdown を

```jsx
import Layout from "../../components/Layout"

export const meta = {
    title: "A",
    date: "a/a/a/a",
    headers: [
        {
            value: "a",
            depth: 1,
        },
        {
            value: "aa",
            depth: 2
        },
        {
            value: "aaa",
            depth: 3,
        }
    ]
}

export default ({meta, children}) => <Layout meta={meta} children={children} />

# a

## aa

### aaa

```

こうすれば、markdown ファイルを置くだけでカスタムコンポーネント付きの mdx に解釈されてレンダリングされるようになります。

さらに header の情報を含んだ metadata をコンポーネントが受け取れるので、sidebar や toc を JSX 側で作ることができます。リファクタリングがしたくなれば、ほとんどカスタムローダー側を触れば解決しそうなところもいけてる気がします。あとこの方法のメリットは突如として

```jsx
<button>Push!!!!!!!</button>
```

とか入れたくなったときに入れられることです。パースは`mdx`に準拠してやってるので、突然 mdx フォーマットで書いても自動で対応されます。

個人的にいい案だろって思ってるんですが、誰もこんなアプローチとってないので少し不安だったりします。なんか問題があるのだろうか（もっといい案が知りたい）。
