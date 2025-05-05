"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { createBook } from "@/actions/books/createBook";
import { useAction } from "next-safe-action/hooks";
import { toast } from "react-toastify";

type Props = {
  isShowCancelButton?: boolean;
};

export default function FormCreateBook({ isShowCancelButton }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState("");

  const [validationError, setValidationError] = useState({
    title: "",
    author: "",
    stocks: "",
    categories: "",
  });

  const { execute, isPending } = useAction(createBook, {
    onSuccess({ data }) {
      if (data) {
        router.push(`/books/${data.slug}`);
        toast.success("New book created");
      }
    },
    onError({ error: { validationErrors, serverError } }) {
      if (serverError) {
        toast.error(serverError);
      }
      if (validationErrors) {
        const authorErrors = validationErrors.author?._errors;
        const categoryErrors = validationErrors.categories;
        const stockErrors = validationErrors.stocks?._errors;
        const titleErrors = validationErrors.title?._errors;
        const normalizedCategoryErrors = Array.isArray(categoryErrors)
          ? categoryErrors[0]._errors
          : [categoryErrors][0]?._errors;

        setValidationError({
          ...validationError,
          author: authorErrors ? authorErrors[0] : "",
          stocks: stockErrors ? stockErrors[0] : "",
          title: titleErrors ? titleErrors[0] : "",
          categories: normalizedCategoryErrors
            ? normalizedCategoryErrors[0]
            : "",
        });
      }
    },
  });

  return (
    <fieldset disabled={isPending}>
      <form action={execute} className="w-full space-y-3">
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
          {!!validationError.title && (
            <p className="fieldset-label text-error">{validationError.title}</p>
          )}
        </fieldset>
        <fieldset className="fieldset">
          <input
            type="text"
            name="author"
            className="input w-full input-neutral"
            placeholder="Book's author"
          />
          {!!validationError.author && (
            <p className="fieldset-label text-error">
              {validationError.author}
            </p>
          )}
        </fieldset>
        <fieldset className="fieldset">
          <input
            type="number"
            name="stocks"
            className="input w-full input-neutral"
            placeholder="Book's stocks"
          />
          {!!validationError.stocks && (
            <p className="fieldset-label text-error">
              {validationError.stocks}
            </p>
          )}
        </fieldset>
        <fieldset className="fieldset">
          <input
            type="text"
            name="categories"
            className="input w-full input-neutral"
            placeholder="Book's categories"
          />
          {!!validationError.categories && (
            <p className="fieldset-label text-error">
              {validationError.categories}
            </p>
          )}
        </fieldset>
        <div className="flex justify-end gap-3">
          {isShowCancelButton && (
            <button
              type="button"
              onClick={() => {
                router.back();
              }}
              className="btn btn-neutral w-20"
            >
              Close
            </button>
          )}
          <button type="submit" className="btn btn-primary w-20">
            {isPending ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Add"
            )}
          </button>
        </div>
      </form>
    </fieldset>
  );
}
