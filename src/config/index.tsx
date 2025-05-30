import type { Nav } from "@/types/nav";
import type { Friend, Site } from "@/types/site";
import type { GiscusProps } from "@giscus/react";
import { FileText, Handshake } from "lucide-react";
import friends from "@/config/friends.json";

export const SITE: Site = {
  name: "Ethan Young",
  date: "2023-10-01",
  avatar: "/avatar.png",
  description: "Ethan Young 的个人博客，记录前端技术、编程实践和生活点滴。",
  url: "https://ethyoung.me",
  ogImage: "https://ethyoung.me/og.png",
  social: {
    github: "https://github.com/yy921010",
    email: "mailto:charlesmaxwellyoung@gmail.com",
  },
  footer: {
    copyright: "CC BY-NC-SA 4.0",
    copyrightUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
    year: new Date().getFullYear(),
    allRightsReserved: "All rights reserved",
    baseTitle: "Ethan Young's Blog",
    baseUrl: "https://ethyoung.me",
  },
  // 模拟链接数据 - 为了匹配图片效果，增加更多项
  friends: friends as Friend[],
};

export const COMMENTS: GiscusProps = {
  repo: "yy921010/Sandy",
  repoId: "R_kgDOOYuc0Q",
  category: "General",
  categoryId: "DIC_kwDOOYuc0c4CqvQR",
  mapping: "pathname",
};

export const NAV_LIST: Nav[] = [
  {
    title: "文章",
    url: "/blogs",
    icon: <FileText />,
    topShow: true,
  },
  {
    title: "笔记",
    url: "/notes",
  },
];

export const MAIN_NAV: Nav[] = [
  ...NAV_LIST,
  {
    title: "友链",
    url: "/links",
    icon: <Handshake />,
    topShow: true,
  },
];
