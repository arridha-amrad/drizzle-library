"use client";

import FormReturnBook from "@/components/Forms/FormReturnBook";
import { useRef } from "react";

type Props = {
  bookId: string;
  dueAt: Date;
  loanBy: string;
  title: string;
  userId: number;
};

export default function ModalReturnBook({
  bookId,
  dueAt,
  loanBy,
  title,
  userId,
}: Props) {
  const refModal = useRef<HTMLDialogElement | null>(null);

  return (
    <>
      <button
        onClick={() => refModal.current?.showModal()}
        className="btn btn-secondary"
      >
        Return
      </button>
      <dialog ref={refModal} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Return book</h3>
          <FormReturnBook
            bookId={bookId}
            dueAt={dueAt}
            loanBy={loanBy}
            title={title}
            userId={userId}
          >
            <button
              type="button"
              className="btn btn-neutral"
              onClick={() => refModal.current?.close()}
            >
              Close
            </button>
          </FormReturnBook>
        </div>
      </dialog>
    </>
  );
}
