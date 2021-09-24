---
title: Rust Tips
description: rustで覚えておきたいことのメモ
---

## TL;DR

rust で覚えておきたいことのメモ

## Order

真面目に Order が見たいときは`std::cmp::Ordering`を使うと見やすい。`String`の辞書順とかでも使える。Float には使えない。

```rust
let ord: std::cmp::Ordering = 5.cmp(&10);
assert_eq!(ord, std::cmp::Ordering::Less)
```

## min, max of float

Ord が実装されていないので、`std::cmp::max`とかはだめ。

```rust
let min: f64 = 1.0.max(0.0)
```

## cumsum

```rust
use itertools_num::ItertoolsNum as _;

let x = vec![1, 2, 3];
let cumsum = std::iter::once(&0).chain(&x).cumsum().collect::<Vec<usize>>();

assert_eq!(cumsum, vec![0, 1, 3, 6])
```

## std::vec の binary_search

普通に便利なんだけど、同じ値が含まれていた場合、match そのものは値全部にできるのだが、返ってくる値は最大の index を返す。なので、lower_bound がしたいときは[superslice](https://docs.rs/superslice/1.0.0/superslice/)を使ったほうがよさそう。もしくは自分で書くか。

以下 docs の引用。

> If the value is found then Result::Ok is returned, containing the index of the matching element. If there are multiple matches, then any one of the matches could be returned. If the value is not found then Result::Err is returned, containing the index where a matching element could be inserted while maintaining sorted order.

```rust
let s = [0, 1, 1, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

assert_eq!(s.binary_search(&13),  Ok(9));
assert_eq!(s.binary_search(&4),   Err(7));
assert_eq!(s.binary_search(&100), Err(13));
let r = s.binary_search(&1);
assert!(match r { Ok(1..=4) => true, _ => false, }); // < ここをみるとrangeでmatchさせることはできる。
```

雑にテストしてみると、atcoder の version(1.42.0)では、`i`は 4 を返す。これは version ごとにも挙動が違うらしい。rust コミュニティでも[議論](https://github.com/rust-lang/rfcs/issues/2184)はされているようなんだけど、いつ実装されるのかは不明。

```rust
fn main() {
    let s = [0, 1, 1, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

    match s.binary_search(&1) {
        Ok(i) => { dbg!(i); },
        Err(i) => { dbg!(i); }
    };
}
```

なので、upper_bound したければ下記の感じでできるはず。まあおとなしく自分で書いたほうがいい気がします。

```rust
fn upper_bound(x: &usize, s: Vec<usize>) -> usize {
    match s.binary_search(x) {
        Ok(i) => i+1,
        Err(i) => i
    }
}
```
