"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FilterBooksLink() {
  const pathname = usePathname();
  if (pathname.includes("/books")) {
    return (
      <li className="mt-2">
        <Link href="/books/filter">Filter Books</Link>
      </li>
    );
  }
  return null;
}
