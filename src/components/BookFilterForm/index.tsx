"use client";

import { useSearchParams } from "next/navigation";
import SubmitButton from "./SubmitBtn";
import { CategoriesTable } from "@/drizzle/schema";
import { searchBooks } from "@/actions/bookActions";
import MultiSelect from "../MultiSelect";
import { ChangeEvent, useState } from "react";

type Props = {
  categories: (typeof CategoriesTable.$inferSelect)[];
};

export default function BookFilterForm({ categories }: Props) {
  const params = useSearchParams();
  const qIsFilter = params.get("isFilter");

  const [formState, setFormState] = useState({
    title: "",
    author: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  if (qIsFilter && qIsFilter === "true") {
    return (
      <form action={searchBooks} className="flex gap-2 items-center ">
        <label className="input input-bordered flex items-center gap-2">
          <input
            name="title"
            value={formState.title}
            onChange={onChange}
            type="text"
            className="grow"
            placeholder="Title"
          />
          <button
            type="button"
            onClick={() =>
              setFormState({
                ...formState,
                title: "",
              })
            }
            className="btn btn-circle btn-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            name="author"
            value={formState.author}
            onChange={onChange}
            type="text"
            className="grow"
            placeholder="Author"
          />
          <button
            type="button"
            onClick={() => setFormState({ ...formState, author: "" })}
            className="btn btn-circle btn-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </label>
        <div className="w-full bg-base-content">
          <MultiSelect categories={categories} />
        </div>
        <SubmitButton />
      </form>
    );
  } else {
    return null;
  }
}
