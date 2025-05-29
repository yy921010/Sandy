import { allPosts } from "@/lib/mdx";
import dayjs from "dayjs";
import { SITE } from "@/config";

export async function GET() {
  const allArticles = allPosts();
  const itemsXml = allArticles
    .slice()
    .sort((a, b) =>
      dayjs(b.metadata.createdAt).diff(dayjs(a.metadata.createdAt)),
    )
    .map(
      (post) =>
        `<item>
          <title>${post.metadata.title}</title>
          <link>${SITE.url}/blog/${post.slug}</link>
          <description>${post.metadata.description || ""}</description>
          <pubDate>${dayjs(post.metadata.createdAt).toISOString()}</pubDate>
        </item>`,
    )
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>${SITE.name}</title>
  <link>${SITE.url}</link>
  <description>${SITE.description}</description>
  ${itemsXml}
</channel>
 
</rss>`,
    {
      headers: {
        "Content-Type": "text/xml",
      },
    },
  );
}
