import { LIMIT_BOOKS } from "@/constants";
import { TLoanBooks } from "./query";
import countCharge from "@/utils";
import Link from "next/link";
import FinishLoan from "./FinishLoan";

const className = {
  col: "border-r border-base-content/10",
};

type Props = {
  books: TLoanBooks["books"];
  page: number;
};

function LoansTable({ books, page }: Props) {
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
              <tr key={`${book.id}${book.userId}`}>
                <td className={`${className.col}`}>
                  {i + 1 + (page ? (Number(page) - 1) * LIMIT_BOOKS : 0)}
                </td>
                <td className={`${className.col}`}>
                  <Link href={`/books/${book.id}`}>{book.title}</Link>
                </td>
                <td className={`${className.col}`}>
                  <Link href={`/users/${book.userId}`}>{book.loanBy}</Link>
                </td>
                <td className={`${className.col}`}>
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(new Date(book.loanAt))}
                </td>
                <td className={`${className.col}`}>
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(new Date(book.loanDueAt))}
                </td>

                <td className={`${className.col}`}>
                  {countCharge(book.loanDueAt).toString()}
                </td>
                <td className={`${className.col}`}>
                  {/* <Done data={book} /> */}
                  <FinishLoan data={book} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LoansTable;
