---
title: SQLに関するメモ書き
description: SQLに関するメモ
---

## TL;DR

SQLに関するメモ。入門レベルです。

## 基本構文

### SELECT

みたい列名を指定できる。すべての基本。

```sql
SELECT id, name FROM A
```

`DISTINCT`をつければ重複を排除できる。

```sql
SELECT DISTINCT id, name FROM A
```

### WHERE

条件指定できる。

```sql
SELECT id, name FROM A
    WHERE id = 1
```

### ORDER BE

条件でソート。降順なら`DESC`が必要

```sql
SELECT id FROM A ORDER BY A DESC
```

### JOIN

内部結合 (`INNER JOIN`) と外部結合 (`LEFT OUTER JOIN`) がある。`pandas`と同じ感じ。

```sql
SELECT * FROM A
    INNER JOIN B
    ON A.id = B.id
```

### IFNULL, COACESCE

- `IFNULL`: NULLをとったときのデフォルト値を指定できる。
- `COALESCE`: 複数列を調べて、NULLだったらデフォルト値を返す。

```sql
SELECT id, IFNULL(
    (SELECT name FROM A), "UnKnown"
) as name, COALESCE(id, name, "?")
```

### 変数定義

`DECLARE`が必要？

```sql
DECLARE N INT;
SET N = 0;
```

## ふわっと思ったこと

- 同一判定が`==`じゃなくて`=`