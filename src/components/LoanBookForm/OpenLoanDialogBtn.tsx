"use client";

import { useParams, useRouter } from "next/navigation";

export default function OpenLoanDialogBtn({
  available,
}: {
  available: number;
}) {
  const router = useRouter();
  const params = useParams();
  return (
    <button
      disabled={available === 0}
      onClick={() => router.push(`/books/${params.id}/loan`)}
      className="btn btn-sm btn-success"
    >
      Loan this book
    </button>
  );
}
