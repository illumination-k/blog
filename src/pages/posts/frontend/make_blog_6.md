---
title: "next.jsで作ってみたブログにamp-sidebarを導入する"
description: "next.jsで作ってみたブログにtypescriptとmaterial-uiと一緒にamp-sidebarを導入してみた。"
---

## TL;DR

モバイルページでもサイドバーはやはりほしい。そして最近のはやりはfloating buttonみたいなやつを押すとサイドバーが開く、というものである...気がする。もちろん、`onClick`やらを使えばかんたんに実装できるのだが、ampに対応していると`onClick`は許されていない。

そういうときに使えるのが[amp-sidebar](https://amp.dev/ja/documentation/components/amp-sidebar/)である。しかし、Reactやnext.jsでamp-sidebarを導入している事例は少なく、material-uiやtypescriptと一緒にやっている例は見つからなかった。一応実装できたので、参考になる人がいることを祈って記事に残しておく。

## amp-sidebar

普段は隠れていて、ボタンを押すと表示され、サイドバー以外の部分を押すと閉じる、という機能がデフォルトで実装されている。
とりあえず公式の例を見てみる。

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>
</amp-sidebar>

<button class="hamburger" on='tap:sidebar1.toggle'></button>
```

基本的には、`amp-sidebar`で`id`を指定し、buttonの`on`に`tap:{id}.toggle`をつければ、そのボタンで開閉ができるようになる。この`toggle`の部分は他にも可能で

|action|desc|
|---|---|
|open (default)|サイドバーを開く|
|close|サイドバーを閉じる|
|toggle|サイドバーを開閉する|

の3つが使える。基本的にtoggleでいい気がする。

なので、

```js
<amp-sidebar id="sidebar1">{children}</amp-sidebar>
<button on="tap:sidebar1.toggle">toggle</button>
```

のようなjsxを書けばいいことがわかる。

しかし、buttonにon属性はないので、Typescriptを使う場合は`on`を型定義する必要があることに注意が必要（ts-ignoreでもいいかもしれないが...）。

## Float Button

こちらは簡単で[@material-ui/core/Fab](https://material-ui.com/components/floating-action-button/)を使えばOK。ただ、このままだと場所が固定されておらず、onが定義されていないのでそのへんを定義する必要がある。

まず型定義は基本的に同じところからexportされている`xxxProps`というものを使う。今回の場合は`FabProps`を`Fab`と一緒にimportする。

```ts:title=AmpFab.tsx
import React from "react";

import Fab, { FabProps } from "@material-ui/core/Fab";

interface AmpOnProps {
  on: string;
}

type Props = FabProps & AmpOnProps;

const AmpFab: React.FC<Props> = (props) => {
  return <Fab {...props} />;
};

export default AmpFab;
```
