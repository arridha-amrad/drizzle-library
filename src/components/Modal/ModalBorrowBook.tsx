"use client";

import FormBorrowBook from "@/components/Forms/FormBorrowBook";
import { cn } from "@/utils";
import { useRef } from "react";

type Props = {
  title: string;
  available: number;
  bookId: string;
};

export default function ModalBorrowBook({ available, title, bookId }: Props) {
  const refDialog = useRef<HTMLDialogElement | null>(null);

  return (
    <>
      <button
        disabled={available === 0}
        onClick={() => refDialog.current?.showModal()}
        className={cn(
          "btn btn-soft btn-primary",
          available === 0 ? "" : "animate-pulse"
        )}
      >
        Borrow
      </button>
      <dialog ref={refDialog} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Book borrowing form </h3>
          <FormBorrowBook
            callback={() => refDialog.current?.close()}
            bookId={bookId}
            bookTitle={title}
          >
            <button
              type="button"
              onClick={() => refDialog.current?.close()}
              className="btn btn-neutral w-20"
            >
              Close
            </button>
          </FormBorrowBook>
        </div>
      </dialog>
    </>
  );
}
