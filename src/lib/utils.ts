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
