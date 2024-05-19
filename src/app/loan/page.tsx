import ReturnBookBtn from "@/components/ReturnBookBtn";
import { db } from "@/drizzle/migrate";
import { BooksTable, LoanTable, users } from "@/drizzle/schema";
import { LIMIT_BOOKS } from "@/variables";
import { eq } from "drizzle-orm";
import Link from "next/link";

type Args = {
  page?: number;
};

const fetchLoanBooks = async ({ page }: Args) => {
  const books = await db
    .select()
    .from(LoanTable)
    .innerJoin(users, eq(users.id, LoanTable.userId))
    .innerJoin(BooksTable, eq(BooksTable.id, LoanTable.bookId))
    .limit(LIMIT_BOOKS)
    .offset((page ? page - 1 : 0) * LIMIT_BOOKS);
  return books;
};

type Params = {
  searchParams: {
    page?: number;
  };
};

export default async function Page({ searchParams: { page } }: Params) {
  const books = await fetchLoanBooks({ page });
  const findCharge = (dueDate: Date) => {
    const dueTime = dueDate.getTime();
    const currTime = new Date().getTime();
    const charge =
      Math.floor((currTime - dueTime) / (1000 * 60 * 60 * 24)) * 1000;
    return currTime - dueTime <= 0
      ? "-"
      : charge <= 0
      ? "-"
      : charge.toString();
  };
  return (
    <>
      <div className="overflow-x-auto h-full py-4">
        <table className="table border border-neutral-700">
          <thead className="">
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Loan by</th>
              <th>Loan At</th>
              <th>Return At</th>
              <th>Charge</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, i) => (
              <tr key={`${book.loan.bookId}${book.loan.userId}`}>
                <td>{i + 1 + (page ? (Number(page) - 1) * LIMIT_BOOKS : 0)}</td>
                <td>
                  <Link href={`/books/${book.books.id}`}>
                    {book.books.title}
                  </Link>
                </td>
                <td>
                  <Link href={`/users/${book.users.id}`}>
                    {book.users.name}
                  </Link>
                </td>
                <td>
                  {new Intl.DateTimeFormat("en-US").format(
                    new Date(book.loan.createdAt)
                  )}
                </td>
                <td>
                  {new Intl.DateTimeFormat("en-US").format(
                    new Date(book.loan.dueAt)
                  )}
                </td>
                <td>{findCharge(book.loan.dueAt)}</td>
                <td>
                  <ReturnBookBtn
                    bookId={book.books.id}
                    userId={book.users.id}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <section className="w-full flex justify-center py-4">
        {total > LIMIT_BOOKS && (
          <div className="join">
            {new Array(Math.ceil(total / LIMIT_BOOKS)).fill("").map((_, i) => (
              <PaginateButton key={i} number={i + 1} />
            ))}
          </div>
        )}
      </section> */}
    </>
  );
}
