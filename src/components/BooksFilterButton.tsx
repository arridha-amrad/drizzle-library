"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function BookFilterButton() {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const current = new URLSearchParams(Array.from(params.entries()));
  const isFilter = current.get("isFilter");
  const isActive = Boolean(isFilter && isFilter === "true");
  const activeFilter = () => {
    current.set("isFilter", isActive ? "false" : "true");
    const queryParams = current.toString();
    const fullPath = `${pathname}?${queryParams}`;
    router.push(isActive ? pathname : fullPath);
  };
  return (
    <button
      onClick={activeFilter}
      className={`btn ${isActive ? "btn-primary" : ""}`}
    >
      Filter
    </button>
  );
}
