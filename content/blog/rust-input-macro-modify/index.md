---
title: rustのinput!マクロではじめからミュータブルな変数として読み込む
date: "2018-12-09T03:30:57.284Z"
tags: ["Rust"]
---

大掛かりそうに見えて具体的な解決策は10秒で終わります．

`card:https://qiita.com/tanakh/items/0ba42c7ca36cd29d0ac8`

のマクロでmutで宣言したいねというお話です．
シャドーイングとかもあるけどはじめから宣言しちゃいたいよね．

上記事のマクロでは

```rust
// 18行辺りを抜粋
($iter:expr, $var:ident : $t:tt $($r:tt)*) => {
        let $var = read_value!($iter, $t); // ここでimmutableな変数として宣言されている
        input_inner!{$iter $($r)*}
    };
```

のようにimmutableな変数に読み込まれてしまうので，

```
    input!{
        n: usize,
        mut a: [usize; n],
    }
```

このようにmutキーワードがあるときはmutableにしてくれると嬉しいのでそのようにしてもらうようにします．

```rust
macro_rules! input_inner {
    ($iter:expr) => {};
    ($iter:expr, ) => {};

    ($iter:expr, $var:ident : $t:tt $($r:tt)*) => {
        let $var = read_value!($iter, $t);
        input_inner!{$iter $($r)*}
    };

    // mutキーワードがあるときにマッチする
    ($iter:expr, mut $var:ident : $t:tt $($r:tt)*) => {
        let mut $var = read_value!($iter, $t);
        input_inner!{$iter $($r)*}
    };
}
```

これで以下のようなコードも可能になりました．

```rust
fn main() {
    input!{
        n: usize,
        mut a: [usize; n],
    }

    a.sort(); // Errorにならない!!!!

    println!("{:?}", a);
}
```

不具合は多分ないと思います．

以下，マクロ全体です．

```rust
macro_rules! input {
    (source = $s:expr, $($r:tt)*) => {
        let mut iter = $s.split_whitespace();
        input_inner!{iter, $($r)*}
    };
    ($($r:tt)*) => {
        let mut s = {
            use std::io::Read;
            let mut s = String::new();
            std::io::stdin().read_to_string(&mut s).unwrap();
            s
        };
        let mut iter = s.split_whitespace();
        input_inner!{iter, $($r)*}
    };
}

macro_rules! input_inner {
    ($iter:expr) => {};
    ($iter:expr, ) => {};

    ($iter:expr, $var:ident : $t:tt $($r:tt)*) => {
        let $var = read_value!($iter, $t);
        input_inner!{$iter $($r)*}
    };

    ($iter:expr, mut $var:ident : $t:tt $($r:tt)*) => {
        let mut $var = read_value!($iter, $t);
        input_inner!{$iter $($r)*}
    };
}

macro_rules! read_value {
    ($iter:expr, ( $($t:tt),* )) => {
        ( $(read_value!($iter, $t)),* )
    };

    ($iter:expr, [ $t:tt ; $len:expr ]) => {
        (0..$len).map(|_| read_value!($iter, $t)).collect::<Vec<_>>()
    };

    ($iter:expr, chars) => {
        read_value!($iter, String).chars().collect::<Vec<char>>()
    };

    ($iter:expr, usize1) => {
        read_value!($iter, usize) - 1
    };

    ($iter:expr, $t:ty) => {
        $iter.next().unwrap().parse::<$t>().expect("Parse error")
    };
}
```

読めば読むほどこんなの自分には思いつかないですねと感じさせる非常によくできたマクロです．何を食べたらこんなマクロを書けるんでしょうか．


