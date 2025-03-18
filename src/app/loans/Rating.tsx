export default function Rating() {
  return (
    <div className="rating rating-md rating-half">
      <input
        defaultChecked
        type="radio"
        name="rating"
        className="rating-hidden"
      />
      <input
        value={0.5}
        type="radio"
        name="rating"
        className="bg-yellow-500 mask mask-star-2 mask-half-1"
      />
      <input
        value={1}
        type="radio"
        name="rating"
        className="bg-yellow-500 mask mask-star-2 mask-half-2"
      />
      <input
        value={1.5}
        type="radio"
        name="rating"
        className="bg-yellow-500 mask mask-star-2 mask-half-1"
      />
      <input
        value={2}
        type="radio"
        name="rating"
        className="bg-yellow-500 mask mask-star-2 mask-half-2"
      />
      <input
        value={2.5}
        type="radio"
        name="rating"
        className="bg-yellow-500 mask mask-star-2 mask-half-1"
      />
      <input
        value={3}
        type="radio"
        name="rating"
        className="bg-yellow-500 mask mask-star-2 mask-half-2"
      />
      <input
        value={3.5}
        type="radio"
        name="rating"
        className="bg-yellow-500 mask mask-star-2 mask-half-1"
      />
      <input
        value={4}
        type="radio"
        name="rating"
        className="bg-yellow-500 mask mask-star-2 mask-half-2"
      />
      <input
        value={4.5}
        type="radio"
        name="rating"
        className="bg-yellow-500 mask mask-star-2 mask-half-1"
      />
      <input
        value={5}
        type="radio"
        name="rating"
        className="bg-yellow-500 mask mask-star-2 mask-half-2"
      />
    </div>
  );
}
