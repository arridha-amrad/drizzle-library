import { CACHE_KEY } from "@/cacheKeys";
import { LIMIT_BOOKS } from "@/constants";
import db from "@/lib/drizzle/db";
import { BooksTable, LoansTable, UsersTable } from "@/lib/drizzle/schema";
import { count, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export const fetchOnLoanBooks = unstable_cache(
  async (page: number) => {
    const books = await db
      .select({
        title: BooksTable.title,
        loanBy: UsersTable.name,
        loanAt: LoansTable.createdAt,
        loanDueAt: LoansTable.dueAt,
        id: BooksTable.id,
        userId: UsersTable.id,
      })
      .from(LoansTable)
      .innerJoin(UsersTable, eq(UsersTable.id, LoansTable.userId))
      .innerJoin(BooksTable, eq(BooksTable.id, LoansTable.bookId))
      .limit(LIMIT_BOOKS)
      .offset((page ? page - 1 : 0) * LIMIT_BOOKS);

    const total = await db
      .select({ count: count() })
      .from(LoansTable)
      .then((res) => res[0].count);

    return {
      books,
      total,
    };
  },
  [CACHE_KEY.onLoanBooks],
  {
    tags: [CACHE_KEY.onLoanBooks],
    revalidate: 60 * 10,
  }
);

export type TLoanBooks = Awaited<ReturnType<typeof fetchOnLoanBooks>>;
