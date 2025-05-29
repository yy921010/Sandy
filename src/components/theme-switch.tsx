"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

// 为 window 添加全局方法类型声明
declare global {
  interface Window {
    syncTheme?: () => void;
  }
}

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 将这些函数用 useCallback 包装，避免重复创建
  const getSystemTheme = React.useCallback((): "light" | "dark" => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }, []);

  const initTheme = React.useCallback((): "light" | "dark" => {
    const localTheme = window.localStorage.getItem("theme");
    if (localTheme === "auto" || localTheme === "system") {
      return getSystemTheme();
    }
    return localTheme === "dark" ? "dark" : "light";
  }, [getSystemTheme]);

  // 更新主题的统一方法，使用全局 syncTheme 函数确保与 BaseLayout 保持一致
  const updateTheme = (newTheme: "light" | "dark"): void => {
    // 使用状态管理更新组件状态
    setTheme(newTheme);

    // 保存用户设置
    window.localStorage.setItem("theme", newTheme);

    // 使用全局同步函数更新DOM，避免重复主题设置逻辑
    if (window.syncTheme) {
      window.syncTheme();
    } else {
      // 降级方案，直接设置主题
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(newTheme);
      document.documentElement.style.colorScheme = newTheme;
      document.documentElement.setAttribute("data-theme", newTheme);

      const metaThemeColor = document.querySelector(
        'meta[name="theme-color"]',
      ) as HTMLMetaElement | null;
      if (metaThemeColor) {
        metaThemeColor.setAttribute(
          "content",
          newTheme === "dark" ? "#000000" : "#ffffff",
        );
      }
    }
  };

  const animateThemeTransition = async (
    x: number,
    y: number,
  ): Promise<void> => {
    if (!document.startViewTransition) {
      // 降级：直接切换主题
      const newTheme = theme === "dark" ? "light" : "dark";
      updateTheme(newTheme);
      return;
    }

    // 添加 no-transition 类来防止过渡期间的闪烁
    // 确保在页面切换期间不会有主题转换动画
    document.documentElement.classList.add("no-transition");

    // 延迟执行移除操作，确保主题变更已完成
    const removeNoTransition = () => {
      setTimeout(() => {
        document.documentElement.classList.remove("no-transition");
      }, 50);
    };

    const radius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    );

    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${radius}px at ${x}px ${y}px)`,
    ];

    try {
      // 检查是否有正在进行的页面切换
      const isPageTransitioning =
        document.readyState !== "complete" ||
        document.documentElement.classList.contains("astro-transitioning");

      // 在视图过渡中切换主题
      const newTheme = theme === "dark" ? "light" : "dark";

      // 如果当前有页面切换在进行中，则直接更新主题而不使用动画
      if (isPageTransitioning) {
        updateTheme(newTheme);
        return;
      }

      const transition = document.startViewTransition(async () => {
        updateTheme(newTheme);
      });

      await transition.ready;

      // 使用更长的动画时长，使扩散效果更明显
      await document.documentElement.animate(
        { clipPath: theme === "dark" ? clipPath : clipPath.reverse() },
        {
          duration: 350,
          easing: "cubic-bezier(0.33, 1, 0.68, 1)", // 使用更强调的缓动函数
          pseudoElement:
            theme === "dark"
              ? "::view-transition-new(root)"
              : "::view-transition-old(root)",
        },
      ).finished;

      // 动画完成后移除无过渡类
      removeNoTransition();
    } catch (error) {
      console.error("Animation failed:", error);
      // 出错时也确保主题切换成功
      const newTheme = theme === "dark" ? "light" : "dark";
      updateTheme(newTheme);
      // 即使出错也要移除无过渡类
      removeNoTransition();
    }
  };

  const handleThemeChange = async () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      await animateThemeTransition(
        rect.x + rect.width / 2,
        rect.y + rect.height / 2,
      );
    }
  };

  // 组件挂载时设置初始主题状态
  useEffect(() => {
    const currentTheme = initTheme();
    setTheme(currentTheme);

    // 监听主题变化（例如系统主题改变）
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme === "auto" || storedTheme === "system") {
        const systemTheme = getSystemTheme();
        setTheme(systemTheme);
      }
    };

    // 使用更现代的事件监听器语法
    try {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } catch (e) {
      // 兼容旧浏览器
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [initTheme, getSystemTheme, setTheme]);

  return (
    <Button
      ref={buttonRef}
      variant="ghost"
      size="sm"
      onClick={handleThemeChange}
      className="relative"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeSwitcher;
