import * as React from "react";
import Giscus from "@giscus/react";

const GISCUS_CONFIG = {
  id: "comments",
  repo: "charlesMYoung/comment",
  repoId: "R_kgDOL338Cg",
  category: "Announcements",
  categoryId: "DIC_kwDOL338Cs4CfLVy",
  mapping: "title",
  term: "Welcome to @giscus/react component!",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "top",
  lang: "en",
  loading: "lazy",
} as const;

const useTheme = () => {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    const getInitialTheme = (): "light" | "dark" => {
      const theme = window.localStorage.getItem("theme");
      if (theme === "light" || theme === "dark") {
        return theme;
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    };

    setTheme(getInitialTheme());

    const observer = new MutationObserver(() => {
      setTheme(window.localStorage.getItem("theme") as "light" | "dark");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return theme;
};

const Comments: React.FC = () => {
  const theme = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div id="inject-comments" className="w-full">
      <Giscus {...GISCUS_CONFIG} theme={theme} />
    </div>
  );
};

export default Comments;
