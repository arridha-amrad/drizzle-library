import { loanBook } from "@/actions/books/loanBook";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { toast } from "react-toastify";
import InputBorrowBookUser from "../Input/InputBorrowBookUser";

type Props = {
  children: ReactNode;
  bookId: string;
  bookTitle: string;
  callback: VoidFunction;
};

export default function FormBorrowBook({
  bookId,
  bookTitle,
  children,
  callback,
}: Props) {
  const router = useRouter();

  const { execute, isPending } = useAction(loanBook, {
    onSuccess({ data }) {
      toast.success("Loan successful");
      if (data) {
        router.push(
          `/loans?highlight=true&userId=${data.userId}&bookId=${data.bookId}`
        );
      }
    },
    onError({ error: { serverError, validationErrors } }) {
      if (serverError) {
        toast.error(serverError);
      }
      if (validationErrors) {
        toast.error("Validation error");
      }
    },
    onSettled() {
      callback();
    },
  });

  const [userId, setUserId] = useState("");

  return (
    <fieldset disabled={isPending}>
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
        <InputBorrowBookUser setUserId={setUserId} />
        <div className="modal-action">
          {children}
          <button
            disabled={!userId}
            className="btn btn-primary w-20"
            type="submit"
          >
            {isPending ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Borrow"
            )}
          </button>
        </div>
      </form>
    </fieldset>
  );
}
