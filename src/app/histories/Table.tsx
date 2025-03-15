import { LIMIT_BOOKS } from "@/variables";
import Link from "next/link";
import { History } from "./query";

type Props = {
  page: number;
  histories: History[];
};

const className = {
  col: "border-r border-base-content/10",
};

export default function Table({ histories, page }: Props) {
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
            histories.map((histories, i) => (
              <tr key={`${histories.id}`}>
                <td className={`${className.col}`}>
                  {i + 1 + (page ? (Number(page) - 1) * LIMIT_BOOKS : 0)}
                </td>
                <td className={`${className.col}`}>
                  <Link href={`/books/${histories.bookId}`}>
                    {histories.bookTitle}
                  </Link>
                </td>
                <td className={`${className.col}`}>
                  <Link href={`/users/${histories.borrowerId}`}>
                    {histories.borrowerName}
                  </Link>
                </td>
                <td className={`${className.col}`}>
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(new Date(histories.loanAt))}
                </td>
                <td className={`${className.col}`}>
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(new Date(histories.returnAt))}
                </td>
                <td className={`${className.col}`}>{histories.charge}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
