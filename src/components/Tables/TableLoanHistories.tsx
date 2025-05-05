"use client";

import { LIMIT_BOOKS } from "@/constants";
import Link from "next/link";
import { LoanHistory } from "@/queries/fetchLoanHistories";
import { cn, formatDate, formatToRupiah } from "@/utils";
import { useSearchParams } from "next/navigation";

type Props = {
  page: number;
  histories: LoanHistory[];
};

const className = {
  col: "border-r border-base-content/10",
};

export default function TableLoanHistories({ histories, page }: Props) {
  const sp = useSearchParams();
  const highlightParam = sp.get("highlight");
  const historyId = sp.get("historyId");

  const isHighlight = highlightParam === "true";

  return (
    <div className="rounded-box mt-4 overflow-hidden border border-base-content/10 bg-base-100">
      <table className="table">
        <thead className="">
          <tr className="bg-neutral">
            <th className={`${className.col}`}>No</th>
            <th className={`${className.col}`}>Title</th>
            <th className={`${className.col}`}>Loan by</th>
            <th className={`${className.col}`}>Loan At</th>
            <th className={`${className.col}`}>Return At</th>
            <th className={`${className.col}`}>Charge</th>
          </tr>
        </thead>
        <tbody>
          {histories.length === 0 ? (
            <tr>
              <td>
                <h1 className="text-xl font-semibold">No Loan Histories</h1>
              </td>
            </tr>
          ) : (
            histories.map((history, i) => (
              <tr
                className={cn(
                  isHighlight &&
                    (historyId ? history.id === Number(historyId) : false)
                    ? "bg-primary/20"
                    : ""
                )}
                key={`${history.id}`}
              >
                <td className={`${className.col}`}>
                  {i + 1 + (page ? (Number(page) - 1) * LIMIT_BOOKS : 0)}
                </td>
                <td className={`${className.col}`}>
                  <Link href={`/books/${history.bookSlug}`}>
                    {history.bookTitle}
                  </Link>
                </td>
                <td className={`${className.col}`}>
                  <Link href={`/users/${history.borrowerName}`}>
                    {history.borrowerName}
                  </Link>
                </td>
                <td className={`${className.col}`}>
                  {formatDate(new Date(history.loanAt), true)}
                </td>
                <td className={`${className.col}`}>
                  {formatDate(new Date(history.returnAt), true)}
                </td>
                <td className={`${className.col}`}>
                  {formatToRupiah(history.charge)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
