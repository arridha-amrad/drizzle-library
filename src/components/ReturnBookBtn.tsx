type Props = {
  userId: number;
  bookId: string;
};

export default function ReturnBookBtn({ bookId, userId }: Props) {
  const returnBook = async () => {
    "use server";
  };
  return (
    <button onClick={returnBook} className="btn btn-warning btn-sm">
      Return
    </button>
  );
}
