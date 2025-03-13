"use client";

import { useRouter } from "nextjs-toploader/app";

export default function Header() {
  const router = useRouter();
  return (
    <div className="cursor-pointer" onClick={() => router.push("/users")}>
      <h1 className="text-4xl font-bold tracking-tight">All Users</h1>
    </div>
  );
}
