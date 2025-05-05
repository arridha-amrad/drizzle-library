"use client";

import Form from "next/form";
import { useRef } from "react";

type Props = {
  callback?: VoidFunction;
};

export default function FormFilterBook({ callback }: Props) {
  const refForm = useRef<HTMLFormElement | null>(null);

  const onSubmitForm = () => {
    refForm.current?.requestSubmit();
    callback && callback();
  };

  return (
    <Form
      ref={refForm}
      className="flex flex-col gap-3 w-full"
      action="/books/search"
    >
      <h1 className="text-xl font-medium">Form Filter Books</h1>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Book&apos;s title</legend>
        <input
          name="title"
          type="text"
          className="input input-neutral w-full"
          placeholder=""
        />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Book&apos;s author</legend>
        <input
          name="author"
          type="text"
          className="input input-neutral w-full"
          placeholder=""
        />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Book&apos;s categories</legend>
        <input
          name="categories"
          type="text"
          className="input input-neutral w-full"
          placeholder=""
        />
      </fieldset>
      <div className="w-max mr-0 space-x-3 self-end">
        <button
          onClick={onSubmitForm}
          className="btn btn-soft btn-primary w-20"
        >
          Filter
        </button>
      </div>
    </Form>
  );
}
