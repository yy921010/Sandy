import { Comments } from "@/components/comment";
import { MDX } from "@/components/mdx-render";
import { Toc } from "@/components/toc";
import { Prose } from "@/components/ui/typography";
import { getPageJsonLd } from "@/lib/jsonLd";
import { allPosts } from "@/lib/mdx";
import dayjs from "dayjs";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const posts = allPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const post = allPosts().find((post) => post.slug === slug);

  if (!post) {
    return {};
  }

  const { title, description, image, createdAt, updatedAt } = post.metadata;

  const ogImage = image || `/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${post.slug}`,
    },
    openGraph: {
      url: `/${post.slug}`,
      type: "article",
      publishedTime: dayjs(createdAt).toISOString(),
      modifiedTime: dayjs(updatedAt).toISOString(),
      images: {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: title,
      },
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImage],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const slug = (await params).slug;
  const post = allPosts().find((post) => post.slug === slug);
  if (!post) {
    return null;
  }
  const websiteJsonLd = getPageJsonLd(post);
  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(websiteJsonLd)}
      </script>
      {post.metadata.toc && <Toc toc={post.headings || []} />}
      <div className="py-1">
        <time
          className="font-maple-mono text-sm text-muted-foreground"
          dateTime={dayjs(post.metadata.createdAt).toISOString()}
        >
          {dayjs(post.metadata.createdAt).format("YYYY.MM.DD")}
        </time>
      </div>
      <Prose>
        <div className="screen-line-after">
          <h1 className="mb-6 font-heading font-semibold">
            {post.metadata.title}
          </h1>
        </div>

        <div className="screen-line-before">
          <p className="lead mt-0 pt-1">{post.metadata.description}</p>
        </div>
        <MDX code={post.content} />
      </Prose>
      {post.metadata.comment && <Comments />}
    </>
  );
}
