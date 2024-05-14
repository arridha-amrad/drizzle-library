"use client";

import { setUsersPageCookies } from "@/actions/actions";
import { usePathname, useRouter } from "next/navigation";

export default function PaginateButton({ number }: { number: number }) {
  const pathname = usePathname();
  const page = pathname.split("/").pop();
  const router = useRouter();
  const action = () => {
    setUsersPageCookies(number);
    router.push(`/users/table/${number}`);
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
