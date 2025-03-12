import db from "@/drizzle/db";
import { BooksTable as BT } from "@/drizzle/schema";
import { and, arrayContains, asc, count, desc, eq, ilike } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { LIMIT_BOOKS } from "@/variables";

export const getBooks = unstable_cache(
  async (
    page?: number,
    author?: string,
    title?: string,
    categories?: string[]
  ) => {
    console.log("categories : ", categories);

    const filters = and(
      author && author !== "null" ? ilike(BT.author, `%${author}%`) : undefined,
      title && title !== "null" ? ilike(BT.title, `%${title}%`) : undefined,
      categories && categories.length > 0
        ? arrayContains(BT.categories, categories)
        : undefined
    );
    try {
      const books = await db
        .select()
        .from(BT)
        .where(filters)
        .orderBy(asc(BT.title))
        .limit(LIMIT_BOOKS)
        .offset(page ? (page - 1) * LIMIT_BOOKS : 0);

      const total = await db
        .select({ count: count() })
        .from(BT)
        .where(filters)
        .then((res) => res[0]?.count || 0);

      return { books, total };
    } catch (err: any) {
      console.log(err);

      throw new Error("Failed to fetch books : ", err.message);
    }
  },
  ["books"],
  {
    tags: ["books"],
  }
);
