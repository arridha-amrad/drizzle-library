export default function FormBorrowBook() {
  return (
    <form action={execute} className="space-y-3 mt-4 w-full">
      <input type="text" name="bookId" defaultValue={bookId} hidden />
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Book&apos;s Title</legend>
        <input
          readOnly
          name="title"
          defaultValue={title}
          type="text"
          className="input input-neutral w-full"
        />
      </fieldset>
      {children}
      <div className="modal-action">
        <button
          type="button"
          onClick={() => refDialog.current?.close()}
          className="btn btn-neutral w-20"
        >
          Close
        </button>
        <button className="btn btn-primary w-20" type="submit">
          {isPending ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Borrow"
          )}
        </button>
      </div>
    </form>
  );
}
