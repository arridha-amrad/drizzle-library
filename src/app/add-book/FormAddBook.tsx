"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { addNewBook } from "./action";

const initialState = {
  validationErrors: undefined,
  actionError: undefined,
  success: false,
};

type Props = {
  isShowCancelButton?: boolean;
};

export default function FormAddBook({ isShowCancelButton }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState("");

  const [actionState, action, pending] = useActionState(
    addNewBook,
    initialState
  );

  const ve = actionState.validationErrors;

  useEffect(() => {
    if (actionState.success) {
      toast.success("New book added");
      router.push(`/books?title=${title}`);
    }
  }, [actionState.success]);

  useEffect(() => {
    if (actionState.actionError) {
      toast.error("New book added");
    }
  }, [actionState.actionError]);

  return (
    <fieldset disabled={pending}>
      <form action={action} className="w-full space-y-3">
        <h3 className="font-bold text-lg">Add new book</h3>
        <fieldset className="fieldset">
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input w-full input-neutral"
            placeholder="Book's title"
          />
          {ve && ve.title && (
            <p className="fieldset-label text-error">{ve.title[0]}</p>
          )}
        </fieldset>
        <fieldset className="fieldset">
          <input
            type="text"
            name="author"
            className="input w-full input-neutral"
            placeholder="Book's author"
          />
          {ve && ve.author && (
            <p className="fieldset-label text-error">{ve.author[0]}</p>
          )}
        </fieldset>
        <fieldset className="fieldset">
          <input
            type="number"
            name="stocks"
            className="input w-full input-neutral"
            placeholder="Book's stocks"
          />
          {ve && ve.stocks && (
            <p className="fieldset-label text-error">{ve.stocks[0]}</p>
          )}
        </fieldset>
        <fieldset className="fieldset">
          <input
            type="text"
            name="categories"
            className="input w-full input-neutral"
            placeholder="Book's categories"
          />
          {ve && ve.categories && (
            <p className="fieldset-label text-error">{ve.categories[0]}</p>
          )}
        </fieldset>
        <div className="flex justify-end gap-3">
          {isShowCancelButton && (
            <button
              type="button"
              onClick={() => {
                router.back();
              }}
              className="btn btn-neutral"
            >
              Close
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>
      </form>
    </fieldset>
  );
}
