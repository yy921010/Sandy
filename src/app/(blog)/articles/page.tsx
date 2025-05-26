import { Badge } from "@/components/ui/badge";
import { getAllPosts } from "@/lib/mdx";
import type { PostMetadata } from "@/lib/types";

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
      if (!acc[article.metadata.year]) {
        acc[article.metadata.year] = [];
      }
      acc[article.metadata.year].push(article);
      return acc;
    },
    {} as Record<number, PostMetadata[]>,
  );

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <div className="relative z-10">
        <div className="container mx-auto px-6 py-8 max-w-4xl relative">
          {/* 顶部导航 */}
          <div className="flex justify-between items-start mb-16">
            <nav className="flex space-x-8">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href="#"
                  className={`text-lg font-medium transition-colors ${
                    item.active
                      ? "text-white"
                      : "text-gray-500 hover:text-gray-300"
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
                      <div key={article.id} className="group">
                        <a
                          href="/"
                          className="block hover:text-gray-300 transition-colors"
                        >
                          <div className="flex items-baseline justify-between">
                            <div className="flex items-center space-x-3">
                              {article.language && (
                                <Badge
                                  variant="outline"
                                  className="text-xs border-gray-600 text-gray-400 bg-transparent"
                                >
                                  {article.language}
                                </Badge>
                              )}
                              <h2 className="text-xl font-medium group-hover:text-white transition-colors">
                                {article.title}
                              </h2>
                            </div>
                            <div className="text-gray-500 text-sm whitespace-nowrap ml-4">
                              {article.date} · {article.readTime}
                            </div>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
