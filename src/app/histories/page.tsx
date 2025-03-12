import db from "@/drizzle/db";
import { BooksTable, LoanHistoriesTable, users } from "@/drizzle/schema";
import { LIMIT_BOOKS } from "@/variables";
import { eq, sum } from "drizzle-orm";
import Link from "next/link";

const fetchHistories = async () => {
  const histories = await db
    .select()
    .from(LoanHistoriesTable)
    .innerJoin(users, eq(users.id, LoanHistoriesTable.userId))
    .innerJoin(BooksTable, eq(BooksTable.id, LoanHistoriesTable.bookId));
  return histories;
};

const sumCharge = async () => {
  const total = await db
    .select({ total: sum(LoanHistoriesTable.charge) })
    .from(LoanHistoriesTable);
  return total;
};

type Props = {
  searchParams: Promise<{
    page?: number;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const { page } = await searchParams;
  const [histories, balance] = await Promise.all([
    await fetchHistories(),
    await sumCharge(),
  ]);
  return (
    <>
      <section className="flex items-center gap-3">
        <h1 className="text-lg font-semibold">Total Balance : </h1>
        <span>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(Number(balance[0].total!))}
        </span>
        {/* <span>Rp.{balance[0].total}</span> */}
      </section>
      <div className="overflow-x-auto h-full py-4">
        <table className="table">
          <thead className="">
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Loan by</th>
              <th>Loan At</th>
              <th>Return At</th>
              <th>Charge</th>
            </tr>
          </thead>
          <tbody>
            {histories.map((histories, i) => (
              <tr className="hover" key={`${histories.loan_histories.id}`}>
                <td>{i + 1 + (page ? (Number(page) - 1) * LIMIT_BOOKS : 0)}</td>
                <td>
                  <Link href={`/books/${histories.books.id}`}>
                    {histories.books.title}
                  </Link>
                </td>
                <td>
                  <Link href={`/users/${histories.users.id}`}>
                    {histories.users.name}
                  </Link>
                </td>
                <td>
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(new Date(histories.loan_histories.loanAt))}
                </td>
                <td>
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(new Date(histories.loan_histories.returnAt))}
                </td>
                <td>{histories.loan_histories.charge}</td>
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
