---
title: ライブラリ調整とシーケンスの基本について
description: 次世代シーケンサー(NGS)解析技術の発展に伴い、比較的安価にシーケンスを行うことができるようになってきています。NGS解析を行うにあたって重要なライブラリ調整の原理と、シーケンサーの挙動についてまとめていきます。
import:
    - component: "Seq, {P5, P7, S5, S7, T7, Me}"
      path: "@components/seq/Seq"
---

## TL;DR

次世代シーケンサー(NGS)解析技術の発展に伴い、比較的安価にシーケンスを行うことができるようになってきています。NGS解析を行うにあたって重要なライブラリ調整の原理と、シーケンサーの挙動についてまとめていきます。

## ライブラリ調整について

よく使われている反応については、[弊ブログの記事](https://illumination-k.dev/posts/biology/library_construction_reaction)などを参照していただけると幸いです。

Illumina社のNGS技術は`sequence by synthesis (SBS)`と呼ばれる技術が使われています。`SBS`を使うには、アダプターと呼ばれる認識配列が必要です。このアダプターとして使われる配列も色々ありますが、2021現在において最もよく使われているのは次の3種類でしょう。

### Truseq Single Index

<Seq
    fchain={<><P5>AATGATACGGCGACCACCGAGATCTACAC</P5><S5>TCTTTCCCTACACGACGCTCTTCCGATCT</S5>-insert-<S7>AGATCGGAAGAGCACACGTCTGAACTCCAGTCAC</S7><T7>NNNNNNNN</T7><P7>ATCTCGTATGCCGTCTTCTGCTTG</P7></>}
    rchain={<><P5>TTACTATGCCGCTGGTGGCTCTAGATGTG</P5><S5>AGAAAGGGATGTGCTGCGAGAAGGCTAGA</S5>-insert-<S7>TCTAGCCTTCTCGTGTGCAGACTTGAGGTCAGTG</S7><T7>NNNNNNNN</T7><P7>TAGAGCATACGGCAGAAGACGAAC</P7></>}
    annotation={<>      <P5>Illumina P5</P5>                   <S5>Truseq Read 1</S5>                        <S7>Truseq Read 2</S7>                 <T7>i7</T7>        <P7>Illumina P7</P7></>}
/>

### Truseq Dual Index

<Seq
fchain={<><P5>AATGATACGGCGACCACCGAGATCTACAC</P5><T7>NNNNNNNN</T7><S5>ACACTCTTTCCCTACACGACGCTCTTCCGATCT</S5>-insert-<S7>AGATCGGAAGAGCACACGTCTGAACTCCAGTCAC</S7><T7>NNNNNNNN</T7><P7>ATCTCGTATGCCGTCTTCTGCTTG</P7></>}
rchain={<><P5>TTACTATGCCGCTGGTGGCTCTAGATGTG</P5><T7>NNNNNNNN</T7><S5>TGTGAGAAAGGGATGTGCTGCGAGAAGGCTAGA</S5>-insert-<S7>TCTAGCCTTCTCGTGTGCAGACTTGAGGTCAGTG</S7><T7>NNNNNNNN</T7><P7>TAGAGCATACGGCAGAAGACGAAC</P7></>}
annotation={<>      <P5>Illumina P5</P5>               <T7>i5</T7>            <S5>Truseq Read 1</S5>                          <S7>Truseq Read 2</S7>                 <T7>i7</T7>        <P7>Illumina P7</P7></>}
/>

### Nextera Dual Index
<Seq
fchain={<><P5>AATGATACGGCGACCACCGAGATCTACAC</P5><T7>NNNNNNNN</T7><S5>TCGTCGGCAGCGTC</S5><Me>AGATGTGTATAAGAGACAG</Me>-insert-<Me>CTGTCTCTTATACACATCT</Me><S7>CCGAGCCCACGAGAC</S7><T7>NNNNNNNN</T7><P7>ATCTCGTATGCCGTCTTCTGCTTG</P7></>}
rchain={<><P5>TTACTATGCCGCTGGTGGCTCTAGATGTG</P5><T7>NNNNNNNN</T7><S5>AGCAGCCGTCGCAG</S5><Me>TCTACACATATTCTCTGTC</Me>-insert-<Me>GACAGAGAATATGTGTAGA</Me><S7>GGCTCGGGTGCTCTG</S7><T7>NNNNNNNN</T7><P7>TAGAGCATACGGCAGAAGACGAAC</P7></>}
annotation={<>       <P5>Illumina P5</P5>              <T7>i5</T7>             <S5>Next</S5><Me>era Read 1</Me>                                <Me>Next</Me><S7>era Read 2</S7>        <T7>i7</T7>         <P7>Illumina P7</P7></>}
/>