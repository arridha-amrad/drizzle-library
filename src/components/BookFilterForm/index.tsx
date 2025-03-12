"use client";

import { useRouter, useSearchParams } from "next/navigation";
import SubmitButton from "./SubmitBtn";
import { CategoriesTable } from "@/drizzle/schema";
import { searchBooks } from "@/actions/bookActions";
import { ChangeEvent, useRef, useState } from "react";

type Props = {
  categories: (typeof CategoriesTable.$inferSelect)[];
};

export default function BookFilterForm({ categories }: Props) {
  const [isOpen, setOpen] = useState(false);
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

  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  const q = useSearchParams();
  const qCategories = q.get("categories");

  const resetFilter = () => {
    formRef.current?.reset();
    setFormState(() => ({
      author: "",
      title: "",
    }));
    router.push("/books");
  };

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  return (
    <>
      <button
        onClick={() => dialogRef.current?.showModal()}
        className="btn btn-primary"
      >
        Filter
      </button>
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-2xl">Filter Books</h3>
          <div>
            <BookFilterForm categories={categories} />
          </div>
          <div className="modal-action"></div>
        </div>
      </dialog>
    </>
  );
}
