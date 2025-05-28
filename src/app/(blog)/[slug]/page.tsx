import { MDX } from "@/components/mdx";
import { Prose } from "@/components/ui/typography";
import { getAllPosts } from "@/lib/mdx";
import dayjs from "dayjs";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const post = getAllPosts().find((post) => post.slug === slug);

  if (!post) {
    return null;
  }
  return (
    <>
      <div className="px-4 py-1">
        <time
          className="font-mono text-sm text-muted-foreground"
          dateTime={dayjs(post.metadata.createdAt).toISOString()}
        >
          {dayjs(post.metadata.createdAt).format("DD.MM.YYYY")}
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
    </>
  );
}
