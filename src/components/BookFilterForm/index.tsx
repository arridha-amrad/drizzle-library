"use client";

import { useSearchParams } from "next/navigation";
import SubmitButton from "./SubmitBtn";

export default function BookFilterForm() {
  const params = useSearchParams();
  const isActive = params.get("isFilter");
  if (isActive && isActive === "true") {
    return (
      <form className="flex gap-2">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
        />
        <SubmitButton />
      </form>
    );
  } else {
    return null;
  }
}
