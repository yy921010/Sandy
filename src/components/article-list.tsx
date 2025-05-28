import type { Post } from "@/types/blog";
import { SubNavbar } from "./sub-navbar";
import { ArticleItem } from "./article-item";
import { articlesByYear } from "@/lib/mdx";

export function ArticleList({
  postKey,
}: {
  postKey: string;
}) {
  const posts = articlesByYear(postKey);
  return (
    <>
      <div className="flex justify-between items-start mb-16">
        <nav className="flex flex-col space-y-6 md:flex-row md:space-x-8 ">
          <SubNavbar activeUrl={postKey} />
        </nav>
      </div>
      <div className="space-y-20">
        {Object.entries(posts)
          .sort(([a], [b]) => Number(b) - Number(a))
          .map(([year, yearArticles]) => (
            <div key={year} className="relative">
              <time
                dateTime={year}
                className="font-limelight absolute -left-8 md:-left-4 top-0 text-[6rem] md:text-[8rem] font-bold text-foreground/10 leading-none pointer-events-none select-none"
              >
                {year}
              </time>
              <div className="relative z-10 space-y-6 pt-8">
                {yearArticles.map((article: Post) => (
                  <ArticleItem key={article.metadata.title} article={article} />
                ))}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
