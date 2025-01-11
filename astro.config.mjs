// @ts-nocheck
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

import vercel from "@astrojs/vercel";
import remarkMermaid from "remark-mermaidjs";
import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: "https://www.ethyoung.me",
  markdown: {
    remarkPlugins: [remarkMermaid],
  },
  integrations: [expressiveCode(), react(), tailwind(), mdx(), sitemap()],
  output: "static",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
