---
title: CSSでコードブロックの横に言語名を表示する
description: コードを書くときに、書いてる言語が何なのか表示すると見るときに便利です。CSSだけで実現できます。
---

## TL;DR

技術ブログを書いているとコードを書く必要があるわけですが、その言語が何なのかをいい感じに表示したいと思っていました。CSSの`content`を使えば結構簡単に表示することができます。

## 前提

```html
<pre>
    <code class="language-*">
        hello
    </code>
</pre>
```

というふうな感じでコードブロックが定義されているとします。

## 実装

`content`は要素の前後に`::before`や`::after`を使うことでテキストや画像などを挿入することができます。`content`で挿入したテキストなどは選択・コピーができませんが、言語名はむしろコピーされると邪魔なので、結構適している方法な気がします。

```css
pre {
  position: relative;
  -webkit-overflow-scrolling: touch;
}

pre > code[class*="language"]::before {
  background: #808080;
  border-radius: 0 0 0.25rem 0.25rem;
  color: white;
  font-size: 14px;
  letter-spacing: 0.025rem;
  padding: 0.1rem 0.5rem;
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
  opacity: 0.4;
}

pre > code[class="language-rust"]::before {
  content: "Rust";
  opacity: 0.8;
}
```
