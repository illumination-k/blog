---
title: 包除原理に関するメモ
description: 包除原理とその実装に関するメモ
---

## TL;DR

自分なりに包除原理について整理しておきたかったのでメモを書きます。正確な情報は文献抄を見たほうがいいです。

## 文献抄

- [包除原理の２通りの証明](https://manabitimes.jp/math/611)
- [包除原理の意味と証明](http://www.mathlion.jp/article/ar094.html)
- [包除原理](https://satanic0258.hatenablog.com/entry/2016/04/10/104524)
- [組合せ論](https://www.ci.seikei.ac.jp/yamamoto/lecture/combinatorics/text.pdf)

## 包除原理

`intersection`から`union`に変換する公式。

$$
\begin{aligned}
|A_1 \cup A_2 \cup A_3 ... A_{n-1} \cup A_n| &= \sum_{i=1}^n|A_i| \\
&+ (-1)^{1}\sum_{1 \leq i \leq j \leq n}|A_i \cap A_j| \\
&+ (-1)^{2}\sum_{1 \leq i \leq j \leq k \leq n}|A_i \cap A_j \cap A_k| \\
&... \\
&+ (-1)^{n-1}|A_1 \cap A_2...\cap A_n| \\
&= \sum_{i=1}^n(-1)^{i-1}\sum_{1\leq j_1\leq j_2 ...\leq j_i \leq n}|A_{j_1} \cap A_{j_2} \cap ... \cap A_{j_i}|
\end{aligned}
$$

ただし、$|A_i|$は集合`i`の要素数。

## 証明

**正直自信がないです**

$|A_1 \cup A_2 \cup A_3 ... A_{n-1} \cup A_n|$に属する任意の要素$x$について考えます。左辺では、要素$x$は1回のみ数え上げられます。

そこで、右辺では要素$x$はプラスマイナスを考慮して、$|A_{j_1} \cap A_{j_2} ... \cap A_{j_i}|$において何回数え上げられたかを考えます。$x$を含む集合の数を$k$とし、$x$を含む集合を$A_i (i \in k)$とします。$x$を含まない集合では、カウントが行われないので考えないものとします。

$A_i (i\in k)$においてカウントされる数は$_kC_1$です。ある2つの集合$A_i \cap A_j (i,j \in k)$においてカウントされる数は$_kC_2$です。同様にして$x$を含む$r$個の積集合の組み合わせの中で$x$がカウントされる数は$_kC_r$です。プラスマイナスを考慮すると

$$
\sum_{r=1}^{k}(-1)^{r-1} \space _kC_r
$$

とかけます。一方、二項定理より

$$
\begin{aligned}
    0 &= (1 - 1)^k \\
    &= \sum_{r=0}^{k} \space _kC_r (-1)^r \\
    &= 1 - \sum_{r=1}^{k} \space _kC_r (-1)^{r-1}
\end{aligned}
$$

となるので、任意の要素$x$のカウント回数は左辺と右辺で等しいことが言えます。よって、成り立つはずです。

## 実装

これをメモしたかった。
`bit`全探索を使って書けます。

100以下の`2, 3, 5`の倍数について考えます。

```rust
fn main() {
    let nums = vec![2, 3, 5];
    let counter = 0;

    for bit in 0..1<<nums.len() {
        // 2進数のときの1の数をカウント
        let popcount = bit.count_ones();
        let mul = 1;

        for i in 0..nums.len() {
            if bit & 1 << nums.len() {
                mul *= nums[i]
            }
        }

        if mul == 1 { continue; }

        if popcount % 2 == 1 {
            counter += 100 / mul;
        } else {
            counter -= 100 / mul; 
        }
    }

    println!("{}", counter)
}
```

倍数性がわかるので、素因数分解すれば互いに素な数を数え上げるのとかにも使えます。