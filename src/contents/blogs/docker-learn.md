---
title: "Docker 入门"
createdAt: 2024-05-06
description: "Docker 入门，作为一个前端，需要了解的一些docker 知识"
comment: true
toc: true
---

## 是什么？

想象一下，你要搬家，却不想一件件搬所有的家当，而是把所有东西都装进一个统一的箱子，不管目的地是哪个城市，随时打开箱子就能继续生活。Docker 就是这样的“箱子”！它是一种开源的容器化技术，可以把应用程序和它需要的环境“打包”起来，让它能随时随地跑起来，无需担心“跑不动”。

Docker 的主要特点包括：

1. **轻量级**：Docker 容器共享主机的操作系统内核，因此相比于虚拟机，它们占用的资源更少，启动更快速。
2. **可移植性**：Docker 容器可以在任何支持 Docker 的环境中运行，无论是开发、测试还是生产环境，保持一致性。
3. **快速部署**：Docker 镜像包含了应用程序及其所有依赖项，因此可以快速部署和启动容器，无需进行繁琐的配置和安装。
4. **环境一致性**：Docker 容器将应用程序与其依赖项打包在一起，确保在不同环境中运行时具有一致的行为。
5. **资源隔离**：Docker 使用 Linux 内核的容器功能，实现了容器之间的资源隔离，保证容器之间互不影响。

## 概念

- 镜像（Image）：像做饭的“菜谱”，告诉你怎么搭建应用。
- 容器（Container）：根据“菜谱”做出来的实际饭菜，一个运行中的实例。
- 仓库（Repository）：存储“菜谱”的地方，随时可以拿出来用，比如全球知名的“菜谱库”——Docker Hub。

## 如何工作

这里借用图片 [bytebytego](http://blog.bytebytego.com/)
![Untitled.jpeg](https://home.matrixpunk.com:9800/i/2024/05/06/6638bcc73a0ab.jpeg)

### Docker 的工作原理

1. 编写一个 Dockerfile
   它是一张“TODO 清单”，告诉 Docker 需要用什么基础环境、拷贝哪些代码、安装哪些依赖。
2. 构建一个 镜像
   Docker 根据 Dockerfile 把你的应用和环境“打包”成一个文件。
3. 运行 容器
   用镜像“生成”一个容器，容器里跑的就是你的应用，随时可以启动、停止。

#### 编写 Dockerfile

Dockerfile 是一个文本文件，包含了一条条的指令（Instruction），每一条指令构建一层，因此每一条指令的内容都会对镜像产生影响。Dockerfile 的基本格式如下：

```dockerfile
# Base image
FROM node:14    # 指定基础镜像

# Author
MAINTAINER matrixpunk <
# Set working directory
WORKDIR /app    # 设置工作目录

# Copy source code
COPY . /app     # 拷贝文件

# Install dependencies
RUN npm install # 安装依赖

# Expose port
EXPOSE 3000     # 暴露端口

# Start app
CMD ["npm", "start"] # 启动命令

```

#### 构建 Docker 镜像

```bash
docker build -t my-node-app .
```

#### 运行 Docker 容器

```bash
docker run -d -p 3000:3000 my-node-app
```

> 运行 docker 容器时，可以使用 `-d` 参数让容器在后台运行，`-p` 参数指定端口映射。
> 剩余参数如下：
>
> - `-i`：以交互模式运行容器
> - `-t`：分配一个伪终端
> - `--name`：指定容器名称
> - `-v`：挂载数据卷
> - `--rm`：容器停止后自动删除

### 其余命令

#### 查看所有容器

```bash
docker ps -a
```

#### 停止容器

```bash
docker stop <container_name>
```

#### 删除容器

```bash
docker rm <container_name>
```

#### 列举所有容器

```bash
docker ps
```

#### 列举所有容器 (包括停止的)

```bash
docker ps -a
```

#### 列举所有镜像

```bash
docker images
```

#### 删除镜像

```bash
docker rmi <image_name>
```

#### 拉取 Docker 镜像

```bash
docker pull <image_name>
```

#### 推送 Docker 镜像

```bash
docker push <image_name>
```

#### 查看 Docker 容器信息

```bash
docker inspect <container_name>
```

#### 查看 Docker 容器日志

```bash
docker logs <container_name>
```

#### Docker 容器操作

```bash
docker exec <container_name> <command>
```

#### 进入 Docker 容器

```bash
docker exec -it <container_name> /bin/bash
```

> 当我们使用 docker 构建多个镜像时，我们可以使用 docker-compose 来管理多个容器

### Docker Compose

如果你的项目涉及多个容器，比如一个跑应用、一个跑数据库，那么你需要 Docker Compose。它像一本多菜谱的菜单，一键可以上齐所有菜。

- **多容器应用程序**：当您的应用程序由多个容器组成时，可以使用 Docker Compose 来定义、管理和运行这些容器。
- **开发环境**：在开发过程中，使用 Docker Compose 可以轻松地设置开发环境，包括数据库、缓存和其他服务，以便团队成员可以快速启动整个开发环境。
- **测试环境**：您可以使用 Docker Compose 在测试环境中快速部署和管理多个容器，以便进行集成测试和端到端测试。
- **简化部署**：通过在生产环境中使用 Docker Compose，您可以轻松地部署整个应用程序栈，而不必手动设置每个容器。
- **快速原型**：使用 Docker Compose 可以快速创建原型和演示环境，而无需手动安装和配置多个服务。

> 通常用于本地开发环境，生产环境建议使用 Docker Swarm 或 Kubernetes。

#### 使用 Docker Compose

> 确保当前目录存在 docker-compose.yml compose.yml 文件
> 10.10.10.10 服务器的 docker-compose.yml 文件在/home/ocs/docker 目录下

#### Yml 文件如下，以及参数说明

```yml
version: "3" # 版本
services:
  sample: # 服务名
    build: # 构建镜像目录
      context: ./
      dockerfile: ./docker/Dockerfile
      args:
        NODE_ENV: production
    restart: always # 是否重启之后进行重启
    image: sampleName #  镜像名
    ports: # 端口
      - 3007:80 # 映射端口方式   ->  主机端口:容器端口
    container_name: sampleNameContainer # 容器名
    environment: # 环境变量
      - NGINX_PORT=80
      - API_ENV=api
      - API_URL=http://10.10.10.10:8081/horizon/
      - NODE_ENV=production
      - WEBAPP=horizon
    volumes: # 映射路径地址 ->  主机路径：容器路径
      - /home/nginx/conf.d:/etc/nginx/conf.d
    command: /bin/sh -c "envsubst '$$API_ENV,$$NGINX_PORT,$$API_URL,$$WEBAPP' < /etc/nginx/conf.d/https.template > /etc/nginx/conf.d/default.conf  && exec nginx -g 'daemon off;'" # 启动命令
    networks: # 虚拟网络名字
      - app-net
networks:
  app-net:
    external:
      name: app-net
```

#### 启动

```bash
docker-compose start 服务名
```

#### 停止

```bash
docker-compose stop 服务名
```

#### 删除容器

```bash
docker-compose rm 服务名
```

#### 构建镜像

```bash
docker-compose build 服务名
```

#### 构建容器

```bash
docker-compose up -d 服务名
```

#### 查看日志 最后 500 行

```bash
docker-compose logs --tail 500 服务名
```

### 参考

- [Docker 官方文档](https://docs.docker.com/)
- [Docker — 从入门到实践](https://yeasy.gitbook.io/docker_practice/)
- [Docker 教程](https://www.runoob.com/docker/docker-tutorial.html)
