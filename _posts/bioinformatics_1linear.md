---
title: Bioinformaticsで稀によく使うワンライナー集
description: Bioinformaticsで稀によく使うワンライナーをわすれないようにまとめておく。
---

## フォーマット変換

### gtf -> bed

```bash
awk '{if($3 =="transcript"){ print $1 "\t" $4 "\t" $5 "\t" $10 "\t0\t" $7}}' genome.gtf > transcript.bed
```