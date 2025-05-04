"use client";

import Form from "next/form";
import { useRef } from "react";

function FormSearchBook() {
  const formRef = useRef<HTMLFormElement | null>(null);
  return (
    <Form ref={formRef} className="w-full max-w-sm" action="">
      <label className="input input-neutral w-full">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          className="w-full"
          name="title"
          placeholder="Search books..."
        />
      </label>
    </Form>
  );
}

export default FormSearchBook;
