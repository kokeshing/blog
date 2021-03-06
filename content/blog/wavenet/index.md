---
title: Wavenet
date: "2019-06-07T19:30:00.000Z"
tags: ["Wavenet", "音声合成", "機械学習"]
---

Wavenetを実装し学習してみたので結果をまとめて置きます.
メルスペクトログラムを入力として波形を推定するvocoderとして実装しました.
今回は単一話者・mu-law量子化で学習したデータです.

データセットは[jsut](https://sites.google.com/site/shinnosuketakamichi/publication/jsut)を使用させていただきました.

学習に使っていない発話を使用していくつか生成しました.
左が生成音声,右がオリジナル音声です.
オリジナル音声は[-1.0, 1.0]となるように処理してあります.

<div>
<audio src="./VOICEACTRESS100_007_synthesis.wav" controls></audio>
<audio src="./VOICEACTRESS100_007_rescale.wav" controls></audio>
</div>
<div>
<audio src="./VOICEACTRESS100_010_synthesis.wav" controls></audio>
<audio src="./VOICEACTRESS100_010_rescale.wav" controls></audio>
</div>
<div>
<audio src="./TRAVEL1000_0033_rescale.wav" controls></audio>
<audio src="./TRAVEL1000_0033_synthesis.wav" controls></audio>
</div>
<div>
<audio src="./PRECEDENT130_005_synthesis.wav" controls></audio>
<audio src="./PRECEDENT130_005_rescale.wav" controls></audio>
</div>

この他にも合成した音声を[ドライブ](https://drive.google.com/drive/folders/1znsRL5HgBGO5L4aNPWIYsGr4neWXS_e8?usp=sharing),そのオリジナル音声を[ドライブ](https://drive.google.com/drive/folders/1-RMd-9ASlxATIFY-Rjc0bofBRHpAwDAA?usp=sharing)にそれぞれアップロードしています.

細かい学習条件は以下の通りです.

| hparam | value |
|:---------------:|:----------------:|
| データセット | [jsut](https://sites.google.com/site/shinnosuketakamichi/publication/jsut) |
| language | 日本語 |
| Input type | mu-law quantize |
| Sampling rate | 22050 |
| Local Conditioning | 80次元メルスペクトログラム |
| Global Conditioning | なし(単一話者) |
| n_layer | 10 |
| n_loop | 2 |
| kernel_size| 3 |
| dropout | 0.05 |
| residual channels | 128 |
| dilated channels | 256 |
| skip out channels | 128 |
| upsample type  | PixelShuffler(SubPixel Convolution) |
| upsample scales | [11, 25] |
| max time steps| 8000 |
| batch_size | 8 |
| train/eval/test | 6945発話/367発話/385発話 |

学習はP100を用いて1週間ほど合計1200000iter回しました.
mu-lawのせいかところどころノイズのようなものがあり,ガウシアンにすればまた変わってきそうです.

まだmu-law量子化のモデルしか学習・推論まで確認していないのでガウス分布のほうも
GPUが空き次第学習・推論して確認してソースも公開します.(少しかかるかもしれません…)


### 追記

WaveNetのソースを[公開しました](https://github.com/kokeshing/WaveNet-Estimator)
ガウシアンの設定でも動くのは確認しているのでとりあえず公開しました.



以下のソース・ページを実装の参考にしました.ありがとうございました.
Tacotron-2のソースは前処理なども含めて非常に参考になりました.

- [Wavenet](https://arxiv.org/abs/1609.03499)
- [Tactron-2](https://github.com/Rayhane-mamah/Tacotron-2)
- [r9y9/wavenet_vocoder](https://github.com/r9y9/wavenet_vocoder)
- [Synthesize Human Speech with WaveNet](https://chainer-colab-notebook.readthedocs.io/ja/latest/notebook/official_example/wavenet.html)

日本語音声のオープンのコーパスを用いて学習したWavenetの参考になれば幸いです.

最後に,[jsut](https://sites.google.com/site/shinnosuketakamichi/publication/jsut)コーパスはデータ数が多く,品質も高いため良い音声合成ができました.ありがとうございました.

