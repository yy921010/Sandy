"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";
import { createId } from "@paralleldrive/cuid2";
import { useTheme } from "next-themes";

export function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();

  useEffect(() => {
    // 设置mermaid主题
    mermaid.initialize({
      theme: theme === "dark" ? "dark" : "base",
      startOnLoad: false,
    });
  }, [theme]);

  useEffect(() => {
    if (ref.current) {
      // 使用安全的ID格式，避免小数点和特殊字符
      const id = `mermaid-diagram-${createId()}`;
      mermaid.render(id, chart).then((result) => {
        if (ref.current) {
          ref.current.innerHTML = result.svg;
        }
      });
    }
  }, [chart]);

  return <div ref={ref} />;
}
