---
title: "credentials VS withCredentials"
createdAt: 2025-01-16
description: "credentials withCredentials两者之间的区别"
comment: true
toc: true
---

## 背景

最近在做 SSE 功能优化时，将项目中的将原生的 [EventSource](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource) 替换为 [@microsoft/fetch-event-source](https://github.com/Azure/fetch-event-source)

由于 @microsoft/fetch-event-source 使用 fetchAPI, 而原生的 EventSource 使用 XMLHttpRequest
![1737010665864.png](https://home.matrixpunk.com:9800/i/2025/01/16/6788aded4123d.png)

所以在替换过程中，发现了 **credentials** 和 **withCredentials** 两者之间的区别。

## 相同点

**credentials** 和 **withCredentials** 两者都是用来传递敏感信息；如：Cookie、Token 等。

## 不同点

### credentials

- 用于 [FetchAPI](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/fetch)
- 取值范围：omit、same-origin、include
  - omit: 默认值，表示不发送或接收任何凭据（不发送 Cookies，也不存储服务器返回的 Cookies）。
  - same-origin: 仅在请求与当前页面是同源时发送和接收凭据（Cookies 或 HTTP 认证信息）。
  - include: 无论请求是否跨域，都发送和接收凭据。
- 用法
  ```js
  fetch("https://example.com", {
    credentials: "include",
  });
  ```

### withCredentials

- 用于 [XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)
- 取值：true、false
  - true: 表示允许跨域请求携带凭据，如：Cookies、HTTP 认证信息。
  - false: 默认值，表示不允许跨域请求携带凭据。
- 用法
  ```js
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.open("GET", "https://example.com", true);
  xhr.send();
  ```
