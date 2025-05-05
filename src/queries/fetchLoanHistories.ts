import { CACHE_KEY } from "@/cacheKeys";
import { LIMIT_BOOKS } from "@/constants";
import db from "@/lib/drizzle/db";
import { HistoriesTable, BooksTable, UsersTable } from "@/lib/drizzle/schema";
import { desc, eq, count } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export const fetchLoanHistories = unstable_cache(
  async (page: number) => {
    const histories = await db
      .select({
        id: HistoriesTable.id,
        bookTitle: BooksTable.title,
        bookSlug: BooksTable.slug,
        bookId: BooksTable.id,
        borrowerName: UsersTable.name,
        borrowerId: UsersTable.id,
        loanAt: HistoriesTable.loanAt,
        returnAt: HistoriesTable.returnAt,
        charge: HistoriesTable.charge,
      })
      .from(HistoriesTable)
      .orderBy(desc(HistoriesTable.returnAt))
      .limit(LIMIT_BOOKS)
      .offset((Number(page) - 1) * LIMIT_BOOKS)
      .innerJoin(UsersTable, eq(UsersTable.id, HistoriesTable.userId))
      .innerJoin(BooksTable, eq(BooksTable.id, HistoriesTable.bookId));

    const total = await db
      .select({ count: count() })
      .from(HistoriesTable)
      .then((res) => res[0].count);

    return { histories, total };
  },
  [CACHE_KEY.histories],
  {
    tags: [CACHE_KEY.histories],
    revalidate: 60,
  }
);

export type LoanHistory = Awaited<
  ReturnType<typeof fetchLoanHistories>
>["histories"][number];
