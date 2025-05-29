import dayjs from "dayjs";
import type { MetadataRoute } from "next";

import { SITE } from "@/config";
import { allPosts } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = allPosts().map((post) => ({
    url: `${SITE.url}/${post.slug}`,
    lastModified: dayjs(post.metadata.updatedAt).toISOString(),
  }));

  const routes = ["", "/blogs", "/notes", "/links"].map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: dayjs().toISOString(),
  }));

  return [...routes, ...posts];
}
