---
title: Rustのデータフレームcrateのpolarsとpandasの比較
description: rustにも実はpandas likeなcrateがあることを知ったのでpandasとの対応関係をまとめてた。最善である保証はありません。
---

## TL;DR

rustにも実はpandas likeなcrateがあることを知ったのでpandasとの対応関係をまとめてた。最善である保証はありません。

これを使えば大きなファイルを素早く処理することができそうですが、さすがにrustなのでお手軽感はそんなになかった。

plotterとかはjupyter対応してるので、もしかしてそのうちjupyterで使える可能性に期待しています。間違い等があればTwitterやメールにお願いします。

## polars

[Apache Arrows](https://arrow.apache.org)をベースにしたデータフレームライブラリ。なんかpy-polarsみたいなのもあって、pandasより速いらしい。[polarsのgithub](https://github.com/ritchie46/polars)のREADMEにベンチマークテストがある。使い勝手としてはどちらかといえばRのtidyverseに似ている気がする。

### ChunkedArray

多分特徴的なのが、`Series`から変換できる`ChunkedArray`という構造体を持つ点。`ChunkedArray`は型があるので様々な演算ができる。また、条件をつかった列選択を行う際には`ChunckedArray<BooleanType>`を使う必要がある。

## Install

色々featureもあって、並列実行やndarrayへの変換、ランダムサンプリングなどに対応している。あとはjsonのserdeやApache Parquet formatとかのIOとか。今回はndarrayと並列実行、ランダムサンプリングなどを試してみる。あとエラーハンドリングにanyhowを入れておく。

```title=cargo.toml
[dependencies]
anyhow = "1.0"
polars = { version = "0.10", features = ["ndarray", "parallel", "random"]}
```

また、nightlyが必要なのでOverrideしておく。

```bash
rustup override nightly
```

pandasはお好みのパッケージ管理ツールでインストールしてください。

rust側は下記の`todo!()`部分に相当する場所を書いているつもりです。

```rust
use polars::prelude::*;
use anyhow::Result;

fn main() -> Result<()> {
    todo!();
    Ok(())
}
```

python側も下記のimportを行っている前提です。

```python
import pandas as pd
```

## SeriesとDataFrameとChunkedArrayの演算

非常に長いので畳んである。ChunkedArrayは大抵の演算ができる。Seriesの比較は条件による行選択の際に必要になってくるので見ておくとよいと思い気がする。

<details><summary>numberとSeries</summary><div>

|演算名|vs number|
|---|---|
|add| `1.add(s)` \|\| `s + 1` |
|sub| `1.sub(s)` \|\| `s - 1` |
|div| `1.div(s)` \|\| `s / 1` |
|mul| `1.mul(s)` \|\| `s * 1` |

</div></details>

<details><summary>SeriesとSeries</summary><div>

|演算名|操作|
|---|---|
|add| `&s1 + &s2` |
|sub| `&s1 - &s2` |
|div| `&s1 / &s2` |
|mul| `&s1 * &s2` |
|mod| `&s1 % &s2` |
|eq| `s1.series_equal(s2)` |

</div></details>

<details><summary>DataFrameとSeries</summary><div>

|演算名|操作|
|---|---|
|add| `&df + &s` |
|sub| `&df - &s` |
|div| `&df / &s` |
|mul| `&df * &s` |
|mod| `&df % &s` |

</div></details>

<details><summary>Seriesの演算</summary><div>

|演算名|操作|
|---|---|
|sum|`s.sum<T>()`|
|max|`s.max<T>()`|
|min|`s.min<T>()`|
|mean|`s.mean<T>()`|

</div></details>

<details>
<summary>Seriesの比較</summary>

Series同士、Seriesとnumberを比較できる

|演算|vs Series|vs number|
|---|---|---|
|=|`s1.eq(s2)`|`s1.eq(1)`|
|!=|`s1.neq(s2)`|`s1.neq(1)`|
|\>|`s1.gt(s2)`|`s1.gt(1)`|
|=\>|`s1.gt_eq(s2)`|`s1.gt_eq(1)`|
|\<|`s1.lt(s2)`|`s1.lt(1)`|
|\<=|`s1.lt_eq(s2)`|`s1.lt_eq(1)`|
<div>
</div></details>

<details><summary>DataFrameの演算</summary><div>

|演算名|操作|
|---|---|
|sum|`df.sum()`|
|max|`df.max()`|
|min|`df.min()`|
|median|`df.median()`|
|mean|`df.mean()`|
|var|`df.var()`|
|std|`df.std()`|

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

あたりです。また、`ChunkedArray<BooleanType>`は`&`と`|`のbit演算ができます。

比較はSeriesと同じ感じでやる必要があります。

```rust
c1.lt(c2);
```

あとはIteratorとかVectorに処理する感じのものはできるものがあります。

- map
- fold
- is_empty
- contains
- len

など。

また、`ChunkedArray<Utf8Type>`は`to_lowercase`や`to_upper_case`、`replace`なんかが使えます。

default featureのtemporalがあれば、時間のパースもできます。

<div>
</div></details>

## DataFrameの作成

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

selectで選ぶと、`Result<DataFrame>`が返ってくる。

```rust
df.select("A")?;
df.select(("A", "B"))?;
df.select(vec!["A", "B", "C"])?;
```

columnで選ぶと、`Result<Series>`が返ってくる。

```rust
df.column("A")?;
```

## 条件に応じた列選択

どちらもcolumnsをとってきてfilterなりなんなりをすればよい。多分strメソッドを使った方がpandasっぽい？ rustは`get_columns`でcolumnsをもって来れる。もう少し何とかならないかな...

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
# or
df["E"] = df["B"].map(lambda x: x * 2)
# or
df.assign(E = lambda df: df.B * 2)
```

polarsのcolumの追加は`add_column`関数で行える。  
assignみたいないい感じの関数が見つからなかった。四則演算や簡単な演算はSeriesにして計算すればいける。`to_owned()`二回やってるの解消できる気がするけどできなかった。  
無名関数を使いたい際には、一端`ChunkedArray`に変換してからapplyやmapを使う。`Series`は型を持たないが、`ChunkedArray`は型があるので演算ができる。  
`DataFrame`構造体には`apply`が存在しているが、`&mut self`なので、本体が変わってしまう。なので`select`か`clone`してからみたいな処理になるけどどっちが早いのだろうか。

```rust
df.add_column(
    Series::new("E", &[2, 2, 2])
)?;

df.add_column(
    df.column("B")?
    .to_owned()
    .rename("E")
    .to_owned() * 2)?;
// or
   df.add_column(df.column("B")?.i32()?
    .apply(|x| x * 2 )
    .into_series()
    .rename("E")
    .to_owned())?;
// or
df.add_column(df.clone() // or df.select("B")
    .rename("B", "E")?
    .apply("E", |x| x * 2)?
    .column("E")?
    .to_owned())?;
```

また、新しいDataFrameを作りたければ`with_column`を使う。中身の書き方は`add_column`と同じ。

```rust
let new_df = df.with_column(df.column("B")?.i32()?
    .apply(|x| x * 2 )
    .into_series()
    .rename("E").to_owned())?;
```

## 条件による行選択

### 単独条件

```python
df.loc[:, df["B"] <= 4]
df.query("B <= 4")
```

```rust
df.filter(&df.column(B)?.lt_eq(4))?;
```

### 複数条件

```python
df.loc[:, (df["B"] == 1) | (df["C"] == 12)]
df.query("B == 1 | C == 12")
```

ChunkedArrayはbit演算ができます。

```rust
df.filter(&(
    df.column("B")?.eq(1)? | df.column("C").eq(12)?
))
```

### 含まれているかなどの演算

```python
l = [1, 3]
df.query("B in l")
```

たぶんChunkedArrayに変換してやるしかない、と思う。applyはSelfを返すので、`ChunkedArray<Int32Type>`から`ChunkedArray<BooleanType>`に変換はできない。なので、mapを使った後collectする必要がある。

```rust
let v: Vec<i32> = vec![1, 2];
df.filter(&(
    df.column("B")?
        .i32()?
        .map(|x| v.contains(&x))?
        .collect()
))?;
```

## 重複行の抽出

```python
df.loc[df.is_duplicates()]
```

```rust
df.filter(&df.is_duplicated()?)?;
```

## 重複行の削除

両方ともsubsetを選ぶことで、同じように特定の列の重複行を削除することができる。

```python
df.drop_duplicates()
```

```rust
df.drop_duplicates(true, None)? // maintain_order, subset;
```

## numpy / ndarrayへの変換

```python
df.values()
```

```rust
df.to_ndarray()?;
```

## read csv

csv以外なら`sep = "\t"`とかしてください。

```python
df = pd.read_csv(path)
```

csv以外ならwith_delimiterの引数を好きに変えてください。なくても動きます。

あとparalellのfeatureがあると、daskみたいな感じでCPUの上限コア数を使って読み込みます。いやな場合は、`.with_n_threads(Some(2))`とかしてください。`with_n_threads`は`from_path`を使って`CsvReader`を作った時しか使えないようです。

```rust
let df = CsvReader::from_path(path)?
        .infer_schema(None)
        .with_delimiter(b',')
        .has_header(true)
        .finish()?
```

## write csv

readと同様。

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

- [ ] groupby
- [ ] pyvot
- [ ] melt
- [ ] vstack
- [ ] join系
- [ ] fillna系
- [ ] sample_n
- [ ] macro

気長に埋めていきます。

## 感想

できることは多い感じがします。Pandasみたいに柔軟に処理する分にはあまり使えなさそうですが、決まりきった処理ならこちらで記述すると生産効率が上がりそうな気がします。
