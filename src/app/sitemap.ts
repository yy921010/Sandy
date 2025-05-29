import dayjs from "dayjs";
import type { MetadataRoute } from "next";

import { NAV_LIST, SITE } from "@/config";
import { allPosts } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = allPosts().map((post) => ({
    url: `${SITE.url}/${post.slug}`,
    lastModified: dayjs(post.metadata.updatedAt).toISOString(),
  }));
  const urls = NAV_LIST.map((item) => item.url);
  const routes = ["", ...urls].map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: dayjs().toISOString(),
  }));

  return [...routes, ...posts];
}
