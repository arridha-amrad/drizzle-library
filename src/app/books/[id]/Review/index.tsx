import { fetchReviews } from "../query";
import ReviewCard from "./ReviewCard";

type Props = {
  bookId: string;
};

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
