"use client";

import { useRouter } from "nextjs-toploader/app";

export default function Header() {
  const router = useRouter();
  return (
    <div className="cursor-pointer" onClick={() => router.push("/books")}>
      <h1 className="text-4xl font-bold tracking-tight">All Books</h1>
    </div>
  );
}
