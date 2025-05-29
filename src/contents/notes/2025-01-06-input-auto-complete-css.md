---
title: "修改 input 自动填充样式"
createdAt: 2025-01-06
description: "如何修改 input 元素的自动填充样式"
comment: true
---

```css
input:-internal-autofill-previewed {
  -webkit-text-fill-color: #fff !important;
  transition: background-color 5000s ease-in-out 0s !important;
}
input:-internal-autofill-selected {
  -webkit-text-fill-color: #fff !important;
  transition: background-color 5000s ease-in-out 0s !important;
}
```
