---
title: Appache Arrow Formatのメモ
description: メモ
---

## TL;DR

## Encoding

Googleの[Google’s Flatbuffers](http://github.com/google/flatbuffers)が使われています。
Flatbuffersは、protocol bufferみたいな感じでスキーマを定義する必要があります。なので、スキーマを見ればどういう構造になっているのかを確認できます。[Flatbuffers protocol definition files](https://github.com/apache/arrow/tree/master/format)にスキーマがあります。

Flatbuffersの読み方などは公式を見るのが早そうです。

- [Writing a schema](https://google.github.io/flatbuffers/flatbuffers_guide_writing_schema.html)

ファイルの中身は以下の通りです。

| File Name                    | Description                    |
| ---------------------------- | ------------------------------ |
| [File.fbs]()                 | Footerの定義                   |
| [Message.fbs]()              | RecordBatchなどの定義          |
| [Schema.fbs]()               | logical typeの定義             |
| Tensor.fbs, SparseTensor.fbs | Tensorも定義されているらしい？ |

