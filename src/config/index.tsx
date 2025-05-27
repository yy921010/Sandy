import type { Nav } from "@/types/nav";

export const SITE = {
  name: "Ethan Young",
  avatar: "/avatar.png",
  description: "Ethan Young 的个人博客，记录前端技术、编程实践和生活点滴。",
  url: "https://ethanyoung.me",
  ogImage: "https://ethanyoung.me/og.png",
  links: {
    github: "https://github.com/yy921010",
    email: "mailto:charlesmaxwellyoung@gmail.com",
  },
  footer: {
    copyright: "CC BY-NC-SA 4.0",
    copyrightUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
    year: new Date().getFullYear(),
    allRightsReserved: "All rights reserved",
    baseTitle: "Ethan Young's Blog",
    baseUrl: "https://ethanyoung.me",
  },
};

export const MAIN_NAV: Nav[] = [
  {
    title: "文章",
    url: "/articles",
  },
  {
    title: "友链",
    url: "/partner-link",
  },
];
