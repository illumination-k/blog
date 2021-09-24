---
title: NGSライブラリ調製の時に使用される反応まとめ
description: NGSライブラリ調製の際には多様な反応が使用されている。それらのうち、知っているものについて原理をまとめていきたい。
---

## TL;DR

実験系生物学者の多くが次世代シーケンサー(NGS)を使う時代が到来してきています。研究室で NGS を行うためには、ライブラリ調製が不可欠ですが、ライブラリ調製の際に使われている反応について詳細に把握していませんでした。そこで、よく使われていそうな反応についてまとめてみました。

## PCR

分子生物学の基礎とも言える反応です。[こちらの記事](https://illumination-k.dev/posts/biology/ngs_matome)で説明しています。

簡単に説明しておくと、DNA や RNA などの塩基を$O(2^n)$で爆発的に増幅させる手法です。

## RT (Reverse Transcript)

セントラルドグマは

```
DNA -> RNA -> Protein
↓↑
DNA
```

という反応のことを指し、動物等の生体内ではこの反応系が基本的に行われています。しかし、ウィルスなどは

```
RNA -> DNA
```

という反応を起こす逆転写酵素(Reverse Transcriptase)を持ちます。この酵素を用いることで、RNA から cDNA (RNA 由来の DNA を cDNA と呼ぶ) を合成できます。DNA に変換したあと、PCR 反応させることが可能になり、極微量の RNA を検出することが可能になります。

RNA-seq のときの最初のステップとして行われる反応です。この反応にもプライマーが必要で、プライマーの種類によって増幅され方が違います。これらのプライマーにさらに何らかの配列（例えばバーコードやアダプター）を付加することで、それらの配列が付加された cDNA を合成できます。

### 1. polyA 配列を付加したオリゴ dT プライマー

真核生物の mRNA の 3'末端には連続した A (polyA) 配列を持ちます。なので、連続した T (polyT) 配列を持つプライマーを用いて cDNA を増幅することで mRNA のみを狙って増幅が可能です。ただ、この方法では原核細胞や miRNA などには使用できません。RNA-seq の場合は基本的にこのプライマーを使うことが多です。

### 2. ランダムプライマー

ランダム配列を持ったプライマーです。なんにでもくっつくので、polyA 配列がなくても増幅できます。

### 3. 遺伝子特異的なプライマー

狙った遺伝子の cDNA のみを合成できます。基本的には RT-PCR とかのときだけ使われます。

![RT-primers](/public/images/library_construction/RT_primers.png)

## TSO (template switching oligo)

逆転写酵素には、Terminal nucleotidyl transferase (TdT) 活性を持つものが存在しています。この活性は、DNA の 3'末端にテンプレート非依存で特定の配列を付加します。この反応は本来不要な配列が付加されてしまうので望ましい反応ではありません。しかし、この配列を活用する方法が多数存在しています。

cDNA を合成する際に、3'末端に polyC 配列を付加し、それと相補的な polyG 配列を 3'末端側にもつ DNA oligo (template swithching oligo) を用います。これによって、3'末端を修飾しつつ Second strand synthesis を行うことができます。この反応によって、3'末端側にバーコードやアダプターが付加されます。こういった酵素は高濃度のマグネシウムやマグネシウムイオン存在下で、cDNA 合成中、あるいは反応後半に誘導されます。

![md={6}:tso](/images/library_construction/tso.png)

## Klenow Fragment

突出末端を平滑化する際や、平滑末端に A tail を付加する際に使われます。実際には DNA polymerase Ⅰ で、鋳型、プライマー存在下で dNTP を基質として鋳型に相補的な DNA を合成します。dATP と一緒に反応させることで、A tail を付加できます。5'-> 3' exonuclease 活性を持たず、一本鎖特異的な 5' -> 3'exonuclease 活性を持ちます。

1. 5' -> 3' DNA polymerase 活性
   ![klenow](https://catalog.takara-bio.co.jp/IMAGES/2130a.gif)

2. 一本鎖特異的な 3' -> 5'exonuclease 活性
   ![klenow exonuclease](https://catalog.takara-bio.co.jp/IMAGES/2130c.gif)

## Ligation

ligation は DNA 同士をつなげる反応で、ライブラリ調製以外にもベクター作成など様々な場所で利用されます。よく使われるのは制限酵素で切断したベクターと、その突出末端を相補的に持つ挿入用の DNA を繋げる方法です。下図にあるように、相補的な突出末端を持つ DNA 同士を繋げることができます。酵素によっては平滑末端でも繋げられます。平滑末端で処理する場合はリン酸化等を行うのが一般的です([参考](https://lifescience.toyobo.co.jp/upload/upld86/protocol-c/cloning86pc01.pdf))。

![md={6}:ligation](https://media.addgene.org/data/easy-thumbnails/filer_public/cms/filer_public/21/27/212780f6-b140-440b-b414-1ec4353167d6/ligation.gif__900x316_q85_crop_subsampling-2_upscale.png)

## USER

Uracil DNA Glycosylase と Endonuclease VIII の両方の活性を持つ酵素です。二本鎖 DNA の中の U を除去し、nick を入れることができます。

![md={6}:USER](https://international.neb.com/-/media/nebus/page-images/products/cloning-strains/user_mechanism_0118.png?rev=8746dafdeb3d4d32bb8bb3846ab372b4&hash=CFBC863E2CCBBCCF5A99E09D145FD1FF)

Adaptor の切断や USER cloning などに使われることがあります。

![md={6}:adaptor-by-user](https://www.neb.com/-/media/nebus/page-images/newsized-brochure-images/cloning-and-mapping/user_lp_loopadaptorcleavage.png?rev=f6c3b5a51d7f40b093f03133a39934db&hash=861227C19378CCFB0154102618B135CB)

## Second Strand Synthesis (Gubler and Hoffman Procedure)

cDNA は一本鎖 DNA なわけですが、基本的には二本鎖 DNA のほうが扱いやすいです。なので、二本鎖 DNA にするための方法があります。近年の方法は RNaseH + DNA polymerase I を使うことが多いです。RNaseH は RNA に nick を入れる反応を起こします。DNA polymerase I は二本鎖特異的 5’→3’ exonuclease 活性および一本鎖特異的 3’→5’ exonuclease 活性を有する DNA 合成酵素です。

![md={6}:RNAnicking_doublestrandedcdna](https://www.thermofisher.com/jp/ja/home/life-science/cloning/cloning-learning-center/invitrogen-school-of-molecular-biology/rt-education/reverse-transcription-setup/jcr:content/MainParsys/image_a871/foregroundimg.img.320.low.png/1500204713307.png)

まず、RNaseH によって nick が作られます。作られた RNA 断片をプライマーとして DNA polymerase I が相補的な二本鎖 DNA を合成してくれます。

最後に Ligation の平滑末端をつなぐ反応を用いて、切れた部分を修復することで完成品ができるようです。このステップに関しては調べていて初めて知りました。

## Tagmentation

Transposon の一種である Tn5 を用いる反応です。DNA をランダムにフラグメントにします。Tn5 にはモザイク配列と呼ばれる活性化配列と、それに繋がったアダプター配列を付加した 2 本鎖配列がロードされています。

![tn5_dimer](https://teichlab.github.io/scg_lib_structs/data/tn5_dimer.svg)

そして、切断された部分の両端にモザイク配列+アダプター配列を付加できます。そのアダプター配列に相補的な配列を持つプライマーを用いて増幅することでライブラリを作成できます。

![md={6}:tagmentation](https://www.future-science.com/cms/10.2144/000114133/asset/images/medium/figure2.jpg)

## Reference

- [逆転写反応のセットアップ：重要な 7 つの注意点](https://www.thermofisher.com/jp/ja/home/life-science/cloning/cloning-learning-center/invitrogen-school-of-molecular-biology/rt-education/reverse-transcription-setup.html)
- [逆転写酵素の特性：重要な 6 つの注意点](https://www.thermofisher.com/jp/ja/home/life-science/cloning/cloning-learning-center/invitrogen-school-of-molecular-biology/rt-education/reverse-transcriptase-attributes.html)
- [DNA Ligation](https://www.addgene.org/protocols/dna-ligation/)
- [Dropseq/seq-well](https://teichlab.github.io/scg_lib_structs/methods_html/Drop-seq.html)
- [Library construction for next-generation sequencing: Overviews and challenges Head et al., 2018](https://www.future-science.com/doi/10.2144/000114133)
- [USER® Enzyme](https://www.neb.com/products/m5505-user-enzyme)
- [Applications of USER® and Thermolabile USER II Enzymes](https://www.neb.com/applications/cloning-and-synthetic-biology/user-cloning/applications-of-user-and-thermolabile-user-ii-enzymes)
- [Klenow Fragment](https://catalog.takara-bio.co.jp/product/basic_info.php?unitid=U100003145)
- [A-Tailing with Klenow Fragment (3'-->5' exo-)](https://international.neb.com/protocols/2013/11/06/a-tailing-with-klenow-fragment-3-5-exo)
