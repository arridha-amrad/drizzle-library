"use client";
import MultiSelect from "../MultiSelect";
import SubmitButton from "./SubmitBtn";

type Props = {
  categories: { id: number; name: string }[];
};

function BookFilterForm({ categories }: Props) {
  return (
    <form className="space-y-2">
      <label className="input input-bordered flex items-center gap-2">
        <input name="title" type="text" className="grow" placeholder="Title" />
        <button type="button" className="btn btn-circle btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <input
          name="author"
          type="text"
          className="grow"
          placeholder="Author"
        />
        <button type="button" className="btn btn-circle btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </label>
      <div className="w-full bg-base-content">
        <MultiSelect categories={categories} />
      </div>
      <div className="w-full flex items-center justify-end py-2 gap-2">
        {/* <button type="button" onClick={resetFilter} className="btn">
          Reset Filter
        </button>
        <button type="button" onClick={() => setOpen(false)} className="btn">
          Close Filter
        </button> */}
        <SubmitButton />
      </div>
    </form>
  );
}

export default BookFilterForm;
