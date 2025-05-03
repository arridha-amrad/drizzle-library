import BooksTable from "@/app/books/BooksTable/BooksTable";

import SearchBookForm from "@/app/books/SearchForm";
import PaginateButton from "@/components/PaginatedButton";
import { LIMIT_BOOKS } from "@/constants";
import FilterBooks from "./FilterBooks";
import Header from "./Header";
import { getBooks } from "./query";

type Params = {
  title?: string;
  page?: number;
  categories?: string;
  author?: string;
};

type Props = {
  searchParams: Promise<Params>;
};

export default async function Page({ searchParams }: Props) {
  const { author, categories, page, title } = await searchParams;
  const bc = categories ? categories.split(",").map((v) => v.trim()) : [];
  const { books, total } = await getBooks(page, author, title, bc);

  return (
    <section className="xl:p-8 p-4 min-h-screen flex flex-col">
      <div className="pb-4 flex justify-between">
        <Header />
        <div className="flex items-center gap-3 w-full max-w-sm">
          <FilterBooks />
          <SearchBookForm />
        </div>
      </div>
      <BooksTable books={books} page={page ?? 1} />
      <section className="w-full flex justify-center">
        {total > LIMIT_BOOKS && (
          <div className="join">
            {new Array(Math.ceil(total / LIMIT_BOOKS)).fill("").map((_, i) => (
              <PaginateButton key={i} number={i + 1} />
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
