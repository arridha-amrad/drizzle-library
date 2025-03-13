"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Tab() {
  const pathname = usePathname();

  const q = useSearchParams();

  const [tab, setTab] = useState(q.get("tab") ?? "");

  useEffect(() => {
    setTab(q.get("tab") ?? "");
  }, [q.get("tab")]);

  return (
    <div role="tablist" className="tabs mb-4 mt-10">
      <Link
        href={`${pathname}?tab=borrowers`}
        role="tab"
        className={`tab ${
          tab === "borrowers" || tab === ""
            ? "tab-active text-xl font-semibold"
            : ""
        }`}
      >
        List of Borrowers
      </Link>
      <Link
        href={`${pathname}?tab=reviews`}
        role="tab"
        className={`tab ${
          tab === "reviews" ? "tab-active text-xl font-semibold" : ""
        }`}
      >
        Review
      </Link>
    </div>
  );
}
