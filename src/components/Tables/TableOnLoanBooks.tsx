"use client";

import { LIMIT_BOOKS } from "@/constants";
import { cn, countCharge, formatDate, formatToRupiah } from "@/utils";
import Link from "next/link";
import FinishLoan from "../Modal/ModalReturnBook";
import { TLoanBook } from "@/queries/fetchOnLoanBooks";
import { useSearchParams } from "next/navigation";

const className = {
  col: "border-r border-base-content/10",
};

type Props = {
  books: TLoanBook[];
  page: number;
};

function TableOnLoanBooks({ books, page }: Props) {
  const sp = useSearchParams();
  const highlightParam = sp.get("highlight");
  const userId = sp.get("userId");
  const bookId = sp.get("bookId");

  const isHighlight = highlightParam === "true";

  return (
    <div className="rounded-box overflow-hidden border border-base-content/10 bg-base-100">
      <table className="table">
        <thead>
          <tr className="bg-neutral">
            <th className={`${className.col}`}>No</th>
            <th className={`${className.col}`}>Title</th>
            <th className={`${className.col}`}>Loan by</th>
            <th className={`${className.col}`}>Loan At</th>
            <th className={`${className.col}`}>Due At</th>
            <th className={`${className.col}`}>Charge</th>
            <th className={`${className.col}`}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 ? (
            <tr>
              <td>
                <h1 className="text-xl font-semibold">No Books on loan</h1>
              </td>
            </tr>
          ) : (
            books.map((book, i) => (
              <tr
                className={cn(
                  isHighlight &&
                    book.id === bookId &&
                    (userId ? book.userId === parseInt(userId) : false)
                    ? "bg-primary/20"
                    : ""
                )}
                key={`${book.id}${book.userId}`}
              >
                <td className={`${className.col}`}>
                  {i + 1 + (page ? (Number(page) - 1) * LIMIT_BOOKS : 0)}
                </td>
                <td className={`${className.col}`}>
                  <Link href={`/books/${book.bookSlug}`}>{book.title}</Link>
                </td>
                <td className={`${className.col}`}>
                  <Link href={`/users/${book.loanBy}`}>{book.loanBy}</Link>
                </td>
                <td className={`${className.col}`}>
                  {formatDate(new Date(book.loanAt), true)}
                </td>
                <td className={`${className.col}`}>
                  {formatDate(new Date(book.loanDueAt), true)}
                </td>

                <td className={`${className.col}`}>
                  {formatToRupiah(countCharge(book.loanDueAt))}
                </td>
                <td className={`${className.col}`}>
                  <FinishLoan
                    bookId={book.id}
                    dueAt={book.loanDueAt}
                    loanBy={book.loanBy}
                    title={book.title}
                    userId={book.userId}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TableOnLoanBooks;
