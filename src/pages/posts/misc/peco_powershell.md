---
title: Windows(Powershell)でpecoを使ってみる (履歴のインクリメンタルサーチ)
description: Powershellでpecoを使って履歴をインクリメンタルサーチしてみます。
---

## TL;DR

Powershell 使うくらいなら WLS2 を使えという話はあります。とはいえ、Window を使うなら Powershell の環境は最低限整えておきたいです。また、WSL2 は外部 HDD なんかを使うと非常に遅くなってしまい、かなりストレスフルになるという問題もあります。自分の PC で開発しているとやはり容量は大きな問題となり、外部 HDD を使いたいこともあります。

peco は zsh とよく併用されていますが、Powershell でも使えるインクリメンタルサーチを簡易に実装できるツールです。`Ctrl + r`での履歴検索は標準のままだとやっぱり使いづらいので、まず履歴をインクリメンタルサーチできるようにします。

## peco のインストール

Chocolatey を使ってインストールします。管理者権限が必要なので、管理者権限つきの powershell を開く必要があります。

```powershell
choco install peco
```

## 履歴の表示

Powershell の入力履歴は`(Get-PSReadlineOption).HistorySavePath`で表示されるパスにあるテキストファイルに保存されています。なので、Powershell で履歴を得るには

```powershell
Get-Content (Get-PSReadlineOption).HistorySavePath | Select-Object -Unique
```

のようなことをすればよいです。また、コマンド履歴はユニークであってほしいので、`Select-Object -Unique`を使用しています。

## peco に流して選択結果を実行

得られた出力結果を実行するには`Invoke-Expression`を使います。

```powershell
Get-Content (Get-PSReadlineOption).HistorySavePath | Select-Object -Unique | peco | Invoke-Expression
```

ということで、実行する関数は

```powershell
function pecoHistory() {
    Get-Content (Get-PSReadlineOption).HistorySavePath | Select-Object -Unique | peco | Invoke-Expression
}
```

でいいですね。

## profile

Powershell の`.bashrc`みたいなやつです。

```powershell
echo $profile # pathの確認
notepad $profile # メモ帳で開く
```

みたいな感じでパスを確認したり、エディタで開いたりできます。

ここにさっきの関数を書き込んでおきます。これで、`pecoHistory`を使えばいい感じにインクリメンタルサーチができます。

### Keybind の登録

Powershell で Keybind を設定するには、`Set-PSReadLineKeyHandler`を使います。組み込み関数の場合は`-Function`以下に書けばいいんですが、自前のスクリプトを実行する場合は`-ScriptBlock`を使います。ScriptBlock 内では、登録した`pecoHistory`コマンドを入力させて、それを実行しています。

```powershell
Set-PSReadLineKeyHandler -Chord Ctrl+r -ScriptBlock {
    [Microsoft.PowerShell.PSConsoleReadLine]::RevertLine()
    [Microsoft.PowerShell.PSConsoleReadLine]::Insert("pecoHistory")
    [Microsoft.PowerShell.PSConsoleReadLine]::AcceptLine()
}
```

以上で`Ctrl + r`を使うことで Powershell でも履歴のインクリメンタルサーチができるようになります。

## 参考

- [【PowerShell】PsReadLine 設定のススメ](https://qiita.com/AWtnb/items/5551fcc762ed2ad92a81)
- [【PowerShell】peco を使った簡易ランチャ](https://qiita.com/AWtnb/items/d2842d86c5482832daa5)
- [PowerShell の入力履歴](https://www.vwnet.jp/Windows/w10/PSHistry.htm)
- [poco で捗る日常生活](https://krymtkts.github.io/posts/2019-07-28-have-a-good-day-with-poco)
- [Windows PowerShell Profiles](<https://docs.microsoft.com/en-us/previous-versions//bb613488(v=vs.85)?redirectedfrom=MSDN#understanding-the-profiles>)
- [Set-PSReadLineKeyHandler](https://docs.microsoft.com/ja-jp/powershell/module/psreadline/set-psreadlinekeyhandler?view=powershell-7.1)
- [peco](https://github.com/peco/peco)
