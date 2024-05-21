"use client";

import { useDebounce } from "@uidotdev/usehooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchForm() {
  const searchParams = useSearchParams();
  const nameFromParam = searchParams.get("name") ?? "";
  const pageFromParam = searchParams.get("page") ?? 1;

  const [state, setState] = useState(nameFromParam);
  const debouncedSearchTerm = useDebounce(state, 300);
  const router = useRouter();

  const [pageNum, setPageNum] = useState(pageFromParam);

  useEffect(() => {
    router.push(`/users?name=${debouncedSearchTerm}&page=${pageNum}`);
  }, [debouncedSearchTerm]);

  return (
    <label className="input flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-4 h-4 opacity-70"
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
      <input
        name="name"
        value={state}
        onChange={(e) => {
          setState(e.target.value);
        }}
        onKeyUp={() => setPageNum(1)}
        type="text"
        className=""
        placeholder="Search users"
      />
    </label>
  );
}
