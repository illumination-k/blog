---
title: Pythonでupsetplotを使う
description: 集合関係の包含関係を示すとき、ベン図より使いやすいことのあるupset plotをPythonで使用するやり方です
---

## TL;DR

集合関係の包含関係を示す際、2 つや 3 つならベン図がわかりやすいですが、集合関係の数が増えてくるとベン図だと理解しにくくなることがあります。そこで便利なのが、Alexander Lex が 2014 年に提唱した UpSetPlot です。Python で利用する場合は以下のパッケージが定期的にメンテされており安心です（2021/8 現在）

![github:jnothman/UpSetPlot](github:jnothman/UpSetPlot)

R での実装例は[こちらのサイト](https://stats.biopapyrus.jp/r/graph/upset.html)を参考にしてください。

## upset plot とベン図

まず、ベン図と Upset Plot が比較されている図を見てみます。

![md={6}:upsetplot_venn](/images/upsetplot/upsetplot_venn.gif)
図 1. venn 図と upsetplot(Lex et al., 2014 Fig. 4)

3 つくらいだと一長一短という感じです。集合の量的関係を見る文には Upset Plot のほうが向いていそうです。

また、upsetplot のメリットは、拡張性が高いということです。というのは、集合関係を行で表しているため、その行に別のデータを挿入できます。例えば以下のように拡張できます。

![upsetplot_extensions](/images/upsetplot/upsetplot_extensions.gif)
図 2. upsetplot の拡張性(Lex et al., 2014 Fig. 1)

また、集合間の量的関係を表すため、集合に属する数によってソートをかけるといったことも可能です。もちろん、拡張したデータに対してソートできます。

![md={8}:upsetplot_sort](/images/upsetplot/upsetplot_sort.gif)
図 3. upsetplot のソート(Lex et al., 2014 Fig. 6)

## Python による実装

### Install

```bash
pip install upsetplot
```

### サンプルデータの生成

upsetplot パッケージはサンプルデータを生成できるので、まずはサンプルデータで試してみます。

```python
from upsetplot import generate_counts

examples = generate_counts()
print(examples)

""" 出力
cat0   cat1   cat2
False  False  False      56
              True      283
       True   False    1279
              True     5882
True   False  False      24
              True       90
       True   False     429
              True     1957
Name: value, dtype: int64
"""
```

### 基本的な Upset Plot と Venn 図の描画

#### venn 図

サンプルデータを使ってベン図を作成します。ベン図の作成には、matplotlib の venn3 を使用します。

```python
from matplotlib_venn import venn3
venn3(subsets=(24, 1279, 429, 28, 90, 5882, 1957),
                set_labels=("cat0", "cat1", "cat2"))
plt.show()
```

**出力**
![md={4}:venn](/images/upsetplot/venn.png)

量が歪だと少しわかりにくいです。

#### Upset Plot

サンプルデータを使って、同様に Upset Plot を作成します。

```python
from upsetplot import plot

plot(examples, show_counts="%d")
plt.suptitle("A upset plot")
plt.show()
```

**出力**
![md={6}:upsetplot_basic](/images/upsetplot/upsetplot_basic.png)

量的関係と集合関係を分離させることで、量的関係の視覚的な理解が容易くなっています。逆に集合関係は少し理解が難しくなります。

向きを変えたり、ソートしたりも簡単にできます。

```python
plot(examples, orientation="vertical", show_counts="%d")
plot(examples, sort_by="cardinality", show_counts="%d")
plt.show()
```

![md={6}:upsetplot_basic_orientation](/images/upsetplot/upsetplot_basic_orientation.png)

![md={6}:upsetplot_basic_sort](/images/upsetplot/upsetplot_basic_sort.png)

### Upset Plot の拡張

scikit-learn に登録されている boston の住宅データを使って upsetplot の拡張を試してみましょう。

scikit-learn がない場合はインストールします。またデータ操作に pandas を使うので pandas もインストールします。

```bash
pip install scikit-learn pandas
```

拡張には`UpSet`クラスを作成し、`add_catplot`メソッドを使用します。

```python
import pandas as pd
from sklearn.datasets import load_boston
import matplotlib.pyplot as plt
from upsetplot import UpSet

boston = load_boston()
boston_df = pd.DataFrame(boston.data, columns=boston.feature_names)

# speamanの相関係数が高いものを上から5つとってくる
correls = boston_df.corrwith(pd.Series(boston.target), method="spearman").sort_values()
top_features = correls.index[-5:]

# とってきた特徴量に対してmedianより高いものをTrue or Falseで取得
boston_above_avg = boston_df > boston_df.median(axis=0)
boston_above_avg = boston_above_avg[top_features]
boston_above_avg = boston_above_avg.rename(columns=lambda x: x + '>')

# True or Falseでとってきたものをmulti indexとして設定
boston_df = pd.concat((boston_df, boston_above_avg), axis=1)
boston_df = boston_df.set_index(list(boston_above_avg.columns))
boston_df = boston_df.assign(median_value=boston.target)

# 描画 add_catplot methodを使うことでupsetplotを拡張できる
upset = UpSet(boston_df, subset_size='count', intersection_plot_elements=3)
upset.add_catplot(value='median_value', kind='strip', color='blue')
upset.add_catplot(value='AGE', kind='strip', color='black')
upset.plot()
plt.show()
```

![upsetplot_ext_python](/images/upsetplot/upsetplot_ext_python.png)

### カテゴリのリストから Upset Plot を作成する

実際のデータ(RNA-seq の発現変動遺伝子 etc.,)などでは、カテゴリ列から集合関係を作成する事が多いです。そのため、カテゴリが含まれる集合から Upset Plot を作成する方法につていも記載しておきます。

カテゴリの集合をそれぞれ`category_n`として、3 つのカテゴリの集合について Upset Plot を作成します。

```python
import pandas as pd
import upsetplot

# listをpandas Seriesに変換し、初期値をTrueにする
category_1_df = pd.Series(index=category_1, data=[True]*len(category_1))
category_2_df = pd.Series(index=category_2, data=[True]*len(category_2))
category_3_df = pd.Series(index=category_3, data=[True]*len(category_3))

# それぞれのpandas Seriesを結合する。その際にTrueでない部分はNaNになるので、Falseで埋めておく。
upset_data = pd.concat((category_1_df, category_2_df, category_3_df), axis=1).fillna(False)

# 行名が0, 1, 2(int)になっているので、任意の名前に変更する
mapper = {0:"col_name1", 1:"col_name2", 2:"col_name3"}
upset_data = upset_data.rename(columns=mapper)

# upsetplot.plotメソッドを使うにはmulti indexがTrue or Falseで設定されている必要があるので、set_indexメソッドを使ってmulti indexを設定
upset_data = upset_data.set_index(list(upset_data.columns))
upsetplot.plot(upset_data, subset_size="count", show_counts="%d", sort_categories_by=None)
```

![md={6}:upsetplot_category_examples](/images/upsetplot/upsetplot_category_examples.png)

慣れてしまえばデータフレーム操作は簡単ですが、最初結構戸惑ったのでメモ代わりに残しておきます。最初に True で初期化するのが重要です。

## Reference

- [upsetplot Documentation](https://buildmedia.readthedocs.org/media/pdf/upsetplot/latest/upsetplot.pdf)
<!-- textlint-disable -->
- Alexander Lex, Nils Gehlenborg, Hendrik Strobelt, Romain Vuillemot, Hanspeter Pfister,UpSet: Visual-ization of Intersecting Sets, IEEE Transactions on Visualization and Computer Graphics (InfoVis ‘14), vol.20, no. 12, pp. 1983–1992, 2014. doi: doi.org/10.1109/TVCG.2014.2346248
<!-- textlint-disable -->
