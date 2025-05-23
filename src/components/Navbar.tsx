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
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-none">
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-9 rounded-full ring-2 ring-offset-2">
            <img src="/avatar.png" alt="avatar" />
          </div>
        </div>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" href="/">
          <p className="font-bold text-inherit">{brandTitle}</p>
        </a>
      </div>
      <div className="navbar-end">
        {menus.map((menu) => (
          <button type="button" className="btn btn-ghost" key={menu.title}>
            <a href={menu.url}>{menu.title}</a>
          </button>
        ))}
        <a className="btn btn-ghost" href={Config.social.github}>
          <Github size={20} />
        </a>
        <a className="btn btn-ghost" href="/rss.xml">
          <Rss size={20} />
        </a>
        <ThemeSwitcher />
      </div>
    </div>
  );
}
