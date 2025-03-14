"use client";

import { useFormStatus } from "react-dom";

export default function ReturnBookSubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} type="submit" className="btn btn-sm btn-primary">
      Submit
    </button>
  );
}
