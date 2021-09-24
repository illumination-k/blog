---
title: SRAにAsperaを使ってデータをアップロードする
description: httpやftpによるSRAへのデータアップロードは遅すぎるので、IBMのaspera connectを使ってデータをアップロードするやり方を使おう。
---

## TL;DR

http や ftp による SRA へのデータアップロードは遅すぎるので、IBM の Aspera Connect を使ってデータをアップロードしないと日が暮れます。初めてアップロードした時は、Web からは終わらず、ftp で一つずつアップロードするのはしんどかったのですが、Aspera を使うと思ったより快適にアップロードできました。難しいことは何もなく、scp の高速版という感じでした。
実際、[NCBI のページ](https://www.ncbi.nlm.nih.gov/sra/docs/submitfiles/)を見ると、以下の様に Aspera Connect を使うことが推奨されています。

> Aspera Connect Fast and Secure Protocol (FASP) uses User Datagram Protocol (UDP) that eliminates and overcomes many shortcomings of other FTP clients and we recommend it for all medium to large submissions and slow or unreliable connections (especially from abroad).

## Aspera Connect のインストール

Aspera Connect は[IBM Aspera Connect](https://www.ibm.com/aspera/connect/)からダウンロードできます。Linux を使っている場合の例を以下に示します。version は更新されることがあるので、できるだけ最新版を使いましょう。

```bash
wget https://d3gcli72yxqn2z.cloudfront.net/connect_latest/v4/bin/ibm-aspera-connect_4.0.2.38_linux.tar.gz

tar -zxvf ibm-aspera-connect_4.0.2.38_linux.tar.gz
bash ibm-aspera-connect_4.0.2.38_linux.sh
​
export PATH=$PATH:$HOME/.aspera/connect/bin
```

パスを通すと、`ascp`コマンドが使えるようになっています。必要なら`~/.profile`などに記入しておきます。

## File のアップロード

`RSA Private Key`が表示されるので、`~/.aspera/keys/aspera_rsa`として保存します。アップロードしたい fastq は gz 圧縮されている必要があります。upload 先は、登録した email から始まる指定されたものを使います。

```bash
your_submission_directory="<user@email.com_xxxxx"

ascp -i ~/.aspera/keys/aspera_rsa -QT -l 100m -k1 -d path/to/your_reads.fastq.gz subasp@upload.ncbi.nlm.nih.gov:uploads/${your_submission_directory}
```
