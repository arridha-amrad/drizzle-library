import { CACHE_KEY } from "@/cacheKeys";
import { LIMIT_BOOKS } from "@/constants";
import db from "@/lib/drizzle/db";
import { BooksTable } from "@/lib/drizzle/schema";
import { count, desc } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export const fetchBooks = unstable_cache(
  async (page?: number) => {
    try {
      const books = await db
        .select()
        .from(BooksTable)
        .orderBy(desc(BooksTable.title))
        .limit(LIMIT_BOOKS)
        .offset(page ? (page - 1) * LIMIT_BOOKS : 0);

      const total = await db
        .select({ count: count() })
        .from(BooksTable)
        .then((res) => res[0]?.count || 0);

      return { books, total };
    } catch (err: any) {
      console.log(err);
      throw new Error("Failed to fetch books : ", err.message);
    }
  },
  [CACHE_KEY.books],
  {
    tags: [CACHE_KEY.books],
    revalidate: 60,
  }
);
