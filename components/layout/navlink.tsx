"use client";
import { LINKS } from "@/constants";
import { LinkItem, Role } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ role }: { role: Role }) {
  const filterByRole = LINKS.filter((link) => {
    return link.role.includes(role);
  });

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || /^\/[a-f0-9-]+$/.test(pathname);
    }

    return pathname === href;
  };

  const isParentActive = (link: LinkItem) => {
    if (!link.childs) {
      return isActive(link.href);
    }
    return (
      link.childs.length > 0 &&
      link.childs.some((child) => pathname === child.href)
    );
  };
  const pathname = usePathname();

  return (
    <nav className="">
      <ul className="flex flex-col items-center justify-center my-20 gap-4">
        {filterByRole.map((link) => (
          <li key={link.key} className="mb-2">
            <Link
              href={link.href}
              aria-disabled={link.disable}
              className={`text-lg font-medium hover:bold active:text-primary text-center flex ${
                isParentActive(link)
                  ? "underline decoration-2 decoration-brand-500 underline-offset-8"
                  : ""
              } ${link.disable ? "" : ""}`}
            >
              {link.name}
            </Link>
            {link.childs && link.childs.length > 0 && (
              <ul className="flex flex-col items-center justify-center mt-2">
                {link.childs.map((child) => (
                  <li key={child.key} className="mb-2">
                    <Link
                      href={child.href}
                      className={`text-md font-sm text-slate-500 hover:bold active:text-primary text-center flex ${
                        isActive(child.href)
                          ? "underline decoration-2 decoration-brand-500 underline-offset-8"
                          : ""
                      }`}
                    >
                      {child.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
