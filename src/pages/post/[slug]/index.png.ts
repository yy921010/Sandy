import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { replaceSlash } from "~/utils/common";
import generateOgImage from "~/utils/generateOgImage";

export async function getStaticPaths() {
  const posts = await getCollection("posts").then((p) =>
    p.filter(({ data }) => !data.draft)
  );
  return posts.map((post) => ({
    params: { slug: replaceSlash(post.id) },
    props: post,
  }));
}

export async function GET({
  props,
}: {
  props: CollectionEntry<"posts">;
}): Promise<APIRoute> {
  return generateOgImage(props) as unknown as APIRoute;
}
