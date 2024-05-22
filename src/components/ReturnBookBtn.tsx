"use client";

import { returnBookAction } from "@/actions/bookActions";
import { TLoanBook } from "@/app/loan/page";
import countCharge from "@/utils/countCharge";
import { useState } from "react";
import { toast } from "react-toastify";
import ReturnBookSubmitBtn from "./ReturnBookSubmitBtn";

type Props = {
  data: TLoanBook;
};

export default function ReturnBookBtn({ data }: Props) {
  const {
    books: { title },
    loan: { dueAt, bookId, createdAt, userId },
    users: { name },
  } = data;

  const [isOpen, setOpen] = useState(false);
  const charge = countCharge(dueAt);

  const returnBook = async (data: FormData) => {
    try {
      await returnBookAction(data);
      toast.success("Book return successfully");
      setOpen(false);
    } catch (err) {
      toast.error("Book return failed");
    }
  };

  return (
    <>
      <button
        className="btn btn-sm btn-primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        return
      </button>
      <dialog
        id="return_book_modal"
        className={`modal ${isOpen ? "modal-open" : ""}`}
      >
        <form action={returnBook} className="modal-box">
          <input
            type="text"
            name="loanAt"
            value={createdAt.toString()}
            hidden
            readOnly
          />
          <input
            type="text"
            name="dueAt"
            value={dueAt.toString()}
            hidden
            readOnly
          />
          <input type="text" name="charge" value={charge} hidden readOnly />
          <input type="text" name="userId" value={userId} hidden readOnly />
          <input type="text" name="bookId" value={bookId} hidden readOnly />
          <h3 className="font-bold text-lg">Return Book</h3>
          <div className="divider divider-start">
            <span className="text-neutral-600 font-semibold">Book Info</span>
          </div>
          <div className="py-4">
            <p>Book title : {title}</p>
            <p>Loaned by : {name}</p>
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
                className="bg-green-500 mask mask-star-2 mask-half-1"
              />
              <input
                value={1}
                type="radio"
                name="rating"
                className="bg-green-500 mask mask-star-2 mask-half-2"
              />
              <input
                value={1.5}
                type="radio"
                name="rating"
                className="bg-green-500 mask mask-star-2 mask-half-1"
              />
              <input
                value={2}
                type="radio"
                name="rating"
                className="bg-green-500 mask mask-star-2 mask-half-2"
              />
              <input
                value={2.5}
                type="radio"
                name="rating"
                className="bg-green-500 mask mask-star-2 mask-half-1"
              />
              <input
                value={3}
                type="radio"
                name="rating"
                className="bg-green-500 mask mask-star-2 mask-half-2"
              />
              <input
                value={3.5}
                type="radio"
                name="rating"
                className="bg-green-500 mask mask-star-2 mask-half-1"
              />
              <input
                value={4}
                type="radio"
                name="rating"
                className="bg-green-500 mask mask-star-2 mask-half-2"
              />
              <input
                value={4.5}
                type="radio"
                name="rating"
                className="bg-green-500 mask mask-star-2 mask-half-1"
              />
              <input
                value={5}
                type="radio"
                name="rating"
                className="bg-green-500 mask mask-star-2 mask-half-2"
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
              onClick={() => setOpen(false)}
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
