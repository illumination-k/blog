---
title: next.config.jsで設定することのまとめ
description: next.jsを使っているとnext.config.jsを使って設定をカスタマイズすることが多いです。next.config.jsで設定できることと、その設定の仕方についてまとめておきます。
---

## TL;DR

next.jsを使っているとnext.config.jsを使って設定をカスタマイズすることが多いです。next.config.jsで設定できることと、その設定の仕方についてまとめておきます。

## 基本

```javascript:title=next.config.js
module.exports = {}
```

のようにconfigをオブジェクト形式でエクスポートする。

## redirect

リダイレクトの設定をかける。`redirects`関数を定義して、設定を書いた配列を返す。

```javascript:title=next.config.js
module.exports = {
    async redirects() {
        return [
            {
                source: "/test",
                destination: "/",
                permanent: true,
            }
        ]
    }
}
```

## webpack

webpackの`webpack.config.js`的な話ができる。`config`が`webpack`の`config`オブジェクトのような感じ。

`Next.js`のversionを`11.0.0`にすると`webpack5`が基本的に使われるようになる。この辺は`webpack5`に真偽値を入れることで設定できる。

```javascript:title=next.config.js
module.export = {
    webpack(config, options) {
      config.resolve.alias['@component'] = path.join(__dirname, "component");
      config.resolve.alias['@libs'] = path.join(__dirname, "libs");
      config.resolve.fallback = {"fs": false};
      return config
    },

    webpack5: true,
}
```

webpack5にしたときに、

```
error - ./node_modules/fs.realpath/index.js:8:0
Module not found: Can't resolve 'fs'
```

っていうのが出て困っていたけど、[このissue](https://github.com/webpack-contrib/css-loader/issues/447#issuecomment-761853289)のとおりに

```js
module.exports = {
    ...
    resolve: {
        fallback: {
            "fs": false
        },
    }
}
```

にしたら治った。TODOとして意味を調べる必要がある。