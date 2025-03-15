"use client";

import { useRouter } from "nextjs-toploader/app";

export default function Header() {
  const router = useRouter();
  return (
    <div className="cursor-pointer" onClick={() => router.push("/histories")}>
      <h1 className="text-4xl font-bold tracking-tight">All Loan Histories</h1>
    </div>
  );
}
