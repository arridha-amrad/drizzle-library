"use client";

import { useRouter } from "next/navigation";
import { searchBooks } from "@/actions/bookActions";
import { useState, ChangeEvent, useRef, ReactNode } from "react";
import SubmitButton from "../AddBookForm/SubmitButton";

type Props = {
  children: ReactNode;
};

export default function ModalFilterBooks({ children }: Props) {
  const router = useRouter();
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

  const resetFilter = () => {
    formRef.current?.reset();
    setFormState(() => ({
      author: "",
      title: "",
    }));
    router.push("/books");
  };
  return (
    <form
      ref={formRef}
      action={async (data) => {
        await searchBooks(data);
      }}
      className="modal-box space-y-3"
    >
      <h3 className="font-bold text-lg">Filter Books</h3>
      <div className="w-full bg-base-content">{children}</div>
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
      <div className="modal-action">
        <SubmitButton />
        <button type="button" onClick={resetFilter} className="btn">
          Reset Filter
        </button>
        <button type="button" onClick={() => router.back()} className="btn">
          Close
        </button>
      </div>
    </form>
  );
}
