import { MDXRemote } from "next-mdx-remote/rsc";

export function MDX({ code }: { code: string }) {
  console.log("code", code);
  return <MDXRemote source={code} />;
}
