import PaginatedButton from "@/components/PaginatedButton";
import { LIMIT_BOOKS } from "@/constants";
import { fetchOnLoanBooks } from "@/queries/fetchOnLoanBooks";
import { Metadata } from "next";
import Link from "next/link";
import LoansTable from "../../components/Tables/TableOnLoanBooks";

type Params = {
  searchParams: Promise<{
    page?: number;
  }>;
};

export const metadata: Metadata = {
  title: "On Loan Books",
};

export default async function Page({ searchParams }: Params) {
  const { page } = await searchParams;

  const intPage = isNaN(Number(page)) ? 1 : Number(page);

  const { books, total } = await fetchOnLoanBooks(intPage);

  return (
    <section className="xl:px-8 xl:py-2 p-4  min-h-screen flex flex-col">
      <div className="h-20 items-center flex justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Loan Books</h1>
      </div>
      <div className="flex-grow h-full py-4">
        <LoansTable books={books} page={intPage} />
      </div>
      <section className="w-full flex justify-center py-4">
        {total > LIMIT_BOOKS && (
          <div className="join">
            {new Array(Math.ceil(total / LIMIT_BOOKS)).fill("").map((_, i) => (
              <PaginatedButton key={i} number={i + 1} />
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
