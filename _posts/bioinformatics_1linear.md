---
title: Bioinformaticsで稀によく使うワンライナー集
description: Bioinformaticsで稀によく使うワンライナーをわすれないようにまとめておく。
---

## samtools

flagが全く覚えられない

|bit|10進数|意味|
|---|---|---|
|0x1|1|PAIRED	paired-end (or multiple-segment) sequencing technology|
|0x2|2|PROPER_PAIR	each segment properly aligned according to the aligner|
|0x4|4|UNMAP	segment unmapped|
|0x8|8|MUNMAP	next segment in the template unmapped|
|0x10|16|REVERSE	SEQ is reverse complemented|
|0x20|32|MREVERSE	SEQ of the next segment in the template is reverse complemented|
|0x40|64|READ1	the first segment in the template|
|0x80|128|READ2	the last segment in the template|
|0x100|256|SECONDARY	secondary alignment|
|0x200|512|QCFAIL	not passing quality controls|
|0x400|1024|DUP	PCR or optical duplicate|
|0x800|2048|SUPPLEMENTARY	supplementary alignment|
