"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function TabBookDetail() {
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const currActiveTab = searchParams.get("tab");

  const [tab, setTab] = useState(currActiveTab ?? "");

  return (
    <div role="tablist" className="tabs tabs-border mb-4 mt-10">
      <Link
        onClick={() => setTab("borrowers")}
        href={`${pathname}?tab=borrowers`}
        role="tab"
        className={`tab ${
          tab === "borrowers" || tab === "" ? "tab-active" : ""
        }`}
      >
        Borrowers
      </Link>

      <Link
        onClick={() => setTab("reviews")}
        href={`${pathname}?tab=reviews`}
        role="tab"
        className={`tab ${tab === "reviews" ? "tab-active" : ""}`}
      >
        Reviews
      </Link>
    </div>
  );
}
