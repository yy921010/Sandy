import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const posts = defineCollection({
	schema: z.object({
		draft: z.boolean().optional().default(false),
		title: z.string(),
		pubDate: z.date(),
		description: z.string().optional().default(""),
		comment: z.boolean().optional().default(false),
		tags: z.array(z.string()).optional().default([]),
		toc: z.boolean().optional().default(false),
	}),
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/data/posts" }),
});

const tlf = defineCollection({
	schema: z.object({
		title: z.string(),
		pubDate: z.date(),
		description: z.string().optional().default(""),
		comment: z.boolean().optional().default(false),
		tags: z.array(z.string()).optional().default([]),
		toc: z.boolean().optional().default(false),
	}),
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/data/tlf" }),
});

export const collections = {
	posts,
	tlf,
};
