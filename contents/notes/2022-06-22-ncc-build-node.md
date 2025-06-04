---
title: "ncc 打包编译nestjs"
createdAt: 2022-06-22
description: "ncc 打包编译nestjs"
comment: true
---

# 背景：

最近在使用[ncc](https://github.com/vercel/ncc) 打包编译 nestjs，由于 nestjs 使用 hbs 作为模版引擎。

原先官网样例：

```bash
npm install --save hbs
```

```ts
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  //直接使用设置模版
  app.setViewEngine("hbs");

  await app.listen(3000);
}
bootstrap();
```

这样通过 ncc 编译，会存在丢失问题：

因此做如下设置即可：

```ts
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { AppModule } from "./app.module";
import * as HBS from "hbs";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  //手动重写
  app.set("view engine", "hbs");
  app.engine("hbs", HBS.__express);

  await app.listen(3000);
}
bootstrap();
```

通过将其引入，再次编译即可。
