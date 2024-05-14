"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function PaginateButton({ number }: { number: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? 1;
  const router = useRouter();
  const action = () => {
    const name = searchParams.get("name") ?? "";
    const url = `${pathname}?name=${name}&page=${number}`;
    router.push(url);
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
