import { BooksTable } from "@/drizzle/schema";
import { LIMIT_BOOKS } from "@/variables";
import Link from "next/link";
import BookTableTitle from "./Title";
import DeleteBookButton from "./DeleteBookBtn";

type Book = typeof BooksTable.$inferSelect;

export default async function Table({
  books,
  page,
}: {
  books: Book[];
  page: number;
}) {
  return (
    <div className="h-full flex-grow py-4">
      <div className="rounded-box overflow-hidden border border-base-content/10 bg-base-100">
        <table className="table">
          <thead>
            <tr className="bg-neutral">
              <th className="border-r border-base-content/10">No</th>
              <th className="border-r border-base-content/10">Title</th>
              <th className="border-r border-base-content/10">Stocks</th>
              <th className="border-r border-base-content/10">Available</th>
              <th className="border-r border-base-content/10">Author</th>
              <th className="border-r border-base-content/10">Categories</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 ? (
              <tr>
                <td>
                  <h1 className="text-xl font-semibold">Books not found</h1>
                </td>
              </tr>
            ) : (
              books.map((book, i) => (
                <tr key={book.id}>
                  <td className="border-r border-base-content/10 text-center">
                    {i + 1 + (page ? (Number(page) - 1) * LIMIT_BOOKS : 0)}
                  </td>
                  <BookTableTitle id={book.id} title={book.title} />
                  <td className="text-center border-r border-base-content/10">
                    {book.stocks}
                  </td>
                  <td className="text-center border-r border-base-content/10">
                    {book.available}
                  </td>
                  <td className="w-max border-r border-base-content/10">
                    <div className="w-max">
                      <h2>{book.author}</h2>
                    </div>
                  </td>
                  <td className="border-r max-w-[200px] border-base-content/10">
                    <div className="space-x-1 line-clamp-1">
                      {book.categories.map((cat, i) => (
                        <Link
                          key={i}
                          className="space-x-1 hover:underline"
                          href={`/books?categories=${
                            cat.includes("#") ? cat.replaceAll("#", "%23") : cat
                          }`}
                        >
                          {cat}
                          {i === book.categories.length - 1 ? "" : ","}
                        </Link>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="w-fit mx-auto">
                      <DeleteBookButton id={book.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
