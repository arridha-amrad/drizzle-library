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
    <div role="tablist" className="tabs tabs-boxed my-4">
      <Link
        href={`${pathname}?tab=join-list`}
        role="tab"
        className={`tab ${
          tab === "join-list" || tab === "" ? "tab-active" : ""
        }`}
      >
        Loan List
      </Link>
      <Link
        href={`${pathname}?tab=review`}
        role="tab"
        className={`tab ${tab === "review" ? "tab-active" : ""}`}
      >
        Review
      </Link>
    </div>
  );
}
