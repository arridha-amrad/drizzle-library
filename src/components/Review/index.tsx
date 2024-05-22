import db from "@/drizzle/db";
import {
  BooksRatingTable,
  BooksTable,
  CommentTable,
  users,
} from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import ReviewCard from "./ReviewCard";

type Props = {
  bookId: string;
};

const fetchReviews = async (bookId: string) => {
  return db
    .select()
    .from(BooksRatingTable)
    .innerJoin(BooksTable, eq(BooksTable.id, BooksRatingTable.bookId))
    .innerJoin(users, eq(users.id, BooksRatingTable.userId))
    .innerJoin(CommentTable, eq(CommentTable.id, BooksRatingTable.commentId))
    .where(eq(BooksRatingTable.bookId, bookId));
};

export type TReview = Awaited<ReturnType<typeof fetchReviews>>[number];

export default async function BookReviews({ bookId }: Props) {
  const reviews = await fetchReviews(bookId);
  return (
    <section className="flex items-center flex-wrap gap-3">
      {reviews.map((review, i) => (
        <ReviewCard data={review} key={i} />
      ))}
    </section>
  );
}
