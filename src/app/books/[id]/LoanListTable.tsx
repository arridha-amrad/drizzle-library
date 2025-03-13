import { CACHE_KEY } from "@/cacheKeys";
import { db } from "@/drizzle/migrate";
import { BooksTable, LoanTable, users } from "@/drizzle/schema";
import { eq, desc } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export const getBookLoanData = unstable_cache(
  async (bookId: string) => {
    const data = await db
      .select({
        loan: {
          dueAt: LoanTable.dueAt,
          loanAt: LoanTable.createdAt,
        },
        user: {
          name: users.name,
          id: users.id,
        },
        book: {
          title: BooksTable.title,
          id: BooksTable.id,
        },
      })
      .from(LoanTable)
      .where(eq(LoanTable.bookId, bookId))
      .innerJoin(users, eq(users.id, LoanTable.userId))
      .innerJoin(BooksTable, eq(LoanTable.bookId, BooksTable.id))
      .orderBy(desc(LoanTable.createdAt));
    return data;
  },
  [CACHE_KEY.loanBook],
  { tags: [CACHE_KEY.loanBook] }
);

type Props = {
  bookId: string;
};

export default async function LoanListTable({ bookId }: Props) {
  const loanList = await getBookLoanData(bookId);

  return (
    <div className="rounded-box mt-4 overflow-hidden border border-base-content/10 bg-base-100">
      <table className="table ">
        <thead>
          <tr className="bg-neutral">
            <th className="border-r border-base-content/10">No.</th>
            <th className="border-r border-base-content/10">Name</th>
            <th className="border-r border-base-content/10">Book Title</th>
            <th className="border-r border-base-content/10">Loan at</th>
            <th className="border-r border-base-content/10">Due at</th>
          </tr>
        </thead>
        <tbody>
          {loanList.map((data, i) => (
            <tr key={data.user.id}>
              <td className="border-r border-base-content/10">{i + 1}</td>
              <td className="border-r border-base-content/10">
                {data.user.name}
              </td>
              <td className="border-r border-base-content/10">
                {data.book.title}
              </td>
              <td className="border-r border-base-content/10">
                {new Intl.DateTimeFormat("id").format(
                  new Date(data.loan.loanAt)
                )}
              </td>
              <td className="border-r border-base-content/10">
                {new Intl.DateTimeFormat("id").format(
                  new Date(data.loan.dueAt)
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
