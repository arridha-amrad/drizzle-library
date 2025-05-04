import { ReactNode } from "react";
import InputBorrowBookUser from "../Input/InputBorrowBookUser";
import { loanBook } from "@/actions/books/loanBook";
import { useAction } from "next-safe-action/hooks";
import { toast } from "react-toastify";

type Props = {
  children: ReactNode;
  bookId: string;
  bookTitle: string;
};

export default function FormBorrowBook({ bookId, bookTitle, children }: Props) {
  const { execute, isPending } = useAction(loanBook, {
    onSuccess() {
      toast.success("Loan successful");
    },
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
    <form action={execute} className="space-y-3 mt-4 w-full">
      <input type="text" name="bookId" defaultValue={bookId} hidden />
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Book&apos;s Title</legend>
        <input
          readOnly
          name="title"
          defaultValue={bookTitle}
          type="text"
          className="input input-neutral w-full"
        />
      </fieldset>
      <InputBorrowBookUser />
      <div className="modal-action">
        {children}
        <button className="btn btn-primary w-20" type="submit">
          {isPending ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Borrow"
          )}
        </button>
      </div>
    </form>
  );
}
