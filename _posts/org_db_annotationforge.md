---
title: 非モデル生物でAnnotationDbi (Org.xxx.db) を自作する
description: NGS解析において、GO Enrichment解析を始めとしたEnrichment解析はデータを生物学的に解釈するために重要な手法だが、非モデル生物ではAnnotationDbiがない場合が多いので自作する方法を説明する。
---

## TL;DR

NGS解析において、GO Enrichment解析を始めとしたEnrichment解析はデータを生物学的に解釈するために重要な手法ですが、非モデル生物で行うのはAnnotationDbiなどのパッケージが充実しておらず少し敷居が高いです。そこで、AnnotationForgeを使ってAnnotationDbi (Org.xxx.db) を自作する方法について説明します。

## 1. アノテーションファイルの準備

まず、データベースを作成するためのアノテーションを準備します。