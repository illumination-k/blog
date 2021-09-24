---
title: 深層学習ベースのGO termアノテーションを試してみる
description: 自然言語処理技術では深層学習技術が非常に良い成果をあげています。タンパク質配列からGO Termなどのアノテーション行い、機能を推定する方法として、これまでの多くはBLASTなどの相同性検索を用いていました。最近では、いくつかのツールが深層学習ベースで機能予測を行っています。今回はdeepgoplusを試してみることにします。
---

## TL;DR

自然言語処理技術では深層学習技術が非常に良い成果をあげています。タンパク質配列から GO Term などのアノテーション行い、機能を推定する方法として、これまでの多くは BLAST などの相同性検索を用いていました。最近では、いくつかのツールが深層学習ベースで機能予測を行っています。今回は deepgoplus を試してみることにします。CNN ベースっぽいです。

> Maxat Kulmanov, Robert Hoehndorf, DeepGOPlus: improved protein function prediction from sequence, Bioinformatics, Volume 36, Issue 2, 15 January 2020, Pages 422–429, https://doi.org/10.1093/bioinformatics/btz595

[Web サイト](https://deepgo.cbrc.kaust.edu.sa/deepgo/)も作成されていて、Web で簡単に試してみることもできます。ただ、Web サイトは 10 タンパク質ずつしか解析できないので、ゲノムワイドにやろうとすると結構大変そうです。

そこで、今回は筆者らが提供しているモデルと Docker Image を使って予測してみます。([github](https://github.com/bio-ontology-research-group/deepgoplus))

## 必要なものの準備

github に Dockerfile がおいてあるので、コピペして使います。README を見る限り Dockerhub にはおいてなさそうな感じです。中身は pip で deepgoplus をインストールしてるのと、diamond を使っているので、そのインストールをしているようです。

```docker
FROM python:3.6

RUN wget http://github.com/bbuchfink/diamond/releases/download/v2.0.2/diamond-linux64.tar.gz && tar xzf diamond-linux64.tar.gz
RUN mv diamond /usr/bin/

RUN pip install pip --upgrade
RUN pip install deepgoplus
```

ビルドします。

```bash
docker build -t deepgoplus:latest .
```

モデルをダウンロードします。

```bash
wget http://deepgoplus.bio2vec.net/data/data.tar.gz
tar zxvf data.tar.gz
```

とりあえず動かすのが今回の目的なので、シロイヌナズナの fasta を使っておきます。

```bash
wget -O athaliana.fa https://www.arabidopsis.org/download_files/Proteins/TAIR10_protein_lists/TAIR10_pep_20101214
```

## 実際に動かす

必要なのはモデルなどが置かれているディレクトリを指定する`--data-root`と、fasta ファイルがおいてある`--in-file`です。あとは output の名前と、信頼度的なものである threshold を指定しておきます。Website が 0.3 だったので 0.3 にしています。

```bash
docker run --rm -it -v $(pwd):/mnt \
    deepgoplus --data-root /mnt/data_root --in-file  /mnt/athaliana.fa --out-file /mnt/deepgoplus_result.tsv --threshold 0.3
```
