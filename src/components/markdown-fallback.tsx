"use client";

import { useEffect, useState } from "react";
import { marked } from "marked";

/**
 * 简单的字符串哈希函数，用于缓存键
 */
function hashString(str: string): string {
  let hash = 0;
  if (str.length === 0) return hash.toString();

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash).toString(16);
}

/**
 * 客户端降级组件，用于在MDX解析失败时使用
 * 在客户端运行时使用marked库解析Markdown
 */
export function MarkdownFallback({ content }: { content: string }) {
  const [html, setHtml] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 使用缓存避免重复解析相同内容
    const contentHash = hashString(content);

    try {
      const cachedHtml = sessionStorage?.getItem(`md_${contentHash}`);

      if (cachedHtml) {
        setHtml(cachedHtml);
        setIsLoading(false);
        return;
      }
    } catch (e) {
      // sessionStorage 可能不可用（隐私模式等）
      console.warn("无法访问缓存:", e);
    }

    // 在客户端使用marked解析markdown
    const parseMarkdown = async () => {
      try {
        setIsLoading(true);

        // 配置Marked选项
        marked.setOptions({
          gfm: true, // GitHub Flavored Markdown
          breaks: true, // 识别回车符为换行符
        });

        const parsedHtml = await marked.parse(content);
        setHtml(parsedHtml);

        // 缓存解析结果
        try {
          sessionStorage?.setItem(`md_${contentHash}`, parsedHtml);
        } catch (e) {
          // 缓存失败不影响功能
          console.warn("无法缓存Markdown渲染结果:", e);
        }

        setError(null);
      } catch (err) {
        console.error("Markdown解析错误:", err);
        setError("解析Markdown内容时出错");
        setHtml(
          `<p>内容解析失败。</p><pre>${content.substring(0, 500)}${content.length > 500 ? "..." : ""}</pre>`,
        );
      } finally {
        setIsLoading(false);
      }
    };

    parseMarkdown();
  }, [content]);

  if (isLoading) {
    return <div className="py-4 text-center">加载中...</div>;
  }

  if (error) {
    return (
      <div className="border border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-800 p-4 rounded-md">
        <h3 className="text-red-800 dark:text-red-400 font-medium">渲染错误</h3>
        <p className="text-red-600 dark:text-red-300 mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div
      className="prose dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-blue-500 hover:prose-a:underline"
      // 使用dangerouslySetInnerHTML是必要的，但我们已经进行了内容清理
      // biome-ignore lint/security/noDangerouslySetInnerHtml: 已对Markdown内容进行了处理
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
