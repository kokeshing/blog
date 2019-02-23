---
title: 狭義の弱順序を満たさないような型でsortしてみる
date: "2018-12-01T22:12:03.284Z"
tags: ["Rust"]
---

[C++のリファレンス](https://cpprefjp.github.io/reference/algorithm.html#strict-weak-ordering)曰く，sort()には狭義の弱順序が要求されるそうです．

狭義の弱順序性については

`card:https://onihusube.hatenablog.com/entry/2018/09/18/022130`

でわかりやすく書かれているので参照してください．

今回は狭義の弱順序が満たす性質の，

1.  非反射律
2.  推移律
3.  反対称律
4.  比較不能性の推移律

から，4.の比較不能性の推移律を満たさないような性質の型を定義してsortしてみようという企画です．

(追記) 推移律も満たしてませんでした
(追記2) 二項関係の<についてのみ考えると推移律は満たされています．二項関係<と>について同時に考えるべきではなく別々に考えるのが正しそうです.

Rustで書いていきます．まあC++じゃなくてもおんなじじゃろうという考えで書きました．
直和型 Pは A, B Cのいずれかをとると定義します．

```rust
enum P {
    A,
    B,
    C,
}
```

また，この型で比較演算子を使いたい，つまり比較ができるようにしたいので，

PartialOrdトレイト，Ordトレイト，PartialEqトレイト，Eqトレイトを型Pに実装します．
このとき，AとBが比較不可能，BとCも比較不可能にも関わらず，A < Cがfalse，C < Aがtrueで比較可能という比較不能性の推移律を破るように大小等を定義します．

```rust
use std::cmp::Ordering;
impl PartialOrd for P {
    fn partial_cmp(&self, other: &P) -> Option<Ordering> {
        match self {
            P::A => match other {
                P::A => Some(Ordering::Equal),
                P::B => Some(Ordering::Greater),
                P::C => Some(Ordering::Greater),
            },
            P::B => match other {
                P::A => Some(Ordering::Greater),
                P::B => Some(Ordering::Equal),
                P::C => Some(Ordering::Greater),
            },
            P::C => match other {
                P::A => Some(Ordering::Less),
                P::B => Some(Ordering::Greater),
                P::C => Some(Ordering::Equal),
            }
        }
    }
}

impl Ord for P {
    fn cmp(&self, other: &P) -> Ordering {
        match self {
            P::A => match other {
                P::A => Ordering::Equal,
                P::B => Ordering::Greater,
                P::C => Ordering::Greater,
            },
            P::B => match other {
                P::A => Ordering::Greater,
                P::B => Ordering::Equal,
                P::C => Ordering::Greater,
            },
            P::C => match other {
                P::A => Ordering::Less,
                P::B => Ordering::Greater,
                P::C => Ordering::Equal,
            }
        }
    }
}

impl PartialEq for P {
    fn eq(&self, other: &P) -> bool {
        match self {
            P::A => match other {
                P::A => true,
                P::B => true,
                P::C => false,
            },
            P::B => match other {
                P::A => true,
                P::B => true,
                P::C => true,
            },
            P::C => match other {
                P::A => false,
                P::B => true,
                P::C => true,
            }
        }
    }
}

impl Eq for P {}
```

PartialOrdを例に簡単に説明を付しておくと，引数のself，otherは

```rust
self [演算子] other // => true
```
と書いたときにselfが[A, B, C]でotherが[A, B, C]のとき[演算子]が大なり，小なり，等号のどれならtrueとなるかという感じです．9通り全て列挙しているだけです．名前どおり，Ordering::Equalが等号，Ordering::Greaterが大なり，Ordering::Lessが小なりに対応しています．
PartialEqでは等号関係を定義しています．

この4つのトレイトを型Pに実装したのでこれでsort関数などの比較を必要とする操作ができるようになりました．（<や>などの比較演算子も使える）

これであとはメイン関数で配列を作ってソートしてソートされているかを出力するだけです．今回はソートされたかの確認にis_sortedクレートを使いました．

こちらが出力結果となります．

```sh
$ cargo run -q
非反射律
A < A => false
B < B => false
C < C => false


推移律
A < B => false
B < A => false

B < C => false
C < B => false

C < A => true
A < C => false

A > B => true
B > C => true
A > C => true

B > C => true
C > A => false
B > A => true

C > A => false
A > B => true
C > B => true

A > C => true
C > B => true
A > B => true

C > B => true
B > A => true
C > A => false

反対称律
A < B => false
B < A => false
A > B => true
B > A => true
A = B => true

B < C => false
C < B => false
B > C => true
C > B => true
B = C => true

C < A => true
A < C => false
C > A => false
A > C => true
C = A => false


比較不能性の推移律
B < A => false
A < B => false

C < B => false
B < C => false

C < A => true
A < C => false

ソート前配列:[A B C B C A B A]
ソート後配列:[A B C B C A B A]
soted : false
```

4つの性質がそれぞれ満たされている，いないを確認するための出力もしておきました．

```sh
C > B => true
B > A => true
C > A => false
```

の部分から二項関係の>について推移律を満たしておらず，

```sh
B < A => false
A < B => false

C < B => false
B < C => false

C < A => true
A < C => false
```

から>，<の両方について比較不能性の推移律も満たしていないことがわかります.

ソート前の配列が[A B C B C A B A]であるのに，sort()後も[A B C B C A B A]となっており，
確かにsort関数を使ったのにソートしていないし，is_sorted()でもFalseとなりました．
よって，確かにソートする型が狭義の弱順序を満たしておく必要があるようです．

あんまりこんなことが起きることはめったにないというか下手すれば一生ないかもしれませんが知っておくともしかしたら役に立つかもしれません．

今回書いたコードは以下のリポジトリに上げています．
この定義おかしいぞとかありましたら任意の連絡方法でご指摘お願いします．

`card:https://github.com/kokeshing/strict_weak_order_rust`
