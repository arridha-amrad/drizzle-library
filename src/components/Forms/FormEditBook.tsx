import { editBook } from "@/actions/books/editBook";
import { TBookDetail } from "@/queries/fetchBookBySlug";
import { useAction } from "next-safe-action/hooks";
import { ReactNode, useState } from "react";
import { toast } from "react-toastify";

export default function FormEditBook({
  children,
  book,
}: {
  children: ReactNode;
  book: TBookDetail;
}) {
  const [errors, setErrors] = useState({
    title: "",
    author: "",
    categories: "",
    stocks: "",
    available: "",
  });

  const { execute, isPending } = useAction(editBook.bind(null, book.id), {
    onSuccess() {
      toast.success("Updated successfully");
    },
    onError({ error: { serverError, validationErrors } }) {
      if (serverError) {
        toast.error(serverError);
      }
      if (validationErrors) {
        const titleErrors = validationErrors.title?._errors;
        const authorErrors = validationErrors.author?._errors;
        const categoryErrors = validationErrors.categories;
        const stocksErrors = validationErrors.stocks?._errors;
        const availableErrors = validationErrors.available?._errors;
        const normalizedCategoryErrors = Array.isArray(categoryErrors)
          ? categoryErrors[0]._errors
          : [categoryErrors][0]?._errors;
        setErrors({
          ...errors,
          author: authorErrors ? authorErrors[0] : "",
          title: titleErrors ? titleErrors[0] : "",
          categories: normalizedCategoryErrors
            ? normalizedCategoryErrors[0]
            : "",
          stocks: stocksErrors ? stocksErrors[0] : "",
          available: availableErrors ? availableErrors[0] : "",
        });
      }
    },
  });
  return (
    <fieldset disabled={isPending}>
      <div className="pb-4">
        <h1 className="text-xl font-semibold">Form Edit Book</h1>
      </div>
      <form action={execute}>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Book's title</legend>
          <input
            type="text"
            className="input w-full input-neutral"
            name="title"
            placeholder="Type here"
            defaultValue={book.title}
          />
          {!!errors.title && (
            <p className="text-xs text-error">{errors.title}</p>
          )}
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Book's author</legend>
          <input
            type="text"
            className="input w-full input-neutral"
            name="author"
            placeholder="Type here"
            defaultValue={book.author}
          />
          {!!errors.author && (
            <p className="text-xs text-error">{errors.author}</p>
          )}
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Book's categories</legend>
          <input
            type="text"
            className="input w-full input-neutral"
            name="categories"
            defaultValue={book.categories.join(",")}
            placeholder="Type here"
          />
          {!!errors.categories && (
            <p className="text-xs text-error">{errors.categories}</p>
          )}
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Book's stocks</legend>
          <input
            type="number"
            defaultValue={book.stocks}
            className="input w-full input-neutral"
            name="stocks"
            placeholder="Type here"
          />
          {!!errors.stocks && (
            <p className="text-xs text-error">{errors.stocks}</p>
          )}
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Book's available</legend>
          <input
            defaultValue={book.available}
            type="number"
            className="input w-full input-neutral"
            name="available"
            placeholder="Type here"
          />
          {!!errors.available && (
            <p className="text-xs text-error">{errors.available}</p>
          )}
        </fieldset>
        <div className="mt-4 flex items-center justify-end gap-4">
          {children}
          <button className="btn btn-accent btn-soft w-20">
            {isPending ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Edit"
            )}
          </button>
        </div>
      </form>
    </fieldset>
  );
}
