import { fetchBooks } from "@/actions/bookActions";
import DeleteBookButton from "./DeleteBookBtn";

export default async function BooksTable() {
  const { books, total } = await fetchBooks();

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Id</th>
            <th>Title</th>
            <th>Author</th>
            <th>Categories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, i) => (
            <tr key={book.id}>
              <td>{i + 1}</td>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.categories.join(", ")}</td>
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
  );
}
