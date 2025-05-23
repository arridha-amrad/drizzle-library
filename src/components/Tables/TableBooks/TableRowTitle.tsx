"use client";

import { editBookTitle } from "@/actions/books/editBookTitle";
import { cn } from "@/utils";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { KeyboardEvent, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  slug: string;
  title: string;
  id: string;
};

function TableRowTitle({ slug, title, id }: Props) {
  const [isUpdate, setIsUpdate] = useState(false);
  const [state, setState] = useState(title);

  const [bookTitle, setBookTitle] = useState(title);

  const { execute, isPending } = useAction(editBookTitle.bind(null, id), {
    onSuccess() {
      toast.success("Title updated");
    },
    onError({ error: { serverError, validationErrors } }) {
      if (serverError) {
        toast.error(serverError);
      }
      if (validationErrors) {
        const vErr = validationErrors.title?._errors;
        if (vErr) {
          toast.error(vErr[0]);
        }
      }
    },
    onExecute({ input }) {
      const title = (input as FormData).get("title") as string;
      setBookTitle(title);
    },
  });

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <td className="max-w-lg group relative w-full border-r border-base-content/10">
      {isUpdate ? (
        <fieldset disabled={isPending}>
          <form action={execute}>
            <input
              autoFocus={true}
              name="title"
              onBlur={() => setIsUpdate(false)}
              onKeyDown={handleKeyDown}
              className="input input-neutral w-full"
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </form>
        </fieldset>
      ) : (
        <Link className={cn("line-clamp-2")} href={`/books/${slug}`}>
          {bookTitle}
        </Link>
      )}
      {!isUpdate && (
        <div className="absolute group-hover:opacity-100 opacity-0 right-4 top-1/2 -translate-y-1/2">
          <button
            onClick={() => setIsUpdate((val) => !val)}
            className="btn btn-soft btn-xs btn-primary"
          >
            update
          </button>
        </div>
      )}
    </td>
  );
}

export default TableRowTitle;
