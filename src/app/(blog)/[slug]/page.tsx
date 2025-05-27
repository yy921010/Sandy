import { MDX } from "@/components/mdx";
import { Prose } from "@/components/ui/typography";
import { getAllPosts } from "@/lib/mdx";

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
    <Prose>
      <MDX code={post.content} />
    </Prose>
  );
}
