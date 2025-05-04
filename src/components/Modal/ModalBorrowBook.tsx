"use client";

import { loanBook } from "@/actions/books/loanBook";
import { useAction } from "next-safe-action/hooks";
import { ReactNode, useRef } from "react";
import { toast } from "react-toastify";
import FormBorrowBook from "@/components/Forms/FormBorrowBook";

type Props = {
  title: string;
  available: number;
  bookId: string;
  children: ReactNode;
};

export default function ModalBorrowBook({
  available,
  title,
  bookId,
  children,
}: Props) {
  const refDialog = useRef<HTMLDialogElement | null>(null);

  const { execute, isPending } = useAction(loanBook, {
    onError({ error: { serverError, validationErrors } }) {
      if (serverError) {
        toast.error(serverError);
      }
      if (validationErrors) {
        toast.error("Validation error");
      }
    },
  });

  return (
    <>
      <button
        disabled={available === 0}
        onClick={() => refDialog.current?.showModal()}
        className="btn btn-soft btn-primary animate-pulse"
      >
        Borrow
      </button>
      <dialog ref={refDialog} className="modal">
        <div className="modal-box">
          <fieldset disabled={isPending}>
            <h3 className="font-bold text-lg">Book borrowing form </h3>
            <FormBorrowBook />
          </fieldset>
        </div>
      </dialog>
    </>
  );
}
