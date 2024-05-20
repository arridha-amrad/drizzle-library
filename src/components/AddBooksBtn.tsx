"use client";

import { useRouter } from "next/navigation";

export default function AddBookButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/books/add")}
      className="btn btn-sm lg:btn-md btn-circle btn-primary"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        className="md:h-6 md:w-6 h-4 w-4"
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
        ></path>
      </svg>
    </button>
  );
}
