import { NAV_LIST } from "@/config";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function SubNavbar({ activeUrl }: { activeUrl: string }) {
  return (
    <div className="flex justify-between items-start mb-16">
      <nav className="flex flex-col space-y-6 md:flex-row md:space-x-8 ">
        {NAV_LIST.map((item) => (
          <Link
            key={item.title}
            href={item.url}
            className={cn(
              "text-2xl md:text-3xl font-medium transition-colors",
              item.url.endsWith(activeUrl)
                ? "text-foreground"
                : "text-foreground/50 hover:text-foreground/90",
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
