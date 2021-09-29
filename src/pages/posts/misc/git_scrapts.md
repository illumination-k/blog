---
title: Gitに関するスクラップ
description: Gitに関してコマンドをよく忘れるのでメモ
---

## HEADの種類

|||
|---|---|
|HEAD|最新のコミット|
|ORIG_HEAD|最新のコミットの1つ手前|
|FETCH_HEAD|リモートブランチの最新のコミット|
|MERGE_HEAD|MERGEした対象の最新のコミット|

- [GitのHEAD, ORIG_HEAD, FETCH_HEAD, MERGE_HEADとは？](https://qiita.com/t-mochizuki/items/347cba461fd570bca03c)

## 特定のコミットに戻す

- `${hash}`: 特定のコミット
- `${dirname}`: ディレクトリ名
- `${file_n}`: ファイル名

```bash
# 全体
git checkout ${hash}

# 特定のディレクトリ
git checkout ${hash} ${dirname}

# 特定のファイル
git checkout ${hash} ${file_1} ${file_2}
```

## reset系

```bash
# add取り消し
git reset --mixed HEAD
# commit取り消し
git reset --soft HEAD^
# 直前のcommitの削除
git reset --hard HEAD^
# commit後の変更取り消し
git reset --hard HEAD
# 直前のresetを取り消す
git reset --hard ORIG_HEAD
```

- [[git reset (--hard/--soft)]ワーキングツリー、インデックス、HEADを使いこなす方法](https://qiita.com/shuntaro_tamura/items/db1aef9cf9d78db50ffe)

## reflog

`git reset`を間違えてしたときに便利なサブコマンド。`reflog`は`HEAD`が指しているcommitのリストで、ローカルでのみ保存される。`reflog`はデフォルトでは直近90日で削除される。local特有のものなので、リモート側では保持されていない。

- [履歴の書き換え](https://www.atlassian.com/ja/git/tutorials/rewriting-history)
- [What's the difference between git reflog and log?](https://stackoverflow.com/questions/17857723/whats-the-difference-between-git-reflog-and-log)