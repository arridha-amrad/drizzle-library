"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function PaginateButton({ number }: { number: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentQueryParams = new URLSearchParams(
    Array.from(searchParams.entries())
  );
  const page = searchParams.get("page") ?? 1;
  currentQueryParams.set("page", number.toString());
  const qpStr = currentQueryParams.toString();

  return (
    <Link
      href={`${pathname}?${qpStr}`}
      className={`join-item btn btn-md ${
        Number(page) === number ? "btn-active bg-primary" : ""
      }`}
    >
      {number}
    </Link>
  );
}
