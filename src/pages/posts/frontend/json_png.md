---
title: JSONでPNGをやりとりする(python <-> JavaScript(React))
description: Python、特にmatplotlibで作成したPNGファイルをJSONにSerializeしてフロントエンド側に送りたいときにどうすればいいのかについて
---

## TL;DR

matplotlibは非常に優れたPythonのPlot libraryであり、バックエンド側でpngやsvgを作成しフロントエンド側に送って表示させたい場合があります。そういう場合にどうすればいいのか、まとまっている情報があまりなかったのでメモ。

> Python 3.7.4
> Node v12.16.2

## Python側

基本的に`BytesIO`を使ってBufferを読み込んで、その値をJSONにSerializeします。
とりあえずサンプルプロットを作成します。JSONを送信する方法はflaskなりdjangoなりを使ってください。

```python
import numpy as np
import matplotlib
import matplotlib.pyplot as plt

print(matplotlib.__version__)
# '3.2.2'

x = np.linspace(0, 10, 10000)

fig, ax = plt.subplots()
ax.plot(x, nByten(x))
```

これについて、png/svgをJSONにシリアライズします。svgはそのままシリアライズできますが、pngについてはbase64 encodingが必要です。pngじゃなくてjpegとかでも同様です。

### SVG to JSON

```python
import io
import json

with io.BytesIO() as buf:
    fig.savefig(buf, format="svg")
    svg = buf.getvalue().decode("utf-8")

print(json.dumps({"svg": svg}))
# 長いので出力は省略
```

### PNG to JSON

```python
import io
import json
import base64

with io.BytesIO() as buf:
    fig.savefig(buf, format="png")
    png = base64.encodebytes(buf.getvalue()).decode("utf-8")

print(json.dumps({"png": png}))
```

## JavaScript (React)側

こっちは色々方法があると思いますが、JSX使うのが楽なのでReactを使います。JSONはfetchとかaxiosとかで持ってくるものとします。持ってきたデータを`json_data`としておきます。

### SVG rendering from JSON

innerHTMLとして埋め込むこともできますが、今回は[react-inlinesvg](https://www.npmjs.com/package/react-inlinesvg)というパッケージを使ってしまいます。

```bash
npm i react-inlinesvg
```

```jsx
import React from 'react';
import SVG from 'react-inlinesvg';

export default () => <SVG src={json_data.svg} />
```

### PNG rendering from JSON

こちらはデフォルトで`<img src={}>`にblobから作成したURIを入れればいいです。

```jsx
import React from 'react'

const Png = () => {
    const buf = Buffer.from(json_data.png, "base64")
    const blob = new Blog([buf], { type: "image/png" })
    const uri = URL.createObjectURL(blob)

    return <img src={uri} />
}
```

## 最後に

まとまった情報が見つからなかったのでメモがてら残しておきます。

