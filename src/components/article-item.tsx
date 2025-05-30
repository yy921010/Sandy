import { Badge } from "@/components/ui/badge";
import { estimateReadingTime } from "@/lib/utils";
import type { ArticleItemProps, Post } from "@/types/blog";
import dayjs from "dayjs";
import Link from "next/link";

/**
 * 格式化创建日期
 */
function formatDate(date: string | Date): string {
  return dayjs(date).format("MM-DD");
}

/**
 * 文章列表项组件
 * 展示单个文章的标题、语言标签和创建日期
 */
export function ArticleItem({ article }: ArticleItemProps) {
  const { metadata, slug, content } = article;
  const formattedDate = formatDate(metadata.createdAt);

  return (
    <div className="group py-2 hover:bg-foreground/10 transition-colors rounded-md px-2">
      <Link href={`/${slug}`} className="block transition-colors">
        <div className="flex items-center">
          <div className="flex items-center space-x-3">
            {metadata.lang && (
              <Badge
                variant="outline"
                className="text-xs border-gray-600 text-gray-400 bg-transparent"
              >
                {metadata.lang}
              </Badge>
            )}
            <h2 className="text-xl font-medium group-hover:text-foreground transition-colors">
              {metadata.title}
            </h2>
          </div>
          <div className="text-foreground/50 text-sm whitespace-nowrap ml-4">
            {formattedDate}
          </div>
          <div className="text-foreground/50 text-sm whitespace-nowrap ml-4">
            {estimateReadingTime(content)} .Min
          </div>
        </div>

        {metadata.subtitle && (
          <p className="mt-2 text-gray-400 text-sm line-clamp-2">
            {metadata.subtitle}
          </p>
        )}
      </Link>
    </div>
  );
}
