---
title: VAEの損失関数
date: "2019-03-12T01:30:57.284Z"
tags: ["機械学習", "VAE"]
---

解析的に求められない事後分布$p_{\theta}(z|x)$の良い近似となる$q(z|x)$を求める.

対数周辺尤度$\log p_{\theta}(x)$を変形していく.
$$
\begin{alignedat}{2}
    \log p_{\theta}(x) &= \log [\int p_{\theta}(x, z) dz] \\
                            &= \log [\int q_{\phi}(z|x) \frac{p_{\theta}(x, z)}{q_{\phi}(z|x)} dz] \\
\end{alignedat}
$$

ここで,$\int q_{\phi}(z|x)dz = 1$が成立.

イエンセンの不等式
$$
\int_{-\infty}^{\infty} f(y(x))g(x)dx \geq f(\int_{-\infty}^{\infty} y(x)g(x) dx)
$$

を用いて,
$$
\begin{alignedat}{3}
     \log [\int q_{\phi}(z|x) \frac{p_{\theta}(x, z)}{q_{\phi}(z|x)} dz]  &\geq \int q_{\phi}(z|x) \log (\frac{p_{\theta}(x, z)}{q_{\phi}(z|x)}) dz \\
                              &= E_{q_{\phi}(z|x)} [- \log q_{\phi}(z|x) + \log p_{\theta} (x, z)] \\
                              &= - KL(q_{\phi}(z|x)||p_{\theta} (z)) + E_{q_\phi(z|x)} [\log p_{\theta}(x|z)]
\end{alignedat}
$$

不等式の左辺と右辺の差は
$$
\begin{alignedat}{2}
    \log p_{\theta}(x) - \int q_{\phi}(z|x) \log(\frac{p_{\theta}(x, z)}{q_{\phi}(z|x)}) dz &= \int q_{\phi}(z|x) \log p_{\theta}(x) dz - \int q_{\phi}(z|x) \log(\frac{p_{\theta}(x, z)}{q_{\phi}(z|x)}) dz \\
    &= \int q_{\phi}(z|x) \log \frac{p_{\theta}(x) q_{\phi}(z|x)}{p_{\theta}(x, z)} dz
\end{alignedat}
$$

ベイズの定理 $p_{\theta}(x, z) = p_{\theta}(z|x) p_{\theta}(x)$ より,

$$
\begin{alignedat}{3}
    \int q_{\phi}(z|x) \log \frac{p_{\theta}(x) q_{\phi}(z|x)}{p_{\theta}(x, z)} dz &= \int q_{\phi}(z|x) \log \frac{p_{\theta}(x) q_{\phi}(z|x)}{p_{\theta}(z|x) p_{\theta}(x)} dz \\
    &= \int q_{\phi}(z|x) \log \frac{q_{\phi} (z|x)}{p_{\theta}(z|x)} dz \\
    &= KL(q_{\phi}(z|x) || p_{\theta}(z|x))
\end{alignedat}
$$
となる.

よって,不等辺の右辺が大きくなれば,事後分布 $p_{\theta}(z|x)$ と事後分布の近似 $q_{\phi}(z|x)$ のKL-divergenceを小さくすることができる.

以上より,
$$
\log p_{\theta}(x) = KL(q_{\phi}(z|x) || p_{\theta}(z|x)) - KL(q_{\phi}(z|x)||p_{\theta} (z)) + E_{q_\phi(z|x)} [\log p_{\theta}(x|z)]
$$
であるので

$$
- KL(q_{\phi}(z|x)||p_{\theta} (z)) + E_{q_\phi(z|x)} [\log p_{\theta}(x|z)]
$$
を最大化するよう学習させる. $p_{\theta}$がEncoder, $q_{\phi}$がDecoderである．

符号を反転することによってVAEの損失関数である
$$
\mathcal{L} = KL(q_{\phi}(z|x)||p_{\theta} (z)) - E_{q_\phi(z|x)} [\log p_{\theta}(x|z)]
$$
を得ることができる.

たぶんあってる．
