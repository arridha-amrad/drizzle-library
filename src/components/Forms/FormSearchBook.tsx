"use client";

import Form from "next/form";
import { useRef } from "react";
import ButtonSearchSubmit from "../Buttons/ButtonSearchSubmit";

function FormSearchBook() {
  const formRef = useRef<HTMLFormElement | null>(null);
  return (
    <Form ref={formRef} className="w-full max-w-sm" action="/books/search">
      <label className="input input-neutral w-full">
        <ButtonSearchSubmit />
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
