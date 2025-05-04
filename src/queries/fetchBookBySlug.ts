import { CACHE_KEY } from "@/cacheKeys";
import db from "@/lib/drizzle/db";
import { BooksTable } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export const fetchBookBySlug = unstable_cache(
  async (slug: string) => {
    const storedBook = await db
      .select()
      .from(BooksTable)
      .where(eq(BooksTable.slug, slug));
    return storedBook;
  },
  [CACHE_KEY.bookDetail],
  { revalidate: 60, tags: [CACHE_KEY.bookDetail] }
);

export type TBookDetail = Awaited<ReturnType<typeof fetchBookBySlug>>[number];
