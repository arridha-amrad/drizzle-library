import Link from "next/link";
import db from "@/drizzle/db";
import { BooksTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import OpenLoanDialogBtn from "./LoanDialog";
import { users } from "@/drizzle/schema";

type Props = {
  id: string;
};

const getBookDetail = unstable_cache(
  async (bookId: string) => {
    const book = await db
      .select()
      .from(BooksTable)
      .where(eq(BooksTable.id, bookId));
    return book;
  },
  ["book-details"],
  { tags: ["book-details"], revalidate: 60 }
);

const getUsers = unstable_cache(
  async () => {
    const existingUsers = await db.select().from(users);
    return existingUsers;
  },
  ["users"],
  {
    tags: ["users"],
  }
);

export default async function BookTable({ id }: Props) {
  const [book, users] = await Promise.all([getBookDetail(id), getUsers()]);

  return (
    <>
      <div className="h-[50px] flex items-center w-full justify-between ">
        <h1 className="text-xl font-bold tracking-tight">Book Detail</h1>
        <OpenLoanDialogBtn
          bookId={book[0].id}
          users={users}
          title={book[0].title}
          available={book[0].stocks.available}
        />
      </div>
      <div className="rounded-box mt-4 overflow-hidden border border-base-content/10 bg-base-100">
        <table className="table">
          <thead>
            <tr className="bg-neutral">
              <th className="border-r border-base-content/10">Title</th>
              <th className="border-r border-base-content/10">Stocks</th>
              <th className="border-r border-base-content/10">Author</th>
              <th className="border-r border-base-content/10">Categories</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-r border-base-content/10">
                {book[0].title}
              </td>
              <td className="border-r border-base-content/10">
                <div>total : {book[0].stocks.total}</div>
                <div>available : {book[0].stocks.available}</div>
              </td>
              <td className="border-r border-base-content/10">
                {book[0].author}
              </td>
              <td className="border-r border-base-content/10 space-x-1">
                {book[0].categories.map((cat, i) => (
                  <Link
                    key={i}
                    className="space-x-1"
                    href={`/books?isFilter=true&categories=${
                      cat.includes("#") ? cat.replaceAll("#", "%23") : cat
                    }`}
                  >
                    {cat}
                    {i === book[0].categories.length - 1 ? "" : ","}
                  </Link>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
