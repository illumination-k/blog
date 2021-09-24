---
title: salmonの出力ファイルをtximportで加工する
description: salmonの出力ファイルはquant.sfですが、その加工は非常に多岐に渡り、結構難しいです。tximportで加工できる先と用途についてまとめていきたいと思います。
---

## TL;DR

salmon や kalsto などは、速く、正確な発現量の定量ソフトウェアです。しかし、単純なカウントデータと違って、その加工と用途は様々です。そこで、salmon の出力ファイルである quant.sf とその加工ができる tximport についてまとめておきたいと思います。

## quant.sf

`quant.sf`はタブ区切りのファイルです。

```
Name    Length  EffectiveLength TPM     NumReads
```

上の 5 つの値を持っています。[公式 Docs Ver1.40](https://salmon.readthedocs.io/en/latest/file_formats.html)を読むと、これらの値は以下のように定義されています。

| 名称            | 定義                                                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Name            | 転写産物の名前。fasta のヘッダ行                                                                                          |
| Length          | 転写産物の塩基長                                                                                                          |
| EffectiveLength | fragment distribution や sequence-specific、gc-fragment bias などを考慮した`effective length`。TPM の計算とかに使われる。 |
| TPM             | 正しい意味での TPM。この値をこの後の解析に使うことが推奨されている                                                        |
| NumReads        | salmon によって転写産物にマップされたリード数                                                                             |

## tximport でファイルを読み込む

`quant.sf`ファイルを読み込めます。

```bash
ls
# SRRxxxxxx_exp
# DRRxxxxxx_exp
```

のような末尾に exp がついたディレクトリに salmon の出力が入っているとします。

```r
library(tximport)

# expがついたファイルの読み込み
salmon.files <- file.path(list.files(".", pattern = "_exp"), 'quant.sf')

# このままだとcolnameがSRR_exp/quant.sfになるので置換しておく。
sample_name <- c(gsub("_exp/quant.sf", "", salmon.files))
names(salmon.files) <- sample_name

# txOut=TRUEでTranscriptsレベルで読み込む
tx.exp <- tximport(salmon.files, type = "salmon", txOut = TRUE)

# txOut=FALSE (default) の場合はgeneレベルで読み込まれる
# ただし、転写産物名と遺伝子名を対応させるデータフレームが必要。
# このあたりは臨機応変にする必要がある。TranscriptID = geneID.1みたいな場合を想定。
tx2gene <- data.frame(
    TXNAME = rownames(tx.exp$counts),
    GENEID = sapply(strsplit(rownames(tx.exp$counts), '\\.'), '[', 1)
)

# 直接読み込む
gene.exp <- tximport(salmon.files, type = "salmon", tx2gene = tx2gene)

# Transcripts単位からGene単位にする
gene_from_tx.exp <- summarizeToGene(tx.exp, tx2gene)
```

## tximport されたものの中身を csv 形式で書き出す

workspace は続いている感じです。
読み込みはできたんですが、目的のものを取り出す操作が必要です。

tximport に何が入っているかは`names(tximportObject)`で確認できます。

```r
names(tx.exp)
## [1] "abundance"           "counts"              "length"
## [4] "countsFromAbundance"
```

中身は

- abundance: TPM
- counts: NumReads
- length: EffectiveLength
- countsFromAbundance: `"no"`, `"scaledTPM"`, `"lengthScaledTPM"` or `"dtuScaledTPM"`

です。`countsFromAbundance`の default は`"no"`です。
面倒な話なのですが、`scaledTPM`、`lengthScaledTPM`、`dtuScaledTPM`は TPM とは別物で、

```r
gene.scaled <- summarizeToGene(tx.exp, tx2gene, countsFromAbundance = "scaledTPM")

scaledTPM <- gene.scaled$counts
```

などのようにして得られるカウント値のようなものです。NumReads からカウントするのではなく、abundance(この場合は TPM)からカウントして、それをライブラリサイズによってスケーリングしたものです。この場合の`xxxxTPM`は TPM 由来ということで、TPM のように扱うのは好ましくないです。

ちなみにですが、それぞれの scale 方法は以下です。また、`tximportObject$counts`で得られるものは、サンプルごとに sum をとるとすべて NumReads の総数と等しくなります。

| 名称              | 方法                                               |
| ----------------- | -------------------------------------------------- |
| `no`              | simplesum                                          |
| `scaledTPM`       | ライブラリサイズに補正                             |
| `lengthScaledTPM` | 転写産物の平均長を補正したライブラリサイズに補正   |
| `dtuScaledTPM`    | 転写産物の中央値長で補正したライブラリサイズに補正 |

また`dtuScaledTPM`は Differential Transcripts Usage (DTU) 解析のときに最も優れた補正方法らしいです。これらの scale した値、もしくはそのままのカウントを Differential Expression Gene (DEG) 解析などには用います。

csv などで書き出したければ以下のようにすれば良いと思います。

```r
# count
write.csv(gene.exp$counts, file = "gene_count.csv", row.names = TRUE)

# tpm
write.csv(gene.exp$abundance, file = "gene_tpm.csv", row.names = TRUE)
```

## DEG 解析の際にどうすればいいのか

3' tagged RNAseq のようなものの場合は、length 長を入れるとむしろ補正がかかってよくないので、countFromAbundance を使わずに、そのままの count 値を入れたほうがいいです。

しかし、普通の full-transcripts-length な RNA-seq では転写産物の長さを補正したほうがいい結果が得られるらしいです。

ここからは[公式 doc](https://bioconductor.org/packages/devel/bioc/vignettes/tximport/inst/doc/tximport.html#Do)のコードを少しだけ改変したものをメモ用に貼っておきます。

### edgeR

```r
cts <- txi$counts
normMat <- txi$length

# Obtaining per-observation scaling factors for length, adjusted to avoid
# changing the magnitude of the counts.
normMat <- normMat/exp(rowMeans(log(normMat)))
normCts <- cts/normMat

# Computing effective library sizes from scaled counts, to account for
# composition biases between samples.
library(edgeR)
eff.lib <- calcNormFactors(normCts) * colSums(normCts)

# Combining effective library sizes with the length factors, and calculating
# offsets for a log-link GLM.
normMat <- sweep(normMat, 2, eff.lib, "*")
normMat <- log(normMat)

# Creating a DGEList object for use in edgeR.
y <- DGEList(cts)
y <- scaleOffset(y, normMat)
# filtering
keep <- filterByExpr(y)
```

### DESeq2

```r
library(DESeq2)

sampleTable <- data.frame(condition = factor(rep(c("A", "B"), each = 3)))
rownames(sampleTable) <- colnames(txi$counts)

dds <- DESeqDataSetFromTximport(txi, sampleTable, ~condition)
dds <- DESeq(dds)
res <- results(dds)
```

DESeq2 の`DESeqDataSetFromTximport`を読むと

```r
DESeqDataSetFromTximport <- function(txi, colData, design, ...)
{
  stopifnot(is(txi, "list"))
  counts <- round(txi$counts)
  mode(counts) <- "integer"
  object <- DESeqDataSetFromMatrix(countData=counts, colData=colData, design=design, ...)
  stopifnot(txi$countsFromAbundance %in% c("no","scaledTPM","lengthScaledTPM"))
  if (txi$countsFromAbundance %in% c("scaledTPM","lengthScaledTPM")) {
    message("using just counts from tximport")
  } else {
    message("using counts and average transcript lengths from tximport")
    lengths <- txi$length
    stopifnot(all(lengths > 0))
    dimnames(lengths) <- dimnames(object)
    assays(object)[["avgTxLength"]] <- lengths
  }
  return(object)
}
```

なので、`countAbundance = "scaledTPM"`とかなら csv とかにした後そのまま読み込ませても良さそう。

## 感想

`scaledTPM`系列ががややこしい。

limma-voom って使ったことないんですけどどういうメリットがあるんですかね。

## Reference

- [tximport](https://bioconductor.org/packages/devel/bioc/vignettes/tximport/inst/doc/tximport.html#Do)
- [DESeq2](https://github.com/mikelove/DESeq2/blob/master/R/AllClasses.R)
- [dtuScaledTPM vs lengthScaledTPM in DTU analysis](https://support.bioconductor.org/p/119720/)
- [difference among tximport scaledTPM, lengthScaledTPM and the original TPM output by salmon/kallisto](https://support.bioconductor.org/p/84883/)
