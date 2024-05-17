"use client";

import { useParams, usePathname, useRouter } from "next/navigation";

export default function OpenLoanDialogBtn() {
  const router = useRouter();
  const params = useParams();
  return (
    <button
      onClick={() => router.push(`/books/${params.id}/loan`)}
      className="btn btn-primary"
    >
      Loan this book
    </button>
  );
}
