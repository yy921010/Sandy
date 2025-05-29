---
title: "群晖安装 jenkins 遇到的问题"
createdAt: 2025-01-31
description: "群晖docker in docker 安装 jenkins 遇到的问题"
comment: true
---

## 背景：

前几天在群晖上安装 jenkins 时，遇到了一些问题，记录一下。由于需要打包 docker 镜像同时通过 jenkins 进行部署。

## 问题

1. 首先执行 docker 命令，发现提示没有权限；

此时我们需要映射群晖系统系统上的 docker.sock 文件，这样 jenkins 就可以使用 docker 命令。记住需要 root 用户，不然启动失败。

2. 其次执行 docker 命令，提示 `docker is not command`；

这个问题是因为 jenkins 容器中没有安装 docker 客户端，我们需要安装 docker 客户端。

## 解决方案

群晖安装 jenkins 时，需要注意的几点：

1. 一般我们在群晖上面安装 jenkins，会使用 docker 安装，这样可以方便的管理 jenkins 的版本，同时也不会影响群晖的其他服务。
2. 安装 jenkins 的时候，需要映射 docker.sock 文件，这样 jenkins 可以使用 docker 命令，同时也可以使用 docker 命令启动其他容器。

   ```bash
   /var/run/docker.sock:/var/run/docker.sock
   ```

3. TIPS: 安装 jenkins 的时候，需要安装 docker 客户端，这样 jenkins 可以使用 docker 命令，同时也可以使用 docker 命令启动其他容器。

## 如何安装 docker 客户端

### 第一种方式

1. 我们首先进入 docker 容器，然后安装 docker 客户端

   ```bash
   docker exec -it jenkins bash
   ```

2. 安装 docker 客户端

   ```bash
   apt-get update
   apt-get install -y docker.io
   ```

3. 安装完成后，我们可以使用 docker 命令

   ```bash
    docker --version
   ```

   > 这种情况有个问题，就是每次重启 jenkins 容器，都需要重新安装 docker 客户端。

### 第二种方式

1. 我们可以通过流水线的方式，进行安装，但是需要注意的是，我们需要在 jenkins 的容器中安装 docker 客户端，这样我们可以使用 docker 命令。

   ```groovy
   pipeline {
       agent any
       stages {
           stage('Install Docker') {
               steps {
                   sh 'apt-get update'
                   sh 'apt-get install -y docker.io'
               }
           }
       }
   }
   ```

   > 每次构建都会安装 docker 客户端，这样就可以使用 docker 命令。但是这种方式也有个问题，就是每次构建都会安装 docker 客户端，这样会浪费时间。
