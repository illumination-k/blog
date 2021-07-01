---
title: bashのPermission関連についてのまとめ
description: bashのPermission関連について、すぐ忘れてしまうのでまとめておきます。
---

## TL;DR

bashのpermission関連について、すぐ忘れてしまうのでまとめておきます。

## Permissionの基本

`ls -l`コマンドで見れる。

よく見るのは以下のような出力

```bash
#|u||g||a|
-rwxrwxrwx
drwxrwx---
|rw-rw----
```

## 1文字目

そのファイルの種類を示している。

|記号|意味|
|---|---|
|-|ファイル|
|d|ディレクトリ|
|\||シンボリックリンク|

## それ以外

ファイル種別以外の部分は、それぞれの範囲でどのパーミッションがあるのかを示している。

|範囲|意味|
|---|---|
|[2, 4]|所有者の権限|
|[5, 7]|所有グループの権限|
|[8, 10]|その他|

### パーミッション記号の意味

|記号|意味|
|:---:|---|
|`r`|読み取り権限|
|`w`|書き込み権限|
|`x`|実行権限|
|`s`|SUIDかSGID|
|`t`|スティッキービート|

- `SUID (Set User ID)`: 指定したユーザーの権限でファイルが実行される。
- `SGID (Set Group ID)`: 指定したグループの権限でファイルが実行される。ディレクトリ内部で作成されたファイルはすべてディレクトリのSGIDで指定したグループが割り当てられる。
- `スティッキービート`: 自身のファイル以外の削除を行えない。ただし書き込みは行える。

## 権限の変更 chmod

```bash
chmod --help
# Usage: chmod [OPTION]... MODE[,MODE]... FILE...
#   or:  chmod [OPTION]... OCTAL-MODE FILE...
#   or:  chmod [OPTION]... --reference=RFILE FILE...
# Change the mode of each FILE to MODE.
# With --reference, change the mode of each FILE to that of RFILE.
# 
#   -c, --changes          like verbose but report only when a change is made
#   -f, --silent, --quiet  suppress most error messages
#   -v, --verbose          output a diagnostic for every file processed
#       --no-preserve-root  do not treat '/' specially (the default)
#       --preserve-root    fail to operate recursively on '/'
#       --reference=RFILE  use RFILE's mode instead of MODE values
#   -R, --recursive        change files and directories recursively
#       --help     display this help and exit
#       --version  output version information and exit
# 
# Each MODE is of the form '[ugoa]*([-+=]([rwxXst]*|[ugo]))+|[-+=][0-7]+'.
# 
# GNU coreutils online help: <http://www.gnu.org/software/coreutils/>
# Full documentation at: <http://www.gnu.org/software/coreutils/chmod>
# or available locally via: info '(coreutils) chmod invocation'
```

### permissionの指定の仕方

#### 1. 数字で指定

それぞれの権限には値が割り当てられている。その数字の和を指定することで権限を設定できる。基本的に3桁の数字で指定して、1桁目が所有者、2桁目がグループ、3桁目がその他のパーミッションの設定となる。

|権限|値|
|---|---|
|読み取り権限 (r)|4|
|書き込み権限 (w)|2|
|実行権限 (x)|1|

**例**

- `-rwxrw-r--`: `chmod 764 file`
- `-rwxrwxrxw`: `chmod 777 file`
- `-rw-rw----`: `chmod 660 file`

また、SUID、SGID、スティッキービートを指定する場合は少し特殊で、4桁の数字を使って指定することになる。この場合、1桁目がSUID、SGID、スティッキービートのどれかの値、2桁目が所有者、3桁目がグループ、4桁目がその他のパーミッションの設定となる。

|権限|値|
|---|---|
|SUID (s)|2|
|SGID (s)|4|
|スティッキービート (t)|1|

**例**

- `-rwsr-xr-x`: `chmod 4755 file`
- `drwxr-sr-x`: `chmod 2755 dir`
- `drwxrwxrxt`: `chdmo 1777 dir`

#### 2. アルファベットで指定

数字の代わりに、変更対象、変更方法、変更内容を指定する。

指定の仕方は以下の通り。

|変更対象|意味|
|:---:|---|
|`u`|所有者|
|`g`|所有グループ|
|`a`|その他|

|変更方法|意味|
|:---:|---|
|`+`|権限を付与|
|`-`|権限を削除|
|`=`|指定した権限にする|

|変更内容|意味|
|:---:|---|
|`r`|読み取り権限|
|`w`|書き込み権限|
|`x`|実行権限|
|`s`|SUIDかSGID|
|`t`|スティッキービート|

**例**

- 所有者に実行権限を付与: `chmod u+x file`
- 所有者と所有グループに実行権限を付与: `chmod u+x,g+x file`
- その他から実行権限と書き込み権限を除去: `chmod a-wx file`
- SUIDを設定: `chmod u+s file`
- SGIDを設定: `chmod g+s file`
- スティッキービートを設定: `chmod a+t dir`

### 再帰的なパーミッション変更

#### 全て

```bash
chmod -R 755 .
```

### 特定のファイルの権限変更

`find`を使う。`-exec`より`xargs`を使うほうが推奨されているらしい(参考: [findコマンドで-execオプションを使用する時の最後の「{} ;」ってなんだっけ？](https://qiita.com/legitwhiz/items/e609537fb6226081f5b5))。

```bash
# dir
find . -type d | xargs chmod 755
# file 
find . -type f | xargs chmod 755
# 特定拡張子

find . -name '*.sh' | xargs chmod 755
```

## ディレクトリのデフォルトパーミッションの設定 (umask)

あるディレクトリにおいて作成されるファイルに常に同じパーミッションを割り当てたくなる時がある。その場合は`umask`コマンドが使える

`umask`コマンドは、**付与しない権限**を指定する。

### 1. 数字で指定

`chmod`と同様に数字の和で権限を指定する。

|**付与しない**権限|値|
|---|---|
|読み取り権限 (r)|4|
|書き込み権限 (w)|2|
|実行権限 (x)|1|

**例**

- `-rwxr-xr-x`: `umask 022`
- `-rw-rw----`: `umask 117`