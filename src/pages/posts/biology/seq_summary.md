---
title: 代表的な次世代シーケンサーを用いたseqの原理についてまとめていく
description: NGS解析技術の発展に伴い、様々なseqと呼ばれる技術が発展しています。それらの原理についてまとめていきます。
---

## TL;DR

NGS解析技術の発展に伴い、様々なseqと呼ばれる技術が発展しています。それらの原理についてまとめていきます。

## ライブラリ調整について

よく使われている反応については、[弊ブログの記事](https://illumination-k.dev/posts/biology/library_construction_reaction)などを参照していただけると幸いです。

Illumina社のNGS技術は`sequence by synthesis (SBS)`と呼ばれる技術が使われています。`SBS`を使うには、アダプターと呼ばれる認識配列が必要です。このアダプターとして使われる配列も色々ありますが、2021現在において最もよく使われているのは次の3種類でしょう。

### Truseq Single Index

### Truseq Dual Index

### Nextera Dual Index