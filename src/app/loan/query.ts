import { CACHE_KEY } from "@/cacheKeys";
import db from "@/drizzle/db";
import { LoanTable, users, BooksTable } from "@/drizzle/schema";
import { LIMIT_BOOKS } from "@/variables";
import { count, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export const fetchLoanBooks = unstable_cache(
  async (page: number) => {
    const books = await db
      .select({
        title: BooksTable.title,
        loanBy: users.name,
        loanAt: LoanTable.createdAt,
        loanDueAt: LoanTable.dueAt,
        id: BooksTable.id,
        userId: users.id,
      })
      .from(LoanTable)
      .innerJoin(users, eq(users.id, LoanTable.userId))
      .innerJoin(BooksTable, eq(BooksTable.id, LoanTable.bookId))
      .limit(LIMIT_BOOKS)
      .offset((page ? page - 1 : 0) * LIMIT_BOOKS);

    const total = await db
      .select({ count: count() })
      .from(LoanTable)
      .then((res) => res[0].count);

    return {
      books,
      total,
    };
  },
  [CACHE_KEY.loans],
  {
    tags: [CACHE_KEY.loans],
    revalidate: 60 * 10,
  }
);

export type TLoanBooks = Awaited<ReturnType<typeof fetchLoanBooks>>;
