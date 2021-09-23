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
        <div styles={{flexGrow: 1}}>
            <AppBar>
            <Button>Left Button</Button>
            <strong>title</strong>
            <div styles={{flexGrow: 1}} />
            <Button>Right Button</Button>
            </AppBar>
        </div>
        
    )
}
```

- [ReactのMaterial-UIで、右揃えの要素を作るには](https://kanchi0914.netlify.app/2020/03/12/react-spacer/)

## Grid間の高さを揃える

`height: 100%`を使う。

- [Material-UIの「Data Grid」で高さを自動設定する](https://tech-it.r-net.info/program/react/309/)