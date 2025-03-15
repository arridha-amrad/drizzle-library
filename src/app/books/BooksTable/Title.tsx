"use client";

import Link from "next/link";
import { KeyboardEvent, useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateBookTitle } from "../action";

type Props = {
  id: string;
  title: string;
};

const initialState = {
  validationErrors: undefined,
  actionError: undefined,
  success: false,
};

function BookTableTitle({ id, title }: Props) {
  const [isUpdate, setIsUpdate] = useState(false);
  const [state, setState] = useState(title);

  const [actionState, formAction, pending] = useActionState(
    (initialState: any, formData: FormData) =>
      updateBookTitle(initialState, formData, id),
    initialState
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      actionState.success = false;
      actionState.validationErrors = undefined;
      actionState.actionError = undefined;
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  const validationError = actionState?.validationErrors?.title;
  const isUpdateSuccessful = actionState.success;
  const actionError = actionState.actionError;

  useEffect(() => {
    if (actionError) {
      toast.error(actionError);
      setIsUpdate(false);
    }
  }, [actionError]);

  useEffect(() => {
    if (isUpdateSuccessful) {
      toast.success("Title updated");
      setIsUpdate(false);
    }
  }, [isUpdateSuccessful]);

  useEffect(() => {
    if (validationError) {
      toast.error(validationError[0]);
    }
  }, [validationError]);

  return (
    <td className="max-w-lg group relative w-full border-r border-base-content/10">
      {isUpdate ? (
        <fieldset disabled={pending}>
          <form action={formAction}>
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
        <Link className="line-clamp-2" href={`/books/${id}`}>
          {title}
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

export default BookTableTitle;
