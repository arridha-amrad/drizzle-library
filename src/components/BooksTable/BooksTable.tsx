import { BooksFilterProps, fetchBooks } from "@/actions/bookActions";
import DeleteBookButton from "../DeleteBookBtn";
import { LIMIT_BOOKS } from "@/variables";
import PaginateButton from "./PaginatedButton";
import Link from "next/link";

export default async function BooksTable({
  author,
  categories,
  title,
  page,
}: BooksFilterProps) {
  const { books, total } = await fetchBooks({
    author,
    categories,
    title,
    page,
  });

  return (
    <>
      <div className="overflow-x-auto h-full py-4">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Author</th>
              <th>Categories</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, i) => (
              <tr key={book.id}>
                <td>{i + 1 + (page ? (Number(page) - 1) * LIMIT_BOOKS : 0)}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td className="space-x-1">
                  {book.categories.map((cat, i) => (
                    <Link
                      key={i}
                      className="space-x-1"
                      href={`/books?isFilter=true&categories=${
                        cat.includes("#") ? cat.replaceAll("#", "%23") : cat
                      }`}
                    >
                      {cat}
                      {i === book.categories.length - 1 ? "" : ","}
                    </Link>
                  ))}
                </td>
                <td>
                  <div className="flex gap-2">
                    <DeleteBookButton id={book.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="w-full flex justify-center py-4">
        {total > LIMIT_BOOKS && (
          <div className="join">
            {new Array(Math.ceil(total / LIMIT_BOOKS)).fill("").map((_, i) => (
              <PaginateButton key={i} number={i + 1} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
