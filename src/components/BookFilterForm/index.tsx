"use client";

import { useSearchParams } from "next/navigation";
import SubmitButton from "./SubmitBtn";
import { CategoriesTable } from "@/drizzle/schema";
import { searchBooks } from "@/actions/bookActions";
import MultiSelect from "../MultiSelect";

type Props = {
  categories: (typeof CategoriesTable.$inferSelect)[];
};

export default function BookFilterForm({ categories }: Props) {
  const params = useSearchParams();
  const qIsFilter = params.get("isFilter");

  if (qIsFilter && qIsFilter === "true") {
    return (
      <form action={searchBooks} className="flex gap-2 items-center ">
        <input
          name="title"
          type="text"
          placeholder="Title"
          className="input input-bordered"
        />
        <input
          name="author"
          type="text"
          placeholder="Author"
          className="input input-bordered"
        />
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
