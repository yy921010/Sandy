import { Button } from "@heroui/react";
import { Moon, Sun } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { themeAtom } from "~/store";

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const buttonRef = useRef<HTMLButtonElement>(null);

  const getSystemTheme = (): "light" | "dark" => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const initTheme = (): "light" | "dark" => {
    const localTheme = window.localStorage.getItem("theme");
    return localTheme === "auto"
      ? getSystemTheme()
      : (localTheme as "light" | "dark") || "light";
  };

  const updateTheme = (newTheme: "light" | "dark"): void => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
    document.documentElement.style.colorScheme = newTheme;
    document.documentElement.setAttribute("data-theme", newTheme);
    themeAtom.set(newTheme);
    setTheme(newTheme);
    const metaThemeColor = document.querySelector(
      'meta[name="theme-color"]'
    ) as HTMLMetaElement | null;
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        newTheme === "dark" ? "#000000" : "#ffffff"
      );
    }
    window.localStorage.setItem("theme", newTheme);
  };

  const animateThemeTransition = async (
    x: number,
    y: number
  ): Promise<void> => {
    if (!document.startViewTransition) {
      return;
    }

    const radius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${radius}px at ${x}px ${y}px)`,
    ];

    try {
      const transition = document.startViewTransition(async () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        updateTheme(newTheme);
      });

      await transition.ready;

      await document.documentElement.animate(
        { clipPath: theme === "dark" ? clipPath : clipPath.reverse() },
        {
          duration: 400,
          easing: "ease-in-out",
          pseudoElement:
            theme === "dark"
              ? "::view-transition-new(root)"
              : "::view-transition-old(root)",
        }
      ).finished;
    } catch (error) {
      console.error("Animation failed:", error);
    }
  };

  const handleThemeChange = async () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      await animateThemeTransition(
        rect.x + rect.width / 2,
        rect.y + rect.height / 2
      );
    }
  };

  useEffect(() => {
    const currentTheme = initTheme();
    updateTheme(currentTheme);
  }, []);

  return (
    <Button
      variant="light"
      isIconOnly
      ref={buttonRef}
      onPress={handleThemeChange}
      className="p-2 transition-colors duration-300"
    >
      <div className="transition-opacity duration-300">
        {theme === "light" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </div>
    </Button>
  );
};

export default ThemeSwitcher;
