import BooksTable from "@/components/Tables/TableBooks";
import SearchBookForm from "@/components/Forms/FormSearchBook";
import PaginateButton from "@/components/PaginatedButton";
import { LIMIT_BOOKS } from "@/constants";
import { fetchBooks } from "@/queries/fetchBooks";
import { SearchParams } from "@/types";
import Header from "./Header";
import ModalFilterBook from "@/components/Modal/ModalFilterBook";

type Props = {
  searchParams: SearchParams;
};

export default async function Page({ searchParams }: Props) {
  const page = (await searchParams).page;
  const intPage = isNaN(Number(page)) ? 1 : Number(page);
  const { books, total } = await fetchBooks(intPage);

  return (
    <section className="xl:p-8 p-4 min-h-screen flex flex-col">
      <div className="pb-4 flex justify-between">
        <Header />
        <div className="flex items-center gap-3 w-full max-w-sm">
          <ModalFilterBook />
          <SearchBookForm />
        </div>
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
