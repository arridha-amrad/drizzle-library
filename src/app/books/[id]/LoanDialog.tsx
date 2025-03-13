"use client";

import { loanABook } from "@/actions/bookActions";
import { users } from "@/drizzle/schema";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

type Props = {
  users: (typeof users.$inferSelect)[];
  title: string;
  available: number;
  bookId: string;
};

const initialState = {
  validationErrors: undefined,
  actionError: undefined,
  success: false,
};

export default function OpenLoanDialogBtn({
  available,
  title,
  bookId,
  users,
}: Props) {
  const refDialog = useRef<HTMLDialogElement | null>(null);

  const [actionState, formAction, pending] = useActionState(
    (initialState: any, formData: FormData) => {
      actionState.actionError = undefined;
      actionState.success = false;
      actionState.validationErrors = undefined;
      formData.append("bookId", bookId);
      return loanABook(initialState, formData);
    },
    initialState
  );

  const validationErrors = actionState.validationErrors;
  useEffect(() => {
    if (validationErrors) {
      const invalidBookId = validationErrors.bookId;
      if (invalidBookId) {
        toast.error(invalidBookId[0]);
      }
      const invalidUserId = validationErrors.userId;
      if (invalidUserId) {
        toast.error(invalidUserId[0]);
      }
    }
  }, [validationErrors]);

  const actionErrors = actionState.actionError;
  useEffect(() => {
    if (actionErrors) {
      toast.error(actionErrors);
    }
  }, [actionErrors]);

  useEffect(() => {
    if (actionState.success) {
      toast.success("Load successful");
      refDialog.current?.close();
    }
  }, [actionState.success]);

  return (
    <>
      <button
        disabled={available === 0}
        onClick={() => refDialog.current?.showModal()}
        className="btn btn-soft btn-primary"
      >
        Loan
      </button>
      <dialog ref={refDialog} className="modal">
        <div className="modal-box">
          <fieldset disabled={pending}>
            <h3 className="font-bold text-lg">Book Loan Form </h3>
            <form action={formAction} className="space-y-3 mt-4 w-full">
              <select
                name="userId"
                defaultValue="Select User"
                className="select select-neutral w-full"
              >
                <option value="Select User" disabled={true}>
                  Select User
                </option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              <fieldset disabled className="fieldset">
                <legend className="fieldset-legend">Book&apos;s Title</legend>
                <input
                  name="title"
                  defaultValue={title}
                  type="text"
                  className="input input-neutral w-full"
                />
              </fieldset>
              <div className="modal-action">
                <button
                  type="button"
                  onClick={() => refDialog.current?.close()}
                  className="btn btn-neutral"
                >
                  Close
                </button>
                <button className="btn btn-primary" type="submit">
                  Loan
                </button>
              </div>
            </form>
          </fieldset>
        </div>
      </dialog>
    </>
  );
}
