"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function PaginateButton({ number }: { number: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentQueryParams = new URLSearchParams(
    Array.from(searchParams.entries())
  );
  const page = searchParams.get("page") ?? 1;
  const router = useRouter();
  const action = () => {
    currentQueryParams.set("page", number.toString());
    const qpStr = currentQueryParams.toString();
    router.push(`${pathname}?${qpStr}`);
  };
  return (
    <button
      onClick={action}
      className={`join-item btn btn-md  ${
        Number(page) === number ? "btn-active" : ""
      }`}
    >
      {number}
    </button>
  );
}
