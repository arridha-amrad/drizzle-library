import { TUserLoanBook } from "@/queries/fetchUserLoanBooks";
import { formatDate, formatToRupiah, countCharge } from "@/utils";
import Link from "next/link";
import ModalReturnBook from "../Modal/ModalReturnBook";

type Props = {
  books: TUserLoanBook[];
};

const className = {
  col: "border-r border-base-content/10",
};

export default function TableUserLoanBooks({ books }: Props) {
  return (
    <div className="rounded-box overflow-hidden border border-base-content/10 bg-base-100">
      <table className="table">
        <thead>
          <tr className="bg-neutral">
            <th className={`${className.col}`}>No</th>
            <th className={`${className.col}`}>Title</th>
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
              <tr key={book.id}>
                <td className={`${className.col}`}>{i + 1}</td>
                <td className={`${className.col}`}>
                  <Link href={`/books/${book.slug}`}>{book.title}</Link>
                </td>
                <td className={`${className.col}`}>
                  {formatDate(new Date(book.loanAt), true)}
                </td>
                <td className={`${className.col}`}>
                  {formatDate(new Date(book.dueAt), true)}
                </td>

                <td className={`${className.col}`}>
                  {formatToRupiah(countCharge(book.dueAt))}
                </td>
                <td className={`${className.col}`}>
                  <ModalReturnBook
                    bookId={book.id}
                    dueAt={book.dueAt}
                    loanBy={book.loanBy}
                    title={book.title}
                    userId={book.loanUserId}
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
