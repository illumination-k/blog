---
title: Next.jsで作ったブログをAMPとPWAに対応させる
description: Next.jsで作ったAMPオンリーのブログをPWAにも対応させてみた。
---

## TL;DR

Next.jsのPWA対応というと[next-offline]()とか[next-pwa]()が有名かと思います。しかし、AMPページのキャッシュはこれらがデフォルトで対応していないので、自前でやる必要があります。自分はこの2つのパッケージを使って色々やってて永遠にPWA対応できなかったので、AMPと同時に対応しようとしている人は注意が必要です。

とはいえ、やることは[example/amp-first]()をコピペするだけなのですが...。

## publicフォルダの準備

### manifest.json

まず、manifest.jsonを用意します。何で用意してもいいですが、必要なものとして以下が挙げられます([参考](https://web.dev/installable-manifest/?utm_source=lighthouse&utm_medium=lr))。iconとか用意するのはめんどうなので、[]()を使いました。

- `start_url`
- `name` or `shortname`
- `icons` (192 - 512 px)
- `display`

```json

```

### apple touch icon

[ここ](https://web.dev/apple-touch-icon/?utm_source=lighthouse&utm_medium=lr)を見てもらったほうが早いですが、PWA対応したいページのヘッダーに

```jsx
<link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
```

を加えておきます。アイコンのサイズは192\*192か180\*180である必要があります。