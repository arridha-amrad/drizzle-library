"use client";

import { useRef } from "react";
import FormEditBook from "../Forms/FormEditBook";
import { TBookDetail } from "@/queries/fetchBookBySlug";

export default function ModalEditBook({ book }: { book: TBookDetail }) {
  const refDialog = useRef<HTMLDialogElement | null>(null);
  return (
    <>
      <button
        className="btn btn-accent btn-soft"
        onClick={() => refDialog.current?.showModal()}
      >
        Edit Book
      </button>
      <dialog ref={refDialog} className="modal">
        <div className="modal-box">
          <FormEditBook book={book}>
            <button
              type="button"
              onClick={() => refDialog.current?.close()}
              className="btn btn-neutral"
            >
              Cancel
            </button>
          </FormEditBook>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
