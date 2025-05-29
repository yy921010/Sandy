import type { Heading } from "@/types/blog";
import { TableOfContents } from "lucide-react";
import { cn, generateNestedTOC } from "@/lib/utils";
import { Button } from "./ui/button";

export const Toc = ({ toc }: { toc: Heading[] }) => {
  const renderToc = generateNestedTOC(toc);
  function renderTOC(items: Heading[]) {
    return (
      <ul className="text-ellipsis list-none m-0 gap-1 p-0">
        {items.map((item) => (
          <li className="m-0" key={item.text}>
            <Button asChild size="sm" variant="link">
              <a href={`#${item.slug}`}> {item.text}</a>
            </Button>
            {item.children &&
              item.children.length > 0 &&
              renderTOC(item.children)}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="m-auto fixed top-24 left-5 pb-3 z-50 text-sm hidden h-3/4 flex-col xl:flex">
      <Button variant="ghost">
        <TableOfContents size={20} />
      </Button>
      <div
        className={cn(
          "flex-1 text-foreground/80",
          "group-hover/toc:opacity-45 opacity-0 transition-transform-opacity",
          "duration-300 ease-in-out transform-gpu group-hover/toc:translate-x-15 translate-x-5",
          "overflow-y-auto h-full pb-10 left-0",
        )}
      >
        {renderTOC(renderToc)}
      </div>
    </div>
  );
};
