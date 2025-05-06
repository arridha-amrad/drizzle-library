// import { fetchUsers } from "@/app/users/query";
import Link from "next/link";
import { TBookDetail } from "@/queries/fetchBookBySlug";

type Props = {
  book: TBookDetail;
};

export default async function TableBookDetail({ book }: Props) {
  // const [book, users] = await Promise.all([getBookDetail(id), fetchUsers()]);

  return (
    <div className="rounded-box mt-4 overflow-hidden border border-base-content/10 bg-base-100">
      <table className="table">
        <thead>
          <tr className="bg-neutral">
            <th className="border-r border-base-content/10">Title</th>
            <th className="border-r border-base-content/10">Stocks</th>
            <th className="border-r border-base-content/10">Author</th>
            <th className="border-r border-base-content/10">Categories</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-r border-base-content/10">{book.title}</td>
            <td className="border-r border-base-content/10">
              <div>stocks : {book.stocks}</div>
              <div>available : {book.available}</div>
            </td>
            <td className="border-r border-base-content/10">{book.author}</td>
            <td className="border-r border-base-content/10 space-x-1">
              {book.categories.map((cat, i) => (
                <Link
                  key={i}
                  className="space-x-1"
                  href={`/books/search?categories=${
                    cat.includes("#") ? cat.replaceAll("#", "%23") : cat
                  }`}
                >
                  {cat}
                  {i === book.categories.length - 1 ? "" : ","}
                </Link>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
