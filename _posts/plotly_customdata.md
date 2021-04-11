---
title: Plotlyのhoverinfoをカスタマイズする
description:
---

## TL;DR

plotlyはインタラクティブなプロットを書く際に非常に便利です。その際に、点などにマウスを持っていくとhoverinfoを使って追加のデータを表示させることができます。デフォルトだと、`x`, `y`の位置や`text`などしか表示させられませんが、`customdata`と`hovertemplate`を使うことでかなり自由度高く情報を表示させることができます。

## 基本的なhoverinfo