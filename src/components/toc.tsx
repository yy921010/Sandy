import type { Heading } from "@/types/blog";
import { TableOfContents } from "lucide-react";
import { cn, generateNestedTOC } from "@/lib/utils";

export const Toc = ({ toc }: { toc: Heading[] }) => {
  const renderToc = generateNestedTOC(toc);
  function renderTOC(items: Heading[]) {
    return (
      <ul className="text-ellipsis list-none m-0 gap-1 p-0">
        {items.map((item) => (
          <li className="m-0" key={item.text}>
            <a
              className="link link-hover transition-all"
              href={`#${item.slug}`}
            >
              {item.text}
            </a>
            {item.children &&
              item.children.length > 0 &&
              renderTOC(item.children)}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="m-auto fixed top-24 left-5 pb-3 z-50 overflow-hidden text-sm hidden h-3/4 flex-col md:flex">
      <a className="btn btn-ghost btn-circle" href="#toc">
        <TableOfContents size={20} />
      </a>
      <div
        className={cn(
          "flex-1 text-foreground/80",
          "group-hover/toc:opacity-45 opacity-0 transition-transform-opacity hover:opacity-80",
          "duration-300 ease-in-out transform-gpu group-hover/toc:translate-x-0 translate-x-5",
          "overflow-y-auto h-full pb-10 left-0",
        )}
      >
        {renderTOC(renderToc)}
      </div>
    </div>
  );
};
