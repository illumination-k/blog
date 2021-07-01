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

<AtCoderLog title="ABC097-A" submissions={[`16274915`]}></AtCoderLog>
<AtCoderLog title="ABC097-B" submissions={[`15221946`]}>

素因数分解して、素因数の数が1のものがあったらアウト。

</AtCoderLog>

<AtCoderLog title="ABC097-C" submissions={[`17903880`, `16402498`]}>

小さい方から見ればよく$K <= 5$なので、明らかに長さ5以下のsubstring（部分文字列）のみを見れば良い。

</AtCoderLog>

<AtCoderLog title="ABC097-D" submissions={[`16403192`]}>

swapできる対象をエッジとするグラフだと考えると、同じ連結成分に属していればそのindex同士は交換可能になる。union-findで正しい場所にある値同士が交換可能かどうか判定していけば答えは求まる。

memberに属しているかどうかを判定したくてmemberメソッドみたいなのを作成したが明らかに遅いのでデバッグ以外に使うことはなさそう。基本的にこれを使いそうになったらeqivを使うことを考えるべき。

これABC177-Dと対して難易度変わらない気がするんだけど水色...？

</AtCoderLog>

