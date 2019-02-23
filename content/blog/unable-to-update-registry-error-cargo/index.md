---
title: Unable to update registry `https://github.com/rust-lang/crates.io-index`
date: "2018-12-10T03:43:04.284Z"
tags: ["Rust", "Cargo"]
---

タイトルのエラーメッセージの解決策の備忘録です．

Cargo.tomlに

```toml
[dependencies]
ndarray = "0.12.1"
```

依存ライブラリを書いてcargo buildしたところ，registryのアップデートができずライブラリを引っ張って来れない状況になりました．

```bash
 $ cargo build
    Updating crates.io index
warning: spurious network error (2 tries remaining): failed to resolve address for github: Name or service not known; class=Net (12)
warning: spurious network error (1 tries remaining): failed to resolve address for github: Name or service not known; class=Net (12)
error: failed to load source for a dependency on `ndarray`

Caused by:
  Unable to update registry `https://github.com/rust-lang/crates.io-index`

Caused by:
  failed to fetch `https://github.com/rust-lang/crates.io-index`

Caused by:
  failed to resolve address for github: Name or service not known; class=Net (12)
```

<br>

原因を調査したところ

`card:https://github.com/rust-lang/cargo/issues/2605`

と同じようでした．

Issueでは.gitconfigが悪さをしているとのことだったので確認してみると

```gitconfig
[url "github:"]
    InsteadOf = https://github.com/
    InsteadOf = git@github.com:
[user]
        email = xxxxxxxxxx
        name = xxxxxxxxxx
```

確かに[url "github:"]があり，これが原因らしいので

```gitconfig
[user]
        email = xxxxxxxxxx
        name = xxxxxxxxxx
```

と項目を消したところ無事ライブラリを取ってこれるようになりました．
