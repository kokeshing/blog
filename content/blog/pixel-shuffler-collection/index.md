---
title: いろいろなPixelShuffler
date: "2019-04-09T01:30:57.284Z"
tags: ["機械学習", "PixelShuffler", "TensorFlow"]
---

Deconvの代わりに用いられることの多いPixelShufflerですがいろいろな書き方を見たのでまとめてみました.<br>
もちろん全部TensorFlowです.


## 1.

[TensorFlow-ESPCN](https://github.com/kweisamx/TensorFlow-ESPCN)<br>
論文通りの実装な感じですね.

```python
def PS_1(X, r, out_filters=1):
    Xc = tf.split(X, out_filters, 3)
    X = tf.concat([_phase_shift_1(x, r) for x in Xc], 3)

    return X

def _phase_shift_1(I, r):
    batch_size = tf.shape(I)[0]
    bsize, a, b, c = I.get_shape().as_list()
    X = tf.reshape(I, (batch_size, a, b, r, r))
    X = tf.split(X, a, 1)
    X = tf.concat([tf.squeeze(x) for x in X], 2)
    X = tf.split(X, b, 1)
    X = tf.concat([tf.squeeze(x) for x in X], 2)

    return tf.reshape(X, (batch_size, a * r, b * r, 1))
```


## 2.

[ここ](https://github.com/Rayhane-mamah/Tacotron-2/blob/ab5cb08a931fc842d3892ebeb27c8b8734ddd4b8/wavenet_vocoder/models/modules.py#L604)<br>
tf.batch\_to\_space\_ndを使う珍しい(主観)書き方です．<br>
tf.batch\_to\_space\_ndは理解したら詳細を書きます.

```python
def PS_2(inputs, shuffle_strides=(4, 4), out_filters=1):
    batch_size = tf.shape(inputs)[0]
    H = inputs.shape[1]
    W = tf.shape(inputs)[2]
    C = inputs.shape[-1]
    r1, r2 = shuffle_strides
    out_c = out_filters

    assert C == r1 * r2 * out_c

    Xc = tf.split(inputs, out_c, axis=3)
    outputs = tf.concat([_phase_shift_2(x, batch_size, H, W, r1, r2) for x in Xc], 3)

    with tf.control_dependencies([tf.assert_equal(out_c, tf.shape(outputs)[-1]),
        tf.assert_equal(H * r1, tf.shape(outputs)[1])]):
        outputs = tf.identity(outputs, name='SubPixelConv_output_check')

    return tf.reshape(outputs, [tf.shape(outputs)[0], r1 * H, tf.shape(outputs)[2], out_c])

def _phase_shift_2(inputs, batch_size, H, W, r1, r2):
    x = tf.reshape(inputs, [batch_size, H, W, r1, r2])

    x = tf.transpose(x, [4, 2, 3, 1, 0])
    x = tf.batch_to_space_nd(x, [r2], [[0, 0]])
    x = tf.squeeze(x, [0])

    x = tf.transpose(x, [1, 2, 0, 3])
    x = tf.batch_to_space_nd(x, [r1], [[0, 0]])
    x = tf.transpose(x, [3, 1, 2, 0])

    return x
```


## 3.

[ここ](http://musyoku.github.io/2017/03/18/Deconvolution%E3%81%AE%E4%BB%A3%E3%82%8F%E3%82%8A%E3%81%ABPixel-Shuffler%E3%82%92%E4%BD%BF%E3%81%86/)<br>
この中では一番シンプルな書き方ではないでしょうか.
1.を短く書いた感じですね．

```python
def pixel_shuffler(inputs, shuffle_strides=(4, 4), out_filters=1):
    batch_size = tf.shape(inputs)[0]
    _, H, W, C = inputs.get_shape()
    r1, r2 = shuffle_strides
    out_c = out_filters
    out_h = H * r1
    out_w = W * r2

    assert C == r1 * r2 * out_c

    x = tf.reshape(inputs, (batch_size, H, W, r1, r2, out_c))
    x = tf.transpose(x, (0, 1, 3, 2, 4, 5))
    x = tf.reshape(x, (batch_size, out_h, out_w, out_c))

    return x
```


## 比較

以上の3つの計算時間を計測してみました．<br>
同時に3つのコードが同じ結果を出力するかも確認しました.<br>
実行結果は上から順に入力したTensorの形,1.の出力Tensorの形,2.の出力Tensorの形,3.出力のTensorの形,1.の実行時間,2.の実行時間,3.の実行時間になっています.<br>
コードは[gist](https://gist.github.com/kokeshing/42fadb03a29eb2a8b438848d97161701)にあります.

### CPU

CPU版はビルドしていないのでAVXは使っていません.

```
$ python3.6 test.py
(16, 256, 256, 4)
(16, 512, 512, 1)
(16, 512, 512, 1)
(16, 512, 512, 1)
True
True
True
7.066614389419556
8.190456628799438
6.373971223831177
```

### GPU

GPUはGTX1080です.

```
$ python test.py
(16, 256, 256, 4)
(16, 512, 512, 1)
(16, 512, 512, 1)
(16, 512, 512, 1)
True
True
True
5.280000448226929
5.2200000286102295
5.035000562667847
```

3つのPixelShufflerの結果はどれも等しいことが分かりました.<br>
CPUでは2つ目が最も遅い結果となっていますがGPUでは僅差ですが1つ目が最も遅くなっています.<br>
念の為GPUで1000回に増やしてもう一度測ってみると,

```
51.86694884300232
52.51900100708008
50.833998918533325
```

という結果になったのでCPU,GPUともに3つ目, 1つ目, 2つ目の順番に速いということでよいでしょう.<br>
tf.batch\_to\_space\_ndを使っているのは速度のためなのかと思いましたが意外な結果になりました.

総括としては3つ目を使うのが人間にも機械にも良さそうです.
