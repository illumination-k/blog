---
title: Rustのデータフレームcrateのpolarsとpandasの比較
description: rustにも実はpandas likeなcrateがあることを知ったのでpandasとの対応関係をまとめてた。最善である保証はありません。
---

## TL;DR

rust にも実は pandas like な crate があることを知ったので pandas との対応関係をまとめてた。最善である保証はありません。また Version ごとに破壊的変更がそこそこあるので、Version に注意する必要があります。

これを使えば大きなファイルを素早く処理できる可能性がありますが、さすがに rust なのでお手軽感はあまりありませんでした。

[excvr](https://github.com/google/evcxr)を使えば Jupyter 上で動かせます。Jupyter lab を使うと Python と Rust の比較が非常にやりやすくて良かったです。

![jupyter-image](/images/polars_pandas/jupyter_image.PNG)

ただ補完や型の推測が効かないので少し困りました。`rust-analyzer`対応してほしい。  
サンプルノートブックはこちら。docker-compose で起動できます。

![github:illumination-k/polars-pandas](github:illumination-k/polars-pandas)

## polars

[Apache Arrows](https://arrow.apache.org)をベースにしたデータフレームライブラリ。なんか py-polars みたいなのもあって、pandas より速いらしい。[polars の github](https://github.com/ritchie46/polars)の README にベンチマークテストがある。使い勝手としてはどちらかといえば R の tidyverse に似ている気がする。

### ChunkedArray

多分特徴的なのが、`Series`から変換できる`ChunkedArray`という構造体を持つ点。`ChunkedArray`は型があるので様々な演算ができる。また、条件をつかった列選択する際には`ChunckedArray<BooleanType>`を使う必要がある。

## Install

色々 feature もあって、日付変換や ndarray への変換、ランダムサンプリングなどに対応している。あとは json の serde や Apache Parquet format とかの I/O とか。今回は ndarray とランダムサンプリングを試してみる。あとエラーハンドリングに anyhow を入れておく。

```toml:title=Cargo.toml
[dependencies]
anyhow = "1.0"
polars = { version = "0.14.7", features = ["ndarray", "random"]}
```

Jupyter を使う場合は、

```
:dep polars = { version = "0.14.7", features = ["ndarray", "random"]}
```

また、nightly が必要なので Override しておく。

```bash
rustup override nightly
```

pandas はお好みのパッケージ管理ツールでインストールしてください。

rust 側は下記の`todo!()`部分に相当する場所を書いているつもりです。

```rust
use polars::prelude::*;
use anyhow::Result;

fn main() -> Result<()> {
    todo!();
    Ok(())
}
```

Python 側も下記の import を行っている前提です。

```python
import pandas as pd
print(pd.__version__)
# 1.3.0
```

## Series と DataFrame と ChunkedArray の演算

非常に長いので畳んである。ChunkedArray は大抵の演算ができる。Series の比較は条件による行選択の際に必要なので見ておくとよいです。

<details><summary>numberとSeries</summary><div>

| 演算名 | vs number |
| ------ | --------- |
| add    | `s + 1`   |
| sub    | `s - 1`   |
| div    | `s / 1`   |
| mul    | `s * 1`   |

</div></details>

<details><summary>SeriesとSeries</summary><div>

| 演算名 | 操作                  |
| ------ | --------------------- |
| add    | `&s1 + &s2`           |
| sub    | `&s1 - &s2`           |
| div    | `&s1 / &s2`           |
| mul    | `&s1 * &s2`           |
| mod    | `&s1 % &s2`           |
| eq     | `s1.series_equal(s2)` |

</div></details>

<details><summary>DataFrameとSeries</summary><div>

| 演算名 | 操作       |
| ------ | ---------- |
| add    | `&df + &s` |
| sub    | `&df - &s` |
| div    | `&df / &s` |
| mul    | `&df * &s` |
| mod    | `&df % &s` |

</div></details>

<details><summary>Seriesの演算</summary><div>

| 演算名 | 操作          |
| ------ | ------------- |
| sum    | `s.sum<T>()`  |
| max    | `s.max<T>()`  |
| min    | `s.min<T>()`  |
| mean   | `s.mean<T>()` |

</div></details>

<details>
<summary>Seriesの比較</summary>

Series 同士、Series と number を比較できる

| 演算 | vs Series      | vs number     |
| ---- | -------------- | ------------- |
| `=`  | `s1.eq(s2)`    | `s1.eq(1)`    |
| `!=` | `s1.neq(s2)`   | `s1.neq(1)`   |
| `>`  | `s1.gt(s2)`    | `s1.gt(1)`    |
| `=>` | `s1.gt_eq(s2)` | `s1.gt_eq(1)` |
| `<`  | `s1.lt(s2)`    | `s1.lt(1)`    |
| `<=` | `s1.lt_eq(s2)` | `s1.lt_eq(1)` |

<div>
</div></details>

<details><summary>DataFrameの演算</summary><div>

| 演算名 | 操作          |
| ------ | ------------- |
| sum    | `df.sum()`    |
| max    | `df.max()`    |
| min    | `df.min()`    |
| median | `df.median()` |
| mean   | `df.mean()`   |
| var    | `df.var()`    |
| std    | `df.std()`    |

</div></details>

<details>
<summary>ChunckedArrayの演算</summary>
基本的に殆どの演算ができます。できる演算子は

- \+
- \-
- /
- \*
- %
- pow

あたりです。また、`ChunkedArray<BooleanType>`は`&`と`|`の bit 演算ができます。

比較は Series と同じ感じでやる必要があります。

```rust
c1.lt(c2);
```

あとは Iterator とか Vector に処理する感じのものはできるものがあります。

- map
- fold
- is_empty
- contains
- len

など。

また、`ChunkedArray<Utf8Type>`は`to_lowercase`や`to_upper_case`、`replace`なんかが使えます。

default feature の temporal があれば、時間のパースもできます。

<div>
</div></details>

## Series の作成

name は任意。

```python
s = pd.Series([1, 2, 3], name="s")
```

`new`を使う場合は名前指定が必須です。`collect`のときは空文字列が名前になります。

```rust
let s = Series::new("s", [1, 2, 3]);
let t: Series = [1, 2, 3].iter().collect();
```

## DataFrame の作成

```python
df = pd.DataFrame({
    "A": ["a", "b", "a"],
    "B": [1, 3, 5],
    "C": [10, 11, 12],
    "D": [2, 4, 6]
})
```

マクロが便利

```rust
let s =
let mut df = df!("A" => &["a", "b", "a"],
             "B" => &[1, 3, 5],
             "C" => &[10, 11, 12],
             "D" => &[2, 4, 6]
    )?;
```

## 列選択

```python
df["A"]
df[["A", "B"]]
```

select で選ぶと、`Result<DataFrame>`が返ってくる。

```rust
df.select("A")?;
df.select(("A", "B"))?;
df.select(vec!["A", "B", "C"])?;
```

column で選ぶと、`Result<Series>`が返ってくる。

```rust
df.column("A")?;
```

## 条件に応じた列選択

どちらも columns をとってきて filter なりなんなりをすればよい。多分 str メソッドを使うのが pandas っぽくて好きです。 Rust は`get_columns`で columns をもって来ることができます。もう少し何とかならないかな...

```python
df.loc[:, [c.startswith("A") for c in df.columns]]
df.loc[:, df.columns.str.startswith("A")]
```

```rust
df.select(&df.get_column_names()
            .iter()
            .filter(|x| x.starts_with("A"))
            .map(|&x| x)
            .collect::<Vec<&str>>()
        )?;
```

## 列の入れ替え

```python
df[["B", "A"]]
```

```rust
df.select(("B", "A"))?;
```

## 列追加

```python
df["E"] = df["B"] * 2
df["F"] = df["B"].map(lambda x: x * 2)
df = df.assign(G = lambda df: df.B * 2)
```

polars の colum の追加は`with_column`関数や`replace_or_add`関数で行える。  
assign みたいないい感じの関数が見つからなかった。四則演算や簡単な演算は Series にして計算すればいける。`to_owned()`2 回やってるの解消できる気がするけどできなかった。  
無名関数を使いたい際には、一端`ChunkedArray`に変換してから apply や map を使う。`Series`は型を持たないが、`ChunkedArray`は型があるので演算ができる。  
`DataFrame`構造体には`apply`が存在しているが、`&mut self`なので、本体が変わってしまう。なので`select`か`clone`してからみたいな処理になるけどどっちが早いのだろうか。

```rust
df.with_column(df.column("B").unwrap()
                .i32().unwrap()
                .apply(|x| x * 2)
                .into_series()
                .rename("E")
                .to_owned());
df.with_column(Series::new("F", &[2, 6, 10]));
df.with_column(df.select("B").unwrap()
                 .rename("B", "G").unwrap()
                 .apply("G", |x| x * 2).unwrap()
                 .column("G").unwrap()
                 .to_owned());

df.with_column(df.column("B").unwrap().to_owned().rename("H").to_owned() * 2);
df.replace_or_add("I", Series::new("I", &[2, 6, 10])).unwrap();
```

## 条件による行選択

### 単独条件

```python
df.loc[df["B"] <= 4]
df.query("B <= 4")
```

```rust
df.filter(&df.column("B")?.lt_eq(4))?;
```

### 複数条件

```python
df.loc[(df["B"] == 1) | (df["C"] == 12)]
df.query("B == 1 | C == 12")
```

ChunkedArray は bit 演算ができます。

```rust
df.filter(&(
    df.column("B")?.eq(1)? | df.column("C").eq(12)?
))
```

### 含まれているかなどの演算

```python
l = [1, 3]
df.query("B in @l")
```

たぶん ChunkedArray に変換してやる方法しか見つかりませんでした。apply は Self を返すので、`ChunkedArray<Int32Type>`から`ChunkedArray<BooleanType>`に変換はできない。なので、map を使った後 collect する必要がある。

```rust
let v: Vec<i32> = vec![1, 2];
df.filter(&(
    df.column("B")?
        .i32()?
        .map(|x| v.contains(&x))?
        .collect()
))?;
```

## GroupBy

Groupby 用にデータフレームを準備する。

```python
dates = [
"2020-08-21",
"2020-08-21",
"2020-08-22",
"2020-08-23",
"2020-08-22",
]

temp = [20, 10, 7, 9, 1]
rain = [0.2, 0.1, 0.3, 0.1, 0.01]

d = dict(
    date=dates,
    temp=temp,
    rain=rain
)

df = pd.DataFrame.from_dict(d)
```

```rust
// docs example

let dates = &[
"2020-08-21",
"2020-08-21",
"2020-08-22",
"2020-08-23",
"2020-08-22",
];
// date format
let fmt = "%Y-%m-%d";
// create date series
let s0 = Date32Chunked::parse_from_str_slice("date", dates, fmt)
        .into_series();
// create temperature series
let s1 = Series::new("temp", [20, 10, 7, 9, 1].as_ref());
// create rain series
let s2 = Series::new("rain", [0.2, 0.1, 0.3, 0.1, 0.01].as_ref());
// create a new DataFrame
let df = DataFrame::new(vec![s0, s1, s2]).unwrap();
println!("{:?}", df);

// shape: (5, 3)
// +--------------+------+------+
// | date         | temp | rain |
// | ---          | ---  | ---  |
// | date32(days) | i32  | f64  |
// +==============+======+======+
// | 2020-08-21   | 20   | 0.2  |
// +--------------+------+------+
// | 2020-08-21   | 10   | 0.1  |
// +--------------+------+------+
// | 2020-08-22   | 7    | 0.3  |
// +--------------+------+------+
// | 2020-08-23   | 9    | 0.1  |
// +--------------+------+------+
// | 2020-08-22   | 1    | 0.01 |
// +--------------+------+------+
```

### build-in の演算

polars では

- count
- first
- last
- sum
- min
- max
- mean
- median
- var
- std
- count
- quantile
- n_unique

ができる。使い方は

1. 特定の列で Groupby
2. 演算したい列を指定 (指定なしなら全部)
3. 演算

#### 単一の演算

```python
df.groupby("date").var()
df.groupby("date")[["temp"]].sum()
```

```rust
df.groupby("date").unwrap().var();
df.groupby("date").unwrap().select("temp").sum();
```

#### 複数の演算

```python
import numpy as np
df.groupby("date").agg({"temp": [np.mean, np.var], "rain": [np.std]})
```

```rust
df.groupby("date").unwrap()
    .agg(&[("temp", &["sum", "min"]), ("rain", &["count", "first"])])
```

### 任意の演算

```python
df.groupby("date").apply(lambda x: print(x))
```

apply の返り値は`Result<DataFrame>`である必要がある。

```rust
df.groupby("date").unwrap()
    .apply(|x| { println!("{:?}", x); Ok(x)});
```

## hstack, vstack (concat)

`pandas`の`concat`。pandas の`stack`とは機能が違うので注意が必要。pandas は合わない行があれば NaN で埋めるが polars はエラーする。

データフレームを準備する。

```python
df1 = pd.DataFrame({"A": [1, 2, 3], "B": [2, 3, 4]})
df1_t = pd.DataFrame({"A": [4, 5, 6], "B": [5, 6, 7]})
df2 = pd.DataFrame({"C": ["a", "b", "c"], "D": [0.1, 0.2, 0.3]})
s1 = pd.Series([10, 11, 12], name="s1")
s2 = pd.Series(["ABC", "NMK", "XYZ"], name="s2")
```

```rust
let df1 = df!(
    "A" => &[1, 2, 3],
    "B" => &[2, 3, 4]
).unwrap();

let df1_t = df!(
    "A" => &[4, 5, 6],
    "B" => &[5, 6, 7]
).unwrap();


let df2 = df!(
    "C" => &["a", "b", "c"],
    "D" => &[0.1, 0.2, 0.3]
).unwrap();

let s1 = Series::new("S1", [10, 11, 12]);
let s2 = Series::new("S2", ["ABC", "NMK", "XYZ"]);
```

### hstack

```python
pd.concat([df1, s1, s2], axis=1)
pd.concat([df1, df2], axis=1)
```

```rust
df1.hstack(&[s1, s2])
// 無理やりデータフレーム同士をしようと思えばできる。
let s_vec: Vec<Series> = df2.iter().map(|s| s.clone()).collect();
df1.hstack(&s_vec)
```

### vstack

```python
pd.concat([df1, df2]) # 列名が違うところはNaNで埋められる。
pd.concat([df1, df1_t])
```

```rust
df1.vstack(&df2) // error
df1.vstack(&df1_t)
```

## 重複行の抽出

```python
df.loc[df.duplicated()]
```

```rust
df.filter(&df.is_duplicated()?)?;
```

## 重複行の削除

両方とも subset を選ぶことで、同じように特定の列の重複行を削除できる。

```python
df.drop_duplicates()
```

```rust
df.drop_duplicates(true, None)? // maintain_order, subset;
```

## numpy / ndarray への変換

```python
df.values
```

型を指定する必要があります。

```rust
df.to_ndarray<T>()?;
```

## read csv

csv 以外なら`sep = "\t"`とかしてください。

```python
df = pd.read_csv(path)
```

csv 以外なら with_delimiter の引数を好きに変えてください。なくても動きます。

あと paralell の feature があると、dask みたいな感じで CPU の上限コア数を使って読み込みます。いやな場合は、`.with_n_threads(Some(2))`とかしてください。`with_n_threads`は`from_path`を使って`CsvReader`を作った時しか使えないようです。

```rust
let df = CsvReader::from_path(path)?
        .infer_schema(None)
        .with_delimiter(b',')
        .has_header(true)
        .finish()?
```

## write csv

read と同様。

```python
df.to_csv(path)
```

```rust
let mut f = std::fs::File::create(path)?;
CsvWriter::new(&mut f)
    .has_headers(true)
    .with_delimiter(b',')
    .finish(df)?;
```

## TODO

- [ ] pivot
- [ ] melt
- [ ] join 系
- [ ] fillna 系
- [ ] sample_n
- [ ] macro

気長に埋めていきます。

## 感想

できることは多い感じがします。pandas みたいに柔軟な処理をする用途では使いにくそうですが、決まりきった処理なら polars で記述すると生産効率向上に寄与する可能性があります。
