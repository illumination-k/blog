---
title: RustでDFSとDFS木
description: rustで木上のDFSとDFS木
---

## TL;DR

先日あった ABC187 で大敗したわけですが、E 問題解くときに方針としてはこれでも解けるんじゃないかなと思ったのが DFS 木で、本番中には実装できなかったですが、後で AC できました。ただ、実装思ったより詰まったので記事にしておきます。実装力がほしい。

## DFS 木

木のノードのインデックスを DFS の探索順に振り直したものが DFS 木です。ただの無向グラフとかを扱う場合でも有用な手段らしいです。理解が足りてないので理解できてきたら書きたい。今回は木上でやるので、後退辺が出現しません。

今回は部分木への RAQ をするために使います。実際にはセグメント木とかにのせればもっと色んな処理に使えそう。代替[このスライド](https://www.slideshare.net/Proktmr/ss-138534092)を参考にさせていただきました

## 木上での DFS

まあ木に限る必要は特にないんですが、木上で DFS するところから始めます。graph は隣接リスト形式で持つものとします。

```rust
use proconio::{input, fastout};

fn dfs(start: usize, graph: &Vec<Vec<usize>>, seen: &mut Vec<bool>) {
    if seen[start] { return; }
    seen[start] = true;

    println!("{}", start);

    for i in 0..graph[start].len() {
        dfs(graph[start][i], graph, seen)
    }
}

#[fastout]
fn main() {
    input!{
        n: usize,
        ab: [(usize, usize); n-1]
    }

    let mut graph = vec![vec![]; n];

    for &(a, b) in ab.iter() {
        graph[a-1].push(b-1);
        graph[b-1].push(a-1);
    }
    let mut seen = vec![false; n];
    dfs(0, &graph, &mut seen);
}
```

input/output はこうなります。まあただの DFS です。

```
#input
7
2 1
2 3
4 2
4 5
6 1
3 7

#output
0
1
2
6
3
4
5
```

うまくいけてるらしいです。

## DFS 木の構築

DFS 木にするためには、DFS の探索回数を記録していけばいいです。DFS のスタート地点を根とした DFS 木を構築します。  
また、後々のためにもともとの index から DFS 木への index と DFS 木の index からもともとの index への対応関係を記録しておけばいいです。そのへんを扱うには構造体にしといたほうが楽なので構造体にします。

```rust
#[derive(Debug, Clone)]
struct DfsTree {
    graph: Vec<Vec<usize>>,
    tree_index_to_dfs_index: Vec<usize>,
    dfs_index_to_tree_index: Vec<usize>,
    cnt: usize
}

impl DfsTree {
    fn new(graph: Vec<Vec<usize>>) -> Self {
        let n = graph.len();
        Self {
            graph,
            tree_index_to_dfs_index: vec![0; n],
            dfs_index_to_tree_index: vec![0; n],
            cnt: 0,
        }
    }

    pub fn build(&mut self, root: usize) {
        let mut seen = vec![false; self.graph.len()];
        self.dfs(root, &self.graph.clone(), &mut seen);
    }

    fn dfs(&mut self, v: usize, graph: &Vec<Vec<usize>>, seen: &mut Vec<bool>) {
        if seen[v] { return; }

        seen[v] = true;
        let dfs_ord = self.cnt;
        self.tree_index_to_dfs_index[v] = dfs_ord;
        self.dfs_index_to_tree_index[dfs_ord] = v;
        self.cnt += 1;

        for i in 0..graph[v].len() {
            self.dfs(graph[v][i], graph, seen);
        }
    }
}

#[fastout]
fn main() {
    input!{
        n: usize,
        ab: [(usize, usize); n-1]
    }

    let mut graph = vec![vec![]; n];

    for &(a, b) in ab.iter() {
        graph[a-1].push(b-1);
        graph[b-1].push(a-1);
    }
    let mut seen = vec![false; n];
    let mut dfs_tree = DfsTree::new(graph);
    dfs_tree.build(0);

    println!("{:?}", dfs_tree.tree_index_to_dfs_index)
}
```

input は同じなので、output だけ載せます。`tree_index_to_dfs_index[i]`はもともとの index が DFS 木で何番目になっているかを示しています。

```
[0, 1, 2, 4, 5, 6, 3]
```

## 部分木を取得するために

部分木を取得するためには、あるノード v (v は DFS 木のインデックスです) について、その子孫の DFS が終了したタイミングを`pos[v]`として保存する必要があります。v を根とする部分木は`[v, pos[v])`の半開区間で表すことができます。あるノード v の探索が終わるタイミングは、再帰関数の中の`for`文を抜けたところです。

```rust
use proconio::{input, fastout};

#[derive(Debug, Clone)]
struct DfsTree {
    graph: Vec<Vec<usize>>,
    tree_index_to_dfs_index: Vec<usize>,
    dfs_index_to_tree_index: Vec<usize>,
    pos: Vec<usize>,
    cnt: usize
}

impl DfsTree {
    fn new(graph: Vec<Vec<usize>>) -> Self {
        let n = graph.len();
        Self {
            graph,
            tree_index_to_dfs_index: vec![0; n],
            dfs_index_to_tree_index: vec![0; n],
            pos: vec![0; n],
            cnt: 0,
        }
    }

    pub fn build(&mut self, root: usize) {
        let mut seen = vec![false; self.graph.len()];
        self.dfs(root, &self.graph.clone(), &mut seen);
    }

    fn dfs(&mut self, v: usize, graph: &Vec<Vec<usize>>, seen: &mut Vec<bool>) {
        if seen[v] { return; }

        seen[v] = true;
        let dfs_ord = self.cnt;
        self.tree_index_to_dfs_index[v] = dfs_ord;
        self.dfs_index_to_tree_index[dfs_ord] = v;
        self.cnt += 1;

        for i in 0..graph[v].len() {
            self.dfs(graph[v][i], graph, seen);
        }

        // 底まで見た
        self.pos[dfs_ord] = self.cnt;
    }

    pub fn dfs_index(&self, tree_index: usize) -> usize {
        self.tree_index_to_dfs_index[tree_index]
    }

    pub fn tree_index(&self, dfs_index: usize) -> usize {
        self.dfs_index_to_tree_index[dfs_index]
    }

    pub fn pos(&self, dfs_index: usize) -> usize {
        self.pos[dfs_index]
    }

    pub fn subtree_range(&self, dfs_index: usize) -> (usize, usize) {
        (dfs_index, self.pos[dfs_index])
    }
}
#[fastout]
fn main() {
    input!{
        n: usize,
        ab: [(usize, usize); n-1]
    }

    let mut graph = vec![vec![]; n];

    for &(a, b) in ab.iter() {
        graph[a-1].push(b-1);
        graph[b-1].push(a-1);
    }
    let mut seen = vec![false; n];
    let mut dfs_tree = DfsTree::new(graph);
    dfs_tree.build(0);

    println!("{:?}", dfs_tree.pos)
}
```

output は以下になります。

```
[7, 6, 4, 4, 6, 6, 7]
```

実際にうまく記録できてそうです。
この構造体を使えば`subtree`の範囲も簡単にゲットできます。

## 実用例

## ABC187-E

この問題は部分木に対して x を加算するか、全体に対して x を加算したあと部分木に対して-x する問題に帰着されます。ここまでは割とわかりやすくて、実装どうするのかってのがきっと問題だったんでしょう。

DFS 木を使えば、部分木の index は連続になっているので、一次元配列に対する imos 法が使えて、最後に累積させたものを、もともとの index に戻すことで実現できます。

> [提出](https://atcoder.jp/contests/abc187/submissions/19171880)

最初は euler tour とか調べて迷走していたのですが、それでもできそうな気がするのでまた調べたいですね。また、公式放送でやってた木に対する imosDFS みたいなのも理解しておきたいです。

### ABC138-D

これも部分木への加算と考えれば同じ様に解くことができる。ただし想定解のほうが楽そう。

> [提出](https://atcoder.jp/contests/abc138/submissions/19228859)

## 参考

- [図と実装で理解する『木構造入門』](https://www.slideshare.net/Proktmr/ss-138534092)
