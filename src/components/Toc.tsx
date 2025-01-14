import { TableOfContents } from "lucide-react";
import type { TOCItem } from "~/types/common";
import { cn, generateNestedTOC } from "~/utils/common";

export const Toc = ({ toc }: { toc: TOCItem[] }) => {
  const renderToc = generateNestedTOC(toc);
  function renderTOC(items: TOCItem[]) {
    return (
      <ul className="text-ellipsis list-none m-0 gap-1 ">
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
    <div className="m-auto fixed top-24 left-5 pb-3 z-50 overflow-hidden text-sm hidden lg:flex h-3/4 flex-col">
      <a className="btn btn-ghost btn-circle md:flex">
        <TableOfContents size={20} />
      </a>
      <div
        className={cn(
          "flex-1",
          "group-hover/first:opacity-45 opacity-0 transition-transform-opacity",
          "duration-300 ease-in-out transform-gpu group-hover/first:translate-x-0 translate-x-5",
          "overflow-y-auto h-full pb-10"
        )}
      >
        {renderTOC(renderToc)}
      </div>
    </div>
  );
};
