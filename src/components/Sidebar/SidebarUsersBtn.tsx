"use client";

import { usePathname, useRouter } from "next/navigation";

export default function SidebarUsersButton() {
  const target = "/users";
  const router = useRouter();
  const pathname = usePathname();

  return (
    <button
      onClick={() => router.push(target)}
      className={`btn w-full rounded-none bg-transparent border-none ${
        pathname === target ? "text-primary" : ""
      }`}
    >
      Users
    </button>
  );
}
