"use client";

import { loanABook } from "@/actions/bookActions";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";

const initialState = {
  message: "",
  error: "",
};

export default function ModalLoanBookForm() {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const params = useParams();

  useEffect(() => {
    const element = document.getElementById("my_modal_2");
    if (open) {
      element?.classList.add("modal-open");
    } else {
      element?.classList.remove("modal-open");
    }
  }, [open]);

  const loanBookWithBindBookId = loanABook.bind(null, String(params.id));

  const loan = async (data: FormData) => {
    try {
      await loanBookWithBindBookId(data).then((result) => {
        if (result?.error) {
          toast.error(result.error);
        } else {
          toast.success("Loan successfully");
        }
      });
    } catch (err: any) {
      if (err.message.includes("duplicate")) {
        toast.error("The user has loaned the same book");
      }
    }

    router.back();
  };
  return (
    <form action={loan} className="modal-box space-y-3">
      <div className="mx-auto w-fit">
        <h1 className="text-lg font-semibold text-base-content">Loan A Book</h1>
      </div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">User Id</span>
        </div>
        <input
          type="text"
          name="userId"
          className="input input-bordered w-full"
        />
        <div className="label">
          <span className="label-text-alt text-sm text-neutral-500">
            userId input is for user who want to loan this book
          </span>
        </div>
      </label>
      <div className="modal-action">
        <button className="btn btn-primary" type="submit">
          Loan
        </button>
        <button
          type="button"
          onClick={() => {
            router.back();
            setOpen(false);
          }}
          className="btn"
        >
          Close
        </button>
      </div>
    </form>
  );
}
