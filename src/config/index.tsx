import type { BlogConfig } from "~/types/config";

export const Config: BlogConfig = {
  base: {
    title: "Ethan Young",
    description: "I am a software engineer and a writer.",
    baseUrl: "https://www.ethyoung.me",
    author: "Ethan Young",
  },
  social: {
    github: "https://github.com/yy921010",
    email: "mailto:charlesmaxwellyoung@gmail.com",
  },
  samples: [
    {
      title: "Ethan Young",
      subtitle: "My blog",
      image: "https://home.matrixpunk.com:9800/i/2025/03/09/67cd822b5ec90.gif",
      url: "https://ethyoung.me",
    },
  ],
  partnerLinks: [
    {
      name: "花墨",
      avatar: "https://api.flowersink.com/img/logo.png",
      url: "https://flowersink.com",
      desc: "一个喜欢写作、分享生活的已婚前端的个人网站",
    },
    {
      name: "我要去巴萨",
      url: "https://www.aaabbc.space:8095/",
      desc: "技术分享博客",
    },
    {
      name: "敖武的博客",
      url: "https://z.wiki",
      desc: "啦啦啦",
    },
    {
      name: "张洪Heo",
      url: "https://blog.zhheo.com/",
      desc: "分享设计与科技生活",
      avatar: "https://bu.dusays.com/2022/12/28/63ac2812183aa.png",
    },
    {
      name: "凌飞阁",
      url: "https://llingfei.com",
      desc: "烂柯山与浮云齐，突星骑石凌飞鸟。",
      avatar: "https://llingfei.com/tx.jpg",
    },
  ],
  menus: [
    {
      title: "文章",
      url: "/blog",
      key: "blog",
      children: [
        {
          title: "生活",
          url: "/life",
        },
        {
          title: "技术",
          url: "/tech",
        },
        {
          title: "笔记",
          url: "/note",
        },
      ],
    },
    {
      title: "友链",
      url: "/partner-link",
      key: "partnerLink",
    },
    {
      title: "Projects",
      url: "/projects",
      key: "project",
    },
  ],
};
