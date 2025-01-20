import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Avatar,
} from "@heroui/react";
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
    <Navbar shouldHideOnScroll isBordered>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarContent justify="center" className="sm:hidden">
        <Link href="/" color="foreground">
          <p className="font-bold text-inherit">{brandTitle}</p>
        </Link>
      </NavbarContent>
      <NavbarContent justify="end" className="sm:hidden">
        <NavbarItem>
          <ThemeSwitcher></ThemeSwitcher>
        </NavbarItem>
      </NavbarContent>
      <Link
        as={Link}
        href="/"
        color="foreground"
        className="hidden sm:flex gap-4"
      >
        <Avatar src="/avatar.png"></Avatar>
        <p className="font-bold text-inherit">{brandTitle}</p>
      </Link>
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        {menus.map((menu) => (
          <NavbarItem key={menu.title}>
            <Link color="foreground" href={menu.url} aria-current="page">
              {menu.title}
            </Link>
          </NavbarItem>
        ))}
        <NavbarItem className="hidden lg:flex">
          <Button
            as={Link}
            variant="light"
            href={Config.social.github}
            isIconOnly
          >
            <Github size={20} />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button variant="light" isIconOnly as={Link} href="/rss.xml">
            <Rss size={20} />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher></ThemeSwitcher>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menus.map((menu) => (
          <NavbarMenuItem key={menu.title}>
            <Link color="foreground" href={menu.url} aria-current="page">
              {menu.title}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarItem>
          <Link color="foreground" href={Config.social.github}>
            GitHub
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/rss.xml">
            RSS
          </Link>
        </NavbarItem>
      </NavbarMenu>
    </Navbar>
  );
}
