"use client";

import FormReturnBook from "@/components/Forms/FormReturnBook";
import { TLoanBook } from "@/queries/fetchOnLoanBooks";
import { useRef } from "react";

type Props = {
  data: TLoanBook;
};

export default function ModalReturnBook({ data }: Props) {
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
          <h3 className="font-bold text-lg">Finish Loan</h3>
          <FormReturnBook data={data}>
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
