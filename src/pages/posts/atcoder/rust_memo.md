---
title: rust memo
description: rustで覚えておきたいことのメモ
---

## TL;DR

rustで覚えておきたいことのメモ

## Order

真面目にOrderが見たいときは`std::cmp::Ordering`を使うと見やすい。`String`の辞書順とかでも使える。Floatには使えない。

```rust
let ord: std::cmp::Ordering = 5.cmp(&10);
assert_eq!(ord, std::cmp::Ordering::Less)
```

## min, max of float

Ordが実装されていないので、`std::cmp::max`とかはだめ。

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
