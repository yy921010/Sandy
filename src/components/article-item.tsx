import { Badge } from "@/components/ui/badge";
import type { Post } from "@/types/blog";
import dayjs from "dayjs";
import Link from "next/link";

interface ArticleItemProps {
  article: Post;
  showDescription?: boolean;
}

/**
 * 格式化创建日期
 */
function formatDate(date: string | Date): string {
  if (typeof date === "string") {
    return date;
  }
  return dayjs(date).format("YYYY-MM-DD");
}

/**
 * 文章列表项组件
 * 展示单个文章的标题、语言标签和创建日期
 */
export function ArticleItem({
  article,
  showDescription = false,
}: ArticleItemProps) {
  const { metadata, slug } = article;
  const formattedDate = formatDate(metadata.createdAt);

  return (
    <div className="group py-2 hover:bg-gray-800/10 transition-colors rounded-md px-2">
      <Link href={`/${slug}`} className="block transition-colors">
        <div className="flex items-baseline justify-between">
          <div className="flex items-center space-x-3">
            {metadata.language && (
              <Badge
                variant="outline"
                className="text-xs border-gray-600 text-gray-400 bg-transparent"
              >
                {metadata.language}
              </Badge>
            )}
            <h2 className="text-xl font-medium group-hover:text-white transition-colors">
              {metadata.title}
            </h2>
          </div>
          <div className="text-gray-500 text-sm whitespace-nowrap ml-4">
            {formattedDate}
          </div>
        </div>

        {showDescription && metadata.description && (
          <p className="mt-2 text-gray-400 text-sm line-clamp-2">
            {metadata.description}
          </p>
        )}
      </Link>
    </div>
  );
}
