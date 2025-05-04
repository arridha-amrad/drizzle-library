import { TReview } from "@/queries/fetchBookReviews";

type Props = {
  data: TReview;
};

export default function CardBookReview({ data }: Props) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="text-neutral-500">{data.name}</h2>
        <p className="italic text-ellipsis text-opacity-70 whitespace-pre-line">
          "{data.comment}"
        </p>
        <div className="card-actions justify-end">
          <div className="rating rating-sm rating-half ">
            <input type="radio" name="rating-10" className="rating-hidden" />
            {new Array(10).fill("").map((_, i) => (
              <input
                key={i + 1}
                readOnly
                checked={i + 1 === parseFloat(data.rating) * 2}
                disabled
                type="radio"
                className={`bg-orange-500 mask mask-star-2 ${
                  (i + 1) % 2 === 0 ? "mask-half-2" : "mask-half-1"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
