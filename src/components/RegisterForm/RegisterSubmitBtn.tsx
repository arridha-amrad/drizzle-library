"use client";

import { useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";

export default function RegisterSubmitButton({
  isDisabled,
}: {
  isDisabled: boolean;
}) {
  const { pending, data } = useFormStatus();

  const params = useSearchParams();
  const isEdit = params.get("isEdit");

  return (
    <button
      disabled={isDisabled}
      type="submit"
      className="btn btn-primary disabled:btn-outline"
    >
      {pending ? (
        <>
          <span className="loading loading-spinner"></span>
          loading...
        </>
      ) : isEdit && isEdit === "true" ? (
        "Edit"
      ) : (
        "Submit"
      )}
    </button>
  );
}
