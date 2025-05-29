import { SITE } from "@/config";
import type { Post } from "@/types/blog";
import dayjs from "dayjs";
import type { BlogPosting, ProfilePage, WithContext } from "schema-dts";

export function getPageJsonLd(post: Post): WithContext<BlogPosting> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    description: post.metadata.description,
    image:
      post.metadata.image ||
      `/og?title=${encodeURIComponent(post.metadata.title)}`,
    url: `${SITE.url}/${post.slug}`,
    datePublished: dayjs(post.metadata.createdAt).toISOString(),
    dateModified: dayjs(post.metadata.updatedAt).toISOString(),
    author: {
      "@type": "Person",
      name: SITE.name,
      identifier: SITE.name,
      image: SITE.url + SITE.avatar,
    },
  };
}

export function getProfileJsonLd(): WithContext<ProfilePage> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: dayjs(SITE.date).toISOString(),
    dateModified: dayjs().toISOString(),
    mainEntity: {
      "@type": "Person",
      name: SITE.name,
      identifier: SITE.name,
      image: SITE.avatar,
    },
  };
}
