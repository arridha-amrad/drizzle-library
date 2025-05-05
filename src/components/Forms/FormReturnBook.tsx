"use client";

import { returnBook } from "@/actions/books/returnBook";
import StarRating from "@/components/StarRating";
import { countCharge } from "@/utils";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { toast } from "react-toastify";

type Props = {
  children: ReactNode;
  bookId: string;
  dueAt: Date;
  userId: number;
  loanBy: string;
  title: string;
};

export default function FormReturnBook({
  bookId,
  dueAt,
  userId,
  loanBy,
  title,
  children,
}: Props) {
  const router = useRouter();

  const { execute, isPending } = useAction(
    returnBook.bind(null, userId, bookId),
    {
      onError({
        error: { serverError, validationErrors, bindArgsValidationErrors },
      }) {
        if (serverError) {
          toast.error(serverError);
        }
        if (validationErrors) {
          console.log({ validationErrors });
          toast.error("Validation Errors");
        }
        if (bindArgsValidationErrors) {
          console.log({ bindArgsValidationErrors });
          toast.error("Bind args validation errors");
        }
      },
      onSuccess({ data }) {
        if (data) {
          toast.success("Book return successfully");
          router.push(`/histories?highlight=true&historyId=${data.id}`);
        }
      },
    }
  );

  return (
    <form action={execute}>
      <div className="divider divider-start">
        <span className="text-neutral-600 font-semibold">Book Info</span>
      </div>
      <div className="py-4">
        <p>Book title : {title}</p>
        <p>Loaned by : {loanBy}</p>
        <p>Charge : {countCharge(dueAt)}</p>
      </div>
      <div className="divider divider-start">
        <span className="text-neutral-600 font-semibold">Review</span>
      </div>
      <div className="flex items-center w-full">
        <p>Your rating : </p>
        <StarRating />
      </div>
      <div className="w-full pt-3">
        <textarea
          name="review"
          className="textarea textarea-neutral resize-none w-full"
          placeholder="comment..."
        ></textarea>
      </div>
      <div className="mt-4 flex justify-end gap-3">
        {children}
        <button type="submit" className="btn btn-accent btn-soft w-20">
          {isPending ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Finish"
          )}
        </button>
      </div>
    </form>
  );
}
