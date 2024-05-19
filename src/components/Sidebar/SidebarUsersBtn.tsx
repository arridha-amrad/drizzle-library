"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarUsersButton() {
  const target = "/users";
  const pathname = usePathname();

  return (
    <Link
      href={target}
      className={`btn w-full rounded-none bg-transparent border-none ${
        pathname === target ? "text-primary" : ""
      }`}
    >
      Users
    </Link>
  );
}
