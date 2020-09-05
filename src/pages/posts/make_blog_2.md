---
title: "MDX or Markdown ?"
description: ブログ記事を書くのに、MDXを使うのか、Markdownを使うのか
layout:
    path: ../../components/BlogPostLayout
    component: BlogPostLayout
---

## TL;DR

最近なんか`mdx`流行ってますよね。markdownでjsx使えるのなかなかすごいと思うんですが、Blog書くときにこの機能いる？って感じがします。
記事書くだけならそんなに拡張性はいらないと思う。なので、今回は記事を書くときに`mdx`を採用しなかった理由について書こうと思います。厳密にいうと、書くフォーマットはMarkdownを使って、レンダリングする際に`mdx`に変換してしまいます。`mdx`も使おうと思えば使えます。


### mdxのデメリット

個人的にブログ書くときにmdxを使う際に不安だったのが、

```jsx
import snowfallData from './snowfall.json'
import BarChart from './charts/BarChart'
# Recent snowfall trends
2019 has been a particularly snowy year when compared to the last decade.
<BarChart data={snowfallData} />
```
こういうやつです...すごい便利だと思うんですが、テンプレートとしての統一がしにくくて、`<BarChart>`とかをもし変更してしまうと割と容易にエラーが出たりしそうでちょっといやだなーという感じでした。

それともう一つの理由が、`mdx`は、

```jsx
export meta = {
    title: "new Blog!"
}
```

みたいなことができるんですけど、`dynamic import`するとうまく動かないんですよね。そもそもfontmatterでいいじゃんみたいな。

いろんなブログとか見たんですけど、exampleが下の感じで、

```jsx
const meta = dynamic(() => import(`../_posts/${filename}`)).then((m) => m.meta);
```

見た目いけそうなんですけど、実際にはエラーが起こってうまく動かない。という感じで、ちょっとまだ記事に使うには不安が残るなーという感じを受けました。

それと記事書くときに不満なのが、markdownならVSCodeのExtensionとかが充実しているので、
生産効率が非常に高いんですけど、mdxはなんかこう、そのへんはまだまだかなーという気がします。なので、ブログ記事はできるだけ純粋なMarkdownで書けるようにしたいです。

### mdxのメリット

ただ、next.jsのmdxシステムに関するシステムは結構すごくて、mdxを`pages/posts/hoge.mdx`とかにおくとと`localhost:3000/posts/hoge`にそのままページとしてレンダリングできるんですよね。さらに、ピュアなMarkdownに対してもそれが適応できる。
その上、`remark`とか`rehype`系のプラグインを`next.config.js`に書くだけで全体に適用できるようになる、というの機能があり、すごく魅力的です。

以下のような感じです

```js
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

pageExtensionsに`md`を追加することでmarkdownを直でレンダリングできるようになります。さらにコードシンタクスとかkatex対応とかに対応しています。
もし自前でやろうと思ったら多分`getStaticProps`とかの中でファイル読み込んでremarkとrehypeでパースして`dangerousInnerHTML`とかで読み込むことになる気がしますし、それに比べると良い気がしました。
この便利さを考えると、mdx pluginを使ってmarkdown書くのが一番ラクだなあと思いました。

## レンダリングする方法

Markdownをレンダリングする方法を一番素直に考えると、以下のようなコードが想定されます。`[postId].jsx`的な感じです。

```jsx
import next/dynamic;
import Layout from "../components/Layout";

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
    const meta = await getFileMeta(filepath)
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

やっていることは単純で`fs`モジュールを使ってメタデータを全部とってきて、そのパスに対応するmarkdownファイルと、Layoutにメタデータを渡します。
このときにLayoutもメタデータで指定したいなら、

```yaml
layout:
    path: /path/to/Layout.tsx
    component: Layout
```

みたいなメタデータを作って`dynamic`を使えばそれも実現できます。
もはや大体これでいいじゃん、って思ったのですが、サイドバーが作れない。headerをうまくとってきてそれを元にサイドバーが作りたい。

そこで考えたのが、remarkのcustom loaderを作る方法です。
`remark-mdx`を使うと、だいたい下のmdxファイルは以下のようにパースされます。


ただのfrontmatter付きのマークダウンファイルは以下のような感じでMDASTに変換されます。

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

`remark-frontmatter`を使うと、frontmatter部分は`type === yaml`のchildrenとして取得できるようになります。また、header部分は`type === headings`を探せば取得できます。つまり、MDASTをparseしてfrontmatter部分とheaderをmetadataとして取得することが可能です。
そして、layoutで指定されたコンポーネントを行頭でimportし、メタデータをexportし、importしたコンポーネントをexportします。

つまり、上のようなfrontmatter付きのMarkdownを

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

のように変換してしまいます（実際はもう少し色々やりますが）。

こうすれば、markdownファイルを置くだけでカスタムコンポーネント付きのmdxに解釈されてレンダリングされるようになります。

さらにheaderの情報を含んだmetadataをコンポーネントが受け取れるので、sidebarやtocをJSX側で作ることができます。リファクタリングがしたくなれば、ほとんどカスタムローダー側を触れば解決しそうなところもいけてる気がします。あとこの方法のメリットは突如として

```jsx
<button>Push!!!!!!!</button>
```

とか入れたくなったときに入れられることです。パースは`mdx`に準拠してやってるので、突然mdxフォーマットで書いても自動で対応されます。

個人的にいい案だろって思ってるんですが、誰もこんなアプローチとってないので少し不安だったりします。なんか問題があるのだろうか。
