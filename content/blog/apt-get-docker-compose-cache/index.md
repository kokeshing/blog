---
title: docker-composeでapt-get installに失敗するとき
date: "2019-11-12T00:53:57.284Z"
tags: ["docker", "docker-compose"]
---

備忘録.

dockerやdocker-composeでbuild時にapt-get installで

```bash
E: Failed to fetch http://security.ubuntu.com/ubuntu/pool/main/v/vim/vim-common_7.4.1689-3ubuntu1.2_amd64.deb  403  Forbidden

E: Unable to fetch some archives, maybe run apt-get update or try with --fix-missing?
```

のようなエラーを吐かれたとき.


apt-get updateがdockerやdocker-composeによってキャッシュが使われている可能性があるので

dockerなら

```bash
$ docker build --no-cache
```

docker-composeなら

```bash
$ docker-compose build --no-cache
```

でキャッシュを使わないようにすると解決するかも.
