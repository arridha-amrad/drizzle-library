"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function SidebarBooksButton() {
  const target = "/books";
  const pathname = usePathname();

  return (
    <Link
      href="/books"
      className={`btn w-full rounded-none bg-transparent border-none ${
        pathname.includes(target) ? "text-primary" : ""
      }`}
    >
      Books
    </Link>
  );
}
