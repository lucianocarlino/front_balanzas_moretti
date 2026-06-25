"use client";

import {
  HomeIcon,
  ScaleIcon,
  ArchiveBoxIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Balanzas", href: "/scales", icon: ScaleIcon },
  { name: "Envases", href: "/packages", icon: ArchiveBoxIcon },
  { name: "Estadisticas", href: "/stats", icon: ChartBarIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-1 rounded-md px-3 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 hover:text-slate-900 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-cyan-50 text-cyan-800 ring-1 ring-inset ring-cyan-200":
                  pathname == link.href,
                "text-slate-700": pathname !== link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
