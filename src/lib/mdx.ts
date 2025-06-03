import fs from "node:fs";
import matter from "gray-matter";
import path from "node:path";
import type { Heading, Post, PostMetadata } from "@/types/blog";
import { NAV_LIST } from "@/config";

/**
 * 解析 MDX 文件的 frontmatter
 * @param fileContent MDX 文件内容
 * @returns 解析后的元数据和内容
 */
function parseFrontmatter(fileContent: string) {
  try {
    const file = matter(fileContent);

    return {
      metadata: file.data as PostMetadata,
      content: file.content,
    };
  } catch (error) {
    console.error("解析 frontmatter 失败:", error);
    throw new Error(
      `解析 frontmatter 失败: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

/**
 * 获取指定目录下的所有 MDX 文件
 * @param dir 目录路径
 * @returns MDX 文件名数组
 */
function getMDXFiles(dir: string): string[] {
  try {
    if (!fs.existsSync(dir)) {
      console.warn(`目录不存在: ${dir}`);
      return [];
    }
    return fs
      .readdirSync(dir)
      .filter((file) => [".mdx", ".md"].includes(path.extname(file)));
  } catch (error) {
    console.error(`读取目录失败 ${dir}:`, error);
    return [];
  }
}

/**
 * 读取并解析 MDX 文件
 * @param filePath MDX 文件路径
 * @returns 解析后的元数据和内容
 */
function readMDXFile(filePath: string) {
  try {
    const rawContent = fs.readFileSync(filePath, "utf-8");
    return parseFrontmatter(rawContent);
  } catch (error) {
    console.error(`读取文件失败 ${filePath}:`, error);
    throw new Error(
      `读取文件失败 ${filePath}: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

export function extractMdxHeadings(mdxContent: string): Array<Heading> {
  const headings: Array<Heading> = [];
  // 匹配 `#` 语法的标题
  const headingMatcher = /^(#+)\s(.+)$/gm;
  let match = headingMatcher.exec(mdxContent);
  while (match) {
    const depth = match[1].length; // `#` 的数量决定标题的深度
    const text = match[2].trim();
    // 创建标题对象
    const heading: Heading = {
      depth,
      slug: text,
      text,
    };

    // 如果当前标题深度大于上一个标题，则将其添加为子标题
    if (headings.length > 0 && headings[headings.length - 1].depth < depth) {
      const parentHeading = headings[headings.length - 1];
      if (!parentHeading.children) {
        parentHeading.children = [];
      }
      parentHeading.children.push(heading);
    } else {
      headings.push(heading);
    }

    match = headingMatcher.exec(mdxContent);
  }
  return headings;
}
/**
 * 获取指定目录下所有 MDX 文件的数据
 * @param dir 目录路径
 * @returns 博客文章数组
 */
function getMDXData(dir: string): Post[] {
  const mdxFiles = getMDXFiles(dir);

  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));
    const headings = extractMdxHeadings(content);
    // 确保 createdAt 和 updatedAt 是字符串类型
    if (metadata.createdAt && typeof metadata.createdAt !== "string") {
      metadata.createdAt = new Date(metadata.createdAt)
        .toISOString()
        .split("T")[0];
    }

    if (metadata.updatedAt && typeof metadata.updatedAt !== "string") {
      metadata.updatedAt = new Date(metadata.updatedAt)
        .toISOString()
        .split("T")[0];
    }

    return {
      metadata,
      slug,
      content,
      headings,
    };
  });
}

/**
 * 获取所有博客文章
 * @returns 博客文章数组
 */
export function getPostsMap(): Map<string, Post[]> {
  const postsMap = new Map<string, Post[]>();
  for (const nav of NAV_LIST) {
    const key = nav.url.replace(/^\//, "");
    const contentDir = path.join(process.cwd(), "src", "contents", key);
    postsMap.set(key, getMDXData(contentDir));
  }
  return postsMap;
}

export const articlesByYear = (dirname: string): Record<number, Post[]> => {
  const posts = getPostsMap().get(dirname) || [];
  // 按年份分组文章
  return posts.reduce(
    (acc, post) => {
      const year =
        post.metadata.year ||
        (post.metadata.createdAt
          ? new Date(post.metadata.createdAt).getFullYear()
          : new Date().getFullYear());
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    },
    {} as Record<number, Post[]>,
  );
};

export function getProfile(lang = ""): Post[] {
  const contentDir = path.join(
    process.cwd(),
    "src",
    "contents",
    "profile",
    lang,
  );
  return getMDXData(contentDir);
}

/**
 * 通过 slug 获取单个博客文章
 * @param slug 文章的 slug
 * @returns 博客文章或 undefined
 */
export function allPosts(): Post[] {
  const postsMap = getPostsMap();
  return Array.from(postsMap.values()).flat();
}
