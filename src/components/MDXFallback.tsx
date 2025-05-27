"use client";

import dynamic from "next/dynamic";

// 动态导入降级组件，仅在客户端渲染
const MarkdownFallback = dynamic(
  () => import("./MarkdownFallback").then((mod) => mod.MarkdownFallback),
  { ssr: false },
);

// 客户端降级组件
export function MDXFallback({ code }: { code: string }) {
  return <MarkdownFallback content={code} />;
}
