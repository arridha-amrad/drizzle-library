"use server";

import { CACHE_KEY } from "@/cacheKeys";
import db from "@/lib/drizzle/db";
import { BooksTable } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export const getBookDetail = unstable_cache(
  async (bookId: string) => {
    const book = await db
      .select()
      .from(BooksTable)
      .where(eq(BooksTable.id, bookId));
    return book;
  },
  [CACHE_KEY.bookDetail],
  { tags: [CACHE_KEY.bookDetail], revalidate: 60 }
);
