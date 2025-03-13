"use client";

import { users } from "@/drizzle/schema";
import { useRouter } from "next/navigation";

type User = typeof users.$inferSelect;

export default function EditUserButton({ user }: { user: User }) {
  const router = useRouter();
  const setParams = () => {
    router.push("/add-user?isEdit=true");
    router.push(
      `/add-user?id=${user.id}&name=${user.name}&email=${user.email}&isEdit=true`
    );
  };
  return (
    <button onClick={setParams} className="btn btn-accent">
      edit
    </button>
  );
}
