import { CACHE_KEY } from "@/cacheKeys";
import db from "@/lib/drizzle/db";
import { BooksTable, LoansTable, UsersTable } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export const fetchUserLoanBooks = unstable_cache(
  async (userId: number) => {
    const books = await db
      .select({
        id: BooksTable.id,
        title: BooksTable.title,
        author: BooksTable.author,
        slug: BooksTable.slug,
        loanUserId: UsersTable.id,
        loanAt: LoansTable.createdAt,
        loanBy: UsersTable.name,
        dueAt: LoansTable.dueAt,
      })
      .from(LoansTable)
      .innerJoin(BooksTable, eq(LoansTable.bookId, BooksTable.id))
      .innerJoin(UsersTable, eq(UsersTable.id, LoansTable.userId))
      .where(eq(LoansTable.userId, userId));

    return books;
  },
  [CACHE_KEY.userLoans],
  { revalidate: 60, tags: [CACHE_KEY.userLoans] }
);

export type TUserLoanBook = Awaited<
  ReturnType<typeof fetchUserLoanBooks>
>[number];
