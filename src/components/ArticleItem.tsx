import { Badge } from "@/components/ui/badge";
import type { Post } from "@/types/blog";
import dayjs from "dayjs";

interface ArticleItemProps {
  article: Post;
}

/**
 * 文章列表项组件
 * 展示单个文章的标题、语言标签和创建日期
 */
export function ArticleItem({ article }: ArticleItemProps) {
  return (
    <div className="group">
      <a
        href={article.slug}
        className="block hover:text-gray-300 transition-colors"
      >
        <div className="flex items-baseline justify-between">
          <div className="flex items-center space-x-3">
            {article.metadata.language && (
              <Badge
                variant="outline"
                className="text-xs border-gray-600 text-gray-400 bg-transparent"
              >
                {article.metadata.language}
              </Badge>
            )}
            <h2 className="text-xl font-medium group-hover:text-white transition-colors">
              {article.metadata.title}
            </h2>
          </div>
          <div className="text-gray-500 text-sm whitespace-nowrap ml-4">
            {typeof article.metadata.createdAt === "string"
              ? article.metadata.createdAt
              : dayjs(article.metadata.createdAt).format("YYYY-MM-DD")}
          </div>
        </div>
      </a>
    </div>
  );
}
