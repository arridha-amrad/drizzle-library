"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

export default function Header() {
  const router = useRouter();
  const params = useSearchParams();
  return (
    <div className="cursor-pointer" onClick={() => router.push("/users")}>
      <h1 className="text-4xl font-bold tracking-tight">User</h1>
      {params.get("name") && <h2>Search : {params.get("name")}</h2>}
    </div>
  );
}
