import { visit } from "unist-util-visit";

export default function rehypeMermaid() {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return (tree: any) => {
    visit(tree, "element", (node, index, parent) => {
      if (
        node.tagName === "pre" &&
        node.children?.[0]?.tagName === "code" &&
        node.children[0].properties?.className?.includes("language-mermaid")
      ) {
        // 确保获取正确的图表内容并处理转义字符
        const chart = node.children[0].children[0]?.value?.trim() || "";

        parent.children[index as number] = {
          type: "mdxJsxFlowElement",
          name: "mermaid",
          attributes: [
            {
              type: "mdxJsxAttribute",
              name: "chart",
              value: chart,
            },
          ],
          children: [],
        };
      }
    });
  };
}
