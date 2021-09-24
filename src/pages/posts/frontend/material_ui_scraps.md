---
title: material-uiに関するスクラップ
description: material-uiに関するスクラップ
---

## 右揃えの要素を作る

`flexGrow: 1`とした要素を挿入する。

```jsx
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";

const Header = () => {
  return (
    <div styles={{ flexGrow: 1 }}>
      <AppBar>
        <Button>Left Button</Button>
        <strong>title</strong>
        <div styles={{ flexGrow: 1 }} />
        <Button>Right Button</Button>
      </AppBar>
    </div>
  );
};
```

- [React の Material-UI で、右揃えの要素を作るには](https://kanchi0914.netlify.app/2020/03/12/react-spacer/)

## Grid 間の高さを揃える

`height: 100%`を使う。

- [Material-UI の「Data Grid」で高さを自動設定する](https://tech-it.r-net.info/program/react/309/)

## Material-UI 4 -> 5 の migration

```bash
yarn add @mui/material @mui/styles @mui/lab @mui/icons-material @emotion/react @emotion/styled

# If you use next,
yarn add @emotion/server

npx @mui/codemod v5.0.0/preset-safe .
```

で基本的には置換される。エラーは起きなくなるが、推奨されていないものが残ったりはするので適宜修正していく。`Next.js`の場合は、
