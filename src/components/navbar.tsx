import { Button } from "@/components/ui/button";
import { Github, Rss } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { MAIN_NAV, SITE } from "@/config";
import ThemeSwitcher from "./theme-switch";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4 mx-auto">
        <Link className="flex items-center" href="/">
          <Avatar>
            <AvatarImage src={SITE.avatar} alt={SITE.name} />
            <AvatarFallback>{SITE.name}</AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex items-center space-x-2">
          {MAIN_NAV.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className="text-sm font-medium text-foreground hover:text-foreground/80 transition-colors"
            >
              {item.title}
            </Link>
          ))}
          <Button variant="ghost" size="sm" className="h-9 w-9 px-0" asChild>
            <a
              href={SITE.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </Button>

          <Button variant="ghost" size="sm" className="h-9 w-9 px-0" asChild>
            <a
              href="/rss"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="RSS Feed"
            >
              <Rss className="h-4 w-4" />
            </a>
          </Button>
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
