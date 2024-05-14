"use client";

import { users } from "@/drizzle/schema";
import { useRouter, usePathname } from "next/navigation";

type User = typeof users.$inferSelect;

export default function EditUserButton({ user }: { user: User }) {
  const router = useRouter();
  const pathname = usePathname();
  const setParams = () => {
    router.push(
      `${pathname}?id=${user.id}&name=${user.name}&email=${user.email}&isEdit=true`
    );
  };
  return (
    <button onClick={setParams} className="btn btn-sm btn-info">
      edit
    </button>
  );
}
