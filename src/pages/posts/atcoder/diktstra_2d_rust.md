---
title: 平面上でのダイクトストラ (rust)
description: 二次元平面上でダイクトストラやりたいってときのための覚書
---

## TL;DR

迷路を解くような問題で、障害物の数だったり、なんか特殊な処理するときだけ数える、みたいなやつはダイクトストラを使えば解けるらしい。

## 考え方

プライオリティキュー(BinaryHeap)は、最大値のものから取り出されていくので、数えたい処理のときはマイナスの値にしてプライオリティキューに入れていけば、値が大きいものほど取り出されなくなる。BFSのときと同じようにdistを作っておいて、最初にdistの(x, y)に訪れたときに取り出されたものにマイナスをかけてdistに格納しておけば、distの(x, y)はその時点での最小値になる。なので、何らかの特殊な処理をした値の数を保存することができる。0-1BFSのようなものっぽい(0-1BFSがわかってない)。

## 前提

```rust
#![allow(non_snake_case)]
#![allow(unused_imports)]
#![allow(dead_code)]

use proconio::{input, fastout};
use proconio::marker::*;
use whiteread::parse_line;
use std::collections::*;
use num::*;
use num_traits::*;
use superslice::*;
use std::ops::*;

use itertools::Itertools;
use itertools_num::ItertoolsNum;
```

## 例1: ARC005 C - 器物損壊！高橋君

[問題ページ](https://atcoder.jp/contests/arc005/tasks/arc005_3)

スタートからゴールまでに"#"にあたる回数を数えて、ゴール時点で回数が2以下ならYES、そうじゃなければNO。

```rust
#[fastout]
fn main() {
    input!{
        h: usize, w: usize,
        graph: [Chars; h],
    }

    let mut start = (0, 0);
    let mut goal = (0, 0);

    for x in 0..w {
        for y in 0..h {
            if graph[y][x] == 's' {
                start = (x, y)
            } else if graph[y][x] == 'g' {
                goal = (x, y)
            }
        }
    }

    let mut dist = vec![vec![-1; w]; h];
    let mut pq = BinaryHeap::new();

    pq.push((0, start));

    let directions = vec![(0, 1), (1, 0), (-1, 0), (0, -1)];
    while let Some((dep, (x, y))) = pq.pop() {
        let dep = -dep;
        if dist[y][x] >= 0 { continue; }

        dist[y][x] = dep;

        for &(dx, dy) in directions.iter() {
            let cx = x as isize + dx;
            let cy = y as isize + dy;

            if cx < 0 || cy < 0 || cx >= w as isize || cy >= h as isize { continue; }
            let cxu = cx as usize;
            let cyu = cy as usize;

            if graph[cyu][cxu] == '#' {
                pq.push((-(dep+1), (cxu, cyu)))
            } else {
                pq.push((-dep, (cxu, cyu)))
            }
        }
    }

    if dist[goal.1][goal.0] <= 2 {
        println!("YES")
    } else {
        println!("NO)
    }
}
```

## 例2: A - Range Flip Find Route

[問題ページ](https://atcoder.jp/contests/agc043/tasks/agc043_a)

DPのほうが楽らしい。探索するときに、白から黒、もしくは黒から白に切り替わる数を数えたい。つまり、前回の値と違う数になる場合の数の最小値を求めたい。

```rust
#[fastout]
fn main() {
    input!{
        h: usize, w: usize,
        s: [Chars; h]
    }
    let vect = vec![(0, 1), (1, 0)];
    let mut pq = BinaryHeap::new();
    if s[0][0] == '.' { pq.push((0, (0, 0)))} else {pq.push((-1, (0, 0)))};
    let mut d = vec![vec![-1; w]; h];
 
    while let Some((dep, (x, y))) = pq.pop() {
        let dep = -dep;

        if d[y][x] >= 0 {
            continue;
        }
 
        d[y][x] = dep;
 
        for &(dx, dy) in vect.iter() {
            let cx = x as i64 + dx;
            let cy = y as i64 + dy;
            if cx >= 0 && cx < w as i64 && cy >= 0 && cy < h as i64 {
                let (cyu, cxu) = (cy as usize, cx as usize);
                if d[cyu][cxu] < 0 {
                    if s[cyu][cxu] == s[y][x] {
                        pq.push((-dep, (cxu, cyu)))
                    } else {
                        pq.push((-(dep+1), (cxu, cyu)))
                    }
                }
            }
        }
    }
 
    println!("{}", (d[h-1][w-1]+1)/2)
}
```

## 追記欄

見つけたら解答を書いていく。