import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { visit } from "unist-util-visit";
import type { LineElement } from "rehype-pretty-code";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { MDXFallback } from "./mdx-fallback";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Code } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/copy-button";

const components: MDXRemoteProps["components"] = {
  table: Table,
  thead: TableHeader,
  tbody: TableBody,
  tr: TableRow,
  th: TableHead,
  td: TableCell,
  code: Code,
  figure({ className, ...props }: React.ComponentProps<"figure">) {
    const hasPrettyCode = "data-rehype-pretty-code-figure" in props;
    return (
      <figure
        className={cn(
          hasPrettyCode && "not-prose relative rehype-pretty-code",
          className,
        )}
        {...props}
      />
    );
  },
  pre({
    __withMeta__,
    __rawString__,
    ...props
  }: React.ComponentProps<"pre"> & {
    __withMeta__?: boolean;
    __rawString__?: string;
  }) {
    return (
      <>
        <pre {...props} />
        {__rawString__ && (
          <CopyButton
            className={cn("absolute top-2 right-2", __withMeta__ && "top-9")}
            value={__rawString__}
          />
        )}
      </>
    );
  },
};
const options: MDXRemoteProps["options"] = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "append" }],
      [
        rehypeExternalLinks,
        { target: "_blank", rel: "nofollow noopener noreferrer" },
      ],
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "pre") {
            const [codeEl] = node.children;
            if (codeEl.tagName !== "code") {
              return;
            }

            node.__rawString__ = codeEl.children?.[0].value;
          }
        });
      },
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          keepBackground: false,
          onVisitLine(node: LineElement) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
        },
      ],
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "figure") {
            if (!("data-rehype-pretty-code-figure" in node.properties)) {
              return;
            }

            const preElement = node.children.at(-1) as {
              type: "element";
              tagName: "pre";
              properties: {
                __withMeta__?: boolean;
                __rawString__?: string;
              };
            };
            if (preElement.tagName !== "pre") {
              return;
            }
            // 将 __withMeta__ 属性添加到 pre 元素上, 获取code 中的 __rawString__
            // 以便在渲染时使用
            preElement.properties.__withMeta__ =
              node.children.at(0).tagName === "figcaption";
            preElement.properties.__rawString__ = node.__rawString__ as string;
          }
        });
      },
    ],
  },
};

// 增强版MDX渲染组件，具有错误处理能力
export function MDX({ code }: { code: string }) {
  // 尝试安全解析MDX内容
  try {
    return (
      <MDXRemote source={code} components={components} options={options} />
    );
  } catch (error) {
    console.error("MDX渲染错误，使用降级方案:", error);

    // 如果MDX解析失败，使用MDXFallback组件作为降级方案
    return <MDXFallback code={code} />;
  }
}
