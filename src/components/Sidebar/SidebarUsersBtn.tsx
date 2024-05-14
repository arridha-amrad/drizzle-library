"use client";

import { useRouter } from "next/navigation";

export default function SidebarUsersButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/users")}
      className="btn w-full rounded-none bg-transparent border-none text-primary"
    >
      Users
    </button>
  );
}
