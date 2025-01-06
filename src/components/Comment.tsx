import * as React from "react";
import Giscus from "@giscus/react";

const id = "inject-comments";

// 获取 localStorage 中 theme 的值
function getSavedTheme() {
  return window.localStorage.getItem("theme");
}

// 获取系统主题
function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

const Comments = () => {
  const [mounted, setMounted] = React.useState(false);
  const [theme, setTheme] = React.useState("light");

  React.useEffect(() => {
    const theme = getSavedTheme() || getSystemTheme();
    setTheme(theme);
    // 监听主题变化
    const observer = new MutationObserver(() => {
      setTheme(getSavedTheme());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // 取消监听
    return () => {
      observer.disconnect();
    };
  }, []);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div id={id} className="w-full">
      {mounted ? (
        <Giscus
          id="comments"
          repo="charlesMYoung/comment"
          repoId="R_kgDOL338Cg"
          category="Announcements"
          categoryId="DIC_kwDOL338Cs4CfLVy"
          mapping="title"
          term="Welcome to @giscus/react component!"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme={theme}
          lang="en"
          loading="lazy"
        />
      ) : null}
    </div>
  );
};

export default Comments;
