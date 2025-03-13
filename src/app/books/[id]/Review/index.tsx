import db from "@/drizzle/db";
import {
  BooksRatingTable,
  BooksTable,
  CommentTable,
  users,
} from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import ReviewCard from "./ReviewCard";
import { unstable_cache } from "next/cache";
import { CACHE_KEY } from "@/cacheKeys";

type Props = {
  bookId: string;
};

const fetchReviews = unstable_cache(
  async (bookId: string) => {
    return db
      .select()
      .from(BooksRatingTable)
      .innerJoin(BooksTable, eq(BooksTable.id, BooksRatingTable.bookId))
      .innerJoin(users, eq(users.id, BooksRatingTable.userId))
      .innerJoin(CommentTable, eq(CommentTable.id, BooksRatingTable.commentId))
      .where(eq(BooksRatingTable.bookId, bookId));
  },
  [CACHE_KEY.reviews],
  { tags: [CACHE_KEY.reviews], revalidate: 60 * 10 }
);

export type TReview = Awaited<ReturnType<typeof fetchReviews>>[number];

export default async function BookReviews({ bookId }: Props) {
  const reviews = await fetchReviews(bookId);
  return (
    <section className="flex items-center flex-wrap gap-3">
      {reviews.length === 0 ? (
        <div className="px-4 mt-4">
          <h1 className="text-base">This book has no review</h1>
        </div>
      ) : (
        reviews.map((review, i) => <ReviewCard data={review} key={i} />)
      )}
    </section>
  );
}
