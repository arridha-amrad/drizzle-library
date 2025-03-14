"use client";

import { returnBookAction } from "@/actions/bookActions";
import countCharge from "@/utils/countCharge";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import ReturnBookSubmitBtn from "./ReturnBookSubmitBtn";
import { TLoanBooks } from "./query";

type Props = {
  data: TLoanBooks["books"][number];
};

export default function ReturnBookBtn({ data }: Props) {
  console.log(data);

  const { title, loanDueAt, id, loanAt, userId, loanBy } = data;

  const [charge, setCharge] = useState(0);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    console.log(typeof loanDueAt);

    setCharge(countCharge(new Date(loanDueAt)));
  }, []);

  const returnBook = async (data: FormData) => {
    try {
      await returnBookAction(data);
      toast.success("Book return successfully");
      setOpen(false);
    } catch (err) {
      toast.error("Book return failed");
    }
  };

  const refDialog = useRef<HTMLDialogElement | null>(null);

  return (
    <>
      <button
        className="btn btn-sm btn-primary"
        onClick={() => {
          refDialog.current?.showModal();
        }}
      >
        return
      </button>
      <dialog ref={refDialog} className={`modal ${isOpen ? "modal-open" : ""}`}>
        <form action={returnBook} className="modal-box">
          <input
            type="text"
            name="loanAt"
            value={loanAt.toString()}
            hidden
            readOnly
          />
          <input
            type="text"
            name="dueAt"
            value={loanDueAt.toString()}
            hidden
            readOnly
          />
          <input type="text" name="charge" value={charge} hidden readOnly />
          <input type="text" name="userId" value={userId} hidden readOnly />
          <input type="text" name="bookId" value={id} hidden readOnly />
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
              className="textarea textarea-bordered resize-none w-full"
              placeholder="comment..."
            ></textarea>
          </div>
          <div className="modal-action">
            <ReturnBookSubmitBtn />
            <button
              type="button"
              onClick={() => refDialog.current?.close()}
              className="btn btn-sm"
            >
              close
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
