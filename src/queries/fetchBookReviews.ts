"use server";

import { CACHE_KEY } from "@/cacheKeys";
import db from "@/lib/drizzle/db";
import { UsersTable, ReviewsTable, BooksTable } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export const fetchReviews = unstable_cache(
  async (bookId: string) => {
    return db
      .select({
        name: UsersTable.name,
        comment: ReviewsTable.description,
        rating: ReviewsTable.rating,
      })
      .from(ReviewsTable)
      .innerJoin(BooksTable, eq(BooksTable.id, ReviewsTable.bookId))
      .innerJoin(UsersTable, eq(UsersTable.id, ReviewsTable.userId))
      .where(eq(ReviewsTable.bookId, bookId));
  },
  [CACHE_KEY.reviews],
  { tags: [CACHE_KEY.reviews], revalidate: 60 * 10 }
);
export type TReview = Awaited<ReturnType<typeof fetchReviews>>[number];
