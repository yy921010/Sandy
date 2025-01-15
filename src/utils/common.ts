import type { TransitionDirectionalAnimations } from "astro";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { TOCItem } from "~/types/common";

export const removeSlash = (str: string) => str.replace(/^\//, "");

export const groupBy = <T>(array: T[], key: keyof T) => {
  return array.reduce((result: Record<string, T[]>, currentValue) => {
    const keyValue = currentValue[key] as unknown as string; // Cast the key value to string
    (result[keyValue] = result[keyValue] ?? []).push(currentValue);
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
      name: "slide-out",
      duration: "0.2s",
      easing: "ease-in",
    },
    new: {
      name: "slide-in",
      duration: "0.35s",
      easing: "ease-in-out",
    },
  },
  backwards: {
    old: {
      name: "slide-out",
      duration: "0.2s",
      easing: "ease-in",
    },
    new: {
      name: "slide-in",
      duration: "0.35s",
      easing: "ease-in-out",
    },
  },
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateNestedTOC(toc: TOCItem[]): TOCItem[] {
  const nestedTOC: TOCItem[] = [];
  const stack: TOCItem[] = [];

  toc.forEach((item) => {
    const newItem: TOCItem = { ...item, children: [] };

    while (stack.length > 0 && stack[stack.length - 1].depth >= newItem.depth) {
      stack.pop();
    }

    if (stack.length === 0) {
      nestedTOC.push(newItem);
    } else {
      stack[stack.length - 1].children!.push(newItem);
    }

    stack.push(newItem);
  });

  return nestedTOC;
}
