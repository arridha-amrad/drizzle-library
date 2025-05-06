"use client";

import Form from "next/form";
import ButtonSearchSubmit from "../Buttons/ButtonSearchSubmit";

export default function FormSearchUser() {
  return (
    <Form className="w-full max-w-sm" action="/users/search">
      <label className="input w-full input-neutral flex items-center gap-2">
        <ButtonSearchSubmit />
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              e.currentTarget.form?.requestSubmit();
            }
          }}
          name="query"
          type="text"
          className=""
          placeholder="Search users"
        />
      </label>
    </Form>
  );
}
