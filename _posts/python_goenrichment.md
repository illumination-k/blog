---
title: PythonでGO Enrichment解析を行う
description: 次世代シーケンサー (NGS) 解析を行う際に、遺伝子群の機能を要約するための手法として、GO annotation解析が有名です。Rを使った解析例は数多くあるのですが、Pythonを使った解析例はあまり見られないので、まとめてみました。
---

## TL;DR

次世代シーケンサー (NGS) 解析を行う際に、遺伝子群の機能を要約するための手法として、GO annotation解析が有名です。Rを使った解析例は数多くあるのですが、Pythonを使った解析例はあまり見られないので、まとめてみました。

## 必要なツールのインストール

今回は`goatools`というパッケージを使います。

```title=requirements.txt
goatools
fisher
pydot
matplotlib
```