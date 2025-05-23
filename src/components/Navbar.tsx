import { Github, Rss } from "lucide-react";
import type { Menu } from "~/types/config";
import { Config } from "~/config";
import ThemeSwitcher from "./ThemeSwitch";

export default function Header({
  brandTitle,
  menus,
}: {
  brandTitle: string;
  menus: Menu[];
}) {
  return (
    <div className="sticky top-0 z-50 bg-base-100 shadow-sm">
      <div className="navbar container mx-auto">
        <div className="flex-none">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-9 rounded-full ring-2 ring-offset-2">
              <img src="/avatar.png" alt="avatar" />
            </div>
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <a className="btn btn-ghost text-xl" href="/">
            <p className="font-bold text-inherit">{brandTitle}</p>
          </a>
        </div>
        <div className="flex-none md:navbar-end">
          <div className="gap-4 hidden mr-3.5 md:flex">
            {menus.map((menu) => (
              <a
                href={menu.url}
                key={menu.key}
                className="font-semibold text-base-content/50 hover:text-base-content transition-colors delay-75"
              >
                {menu.title}
              </a>
            ))}
          </div>
          <a
            className="btn btn-ghost hidden  md:flex"
            href={Config.social.github}
          >
            <Github size={20} />
          </a>
          <a className="btn btn-ghost hidden  md:flex" href="/rss.xml">
            <Rss size={20} />
          </a>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}
