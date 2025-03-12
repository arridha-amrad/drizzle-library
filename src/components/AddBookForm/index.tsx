"use client";

import { storeBooks } from "@/actions/bookActions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import SubmitButton from "./SubmitButton";
import { toast } from "react-toastify";

export default function AddBookForm() {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const element = document.getElementById("add-book-modal");
    if (open) {
      element?.classList.add("modal-open");
    } else {
      element?.classList.remove("modal-open");
    }
  }, [open]);

  const store = async (data: FormData) => {
    await storeBooks(data);
    toast.success("New book added");
    router.back();
  };
  return (
    <form action={store} className="modal-box w-full max-w-md space-y-3">
      <div className="mx-auto w-fit">
        <h1 className="text-lg font-semibold text-base-content">Add Book</h1>
      </div>
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="input input-neutral w-full"
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        className="input input-neutral w-full"
      />
      <input
        type="text"
        name="categories"
        placeholder="Categories"
        className="input input-neutral w-full"
      />
      <div className="modal-action">
        <button
          type="button"
          onClick={() => {
            router.back();
            setOpen(false);
          }}
          className="btn btn-neutral"
        >
          Close
        </button>
        <SubmitButton />
      </div>
    </form>
  );
}
