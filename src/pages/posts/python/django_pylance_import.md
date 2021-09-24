---
title: DjangoでPylanceがimportを解決しない問題の対処法
description: Pylanceは非常に優れたコーディング支援拡張機能ですが、importがよく解決されなくて困っていました。小規模開発のときはまあいいか、と思ったりするのですが、djangoとかで解決されないと結構手間なので、解決法を調べたら解決したので書いておきます。
---

## TL; DR

Pylance は非常に優れたコーディング支援拡張機能ですが、import がよく解決されなくて困っていました。小規模開発のときはまあいいか、と思ったりするのですが、django とかで解決されないと結構手間なので、解決法を調べたら解決したので書いておきます。

## 状況

### ディレクトリ構成

app が増えてくると、分割したくなります。よく作るのはこんな感じです。

```
app
├── app1
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── migrations
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── app2
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── migrations
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── config
│   ├── __init__.py
|   ...
└── manage.py
```

### 問題点

`app1`で定義したモデルを`app2`で使いたい、ということがよくあります。

例えば、`app2`の`view.py`で`app1`のモデルを使いたいとします。

単純には、こうすればいいです。

```python
from app1 import models
```

しかし、これだと Pylance の補完が効かず`Import "app1" could not be resolved`という警告が表示されます。

じゃあ相対インポートにすれば解決するかな、と考えます。

```python
from ..app1 import models
```

Pylance は警告を出さなくなります。補完も効きます。

しかし、いざ django を起動させようとすると`ValueError: attempted relative import beyond top-level package`が起こります。

`sys.path`を使う方法もありますが、毎回書くのは嫌です。

## 解決策

コード側で解決する方法は調べてもわかりませんでした。そこで、Pylance 側の設定をどうにかすることで強引な解決を図りました。[Pylance のトラブルシューティング](https://github.com/microsoft/pylance-release/blob/main/TROUBLESHOOTING.md#unresolved-import-warnings)を読むと、**Unresolved import wanings**という項目があります。

これによると`.vscode/settings.json`の`python.analysis.extraPaths`を設定すればいいらしいです。

以下のような設定を作成します。

```json:title=".vscode/settings.json"
{
    "python.analysis.extraPaths": ["./app"]
}
```

もう一度

```python
from app1 import models
```

を試してみると、今度は警告が表示されず、補完も効くようになりました。
