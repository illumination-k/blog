---
title: Github Actionsとcrossを使ってReleaseでクロスコンパイルしてバイナリをアップロードする
description: Github Actionsとcrossを使ってReleaseでクロスコンパイルしてバイナリをアップロードする
---

## TL;DR

rust の用途として、コマンドラインツールを作成することが多い。コマンドラインツールを創るときに rust を使うメリットとしては、シングルバイナリで配布できるので利用しやすいということがある。

ソースコードはどうせ github で管理するので、リリースするたびに最新のバイナリを配布できるようにしておくと便利。そして、複数プラットフォームで使えるようにクロスコンパイルを自動でできるようにしておくと更に便利なので、そのやり方について説明していく。

## cross build

docker を使って cross build してくれる[cross](https://github.com/rust-embedded/cross)というパッケージを使う。rust の Github Actions の[actions-rs/cargo](https://github.com/actions-rs/cargo)を使うと簡単に Github Actions で cross build を行うことができる。

使い方は非常に簡単で、`actions-rs/cargo@v1`を使う際に`with`の中で`use-cross`を`true`にするだけで cross を利用できる。

```yaml
- uses: actions-rs/cargo@v1
  with:
    use-cross: true
    command: build
    args: --target armv7-unknown-linux-gnueabihf
```

## release and upload

release を作ったり、upload したりするアクションはあるが、バイナリを artifact にアップロードして...みたいな感じで結構長くなるので、[Upload files to a GitHub release](https://github.com/marketplace/actions/upload-files-to-a-github-release)を使う。公式サンプルは以下のような感じで、非常に簡単に release 作成とバイナリアップロードができる。

```yml:title=simple_example.yml
name: Publish

on:
  push:
    tags:
      - '*'

jobs:
  build:
    name: Publish binaries
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    - name: Build
      run: cargo build --release
    - name: Upload binaries to release
      uses: svenstaro/upload-release-action@v2
      with:
        repo_token: ${{ secrets.GITHUB_TOKEN }}
        file: target/release/mything
        asset_name: mything
        tag: ${{ github.ref }}
        overwrite: true
        body: "This is my release text"
```

## Release.yml

最終的にクロスビルドと release and upload をあわせた yml はこちら。matrix を使って複数のプラットフォームでのビルドをしている。musl を指定しないと古い CentOS では動かないという致命的な問題があるので musl と gnu を両方指定している。普通は Windows とか入れとくといいと思う。

Windows を入れる場合は、ubuntu 上で普通にビルドできる。ただ出力ファイルに`.exe`が必要なのでそこだけ注意すればいい。

```yml:title=Release.yml
name: Release

on:
  push:
    tags:
      - '*'

jobs:
  build:
    name: Release binary
    strategy:
      matrix:
        include:
          - os: ubuntu-latest
            target: x86_64-unknown-linux-gnu
            artifact_name: example
            asset_name: example-x86_64-unknown-linux-gnu
          - os: ubuntu-latest
            target: x86_64-unknown-linux-musl
            artifact_name: example
            asset_name: example-x86_64-unknown-linux-musl
          - os: ubuntu-latest
            target: x86_64-pc-windows-gnu
            artifact_name: example.exe
            asset_name: example-x86_64-pc-windows-gnu.exe
          - os: macos-latest
            target: x86_64-apple-darwin
            artifact_name: example
            asset_name: example-x86_64-apple-darwin


    runs-on: ${{ matrix.os }}

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Install stable toolchain
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable
          override: true

      - name: Cross build with all features
        uses: actions-rs/cargo@v1
        with:
          use-cross: true
          command: build
          args: --release --target ${{ matrix.target }} --all-features --verbose

      - name: Upload binaries to release
        uses: svenstaro/upload-release-action@2.1.1
        with:
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          file: target/${{ matrix.target }}/release/${{ matrix.artifact_name }}
          asset_name: ${{ matrix.asset_name }}
          tag: ${{ github.ref }}
          overwrite: true
```
