---
title: Webサイトのコードをコピーする拡張機能
date: "2019-06-17T02:40:00.000Z"
tags: ["拡張機能", "Chrome"]
---

Webサイトのコードをコピーする拡張機能を作りました.<br>

`card:https://chrome.google.com/webstore/detail/quick-copy-snippet/lonpelnahhbcodeopbcjbopgfmkcfadm`

どんなものかは下のgifの通りです.

![explain](./explain.gif)

似たような拡張機能はすでにあったのですがほとんど丸々コピーするようなGistやGithubよりも<br>
GithubのReadme内のインストール手順やQiitaやはてなブログのワンライナー
で使いたかったので作りました.

変わりに(?)他の似たような拡張機能では可能なgithubやgistのソース丸コピーはできなくなっています.<br>
そういうやつはダウンロードしてください.(WIP)


ソースは以下のリポジトリの通りです.

`card:https://github.com/kokeshing/Quick-copy-snippet`

追加を考えている機能としてユーザーがCSSセレクタや無視するようにするサイトを
設定できるようにするのとReactのような仮想DOMで差分レンダリングされた場合は
Hookされないのでそれの対策を考えています.

