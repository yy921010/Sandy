import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";
import { Github, Moon, Rss, Sun } from "lucide-react";
import type { Menu } from "~/types/config";
import { Config } from "~/config";

export default function Header({
  brandTitle,
  menus,
}: {
  brandTitle: string;
  menus: Menu[];
}) {

    return (
    <Navbar shouldHideOnScroll isBordered>
      <NavbarBrand as={Link} href="/">
        <p className="font-bold text-inherit">{brandTitle}</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        {menus.map((menu) => (
          <NavbarItem key={menu.title}>
            <Link color="foreground" href={menu.url} aria-current="page">
              {menu.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
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
        <Button variant="light" isIconOnly>
          <Rss size={20} />
        </Button>
      </NavbarItem>
      <NavbarItem>
        <switch-theme>
          <label
            className="swap swap-rotate btn btn-ghost btn-circle"
            id="switchTheme"
          >
            <input type="checkbox" />
            <Moon size={20} className="swap-on" />
            <Sun size={20} className="swap-off" />
          </label>
        </switch-theme>
      </NavbarItem>
    </Navbar>
  );
}
