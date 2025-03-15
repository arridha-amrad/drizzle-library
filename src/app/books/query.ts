import db from "@/drizzle/db";
import { LIMIT_BOOKS } from "@/variables";
import { and, count, ilike, arrayContains, desc } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { BooksTable } from "@/drizzle/schema";
import { CACHE_KEY } from "@/cacheKeys";

export const getBooks = unstable_cache(
  async (
    page?: number,
    author?: string,
    title?: string,
    categories?: string[]
  ) => {
    const filters = and(
      author && author !== "null"
        ? ilike(BooksTable.author, `%${author}%`)
        : undefined,
      title && title !== "null"
        ? ilike(BooksTable.title, `%${title}%`)
        : undefined,
      categories && categories.length > 0
        ? arrayContains(BooksTable.categories, categories)
        : undefined
    );
    try {
      const books = await db
        .select()
        .from(BooksTable)
        .where(filters)
        .orderBy(desc(BooksTable.title))
        .limit(LIMIT_BOOKS)
        .offset(page ? (page - 1) * LIMIT_BOOKS : 0);

      const total = await db
        .select({ count: count() })
        .from(BooksTable)
        .where(filters)
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
