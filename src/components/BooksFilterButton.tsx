"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function BookFilterButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("book");
  const author = searchParams.get("author");
  const categories = searchParams.get("categories");
  const page = searchParams.get("page");
  const activeFilter = () => {
    const isActive = searchParams.get("isFilter");
    const isFilter = isActive && isActive === "true" ? true : false;
    if (isFilter) {
      router.push(
        `/books?isFilter=false&name=${name}&author=${author}&categories=${categories}&page=${page}`
      );
    } else {
      router.push(
        `/books?isFilter=true&name=${name}&author=${author}&categories=${categories}&page=${page}`
      );
    }
  };
  return (
    <button onClick={activeFilter} className="btn">
      Filter
    </button>
  );
}
