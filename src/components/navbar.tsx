import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { MAIN_NAV, SITE } from "@/config";
import ThemeSwitcher from "./theme-switch";
import { SiGithub } from "@icons-pack/react-simple-icons";

export function Navbar() {
  return (
    <nav className="top-0 z-50 w-full bg-background/10 backdrop-blur supports-[backdrop-filter]:bg-background/10">
      <div className="container flex h-24 items-center justify-between px-4 mx-auto">
        <Link className="flex items-center" href="/">
          <Avatar>
            <AvatarImage src={SITE.avatar} alt={SITE.name} />
            <AvatarFallback>{SITE.name}</AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex items-center space-x-2">
          {MAIN_NAV.filter((item) => item.topShow).map((item) => (
            <Button
              asChild
              key={item.title}
              variant="ghost"
              size="lg"
              className="h-9 w-9 px-0"
            >
              <Link
                href={item.url}
                className="font-medium text-foreground hover:text-foreground/80 transition-colors"
              >
                <span className="inline md:hidden">{item.icon}</span>
                <span className="hidden md:inline md:text-base">
                  {item.title}
                </span>
              </Link>
            </Button>
          ))}
          <Button variant="ghost" className="h-9 w-9 px-0" asChild>
            <Link
              href={SITE.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <SiGithub className="h-8 w-8" />
            </Link>
          </Button>
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
