import SearchBookForm from "@/components/Forms/FormSearchBook";
import ModalFilterBook from "@/components/Modal/ModalFilterBook";
import PaginateButton from "@/components/PaginatedButton";
import BooksTable from "@/components/Tables/TableBooks";
import { LIMIT_BOOKS } from "@/constants";
import { searchBook } from "@/queries/searchBook";
import { SearchParams } from "@/types";
import Link from "next/link";

type Props = {
  searchParams: SearchParams;
};

export default async function Page({ searchParams }: Props) {
  const { page, author, categories, title } = await searchParams;

  const strAuthor =
    author && typeof author === "string" ? decodeURIComponent(author) : "";

  const strCategories =
    categories && typeof categories === "string"
      ? decodeURIComponent(categories)
      : "";

  const strTitle =
    title && typeof title === "string" ? decodeURIComponent(title) : "";

  const intPage = isNaN(Number(page)) ? 1 : Number(page);

  const { books, total } = await searchBook({
    author: strAuthor,
    categories: strCategories,
    page: intPage,
    title: strTitle,
  });

  return (
    <section className="xl:px-8 xl:py-2 p-4  min-h-screen flex flex-col">
      <div className="h-20 flex justify-between items-center">
        <div>
          <Link className="cursor-pointer" href="/books">
            <h1 className="text-3xl font-bold tracking-tight">Search Books</h1>
          </Link>
        </div>
        <div className="flex items-center gap-3 w-full max-w-sm">
          <ModalFilterBook />
          <SearchBookForm />
        </div>
      </div>
      <div className="breadcrumbs text-sm">
        <ul>
          <li>Books</li>
          <li>Search</li>
          {!!strTitle && <li>{strTitle}</li>}
          {!!strAuthor && <li>{strAuthor}</li>}
          {!!strCategories && <li>{strCategories}</li>}
        </ul>
      </div>
      <BooksTable books={books} page={intPage} />
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
