import { getBookDetail } from "@/actions/bookActions";
import Link from "next/link";

type Props = {
  bookId: string;
};

export default async function BookDetail({ bookId }: Props) {
  const book = await getBookDetail(bookId);
  return (
    <div className="overflow-x-auto">
      <table className="table ">
        <thead>
          <tr>
            <th>Title</th>
            <th>Stocks</th>
            <th>Author</th>
            <th>Categories</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{book[0].title}</th>
            <td>
              <div>total : {book[0].stocks.total}</div>
              <div>available : {book[0].stocks.available}</div>
            </td>
            <td>{book[0].author}</td>
            <td className="space-x-1">
              {book[0].categories.map((cat, i) => (
                <Link
                  key={i}
                  className="space-x-1"
                  href={`/books?isFilter=true&categories=${
                    cat.includes("#") ? cat.replaceAll("#", "%23") : cat
                  }`}
                >
                  {cat}
                  {i === book[0].categories.length - 1 ? "" : ","}
                </Link>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
