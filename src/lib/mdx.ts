import fs from "node:fs";
import matter from "gray-matter";
import path from "node:path";
import type { Post, PostMetadata } from "@/types/blog";

// 用于缓存博客文章，避免重复读取文件系统
const postsCache = new Map<string, Post[]>();

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
    };
  });
}

/**
 * 获取所有博客文章
 * @returns 博客文章数组
 */
export function getAllPosts(): Post[] {
  const contentDir = path.join(process.cwd(), "src", "contents", "blogs");

  // 使用缓存避免重复读取文件系统
  if (postsCache.has(contentDir)) {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    return postsCache.get(contentDir)!;
  }

  const posts = getMDXData(contentDir);
  postsCache.set(contentDir, posts);

  return posts;
}

export function getProfile(): Post[] {
  const contentDir = path.join(process.cwd(), "src", "contents", "profile");
  const posts = getMDXData(contentDir);
  return posts;
}

/**
 * 通过 slug 获取单个博客文章
 * @param slug 文章的 slug
 * @returns 博客文章或 undefined
 */
export function getPostBySlug(slug: string): Post | undefined {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug);
}

/**
 * 获取按日期排序的博客文章
 * @param limit 限制返回的文章数量
 * @returns 排序后的博客文章数组
 */
export function getSortedPosts(limit?: number): Post[] {
  const posts = getAllPosts();

  // 按创建日期降序排序
  console.log(
    "posts",
    posts.map((post) => post.metadata.createdAt),
  );
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.metadata.createdAt).getTime();
    const dateB = new Date(b.metadata.createdAt).getTime();
    return dateB - dateA;
  });

  return limit ? sortedPosts.slice(0, limit) : sortedPosts;
}

/**
 * 清除文章缓存
 */
export function clearPostsCache(): void {
  postsCache.clear();
}
