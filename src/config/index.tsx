import type { BlogConfig } from "~/types/config";

export const Config: BlogConfig = {
  base: {
    title: "Ethan Young",
    description: "I am a software engineer and a writer.",
    baseUrl: "https://www.ethyoung.me",
    author: "Ethan Young",
  },
  social: {
    github: "https://github.com/charsm",
    email: "mailto:charlesmaxwellyoung@gmail.com",
  },
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
  ],
  menus: [
    {
      title: "文章",
      url: "/blog",
      key: "blog",
      children: [
        {
          title: "生活",
          url: "/essay",
        },
        {
          title: "技术",
          url: "/tech",
        },
        {
          title: "笔记",
          url: "/note",
        },
        {
          title: "日志",
          url: "/log",
        },
      ],
    },
    {
      title: "友链",
      url: "/partner-link",
      key: "partnerLink",
    },
  ],
};
