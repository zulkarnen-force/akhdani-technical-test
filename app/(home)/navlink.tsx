"use client";
import { Role } from "@/lib/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ role }: { role: Role }) {
  const links = [
    {
      name: "Permohonan Perjalanan Dinas",
      href: "/",
      key: "home",
      role: ["SDM_DIVISION", "PEGAWAI"],
    },
    {
      name: "Master Data",
      href: "/master-data",
      key: "master-data",
      role: ["SDM_DIVISION"],
    },
  ];

  const filterByRole = links.filter((link) => {
    return link.role.includes(role);
  });

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || /^\/[a-f0-9-]+$/.test(pathname);
    }

    return pathname.startsWith(href);
  };
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex flex-col items-center justify-center my-20 gap-4">
        {filterByRole.map((link) => (
          <li key={link.key} className="mb-2">
            <Link
              href={link.href}
              className={`text-lg font-medium hover:bold active:text-primary text-center flex ${
                isActive(link.href)
                  ? "underline decoration-2 decoration-brand-500 underline-offset-8"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
