export default function FormReturnBook() {
  return (
    <form action={execute}>
      <input
        type="text"
        name="loanAt"
        hidden
        defaultValue={loanAt.toString()}
      />
      <input
        type="number"
        name="charge"
        hidden
        defaultValue={countCharge(loanDueAt)}
      />
      <input type="number" name="userId" hidden defaultValue={userId} />
      <input type="text" name="bookId" hidden defaultValue={id} />
      <h3 className="font-bold text-lg">Return Book</h3>
      <div className="divider divider-start">
        <span className="text-neutral-600 font-semibold">Book Info</span>
      </div>
      <div className="py-4">
        <p>Book title : {title}</p>
        <p>Loaned by : {loanBy}</p>
        <p>Charge : {countCharge(loanDueAt)}</p>
      </div>
      <div className="divider divider-start">
        <span className="text-neutral-600 font-semibold">
          User honest review
        </span>
      </div>
      <div className="flex items-center w-full">
        <p>Your rating : </p>
        <Rating />
      </div>
      <div className="w-full pt-3">
        <textarea
          name="comment"
          className="textarea textarea-neutral resize-none w-full"
          placeholder="comment..."
        ></textarea>
      </div>
      <div className="mt-4 flex justify-end gap-3">
        <button
          type="button"
          className="btn btn-neutral"
          onClick={() => refModal.current?.close()}
        >
          Close
        </button>
        <button type="submit" className="btn btn-accent btn-soft">
          Finish
          {pending && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
        </button>
      </div>
    </form>
  );
}
