---
title: JSONで画像をやりとりする python <-> JavaScript(React)
description: Python、特にmatplotlibで作成したPNGファイルをJSONにSerializeしてフロントエンド側に送りたいときにどうすればいいのかについて
---

## TL;DR

matplotlib は非常に優れた Python の Plot library であり、バックエンド側で png や svg を作成しフロントエンド側に送って表示させたい場合があります。そういう場合にどうすればいいのか、まとまっている情報があまりなかったのでメモ。

> Python 3.7.4
> Node v12.16.2

## Python 側

基本的に`BytesIO`を使って Buffer を読み込んで、その値を JSON に Serialize します。
とりあえずサンプルプロットを作成します。JSON を送信する方法は flask なり django なりを使ってください。

```python
import numpy as np
import matplotlib
import matplotlib.pyplot as plt

print(matplotlib.__version__)
# '3.2.2'

x = np.linspace(0, 10, 10000)

fig, ax = plt.subplots()
ax.plot(x, np.sin(x))
```

これについて、png/svg を JSON にシリアライズします。svg はそのままシリアライズできますが、png については base64 encoding が必要です。png じゃなくて jpeg とかでも同様です。

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

こっちは色々方法があると思いますが、JSX 使うのが楽なので React を使います。JSON は fetch とか axios とかで持ってくるものとします。持ってきたデータを`json_data`としておきます。

### SVG rendering from JSON

innerHTML として埋め込むこともできますが、今回は[react-inlinesvg](https://www.npmjs.com/package/react-inlinesvg)というパッケージを使ってしまいます。props で受け渡されていることにしましょう。

```bash
npm i react-inlinesvg
```

```jsx
import React from "react";
import SVG from "react-inlinesvg";

const Svg = ({ json_data }) => {
  return <SVG src={json_data.svg} />;
};
```

### PNG rendering from JSON

こちらはデフォルトで`<img src={}>`に blob から作成した URI を入れればいいです。

```jsx
import React from "react";

const Png = ({ json_data }) => {
  const buf = Buffer.from(json_data.png, "base64");
  const blob = new Blob([buf], { type: "image/png" });
  const uri = URL.createObjectURL(blob);

  return <img src={uri} />;
};
```

## 最後に

まとまった情報が見つからなかったのでメモがてら残しておきます。
