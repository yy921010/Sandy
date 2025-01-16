import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  schema: z.object({
    isDraft: z.boolean().optional().default(false),
    title: z.string(),
    pubDate: z.date(),
    description: z.string().optional().default(""),
    comment: z.boolean().optional().default(false),
    tags: z.array(z.string()).optional().default([]),
    toc: z.boolean().optional().default(false),
  }),
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./data" }),
});

export const collections = {
  posts,
};
