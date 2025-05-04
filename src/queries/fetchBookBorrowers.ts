"use server";

import { CACHE_KEY } from "@/cacheKeys";
import db from "@/lib/drizzle/db";
import { LoansTable, UsersTable, BooksTable } from "@/lib/drizzle/schema";
import { eq, desc } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export const fetchBookBorrowers = unstable_cache(
  async (bookId: string) => {
    const data = await db
      .select({
        loan: {
          dueAt: LoansTable.dueAt,
          loanAt: LoansTable.createdAt,
        },
        user: {
          name: UsersTable.name,
          id: UsersTable.id,
        },
        book: {
          title: BooksTable.title,
          id: BooksTable.id,
        },
      })
      .from(LoansTable)
      .where(eq(LoansTable.bookId, bookId))
      .innerJoin(UsersTable, eq(UsersTable.id, LoansTable.userId))
      .innerJoin(BooksTable, eq(LoansTable.bookId, BooksTable.id))
      .orderBy(desc(LoansTable.createdAt));
    return data;
  },
  [CACHE_KEY.loanBook],
  { tags: [CACHE_KEY.loanBook], revalidate: 60 }
);
