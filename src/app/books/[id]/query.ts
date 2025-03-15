import { CACHE_KEY } from "@/cacheKeys";
import db from "@/drizzle/db";
import {
  LoansTable,
  UsersTable,
  BooksTable,
  ReviewsTable,
} from "@/drizzle/schema";
import { eq, desc } from "drizzle-orm";
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

export const getBookLoanData = unstable_cache(
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
