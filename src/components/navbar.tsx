import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Github, Rss } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4 mx-auto">
        {/* 左侧头像 */}
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        {/* 右侧按钮组 */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="h-9 w-9 px-0" asChild>
            <a
              href="https://github.com"
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

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
