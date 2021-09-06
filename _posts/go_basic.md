---
title: GO Termに関する基礎のまとめ
description: GO解析はよく使われる解析手法ですが、正確に理解するには、まずGOそのものに関する理解が必要になります。GO Termそのものの基本についてまとめていきます。
---

## TL;DR

GO解析は次世代シーケンサーやマイクロアレイの解析において、よく使われる解析手法です。解析の意味を正確に理解するには、まずGOそのものに関する理解が必要になります。ここでは、GO Termそのものの基本についてまとめていきます。

## GO Termとは

[The Gene Ontology Consortium](http://geneontology.org/docs/whoweare/)という団体が規定している、人によって定義されたアノテーションです。人によって定義されていることから、PFAMやKEGGなどといったデータと比べると客観性が欠ける、などといった指摘も見られます。  
とはいえ、生物学的な知見を含んだアノテーションはGO Termくらいですし、Contributorの方々のおかげで信頼性はそれなりにあるのではないかと思います。2021年現在では、150,000を超える論文の実験データをもとにアノテーションがつけられており、実験的な裏付けのあるアノテーションは700,000を超えます([参考](http://geneontology.org/docs/introduction-to-go-resource/))。実際、タンパク質の機能推定を行うような手法では、正解データとしてGO Termが使われることが多いです。

また、人によって付けられるという性質上、GO Termそのものが更新されることも多いため、解析の際にはできるだけ最新のGO Termのリストを使うことが推奨されます。


## GO Termの中身

### 基本要素

1つのGO Termは以下の要素を基本に構成されます。

| Name          | Description                                                  | Example                                       |
| ------------- | ------------------------------------------------------------ | --------------------------------------------- |
| Gene Product  | アノテーションされている遺伝子産物                           | UniProtKB:Q920D2 (rat Dhfr)                   |
| GO Term       | IDと名前(説明)                                               | GO:0004146 (dihydrofolate reductase activity) |
| Reference     | アノテーションの根拠を示す論文                               |                                               |
| Evidence Code | アノテーションの根拠の種類を示すコード(実験、系統解析 etc.,) | Inferred from Experiment (EXP)                |

### extensions

基本要素以外にも、いくつかのアノテーションの拡張が行われています。拡張アノテーションは遺伝子や遺伝子産物、複合体、化学物質などの関係性を示す、**Molecular reationships**と、細胞種や解剖学、発達段階などとの関係性を示す**Contextual relationships**に大別されます。

#### Molecular reationships

| Name                  | Description | Example                                                              |
| --------------------- | ----------- | -------------------------------------------------------------------- |
| has_regulation_target |             | has_regulation_target(UniProtKB:P08151 zinc finger protein GLI1)     |
| has_input             |             | has_input(PomBase:SPAC26H5.0 pcf2)                                   |
| has_direct_input      |             | has_direct_input(UniProtKB:Q7LBE3 Solute carrier family 26 member 9) |

#### Contextual relationships

| Name           | Description | Example                                                        |
| -------------- | ----------- | -------------------------------------------------------------- |
| part_of        |             | part_of(WBbt:0006804 body wall muscle cell)                    |
| occurs_in      |             | occurs_in(CL:0000740 retinal ganglion cell)                    |
| happens_during |             | happens_during(GO:0071470 cellular response to osmotic stress) |

## GO Annotationの構造

GO Annotation全体はノードとしてGO Termを、エッジとして下で定義されるRelationを持つ有向非巡回グラフ(DAG)で表されており、階層構造を持ちます。階層構造の上に行くほど、広い意味をもつアノテーションになります。

階層構造における関係性を表すRelationは以下の通りです。

| Name      | Description |
| --------- | ----------- |
| is a      |             |
| part of   |             |
| has part  |             |
| regulates |             |

GO Termの一番上の階層として、以下の3つが割り当てられています。

|                    | 略称 | 意味                   |
| ------------------ | ---- | ---------------------- |
| Biological Process | BP   | 生物学的なプロセス     |
| Molecular Function | MP   | 遺伝子産物の分子的機能 |
| Cellular Component | CC   | 細胞の構成要素         |


## Reference

- [Guide to GO evidence codes](http://geneontology.org/docs/guide-go-evidence-codes/)
- [Introduction to GO annotations](http://geneontology.org/docs/go-annotations/#annotation-extensions)
- [Relations in the Gene Ontology](http://geneontology.org/docs/ontology-relations/)
- Huntley R.P., Lovering R.C. (2017) Annotation Extensions. In: Dessimoz C., Škunca N. (eds) The Gene Ontology Handbook. Methods in Molecular Biology, vol 1446. Humana Press, New York, NY. https://doi.org/10.1007/978-1-4939-3743-1_17