import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXFallback } from "./MDXFallback";

// 增强版MDX渲染组件，具有错误处理能力
export function MDX({ code }: { code: string }) {
  // 尝试安全解析MDX内容
  try {
    return <MDXRemote source={code} />;
  } catch (error) {
    console.error("MDX渲染错误，使用降级方案:", error);

    // 如果MDX解析失败，使用MDXFallback组件作为降级方案
    return <MDXFallback code={code} />;
  }
}
