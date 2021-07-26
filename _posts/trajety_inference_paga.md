---
title: PAGAを使って系譜推定してみる
description:
---

## TL;DR

single cell RNA-seq (scRNAseq) 解析の際の代表的な方法に系譜推定があります。系譜推定をするアルゴリズムは非常に多くあります。

2019年と少々古いですが、Nature biotechnologyで系譜推定手法のベンチマーク論文が出ていて、その中でPAGAという手法が非常に良いスコアを示していました。PAGAは

## Reference

- [PAGA: graph abstraction reconciles clustering with trajectory inference through a topology preserving map of single cells](https://genomebiology.biomedcentral.com/articles/10.1186/s13059-019-1663-x)
- [A comparison of single-cell trajectory inference methods](https://www.nature.com/articles/s41587-019-0071-9?platform=hootsuite)