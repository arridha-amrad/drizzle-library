import { CACHE_KEY } from "@/cacheKeys";
import db from "@/drizzle/db";
import { BooksTable, HistoriesTable, UsersTable } from "@/drizzle/schema";
import { LIMIT_BOOKS } from "@/variables";
import { count, desc, eq, sum } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export const fetchHistories = unstable_cache(
  async (page: number) => {
    const histories = await db
      .select({
        id: HistoriesTable.id,
        bookTitle: BooksTable.title,
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

export const sumCharge = unstable_cache(
  async () => {
    const total = await db
      .select({ total: sum(HistoriesTable.charge) })
      .from(HistoriesTable);
    return total;
  },
  [CACHE_KEY.charge],
  { tags: [CACHE_KEY.charge], revalidate: 60 }
);

export type History = Awaited<
  ReturnType<typeof fetchHistories>
>["histories"][number];
