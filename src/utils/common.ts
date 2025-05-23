import type { TransitionDirectionalAnimations } from "astro";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { TOCItem } from "~/types/common";

export const removeSlash = (str: string) => str.replace(/^\//, "");

export const groupBy = <T>(array: T[], key: keyof T) => {
  return array.reduce((result: Record<string, T[]>, currentValue) => {
    const keyValue = currentValue[key] as unknown as string; // Cast the key value to string
    if (!result[keyValue]) {
      result[keyValue] = [];
    }
    result[keyValue].push(currentValue);
    return result;
  }, {});
};

export const groupByArray = <T>(array: T[], key: keyof T) => {
  return Object.entries(groupBy(array, key))
    .map(([key, value]) => ({
      key,
      value,
    }))
    .sort((a, b) => {
      return +b.key - +a.key;
    });
};

export const animation: TransitionDirectionalAnimations = {
  forwards: {
    old: {
      name: "astro-slide-out",
      duration: "0.3s",
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      fillMode: "both",
    },
    new: {
      name: "astro-slide-in",
      duration: "0.3s",
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      fillMode: "both",
      delay: "0.1s", // 添加延迟，等待旧页面完全消失
    },
  },
  backwards: {
    old: {
      name: "astro-slide-out",
      duration: "0.3s",
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      fillMode: "both",
    },
    new: {
      name: "astro-slide-in",
      duration: "0.3s",
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      fillMode: "both",
      delay: "0.1s", // 添加延迟，等待旧页面完全消失
    },
  },
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateNestedTOC(toc: TOCItem[]): TOCItem[] {
  const nestedTOC: TOCItem[] = [];
  const stack: TOCItem[] = [];
  for (const item of toc) {
    const newItem: TOCItem = { ...item, children: [] };
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

export const replaceSlash = (str: string) => str.replace(/\//g, "-");
