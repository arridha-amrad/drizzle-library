import { fetchCategories } from "@/actions/bookActions";
import BookFilterForm from "@/components/BookFilterForm";
import BooksTable from "@/components/BooksTable/BooksTable";
import { getBooks } from "@/components/BooksTable/query";
import SearchBookForm from "@/components/BooksTable/SearchForm";
import PaginateButton from "@/components/PaginatedButton";
import { LIMIT_BOOKS } from "@/variables";

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

  const bc = categories ? categories.split(",") : [];

  const cats = await fetchCategories();
  const { books, total } = await getBooks(page, author, title, bc);

  return (
    <section className="xl:p-8 p-4 min-h-screen flex flex-col">
      <div className="pb-4 flex justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">All Books</h1>
        </div>
        <SearchBookForm />
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
