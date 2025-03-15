"use client";

import countCharge from "@/utils/countCharge";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { TLoanBooks } from "./query";
import { returnBookAction } from "./action";
import { useRouter } from "next/navigation";

const initialState = {
  validationErrors: null,
  errors: null,
  success: false,
};

type Props = {
  data: TLoanBooks["books"][number];
};

export default function ReturnBookBtn({ data }: Props) {
  const { title, loanDueAt, id, loanAt, userId, loanBy } = data;
  const charge = countCharge(loanDueAt);

  const [actionState, formAction, pending] = useActionState(
    returnBookAction,
    initialState
  );

  const refDialog = useRef<HTMLDialogElement | null>(null);
  const ve = actionState.validationErrors;
  const router = useRouter();

  useEffect(() => {
    if (ve?.comment) {
      toast.error(ve.comment[0]);
    }
  }, [ve]);

  useEffect(() => {
    if (actionState.success) {
      toast.success("Return success");
      router.push("/histories");
    }
  }, [actionState.success]);

  useEffect(() => {
    if (actionState.errors) {
      toast.error(actionState.errors);
    }
  }, [actionState.errors]);

  return (
    <fieldset disabled={pending}>
      <button
        className="btn btn-primary"
        onClick={() => {
          refDialog.current?.showModal();
        }}
      >
        Return
      </button>
      <dialog ref={refDialog} className="modal">
        <form action={formAction} className="modal-box">
          <input
            type="text"
            name="loanAt"
            hidden
            defaultValue={loanAt.toString()}
          />
          <input type="text" name="charge" hidden defaultValue={charge} />
          <input type="text" name="userId" hidden defaultValue={userId} />
          <input type="text" name="bookId" hidden defaultValue={id} />
          <h3 className="font-bold text-lg">Return Book</h3>
          <div className="divider divider-start">
            <span className="text-neutral-600 font-semibold">Book Info</span>
          </div>
          <div className="py-4">
            <p>Book title : {title}</p>
            <p>Loaned by : {loanBy}</p>
            <p>Charge : {charge}</p>
          </div>
          <div className="divider divider-start">
            <span className="text-neutral-600 font-semibold">
              User honest review
            </span>
          </div>
          <div className="flex items-center w-full">
            <p>Your rating : </p>
            <div className="rating rating-md rating-half">
              <input
                defaultChecked
                type="radio"
                name="rating"
                className="rating-hidden"
              />
              <input
                value={0.5}
                type="radio"
                name="rating"
                className="bg-yellow-500 mask mask-star-2 mask-half-1"
              />
              <input
                value={1}
                type="radio"
                name="rating"
                className="bg-yellow-500 mask mask-star-2 mask-half-2"
              />
              <input
                value={1.5}
                type="radio"
                name="rating"
                className="bg-yellow-500 mask mask-star-2 mask-half-1"
              />
              <input
                value={2}
                type="radio"
                name="rating"
                className="bg-yellow-500 mask mask-star-2 mask-half-2"
              />
              <input
                value={2.5}
                type="radio"
                name="rating"
                className="bg-yellow-500 mask mask-star-2 mask-half-1"
              />
              <input
                value={3}
                type="radio"
                name="rating"
                className="bg-yellow-500 mask mask-star-2 mask-half-2"
              />
              <input
                value={3.5}
                type="radio"
                name="rating"
                className="bg-yellow-500 mask mask-star-2 mask-half-1"
              />
              <input
                value={4}
                type="radio"
                name="rating"
                className="bg-yellow-500 mask mask-star-2 mask-half-2"
              />
              <input
                value={4.5}
                type="radio"
                name="rating"
                className="bg-yellow-500 mask mask-star-2 mask-half-1"
              />
              <input
                value={5}
                type="radio"
                name="rating"
                className="bg-yellow-500 mask mask-star-2 mask-half-2"
              />
            </div>
          </div>
          <div className="w-full pt-3">
            <textarea
              name="comment"
              className="textarea textarea-neutral resize-none w-full"
              placeholder="comment..."
            ></textarea>
          </div>
          <div className="modal-action">
            <button
              type="button"
              onClick={() => refDialog.current?.close()}
              className="btn btn-neutral"
            >
              close
            </button>
            <button type="submit" className="btn btn-primary btn-soft">
              Return
            </button>
          </div>
        </form>
      </dialog>
    </fieldset>
  );
}
