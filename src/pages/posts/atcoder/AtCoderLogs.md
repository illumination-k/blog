---
title: "AtCoderLogs"
description: "Atcoder練習帳"
layout:
    path: "@components/BlogPostLayout"
    component: BlogPostLayout
import:
    - component: "AtCoderLog"
      path: "@components/AtCoderLog"
---

## AtCoder Logs

<AtCoderLog title="ABC097-C" submissions={[`17903880`, `16402498`]}>

小さい方から見ればよく$K <= 5$なので、明らかに長さ5以下のsubstring（部分文字列）のみを見れば良い。

</AtCoderLog>

<AtCoderLog title="ABC097-D" submissions={[`16403192`]}>

swapできる対象をエッジとするグラフだと考えると、同じ連結成分に属していればそのindex同士は交換可能になる。union-findで正しい場所にある値同士が交換可能かどうか判定していけば答えは求まる。

memberに属しているかどうかを判定したくてmemberメソッドみたいなのを作成したが明らかに遅いのでデバッグ以外に使うことはなさそう。基本的にこれを使いそうになったらeqivを使うことを考えるべき。

これABC177-Dと対して難易度変わらない気がするんだけど水色...？

</AtCoderLog>

<AtCoderLog title="ABC204-D" submissions={[`24449140`]}>

貪欲法を考えてだめだったやつ。DPに帰着できる。オーブンの分け方を全通り試すのは計算量的に無理。

それぞれのオーブンでかかる時間をA, Bとすると求めたいものは$Max(A, B)$の最小値。オーブンは交換可能なので、$A \leq B$としてよい。なので、$B$を最小化することが目的になった。

$S = \sum_{i=0}^{n} T[i]$のときに、$B = S - A$なので、$A \leq S - A$。このとき、$S - A$を最小化したい。最小化するには$A$が$A \leq \frac{S}{2}$の範囲内でできるだけ大きければいい。

[0, S/2]の範囲で取りうる部分和はDPを用いて計算することができるので、答えが求まった。

</AtCoderLog>

