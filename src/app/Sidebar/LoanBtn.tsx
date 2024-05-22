"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarLoanBooksButton() {
  const target = "/loan";
  const pathname = usePathname();
  return (
    <Link
      href={target}
      className={`${pathname === target ? "text-primary" : ""}`}
    >
      Loan Books
    </Link>
  );
}
