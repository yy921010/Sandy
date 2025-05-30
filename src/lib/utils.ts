import type { Heading } from "@/types/blog";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateNestedTOC(toc: Heading[]): Heading[] {
  const nestedTOC: Heading[] = [];
  const stack: Heading[] = [];
  for (const item of toc) {
    const newItem: Heading = { ...item, children: [] };
    while (stack.length > 0 && stack[stack.length - 1].depth >= newItem.depth) {
      stack.pop();
    }
    if (stack.length === 0) {
      nestedTOC.push(newItem);
    } else {
      stack[stack.length - 1].children?.push(newItem);
    }
    stack.push(newItem);
  }

  return nestedTOC;
}

export function estimateReadingTime(text: string): number {
  if (!text) return 0;

  // 一次性应用所有清理正则表达式
  const cleanText = text
    // 移除代码块
    .replace(/```[\s\S]*?```/g, "")
    // 移除行内代码
    .replace(/`[^`]*`/g, "")
    // 移除图片，保留链接文本
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // 移除HTML标签
    .replace(/<\/?[^>]+(>|$)/g, "")
    // 移除Markdown格式符号
    .replace(/^#+\s+/gm, "")
    .replace(/^[*-]\s+/gm, "")
    .replace(/^>\s+/gm, "")
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, "$1");

  // 中文字符检测和计算
  const chineseCharsCount = (cleanText.match(/[\u4e00-\u9fa5]/g) || []).length;
  // 如果有显著数量的中文字符
  if (chineseCharsCount > cleanText.length * 0.3) {
    return Math.max(1, Math.ceil(chineseCharsCount / 387));
  }

  // 英文单词计算
  const words = cleanText.split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 275));
}
