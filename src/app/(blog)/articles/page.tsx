import { Badge } from "@/components/ui/badge";
import { getAllPosts } from "@/lib/mdx";
import type { Post, PostMetadata } from "@/types/blog";
import dayjs from "dayjs";

const navigationItems = [
  { name: "Blog", active: true },
  { name: "Talks", active: false },
  { name: "Podcasts", active: false },
  { name: "Streams", active: false },
  { name: "Notes", active: false },
];

export default async function Page() {
  const allPost = await getAllPosts();
  // 按年份分组文章
  const articlesByYear = allPost.reduce(
    (acc, article) => {
      const year =
        article.metadata.year ||
        (article.metadata.createdAt
          ? dayjs(article.metadata.createdAt).year()
          : new Date().getFullYear());
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(article);
      return acc;
    },
    {} as Record<number, Post[]>,
  );
  return (
    <>
      <div className="flex justify-between items-start mb-16">
        <nav className="flex space-x-8">
          {navigationItems.map((item) => (
            <a
              key={item.name}
              href="/"
              className={`text-lg font-medium transition-colors ${
                item.active ? "text-white" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>

      {/* 文章列表 */}
      <div className="space-y-20">
        {Object.entries(articlesByYear)
          .sort(([a], [b]) => Number(b) - Number(a))
          .map(([year, yearArticles]) => (
            <div key={year} className="relative">
              {/* 年份背景 */}
              <div className="absolute -left-8 md:-left-4 top-0 text-[8rem] md:text-[12rem] font-bold text-gray-800/30 leading-none pointer-events-none select-none">
                {year}
              </div>

              {/* 文章列表 */}
              <div className="relative z-10 space-y-6 pt-8">
                {yearArticles.map((article, index) => (
                  <div key={article.metadata.title} className="group">
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
                            : dayjs(article.metadata.createdAt).format(
                                "YYYY-MM-DD",
                              )}
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
