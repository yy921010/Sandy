"use client";

import Giscus from "@giscus/react";
import { COMMENTS } from "@/config";
import { useTheme } from "next-themes";
export const Comments = () => {
  const { theme } = useTheme();
  return (
    <Giscus
      id="comments"
      repo={COMMENTS.repo}
      repoId={COMMENTS.repoId}
      category={COMMENTS.category}
      categoryId={COMMENTS.categoryId}
      mapping={COMMENTS.mapping}
      term="Welcome to @giscus/react component!"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={theme}
      lang="en"
      loading="lazy"
    />
  );
};
