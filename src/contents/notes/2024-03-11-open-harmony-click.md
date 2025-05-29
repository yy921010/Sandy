---
title: "OpenHarmony 中点击事件的渲染优化"
createdAt: 2024-03-11
description: "解决 OpenHarmony 应用中状态切换导致手机页面卡顿的问题"
comment: true
---

## 问题描述

在开发 OpenHarmony 输入法项目时，发现手机端在进行状态切换时出现页面卡顿现象，但在电脑端运行正常。

## 问题代码

原始实现方式如下，直接在 Text 组件上同时处理样式和点击事件：

```tsx
GridItem(){
  Text(){
    Span($r('app.string.single_word')).doubleFancy(!this.isDouble);
    Span('/').doubleFancy(false);
    Span($r('app.string.full_word')).doubleFancy(this.isDouble)
  }.onClick(()=>this.isDouble=!this.isDouble)
}.stateStyles({
  normal:{.backgroundColor($r('app.color.candiate_background'))},
  pressed: {
    .backgroundColor($r('app.color.pressed_background'))
  }
})
```

## 优化方案

将点击事件和样式处理分离：

```jsx
GridItem() {
  Text() {
    Span($r('app.string.single_word')).doubleFancy(!this.isDouble);
    Span('/').doubleFancy(false);
    Span($r('app.string.full_word')).doubleFancy(this.isDouble)
  }
}
.onClick(this.changeDouble.bind(this))
.stateStyles({
  normal: {
    .backgroundColor($r('app.color.candiate_background'))
  },
  pressed: {
    .backgroundColor($r('app.color.pressed_background'))
  }
})
```

## 优化效果

通过将样式渲染与事件处理分离，避免了重复渲染导致的性能问题，使页面切换更加流畅。
