---
title: "Rustでfastq/fastq.gzを読み書きする"
description: "rust-bioを使ってfastq/fastq.gzを読み書きします。"
---

## TL;DR

fastq とかのファイルを処理するときに、Python だとサイズが大きめの fastq ファイル群を扱ってると時間がかかりすぎて辛い気分になります。fastq をパースするくらいなら自前で書いてもいいんですが、[rust-bio]()なる crate があるのでそれを使います。

使い方は[docs](https://docs.rs/bio/0.32.0/bio/)読めばわかるんですが、gz 形式で読み書きするのが rust-bio 単独では使えなかったので、そのあたりもフォローしておきます。

## dependencies

```toml:title=Cargo.toml
bio = "*"
```

### rust-bio の io::fastq に関する注意

rust-bio には fastq パーサーがおいてあります。Record が String とかを持つ仕様なので、アロケーションの償却とかそういう意味だとちょっと速度は微妙な可能性があります。Error ハンドリングとかは参考になるので、高速化したいなら自分で書いたほうがいいかもしれません。

## fastq の読み書き

### Record

fastq の 1 read に相当する Record の定義は以下のようになっています。

```rust
// from https://docs.rs/crate/bio/0.32.0/source/src/io/fastq.rs

#[derive(Debug, Clone, Default, Serialize, Deserialize, PartialEq)]
pub struct Record {
    id: String,
    desc: Option<String>,
    seq: String,
    qual: String,
}
```

それぞれのメンバは同名の関数（`ex id()`）などでアクセスできます。ただ、`seq()`関数だけ Byte のスライスを返してきます。もうそれなら最初から全部`&[u8]`で読み込んでほしい...。

### Reader

[docs](https://docs.rs/bio/0.32.0/bio/io/fastq/index.html)のほぼコピペを貼ります。

```rust
use std::io;
use bio::io::fastq;

fn main() {
    let mut reader = fastq::Reader::new(io::stdin());

    let mut nb_reads = 0;
    let mut nb_bases = 0;

    for result in reader.records() {
        let record = result.expect("Error during fastq record parsing");

        nb_reads += 1;
        nb_bases += record.seq().len();
    }

    println!("Number of reads: {}", nb_reads);
    println!("Number of bases: {}", nb_bases);
}
```

この場合、標準入力から読み出していますが、圧倒的多数であろうファイルから読み込みたい場合は、

```rust
let mut reader = fastq::Reader::from_file(path).unwrap();
```

で Reader を作成できます。

### Write

[docs](https://docs.rs/bio/0.32.0/bio/io/fastq/index.html)のほぼコピペを再び貼ります。

```rust
use std::io;
use bio::io::fastq;


fn main() {
    let mut seed = 42;

    let nucleotides = [b'A', b'C', b'G', b'T'];

    let mut writer = fastq::Writer::new(io::stdout());

    for _ in 0..10 {
        let seq = (0..100).map(|_| {
            seed = ((seed ^ seed << 13) ^ seed >> 7) ^ seed << 17; // don't use this random generator
            nucleotides[seed % 4]
        }).collect::<Vec<u8>>();

        let qual = (0..100).map(|_| b'!').collect::<Vec<u8>>();

    writer.write("random", None, seq.as_slice(), qual.as_slice());
    }
}
```

Reader と同じで、ファイルに書き込みたい場合は、

```rust
let mut wtr = fastq::Writer::to_file(path).unwrap()
```

を使います。

## fastq.gz の読み書き

flate2 という gz とか zip とかの圧縮を扱える crate を使います。`?`を使いたいので、anyhow というエラーハンドリングクレートを使用しています。

```toml:title=Cargo.toml
bio = "*"
anyhow = "1.0"
flate2 = "0.2"
```

### Read

`fastq::Reader::new`は trait として`std::io::BufRead`を持っている必要があります。

gz が拡張子についていれば、gzdecoder で読み込んで、そうでなければ普通に Bufread で読み込む関数を作成しておきます。decoder には flate2 の MultiGzDecoder を使用します。

```rust
use anyhow::Result;
use std::path::Path;
use std::io::{ BufRead, BufReader };
use flate2::read::MultiGzDecoder;

pub fn open_with_gz<P: AsRef<Path>>(p: P) -> Result<Box<dyn BufRead>> {
    let r = std::fs::File::open(p.as_ref())?;
    let ext = p.as_ref().extension();

    if ext == Some(std::ffi::OsStr::new("gz")) {
        let gz = MultiGzDecoder::new(r)?;
        let buf_reader = BufReader::new(gz);
        Ok(Box::new(buf_reader))
    } else {
        let buf_reader = BufReader::new(r);
        Ok(Box::new(buf_reader))
    }
}
```

これで gz からの読み込みの準備は整いました。あとは

```rust
let path = "a.fastq.gz";
let mut rdr = fastq::Reader::new(open_with_gz(path).unwrap());
```

のような形で Reader を生成できます。

### Write

Writer も Reader と同じような感じで BufWrite を生成して、`fastq::io::Writer::new()`すればいいです。同じ用にラッパー関数を作ればよいですが、ちょっとこっちは gz で書き出さないメリットが思い浮かばないので、作ったことがないので、直接 gzencoder を入れるコードをおいておきます。そのうち書くかもしれません。

```rust
use anyhow::Result;
use std::path::Path;

use flate2::Compression;
use flate2::write::GzEncoder;

use bio::io::fastq;

pub fn write_with_gz<P: AsRef<Path>>(p: P) -> Result<fastq::io::Writer> {
    let mut f = std::fs::File::crate(p)?;
    let buf = BufWriter::new(f);

    let gz = GzEncoder::new(buf, Compression::Default);
    Ok(fastq::io::Writer::new(gz))
}

fn main() -> Result<()> {
    let path = "b.fastq.gz";
    let mut wtr = write_with_gz(path)?;
    Ok(())
}
```

## まとめ

docs を読めばいいと思います。
