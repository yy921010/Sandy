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
  ],
};
