"use client";

import Form from "next/form";
import { useRef } from "react";

export default function FilterBooks() {
  const refDialog = useRef<HTMLDialogElement | null>(null);
  return (
    <>
      <button
        onClick={() => refDialog.current?.showModal()}
        className="btn btn-soft btn-primary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
          />
        </svg>
      </button>
      <dialog ref={refDialog} className="modal">
        <div className="modal-box">
          <Form className="flex flex-col gap-3 w-full" action="">
            <input
              name="title"
              type="text"
              placeholder="Title"
              className="input input-neutral w-full"
            />
            <input
              name="author"
              type="text"
              placeholder="Author"
              className="input input-neutral w-full"
            />
            <input
              name="categories"
              type="text"
              placeholder="Categories"
              className="input input-neutral w-full"
            />
            <div className="w-max mr-0 space-x-3 self-end">
              <button
                onClick={() => refDialog.current?.close()}
                className="btn btn-soft"
              >
                Close
              </button>
              <button className="btn btn-soft btn-primary">Filter Books</button>
            </div>
          </Form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
