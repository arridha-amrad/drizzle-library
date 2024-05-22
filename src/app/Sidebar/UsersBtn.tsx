"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarUsersButton() {
  const target = "/users";
  const pathname = usePathname();

  return (
    <Link
      href={target}
      className={`${pathname === target ? "text-primary" : ""}`}
    >
      Users
    </Link>
  );
}
