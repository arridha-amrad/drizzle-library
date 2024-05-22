"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HistoriesButton() {
  const target = "/histories";
  const pathname = usePathname();

  return (
    <Link
      href={target}
      className={`${pathname === target ? "text-primary" : ""}`}
    >
      Histories
    </Link>
  );
}
