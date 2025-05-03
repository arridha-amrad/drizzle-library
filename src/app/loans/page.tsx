import PaginatedButton from "@/components/PaginatedButton";
import { LIMIT_BOOKS } from "@/constants";
import Link from "next/link";
import LoansTable from "./LoansTable";
import { fetchLoanBooks } from "./query";
import { Metadata } from "next";

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
  const { books, total } = await fetchLoanBooks(intPage);
  return (
    <section className="xl:p-8 p-4 min-h-screen flex flex-col">
      <div className="pb-4 flex justify-between">
        <Link className="text-4xl font-bold tracking-tight" href="/loan">
          All On Loan Books
        </Link>
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
