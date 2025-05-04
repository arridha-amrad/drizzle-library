"use client";

import { useActionState, useEffect, useRef } from "react";
import { finishLoan } from "./actions";
import { toast } from "react-toastify";
import { TLoanBooks } from "./query";
import { countCharge } from "@/utils";
import Rating from "./Rating";
import { useAction } from "next-safe-action/hooks";
import { finishBookLoan } from "@/actions/books/finishBookLoan";
import FormReturnBook from "@/components/Forms/FormReturnBook";

const initialState = {
  success: false,
  validationErrors: undefined,
  actionError: undefined,
};

type Props = {
  data: TLoanBooks["books"][number];
};

export default function FinishLoan({
  data: { id, loanAt, loanBy, loanDueAt, title, userId },
}: Props) {
  const refModal = useRef<HTMLDialogElement | null>(null);

  const { execute, isPending } = useAction(finishBookLoan, {});

  return (
    <fieldset disabled={isPending}>
      <button
        onClick={() => refModal.current?.showModal()}
        className="btn btn-secondary"
      >
        Finish
      </button>
      <dialog ref={refModal} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Finish Loan</h3>
          <FormReturnBook />
        </div>
      </dialog>
    </fieldset>
  );
}
