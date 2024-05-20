"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarBooksButton() {
  const target = "/books";
  const pathname = usePathname();

  return (
    <Link
      href="/books"
      className={`${pathname.includes(target) ? "text-primary" : ""}`}
    >
      Books
    </Link>
  );
}
