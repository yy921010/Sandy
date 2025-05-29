import type { Nav } from "@/types/nav";
import type { Site } from "@/types/site";
import { FileText, Handshake } from "lucide-react";

export const SITE: Site = {
  name: "Ethan Young",
  date: "2023-10-01",
  avatar: "/avatar.png",
  description: "Ethan Young 的个人博客，记录前端技术、编程实践和生活点滴。",
  url: "https://ethanyoung.me",
  ogImage: "https://ethanyoung.me/og.png",
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
    baseUrl: "https://ethanyoung.me",
  },
  // 模拟链接数据 - 为了匹配图片效果，增加更多项
  friends: [
    {
      id: "花墨",
      name: "花墨",
      tier: "platinum",
      size: "lg",
      logo: "https://api.flowersink.com/img/logo.png",
      url: "https://flowersink.com",
      desc: "一个喜欢写作、分享生活的已婚前端的个人网站",
    },
    {
      id: "我要去巴萨",
      tier: "platinum",
      size: "lg",
      name: "我要去巴萨",
      logo: "",
      url: "https://www.aaabbc.space:8095/",
      desc: "技术分享博客",
    },
    {
      id: "敖武的博客",
      tier: "platinum",
      size: "lg",
      logo: "",
      name: "敖武的博客",
      url: "https://z.wiki",
      desc: "啦啦啦",
    },
    {
      id: "张洪Heo",
      tier: "platinum",
      size: "lg",
      name: "张洪Heo",
      url: "https://blog.zhheo.com/",
      desc: "分享设计与科技生活",
      logo: "https://bu.dusays.com/2022/12/28/63ac2812183aa.png",
    },
    {
      id: "凌飞阁",
      tier: "platinum",
      size: "lg",
      name: "凌飞阁",
      url: "https://llingfei.com",
      desc: "烂柯山与浮云齐，突星骑石凌飞鸟。",
      logo: "https://llingfei.com/tx.jpg",
    },
  ],
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
